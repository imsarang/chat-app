import React, { useState } from 'react'
import ProfileHeader from './ProfileHeader'
import {userArray} from '../trial'
import ContactIdvl from './ContactIdvl'
import '../styles/chatroom.css'
import bg1 from '../images/madara-4.jpg'

const Contacts = () => {
  const [showUserProfile,setShowUserProfile] = useState(false)

  return (
    <div className='contact-main'>
        <div className='contact-profile'><ProfileHeader setShow={setShowUserProfile}/></div>
        <div className='contact-list'>
            {
                userArray.map((item)=>{
                    return <div className='contact-div'>
                        <ContactIdvl user={item} image={bg1}/>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Contacts