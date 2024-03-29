import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { chatUser, user, username } from '../redux/userReducer'
import '../styles/message.css'

const Message = ({ id,createdAt, pic, name, email, content}) => {

  // const e_mail = useSelector(username)
  const [msgSide, setMsgSide] = useState('message-1')
  const [hours,setHours] = useState()
  const [minutes,setMinutes] = useState()
  const curr_user = useSelector(user)

  useEffect(() => {
    // console.log(id);
    // console.log(curr_user.id);
    // console.log(chat_user.id);

    if (id === curr_user._id) {
      setMsgSide('message-2')
    }
    else {
      setMsgSide('message-1')
    }
    setHours(new Date(createdAt).getHours())
    setMinutes(new Date(createdAt).getMinutes())
  }, [])
  return (<div className='message-comp'>
  <div className={msgSide}>
    <div className='message'>
      <div className='msg-image'>
        {
          id === curr_user.id ? <></> : <div className='pic-sender'>
            <img src={pic} id='handle-img' />
          </div>
        }

        <div id='msg-main'>
          {
            id ===curr_user.id ? <></> : <div className='msg-user'>
              {name}
            </div>
          }

          <div className='msg-content'>
            {content}
          </div>
        </div>

      </div>
      <div className='timer'>
        <div>{hours}:{minutes>10?<>{minutes}</>:<>0{minutes}</>} {hours<12?<>AM</>:<>PM</>}</div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Message