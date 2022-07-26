import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { CLICK_CONTACT, CLICK_CONTACT_INFO, CLICK_YOUR_PROFILE } from '../redux/clickReducer'
import '../styles/groupInfo.css'
import { storage } from '../firebase/firebase'
import { username } from '../redux/userReducer'
import Loading from '../Loading'

const GroupInfo = ({ chat_user, accessToken }) => {

  const dispatch = useDispatch()
  const [image, setGroupImg] = useState(chat_user.groupDP)
  const [remove, setRemove] = useState(false)
  const [remUser, setRemUser] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const e_mail = useSelector(username)
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [addUser, setAddUser] = useState([])
  const [currChat, setCurrChat] = useState({})
  const [currUser, setCurrUser] = useState({})

  const [load, setLoad] = useState(false)

  const getChatInfo = async () => {
    setLoad(true)
    try {
      const result = await fetch(`/api/chat/${chat_user._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const ans = await result.json()
      console.log(ans);
      setCurrChat(ans.chat[0])
    } catch (e) {
      console.log(e);
    }

    chat_user.users.map((user) => {
      if (user.email === e_mail) setCurrUser(user)
    })

    setLoad(false)
  }
  useEffect(() => {
    getChatInfo()
    // console.log(chat_user);
  }, [chat_user])

  const [savedUser, setSavedUser] = useState([{
    id: null,
    username: null
  }])
  const handleGoBack = () => {
    dispatch(CLICK_CONTACT_INFO({ userProfile: false }))
    dispatch(CLICK_CONTACT({ contact: true }))
    dispatch(CLICK_YOUR_PROFILE({ userProfile: false }))
  }
  const handleAdd = async (e) => {
    const file = e.target.files[0]
    const storageRef = storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    const fileUrl = await fileRef.getDownloadURL()
    setGroupImg(fileUrl)
    // handleSaveGroupDp()
  }

  const handleSaveGroupDp = async () => {
    const result = await fetch(`/api/chat/group/addDp`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: image,
        id: chat_user._id
      })
    })
  }
  const handleRemove = async () => {
    const fileUrl = image
    const fileRef = storage.refFromURL(fileUrl)
    await fileRef.delete()
    setGroupImg("https://icon-library.com/images/users-icon/users-icon-7.jpg")
  }
  const handleLeaveGroup = async () => {
    try {
      const result = await fetch(`/api/chat/group/remove/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          groupId: chat_user._id,
          userId: currUser._id
        })
      })

      const ans = await result.json()

      if (ans.success) {
        dispatch(CLICK_CONTACT_INFO({ userProfile: false }))
        dispatch(CLICK_CONTACT({ contact: true }))
        dispatch(CLICK_YOUR_PROFILE({ userProfile: false }))
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleRemoveUser = (user) => {
    setRemove(true)
    setRemUser(user)
  }
  const handleNo = () => {
    setRemove(false)
  }
  const handleYes = async (user) => {
    const result = await fetch(`/api/chat/group/remove/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: chat_user._id,
        userId: user._id
      }),
      withCredentials: true
    })
    const ans = await result.json()
    if (ans.success) setRemove(false)
  }

  const handleSearchClick = async () => {
    const result = await fetch(`/api/user/all/users?search=${search}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      withCredentials: true
    })
    const ans = await result.json()
    setUsers(ans.users)
  }

  const handleAddUser = async (id, name) => {
    let flag = 0;
    for (let i = 0; i < addUser.length; i++) {
      if (addUser[i] === id) {
        flag = 1
        break
      }
      else flag = 0
    }
    if (flag === 0) {
      setAddUser([...addUser, id])
      setSavedUser([...savedUser, { id: id, username: name }])
    }
  }

  const handleRemoveUserSuggest = (user) => {
    setSavedUser(savedUser.filter(item => item.id !== user.id))
    setAddUser(addUser.filter(item => item !== user.id))
  }

  const handleSubmitAdd = async (e) => {
    e.preventDefault()
    const result = await fetch(`/api/chat/group/add/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: chat_user._id,
        userId: addUser
      }),
      withCredentials: true
    })
    const ans = await result.json()
    
    if (ans.success) {
      dispatch(CLICK_CONTACT_INFO({ userProfile: false }))
      dispatch(CLICK_CONTACT({ contact: true }))
      dispatch(CLICK_YOUR_PROFILE({ userProfile: false }))
    }
  }

  if (load) return <Loading />
  return (
    <div className='group-info'>
      <div className='group-back'>
        <FaArrowLeft onClick={handleGoBack} />
      </div>
      <div className='group-image'>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <img src={image} id='group-pic' />
        </div>
        <div className='eddit-group-pic'>
          <div id='add'>
            <input type='file' accept='image/*' id='add-image' onChange={(e) => handleAdd(e)} />
          </div>
          <div id='group-dp-not'>
            <div className='group-dp-info-1'><label htmlFor='add-image' className='group-dp-btns'><FaPlus /></label></div>
            <div className='group-dp-info-2'><label onClick={handleRemove} className='group-dp-btns'><FaTrash /></label></div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: 'end', width: '100%' }}>
          {
            chat_user.groupAdmin.email === e_mail ? <div id='add-div'><button id='add-mem-tag' onClick={() => setShowAdd(true)}>Add Members</button></div> : <></>
          }
          <div id='set-dp-div'><button type='button' id='set-dp-tag' onClick={handleSaveGroupDp}>Save Changes</button></div>
          <div id='leave-grp'><button type='button' id='leave-grp-btn' onClick={handleLeaveGroup}>Leave Group</button></div>
        </div>
      </div>

      <div className='group-members'>
        <div id='members-head'>Members</div>
        <div className='members'>
          {
            chat_user.users.map((user) => {
              return <div className='group-idvl'>
                <div className='idvl-pic'>
                  <img src={user.profilePic} id='idvl-image-tag' />
                </div>
                <div className='idvl-user'>
                  {user.username}
                </div>
                {
                  user._id != chat_user.groupAdmin._id && chat_user.groupAdmin.email === e_mail ? <div className='remove-idvl'>
                    <button id='remove-btn' onClick={() => handleRemoveUser(user)}>Remove</button>
                  </div> : <></>
                }
                {user._id === chat_user.groupAdmin._id ? <div className='idvl-admin'>
                  Admin
                </div> : <></>}
              </div>
            })
          }</div>
      </div>
      {
        remove ? <div className='remove-modal-bg'>
          <div className='remove-main'>
            Are you sure you want to remove {remUser.username} from the group?
            <div className='remove-btns'>
              <div className='remove-btns-btn'><button id='rem-yes' onClick={() => handleYes(remUser)}>Yes</button></div>
              <div className='remove-btns-btn'><button id='rem-no' onClick={handleNo}>No</button></div>
            </div>
          </div>

        </div> : <></>
      }
      {
        showAdd ? <div className='show-add-bg'>
          <div className='show-add-main'>
            <form onSubmit={handleSubmitAdd}>
              <div className='close-add-mem'>
                <FaPlus onClick={() => setShowAdd(false)} id='close-add' />
              </div>
              <div className='input-con-2'>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search User'
                  className='input-group-name' />
                <div id='search-icon'><FaSearch onClick={handleSearchClick} /></div>
              </div>
              <div className='show-add'>
                {
                  savedUser.map((user) => {
                    console.log(user.username);
                    return <div className='saved'>
                      <div id='user-name'>{user.username}</div>
                      <div id='cancel-user' onClick={() => handleRemoveUserSuggest(user)}><FaPlus id='cancelUser' /></div>
                    </div>
                  })
                }
              </div>
              <div className='search-users'>
                {
                  users.map((user) => {
                    let flag = 0;
                    chat_user.users.map((item) => {
                      if (user._id == item._id) flag = 1
                    })
                    if (flag == 0)
                      return <div className='search-user-1' onClick={() => handleAddUser(user._id, user.username)}>
                        <div className='search-pic'>
                          <img src={user.profilePic} className='img-search-tag' />
                        </div>
                        <div className='search-username'>
                          {user.username}
                        </div>
                      </div>
                  })
                }
              </div>
              <div className='add-member-group'>
                <button type='submit' id='add-user-btn' onClick={handleSubmitAdd}>Add User(s)</button>
              </div>
            </form>

          </div>
        </div> : <></>
      }
    </div>
  )
}

export default GroupInfo