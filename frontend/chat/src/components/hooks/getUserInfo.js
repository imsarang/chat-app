import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { username } from '../redux/userReducer'
import refreshHook from './refreshHook'

const GetUserInfo = async() => {
    const dispatch = useDispatch()
    const e_mail = useSelector(username)
    const [user,setUser] = useState()

    const result = await fetch(`/api/user/show/${e_mail}`,{
        method:"GET"
    })
    const ans = await result.json()
    return ans.user
}

export default GetUserInfo