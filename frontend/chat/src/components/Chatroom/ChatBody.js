import React, { useEffect, useState } from 'react'
import ChatBodyHeader from './ChatBodyHeader'
import ChatBodyMsg from './ChatBodyMsg'
import ChatBottom from './ChatBottom'
import '../styles/chatbody.css'
import ContactProfile from './ContactProfile'
import { useSelector } from 'react-redux'
import { contact, userInfo, userProfile } from '../redux/clickReducer'
import EditUser from '../User/EditUser'
import { chatUser, username } from '../redux/userReducer'
import Welcome from '../Welcome'
import GroupInfo from '../Group/GroupInfo'

const ChatBody = ({ accessToken }) => {
  const userPro = useSelector(userInfo)
  const myProfile = useSelector(userProfile)
  const [user, setUser] = useState({
    username: null,
    firstname: null,
    lastname: null,
    status: null,
    email: null,
    imageUrl: null
  })
  const e_mail = useSelector(username)
  const user_contact = useSelector(contact)
  const chat_user = useSelector(chatUser)

  const handleChatUser = () => {
    chat_user.users.map((item) => {
      if (item.email != e_mail)
        setUser({
          username: item.username,
          firstname: item.firstname,
          lastname: item.lastname,
          email: item.email,
          imageUrl: chat_user.groupDP,
          status: item.status
        })
    })
  }
  useEffect(() => {
    // handleShowUser()
    handleChatUser()
  }, [chat_user])

  return (
    <div className='chat-body-div'>
      {
        userPro ? <div className='chat-body-profile'>
          {
            chat_user.isGroupChat ? <><GroupInfo
              chat_user={chat_user}
              accessToken={accessToken} /></>
              : <ContactProfile
                image={user.imageUrl}
                username={user.username}
                firstname={user.firstname}
                lastname={user.lastname}
                email={user.email}
                status={user.status}
              />
          }
        </div> :
          myProfile ? <EditUser accessToken={accessToken} /> :
            user_contact ? <>
              <div className='chat-body-header-div'>
                <ChatBodyHeader />
              </div>
              <div className='chat-body-msg-div'>
                <ChatBodyMsg />
              </div>
              <div className='chat-body-bottom-div'>
                <ChatBottom />
              </div>
            </> :
              <div style={{height:'100%'}}>
                <Welcome />
              </div>
      }

    </div>
  )
}

export default ChatBody