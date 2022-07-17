import React, { useState } from 'react'
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { CLICK_CONTACT, CLICK_CONTACT_INFO, CLICK_YOUR_PROFILE } from '../redux/clickReducer'
import '../styles/groupInfo.css'
import { storage } from '../firebase/firebase'

const GroupInfo = ({ chat_user, accessToken }) => {

  const dispatch = useDispatch()
  const [image, setGroupImg] = useState(chat_user.groupDP)

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
  const handleLeaveGroup = () => {

  }

  const handleRemoveUser = ()=>{
    
  }
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
        <div style={{display:"flex",justifyContent:'end',width:'100%'}}>
          <div id='set-dp-div'><button id='set-dp-tag' onClick={handleSaveGroupDp}>Save Changes</button></div>
          <div id='leave-grp'><button id='leave-grp-btn' onClick={handleLeaveGroup}>Leave Group</button></div>
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
                  user._id!=chat_user.groupAdmin._id?<div className='remove-idvl'>
                    <button id='remove-btn' onClick={()=>handleRemoveUser()}>Remove</button>
                  </div>:<></>
                }
                {user._id === chat_user.groupAdmin._id ? <div className='idvl-admin'>
                  Admin
                </div> : <></>}
              </div>
            })
          }</div>
      </div>
    </div>
  )
}

export default GroupInfo