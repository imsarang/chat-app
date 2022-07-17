import React from 'react'
import { FaUserAltSlash } from 'react-icons/fa'
import '../styles/info.css'
import userIcon from '../images/user-icon-11.jpg' 

const NoUser = () => {
  return (
    <div className='no-user-bg'>
        <div className='no-user-content'>
            <div className='no-user-icon'>
              <img src={userIcon} id='no-user-img'/>
              {/* <FaUserAltSlash /> */}
            </div>
            <div className='no-user-text'>
              SEARCH users
            </div>
        </div>
    </div>
  )
}

export default NoUser