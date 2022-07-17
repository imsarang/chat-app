import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/clickReducer'

    const RefreshHook = async() => {
        const logCheck = useSelector(logout)
        
            console.log(logCheck);
            const refToken = await fetch(`/api/user/refresh/token`,{
                method:"GET",
                withCredentials:true
              })
              const token = await refToken.json()
              return token
        
        
      }



export default RefreshHook