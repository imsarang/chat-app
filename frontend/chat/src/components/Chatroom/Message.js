import React, { useRef, useState } from 'react'
import '../styles/message.css'

const Message = ({ name, content }) => {


  return (
    <div className='message'>
      <div id='msg-main'>
        <div className='msg-user'>
          {name}
        </div>
        <div className='msg-content'>
          {content}
        </div>
      </div>
    </div>
  )
}

export default Message