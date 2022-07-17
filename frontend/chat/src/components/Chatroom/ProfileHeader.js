import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaBars, FaCaretLeft, FaFontAwesome, FaPlus, FaSearch, FaUser } from 'react-icons/fa'
import bg1 from '../images/madara-4.jpg'
import bg2 from '../images/bg-2.jpg'
import '../styles/profileHeader.css'
import { CLICK_CONTACT, CLICK_CONTACT_INFO, CLICK_CREATE_GROUP, CLICK_LOGOUT, CLICK_SEARCH, CLICK_YOUR_PROFILE, searching } from '../redux/clickReducer'

import { SEARCH_CONTACTS, username } from '../redux/userReducer'
import { useNavigate } from 'react-router-dom'

const ProfileHeader = ({ accessToken }) => {
    const [user, setUser] = useState({})
    const e_mail = useSelector(username)
    const [drop, setDrop] = useState(false)
    const [search, setSearch] = useState(false)
    const confirm = useSelector(searching)
    const [find, setFind] = useState('')
    const [users, setUsers] = useState([{}])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const showUser = async () => {
        const result = await fetch(`/api/user/show/${e_mail}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        const ans = await result.json()
        setUser(ans.user[0])
    }
    useEffect(() => {
        showUser()
    }, [user])

    const handleClickSearch = () => {
        setSearch(true)
        setDrop(!drop)
        dispatch(CLICK_SEARCH({ search: true }))

    }
    const handleDrop = () => {
        setDrop(!drop)
    }
    const handleSearchFromDatabase = async () => {
        const result = await fetch(`/api/user/all/users?search=${find}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        })
        const ans = await result.json()
        console.log(ans.users);
        setUsers(ans.users)
    }
    const handleSearch = (e) => {
        setFind(e.target.value)
        handleSearchFromDatabase()
    }
    const handleSearchClick = () => {
        // setUsers()
        dispatch(SEARCH_CONTACTS({
            contacts: users
        }))
    }
    const handleClickBack = ()=>{
        setSearch(false)
        setDrop(!drop)
        dispatch(CLICK_SEARCH({ search: false }))
        dispatch(CLICK_YOUR_PROFILE({ userProfile: true }))
    }
    const handleCreateGroup = ()=>{
        dispatch(CLICK_CREATE_GROUP({group:true}))
        setDrop(!drop)
    }
    const handleProfile = () => {
        setDrop(!drop)
        setSearch(false)
        dispatch(CLICK_SEARCH({ search: false }))
        dispatch(CLICK_YOUR_PROFILE({ userProfile: true }))
        dispatch(CLICK_CONTACT({ contact: false }))
        dispatch(CLICK_CONTACT_INFO({ userInfo: false }))
    }

    const handleLogout = async () => {
        const result = await fetch(`/api/user/logout`, {
            method: "GET",
            withCredentials: true
        })
        const ans = await result.json()
        if (ans.success) {
            dispatch(CLICK_LOGOUT({ logout: true }))
            navigate('/')
        }
    }

    const handleClearSearch = ()=>{
        setFind('')
        // setUsers([{}])
        // dispatch(CLICK_SEARCH({search:false}))
    }
    return (
        <div className='profile-header'>
            <div className='profile-header-1'>
                {
                    search ? <div style={{padding:'3% 0 0 0',width:'100%'}}>
                        <div className='search-input'>
                            <div className='search-icon-div'><FaSearch id='search-icon' onClick={handleSearchClick} /></div>
                            <input type='text' value={find} onChange={(e) => handleSearch(e)} className='find-user'
                                placeholder='Search User/Group' />
                            {
                                find!=''?<><FaPlus id='cancel-search' onClick={handleClearSearch}/></>:<></>
                            }
                        </div>
                    </div>
                        : <>
                            <div className='profile-head-1'>
                                <div className='pro-div'>
                                    <img src={user.profilePic} className='profile-head-image' />
                                </div>
                            </div>
                            <div className='profile-head-2'>
                                <div className='profile-header-name'>{user.username}</div>
                            </div></>

                }
            </div>
            <div className='profile-header-2'>
                <FaBars id='bars-icon' onClick={handleDrop} />
            </div>
            {
                drop ? <div className='drop-main'>
                    <div className='drop-down'>
                        {
                            confirm ? <div className='drop-con-1' onClick={handleClickBack}>
                                <div><FaCaretLeft /></div>
                                <div>Back</div>
                            </div>
                                :
                                <div className='drop-con-1' onClick={handleClickSearch}>
                                    <div><FaSearch /></div>
                                    <div>Search Users/Groups</div>
                                </div>

                        }

                        <div className='drop-con-2' onClick={handleCreateGroup}>
                            <div><FaPlus /></div>
                            <div>Create Group</div>
                        </div>
                        <div className='drop-con-3' onClick={handleProfile}>
                            <div><FaUser /></div>
                            <div>Profile</div>
                        </div>
                        <div className='drop-con-3' onClick={handleLogout}>
                            <div><FaUser /></div>
                            <div>Logout</div>
                        </div>

                    </div>
                </div> : <></>
            }
        </div>
    )
}

export default ProfileHeader