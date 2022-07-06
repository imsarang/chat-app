import React from 'react'
import { FaBars, FaDotCircle } from 'react-icons/fa'
import bg1 from '../images/madara-4.jpg'
import '../styles/chatbodyheader.css'

const ChatBodyHeader = ({image,username,setShow}) => {
  return (
    <div className='chat-head'>
        <div className='chat-head-1' onClick={()=>setShow(true)}>
            <div className='chat-head-image'>
                <img src={bg1} className='chat-img-tag'/>
            </div>
            <div className='chat-head-username'>
                {'Sarang'}
            </div>
        </div>
        <div className='chat-head-2'>
            <FaBars/>
        </div>
    </div>
  )
}

export default ChatBodyHeader