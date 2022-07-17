import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SHOW_FAILURE } from '../redux/clickReducer'
import '../styles/info.css'

const FailureInfo = ({text1,text2}) => {
  const dispatch = useDispatch()
  const [seconds,setSeconds] = useState(3)

  useEffect(()=>{
    const timer = setInterval(()=>{
      if(seconds>0)setSeconds(seconds-1)
      if(seconds==0)
      {
        setSeconds(0)
        dispatch(SHOW_FAILURE({
          result:false,
          msg:null
        }))
      }
      return ()=>clearInterval(timer)
    },1000)
  },[seconds])
  return (
    <div className='failure'>
      <div id='failure-1'>{text1}</div>
      <div id='failure-2'>{text2}</div>
    </div>
  )
}

export default FailureInfo