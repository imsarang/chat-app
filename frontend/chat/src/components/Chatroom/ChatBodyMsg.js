import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from '../Loading'
import { chatUser } from '../redux/userReducer'
import '../styles/chatbodymsg.css'
import Message from './Message'
import io from "socket.io-client"

let socket,selectedChatCompare

const ENDPOINT = 'http://localhost:5000'

const ChatBodyMsg = ({accessToken}) => {

  const [messages,setMessages] = useState([])
  const chat_user = useSelector(chatUser)
  const [load,setLoad] = useState(false)
  

  useEffect(()=>{
    socket = io(ENDPOINT)
    
    selectedChatCompare = chat_user
    handleShowMessage()
},[chat_user])

useEffect(()=>{
  socket.on("message recieved",(newMsgRcv)=>{
    if(!selectedChatCompare || selectedChatCompare._id!=newMsgRcv._id)
    // give Notification
    {

    }
    else
    {
      setMessages([...messages,newMsgRcv])
    }
  })
})
  const handleShowMessage = async()=>{
    setLoad(true)
      const result = await fetch(`/api/message/fetch/${chat_user._id}`,{
        method:"GET",
        headers:{
          Authorization:`Bearer ${accessToken}`,
        },
        withCredentials:true
      })
      const ans = await result.json()
      console.log(ans);
      if(ans.success)
      {
        setMessages(ans.message)
        socket.emit("join chat",chat_user._id)
      }
      setLoad(false)
      
  }

  
if(load) return <><Loading/></>
else return (
    <div>
      {
        messages.map((item)=>{
         return <Message 
         pic={item.sender.profilePic} 
         name={item.sender.username} 
         email={item.sender.email} 
         content={item.content}
         createdAt={item.createdAt}/>

        })
      }
    </div>
  )
}

export default ChatBodyMsg