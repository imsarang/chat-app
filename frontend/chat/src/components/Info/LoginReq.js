import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CLICK_LOGIN_REQ } from '../redux/clickReducer'
import '../styles/loginReq.css'

const LoginReq = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleBtn = ()=>{
        navigate("/")
        // setShow(false)
        dispatch(CLICK_LOGIN_REQ({show:false}))
    }
  return (
    <div className='login-bg'>
        <div className='login-req-cons'>
            <div id='text-log'>Login Required</div>
            <div id='log-btn-req'><button id='log-btn-tag'onClick={handleBtn}>Go To Home Page</button></div>
        </div>
    </div>
  )
}

export default LoginReq