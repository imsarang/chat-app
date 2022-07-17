import React, { useEffect, useState } from 'react'
import '../styles/chatroom.css'
import ChatBody from './ChatBody'
import Contacts from './Contacts'
import Cookies from 'js-cookie'
import refreshHook from '../hooks/refreshHook'
import { useNavigate } from 'react-router-dom'
import LoginReq from '../Info/LoginReq'
import { useDispatch, useSelector } from 'react-redux'
import { CLICK_LOGIN_REQ, failure, group, response, showLoginReq, success } from '../redux/clickReducer'
import '../styles/loginReq.css'
import { username } from '../redux/userReducer'
import CreateGroup from '../Group/CreateGroup'
import FailureInfo from '../Info/FailureInfo'
import SuccessInfo from '../Info/SuccessInfo'
const ChatMain = () => {
  const refToken = refreshHook()
  const [accessToken,setAccess] = useState()
  const show = useSelector(showLoginReq)
  const createGroup = useSelector(group)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const e_mail = useSelector(username)
  const showResFail = useSelector(failure)
  const showResSuc = useSelector(success)

  const handleRefresh = async()=>{
    const token = await refToken
    console.log(token);
    // token?navigate(`/chatroom/${e_mail}`):navigate('/');
    setAccess(token.accessToken)
  }
  useEffect(()=>{
    // console.log(accessToken);
    
    handleRefresh()
    
    // if(!accessToken) dispatch(CLICK_LOGIN_REQ({show:true}))
  },[])
  
  // if(show) return <LoginReq/>
  // else navigate("/")
  // // if(accessToken) alert("Login Required")
  // if(accessToken){

    const handleBtn = ()=>{
      dispatch(CLICK_LOGIN_REQ({show:false}))

      navigate("/")
      // setShow(false)
  }
  
  return (
    <div className='chat-main'>
        <div className='chat-main-bg-1'></div>
        <div className='chat-main-bg-2'></div>
        
          <div className='chat-main-body'>
            <div id='contact-div'><Contacts accessToken = {accessToken}/></div>
            <div id='chat-div'><ChatBody accessToken={accessToken}/></div>
        </div>
        
        {/* {
          show?<div className='login-bg'>
          <div className='login-req-cons'>
              <div id='text-log'>Login Required</div>
              <div id='log-btn-req'><button id='log-btn-tag'onClick={handleBtn}>Go To Home Page</button></div>
          </div>
      </div>:<></>
        } */}
        {
          createGroup?<><CreateGroup accessToken={accessToken}/></>:<></>
        }
        {
          showResFail.result?<><FailureInfo text1={showResFail.msg} /></>:<></>
        }
        {
          showResSuc.result?<><SuccessInfo text1={showResSuc.msg}/></>:<></>
        }
    </div>
  )
}

export default ChatMain