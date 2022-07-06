import React from 'react'
import '../styles/chatroom.css'
import ChatBody from './ChatBody'
import Contacts from './Contacts'

const ChatMain = () => {
  return (
    <div className='chat-main'>
        <div className='chat-main-bg-1'></div>
        <div className='chat-main-bg-2'></div>
        <div className='chat-main-body'>
            <div id='contact-div'><Contacts/></div>
            <div id='chat-div'><ChatBody/></div>
        </div>
    </div>
  )
}

export default ChatMain