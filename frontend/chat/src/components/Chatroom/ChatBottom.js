import React, { useRef, useState } from 'react'
import '../styles/chatbodybottom.css'
import {FaAlignRight, FaAngleDoubleRight, FaAngleRight, FaChevronRight, FaUser} from 'react-icons/fa'

const ChatBottom = () => {
    const [message,setMessage] = useState()
    const [textAreaHeight,setTextAreaHeight] = useState(1) 
    const divHeight = useRef()
    const handleChange = (e)=>{
      setMessage(e.target.value)
      const height = e.target.scrollHeight
      const rowHeight = 20
      const trows = Math.ceil(height/rowHeight) -1;
      if(message == '') setTextAreaHeight(1)
      else setTextAreaHeight(trows)
      console.log(divHeight);
      divHeight.current.style.height = divHeight.current.clientHeight
      console.log(divHeight.current.clientHeight);
    }
  return (
    <div className='chat-body-bottom' ref={divHeight}>
        <div className='chat-input'>
            <textArea
            type='text'
            value={message}
            onChange={(e)=>handleChange(e)}
            className='msg-box'
            rows={textAreaHeight}/>
        </div>
        <div className='chat-send'>
           <FaAngleDoubleRight id='faRight'/>
        </div>
    </div>
  )
}

export default ChatBottom