import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import refreshHook from '../hooks/refreshHook'
import SuccessInfo from '../Info/SuccessInfo'
import { failure, showLoginReq } from '../redux/clickReducer'
import { username } from '../redux/userReducer'
import '../styles/home.css'
import Login from './Login'
import Signup from './Signup'
import FailureInfo from '../Info/FailureInfo'

const Home = () => {
    const [login, setLogin] = useState(true)
    const [infoTimer, setInfoTimer] = useState()
    const [signUpSuccess,setSignupSucccess] = useState(false)
    const refToken = refreshHook()
    const e_mail = useSelector(username)
    const navigate = useNavigate()
    const show = useSelector(showLoginReq)
    const showFail = useSelector(failure)

    const handle = async()=>{
        const token = await refToken
        // console.log(token);
        console.log('hello');
        // token?navigate(`/chatroom/${e_mail}`):console.log('Login');
    }
    useEffect(()=>{
        
        handle()

    },[refToken])
    return (
        <div className='main-body'>
            <div className='main-1'>
                <div className='main-content-1'>
                    lorem ipsum foef nfenfofmepmfe wmfffedf ehfewofowgnwri ghwrighwrh
                </div>
            </div>
            <div className='main-2'></div>
            <div className='main-sec-1'>
                <div id='main-sec-head'>
                    <div id={login ? 'active-item' : 'login'} onClick={() => setLogin(true)}>
                        Login
                    </div>
                    <div id={login ? 'signup' : 'active-item'} onClick={() => setLogin(false)}>
                        Signup
                    </div>
                </div>
                {
                    login ?
                        <div className='main-sec-content'>
                            <Login />
                        </div> : <div className='main-sec-content'>
                            <Signup 
                            setLogin={setLogin} 
                            setInfoTimer={setInfoTimer}
                            setSignupSucccess={setSignupSucccess}/>
                        </div>
                }
            </div>
            {
                signUpSuccess ? <>
                <SuccessInfo
                text1={`Sign Up Successful`} 
                text2={`Please Login`} 
                seconds={infoTimer}
                setSeconds={setInfoTimer}
                setSuccessInfo={setSignupSucccess}/></>
                    : <></>
            }
            {
                showFail.result?<FailureInfo text1={showFail.msg}/>:<></>
            }
        </div>
    )
}

export default Home