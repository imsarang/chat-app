import React, { useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { CLICK_CREATE_GROUP, SHOW_FAILURE, SHOW_SUCCESS } from '../redux/clickReducer'
import '../styles/createGroup.css'
import bg1 from "../images/madara-4.jpg"
const CreateGroup = ({ accessToken }) => {
    const dispatch = useDispatch()
    const [groupName, setGroup] = useState('')
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([{}])
    const [addUser,setAddUser] = useState([])
    const [savedUser,setSavedUser] = useState([])
    
    const handleCancel = () => {
        dispatch(CLICK_CREATE_GROUP({ group: false }))
    }
    const handleCreateGroup = async() => {
        const result = await fetch(`/api/chat/group/create`,{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${accessToken}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                chatName:groupName,
                users:addUser
            })
        })

        const ans = await result.json()
        if(!ans.success)
        dispatch(SHOW_FAILURE({
            result:true,
            msg : ans.message
        }))
        else
        {
            dispatch(SHOW_SUCCESS({
                result:true,
                msg:ans.message
            }))
            dispatch(CLICK_CREATE_GROUP({
                group:false
            }))
        }
    }
    const handleSearchClick = async () => {
        const result = await fetch(`/api/user/all/users?search=${search}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            withCredentials: true
        })
        const ans = await result.json()
        setUsers(ans.users)
    }
    const handleAddUser = (id,username)=>{
        // const data = JSON.stringify(id)
        let flag = 0;
        for(let i = 0;i<addUser.length;i++)
        {
            if(addUser[i] === id)
            {
                flag = 1
                break
            }
            else flag = 0
        }
        if(flag === 0)
        {
            setAddUser([...addUser,id])
            setSavedUser([...savedUser,{id:id,username:username}])
        }
    }
    const handleRemoveUser = (user)=>{
        console.log(user);
        console.log(savedUser);
        setSavedUser(savedUser.filter(item=>item.id!==user.id))
        setAddUser(addUser.filter(item=>item!==user.id))
    }
    return (
        <div className='create-bg'>
            <div className='create-main'>
                <div id='create-cancel'>
                    <FaPlus id='cancel-icon' onClick={handleCancel} />
                </div>
                <div className='create-con'>
                    <div className='input-con-1'>
                        <input
                            value={groupName}
                            onChange={(e) => setGroup(e.target.value)}
                            placeholder='Enter Group Name'
                            className='input-group-name' />
                    </div>
                    <div className='input-con-2'>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search User'
                            className='input-group-name' />
                        <div id='search-icon'><FaSearch onClick={handleSearchClick} /></div>
                    </div>
                    <div className='show-add'>
                    {
                        savedUser.map((user)=>{
                            return <div className='saved'>
                                <div id='user-name'>{user.username}</div>
                                <div id='cancel-user' onClick = {()=>handleRemoveUser(user)}><FaPlus id='cancelUser' /></div>
                            </div>
                        })
                    }
                    </div>
                    <div className='search-users'>
                        {
                            users.map((user) => {
                                
                                return <div className='search-user-1' onClick={()=>handleAddUser(user._id,user.username)}>
                                    <div className='search-pic'>
                                        <img src={user.profilePic} className='img-search-tag' />
                                    </div>
                                    <div className='search-username'>
                                        {user.username}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className='create-grp'>
                        <button
                            onClick={handleCreateGroup}
                            id='create-grp-btn'>Create New Group</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateGroup