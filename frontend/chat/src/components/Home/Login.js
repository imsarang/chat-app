import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'
const Login = () => {
  const [user, setUser] = useState({
    username: null,
    password: null
  })
  const navigate = useNavigate()

  const handleInputs = (e) => {

  }
  const handleSubmit = (e)=>{
    e.preventDefault()

    navigate(`/chatroom/${user.username}`)
  }
  const handleForget = ()=>{

  }
  return (
    <div className='login'>
      <form onSubmit = {handleSubmit}>
        <div id='login-1'>
          <div className='login-input'>
            <input type='text'
              value={user.username}
              onChange={(e) => handleInputs(e)}
              placeholder='Username'
              id='username'
              name='username'
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