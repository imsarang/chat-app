import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CLICK_CONTACT, CLICK_CONTACT_INFO, CLICK_YOUR_PROFILE, failure, SHOW_FAILURE } from '../redux/clickReducer'
import { ADD_USERNAME, CURRENT_USER } from '../redux/userReducer'
import '../styles/login.css'
import Cookies from 'js-cookie'

const Login = () => {
  const [user, setUser] = useState({
    email: null,
    password: null
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [refCookie,setCookie] = useCookies()
  const refCookie = Cookies.get()
  const handleInputs = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const result = await fetch(`/api/user/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:user.email,
        password:user.password
      })
    })

    const ans = await result.json()
    if(ans.success)
    {
      console.log(refCookie);
      dispatch(ADD_USERNAME({
        username: user.email
      }))

      navigate(`/chatroom/${user.email}`)
      dispatch(CLICK_CONTACT({contact:false}))
      dispatch(CLICK_CONTACT_INFO({userInfo:false}))
      dispatch(CLICK_YOUR_PROFILE({userProfile:false}))
    }
    else 
    dispatch(SHOW_FAILURE({
      result:true,
      msg:ans.message
    }))
  }
  const handleForget = ()=>{

  }
  return (
    <div className='login'>
      <form onSubmit = {handleSubmit}>
        <div id='login-1'>
          <div className='login-input'>
            <input type='text'
              value={user.email}
              onChange={(e) => handleInputs(e)}
              placeholder='Email'
              id='username'
              name='email'
            />
          </div>
          <div className='login-input'>
            <input type='password'
              value={user.password}
              onChange={(e) => handleInputs(e)}
              placeholder='Password'
              id='password'
              name='password'
            />
          </div>
          <div className='login-input'>
            <label onClick={handleForget} id='forget'>Forget Password?</label>
          </div>
          <div className='login-btn'>
            <button type='submit' id='submit-btn'>
              Login
            </button>
          </div>
        </div>
      </form>
      <div id='or'>OR</div>
      <div className='login-2'>
        <div className='login-google'>
          <button
            type='button' id='login-btn'>Login With Google</button>
        </div>
      </div>
    </div>
  )
}

export default Login