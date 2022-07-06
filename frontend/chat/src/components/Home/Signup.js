import React, { useState } from 'react'
import SuccessInfo from '../Info/SuccessInfo'
import '../styles/signup.css'
import OTP from './OTP'
const Signup = ({setLogin,setInfoTimer,setSignupSucccess}) => {
  const [user, setUser] = useState({
    username: null,
    email: null,
    password: null,
    cpassword: null
  })
  const [otp, setOtp] = useState(false)
  const [number, setOtpNumber] = useState()
  const [seconds, setSeconds] = useState()
  const [showReg, setShowReg] = useState(false)
  const [verify, setVerify] = useState(false)

  const handleInputs = (e) => {

  }
  const sendOTP = async () => {
    setOtp(true)
    setSeconds(30)
  }
  const handleSubmit = async () => {
    console.log(`handleSubmit`);
    setSignupSucccess(true)
    setInfoTimer(2)
    setLogin(true)
  }
  const handleResend = () => {
    setSeconds(30)
  }
  const handleValidate = async () => {
    setOtp(false)
    setVerify(true)
    setShowReg(true)
  }
  return (
    <div className='signup'>
      <div className='signup-input'>
        <input
          type='text'
          placeholder='Username'
          value={user.username}
          onChange={(e) => handleInputs(e)}
          name='username'
          id='username' />
      </div>
      <div className='signup-input'>
        <input
          type='email'
          placeholder='Email'
          value={user.email}
          onChange={(e) => handleInputs(e)}
          name='email'
          id='username' />
      </div>
      <div className='signup-input'>
        <input
          type='password'
          placeholder='Password'
          value={user.password}
          onChange={(e) => handleInputs(e)}
          name='password'
          id='password' />
      </div>
      <div className='signup-input'>
        <input
          type='password'
          placeholder='Confirm Password'
          value={user.cpassword}
          onChange={(e) => handleInputs(e)}
          name='cpassword'
          id='password'
          required />
      </div>

      {
        otp ? <><OTP seconds={seconds} setSeconds={setSeconds}/>
          <div className='otp-input'>
            <input
              type='text'
              placeholder='Enter OTP'
              value={number}
              onChange={(e) => setOtpNumber(e.target.value)}
              className='input-otp'
              required />
          </div>
          <div className='div-timer'>
            {seconds != 0 ? <>Resending OTP in {seconds}</> :
              <><div onClick={handleResend} id='resend'>Click to Resend OTP</div></>
            }
          </div>
          <div className='div-validate'>
            <button type='none' id='validate-btn' onClick={handleValidate}>
              Validate OTP
            </button>
          </div>
          </> :
          <div className='send-otp'>
            {
              !verify?<>
              <button type='button' onClick={sendOTP} id='otp'>
              VERIFY EMAIL WITH OTP
            </button></>
            :
              <>
              <div className='div-submit'>
            <button type='submit' onClick={handleSubmit}
              className='register-btn'>Sign Up</button>
          </div></>
            }
          </div>
      }
    </div>
  )
}

export default Signup