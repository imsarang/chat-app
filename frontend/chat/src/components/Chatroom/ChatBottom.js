import React, { useState } from 'react'
import '../styles/chatbodybottom.css'
import {FaAlignRight, FaAngleDoubleRight, FaAngleRight, FaChevronRight, FaUser} from 'react-icons/fa'

const ChatBottom = () => {
    const [message,setMessage] = useState()
  return (
    <div className='chat-body-bottom'>
        <div className='chat-input'>
            <textarea
            type='text'
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            className='msg-box'/>
        </div>
        <div className='chat-send'>
           <FaAngleDoubleRight id='faRight'/>
        </div>
    </div>
  )
}

export default ChatBottom