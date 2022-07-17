import React from 'react'
import './styles/welcome.css'
import bg1 from './images/uer-chat.png'
const Welcome = () => {
  return (
    <div className='welcome-bg'>
      <div id='welcome-head'>
        <div id='welcome-head-1'>
          Talk with
        </div>
        <div id='welcome-head-2'>
          <span className='imp'>everyone</span> and keep chats <span className='imp'>secure</span>
        </div>
      </div>
      <div className='wel-img'>
        <img src={bg1} id='wel-img-id' />
      </div>
    </div>
  )
}

export default Welcome