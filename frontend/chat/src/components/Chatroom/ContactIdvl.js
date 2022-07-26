import React from 'react'
import { useDispatch } from 'react-redux'
import { CLICK_CONTACT, CLICK_CONTACT_INFO, CLICK_YOUR_PROFILE } from '../redux/clickReducer'
import { CHAT_USER, SEARCH_USER_REMOVE } from '../redux/userReducer'
import '../styles/contactIdvl.css'

const ContactIdvl = ({ user, image, icon, id,setLoad,accessToken}) => {
  const dispatch = useDispatch()

  const handleCreateNew = async (id) => {
    setLoad(true)
    const result = await fetch(`/api/chat/add`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userID: id
        }),
        withCredentials: true
    })
    const ans = await result.json()
    ans.verifyChat ? dispatch(CHAT_USER({
        chatUser: ans.verifyChat[0]
    })) : dispatch(CHAT_USER({
        chatUser: ans.fullChat[0]
    }))
    setLoad(false)
}

  const handleClick = () => {
    dispatch(CLICK_CONTACT({ contact: true }))
    dispatch(CLICK_CONTACT_INFO({ userInfo: false }))
    dispatch(CLICK_YOUR_PROFILE({ userProfile: false }))

  }
  const handleClearSearch = () => {
    dispatch(SEARCH_USER_REMOVE({
      username: user
    }))
  }
  return (
    <div className='contact-idvl-main' onClick={handleClick}>

      <div className='contact-3' onClick={()=>handleCreateNew(id)}>
        <div className='contact-idvl-image'>
          {
            image ? <div className='image-div'>
              <img src={image} className='idvl-image-tag' />
            </div> : <div></div>
          }
        </div>
        <div className='contact-idvl-username'>
          {user}
        </div>
      </div>
      <div className='cancel-user' onClick={handleClearSearch}>
        {icon}
      </div>
    </div>
  )
}

export default ContactIdvl