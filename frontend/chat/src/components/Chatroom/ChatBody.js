import React, { useState } from 'react'
import ChatBodyHeader from './ChatBodyHeader'
import ChatBodyMsg from './ChatBodyMsg'
import ChatBottom from './ChatBottom'
import '../styles/chatbody.css'
import Profile from './Profile'

const ChatBody = () => {

  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className='chat-body-div'>
      {
        showProfile ? <div className='chat-body-profile'>
          <Profile
            setShow={setShowProfile}
            // image={'..images/madara-4.jpg'}
            name={'imsarang7'}
            firstname={'Sarang'}
            lastname={'Chilkund'}
            email={'Email@gmail.com'}
            status={'random status'}
          /></div> : <>
          <div className='chat-body-header-div'>
            <ChatBodyHeader setShow={setShowProfile} />
          </div>
          <div className='chat-body-msg-div'>
            <ChatBodyMsg />
          </div>
          <div className='chat-body-bottom-div'>
            <ChatBottom />
          </div>
        </>
      }

    </div>
  )
}

export default ChatBody