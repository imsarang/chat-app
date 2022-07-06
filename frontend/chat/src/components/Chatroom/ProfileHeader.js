import React, { useState } from 'react'
import {FaUser} from 'react-icons/fa'
import bg1 from '../images/madara-4.jpg'
import bg2 from '../images/bg-2.jpg'
import '../styles/profileHeader.css'

const ProfileHeader = ({setShow}) => {
    const [user,setUser] = useState({
        imageUrl:bg1,
        username:'Username',
        status:'ggmu',
    })
  return (
    <div className='profile-header' onClick={()=>setShow(true)}>
        <div className='profile-head-1'>
            {
                user.imageUrl?<div className='pro-div'>
                <img src={user.imageUrl} className='profile-head-image'/>
                </div>:<div className='pro-div'>
                    <FaUser id='faUser'/>                    
                </div>
            }
        </div>
        <div className='profile-head-2'>
               <div className='profile-header-name'>{user.username}</div>
        </div>
    </div>
  )
}

export default ProfileHeader