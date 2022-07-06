import React, { useEffect } from 'react'
import '../styles/info.css'
const SuccessInfo = ({text1,text2,seconds,setSeconds,setSuccessInfo}) => {
  
  useEffect(()=>{
    const timer = setInterval(() => {
      if(seconds>0)setSeconds(seconds-1)
      if(seconds==0){
        setSeconds(0)
        setSuccessInfo(false)
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