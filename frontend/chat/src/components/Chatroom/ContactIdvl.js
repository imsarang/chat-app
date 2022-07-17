import React from 'react'
import { useDispatch } from 'react-redux'
import { CLICK_CONTACT, CLICK_CONTACT_INFO, CLICK_YOUR_PROFILE } from '../redux/clickReducer'
import { SEARCH_USER_REMOVE } from '../redux/userReducer'
import '../styles/contactIdvl.css'

const ContactIdvl = ({ user, image, icon, id, handleCreateNew }) => {
  const dispatch = useDispatch()

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