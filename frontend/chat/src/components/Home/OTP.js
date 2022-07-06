import React, { useEffect, useState } from 'react'
import '../styles/signup.css'
const OTP = ({seconds,setSeconds}) => {
    
    useEffect(()=>{
        const timer = setInterval(()=>{
            if(seconds>0) setSeconds(seconds-1)
            if(seconds === 0) setSeconds(0)
        },1000)
        return ()=>clearInterval(timer) 
    },[seconds])
}

export default OTP