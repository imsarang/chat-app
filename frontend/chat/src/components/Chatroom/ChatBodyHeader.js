import React from 'react'
import { FaBars, FaDotCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import bg1 from '../images/madara-4.jpg'
import { CLICK_CONTACT, CLICK_CONTACT_INFO, CLICK_YOUR_PROFILE } from '../redux/clickReducer'
import { chatUser, username } from '../redux/userReducer'
import '../styles/chatbodyheader.css'

const ChatBodyHeader = ({ image, setShow }) => {

    const dispatch = useDispatch()
    const chat_user = useSelector(chatUser)
    const e_mail = useSelector(username)

    const handleClick = ()=>{
        dispatch(CLICK_CONTACT({contact:false}))
        dispatch(CLICK_CONTACT_INFO({userInfo:true}))
        dispatch(CLICK_YOUR_PROFILE({userProfile:false}))
    }

    return (
        <div className='chat-head'>
            <div className='chat-head-1' onClick={handleClick}>
                <div className='chat-head-image'>
                    <img src={chat_user.groupDP} className='chat-img-tag' />
                </div>
                <div className='chat-head-username'>
                    {!chat_user.isGroupChat?chat_user.users.map((x)=>{
                        if(x.email!=e_mail) return x.username
                    }):chat_user.chatName}
                </div>
            </div>
        </div>
    )
}

export default ChatBodyHeader