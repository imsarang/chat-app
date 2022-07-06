import React, { useState } from 'react'
import SuccessInfo from '../Info/SuccessInfo'
import '../styles/home.css'
import Login from './Login'
import Signup from './Signup'

const Home = () => {
    const [login, setLogin] = useState(true)
    const [infoTimer, setInfoTimer] = useState()
    const [signUpSuccess,setSignupSucccess] = useState(false)

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
        </div>
    )
}

export default Home