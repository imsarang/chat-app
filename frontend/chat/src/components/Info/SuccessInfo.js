import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SHOW_SUCCESS } from '../redux/clickReducer'
import '../styles/info.css'
const SuccessInfo = ({text1,text2}) => {
  
  const [seconds,setSeconds] = useState(3)
  const dispatch = useDispatch()

  useEffect(()=>{
    const timer = setInterval(() => {
      if(seconds>0)setSeconds(seconds-1)
      if(seconds==0){
        setSeconds(0)
        dispatch(SHOW_SUCCESS({
          result:false,
          msg:null
        }))
      }
    }, 1000);
    return ()=>clearInterval(timer)
  },[seconds])
  return (
    <div className='success'>
      <div id='success-1'>{text1}</div>
      <div id='success-2'>{text2}</div>
    </div>
  )
}

export default SuccessInfo