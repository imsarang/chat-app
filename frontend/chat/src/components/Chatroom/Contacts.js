import React, { useEffect, useState } from 'react'
import ProfileHeader from './ProfileHeader'
import { userArray } from '../trial'
import ContactIdvl from './ContactIdvl'
import '../styles/chatroom.css'
import bg1 from '../images/madara-4.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { searching } from '../redux/clickReducer'
import { CHAT_USER, contacts, username } from '../redux/userReducer'
import NoUser from '../Info/NoUser'
import { FaPlus } from 'react-icons/fa'
import Loading from '../Loading'
const Contacts = ({ accessToken }) => {

    const search = useSelector(searching)
    const users = useSelector(contacts)
    const [chats, setChats] = useState([])
    const [image, setImage] = useState([])
    const e_mail = useSelector(username)
    const [load,setLoad] = useState(true)

    const dispatch = useDispatch()
    useEffect(() => {
        showChatsFromDatabase()
    },[])

    const showChatsFromDatabase = async () => {
        setLoad(true)
        const result = await fetch(`/api/chat/show`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true
        })
        const userChat = await result.json()
        // console.log(userChat);
        if (userChat.success) 
        {
            setChats(userChat.chat)
        }
        setLoad(false)
    }
    const handleCreateNew = async (id) => {
        setLoad(true)
        const result = await fetch(`/api/chat/add`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userID: id
            }),
            withCredentials: true
        })
        const ans = await result.json()
        ans.verifyChat ? dispatch(CHAT_USER({
            chatUser: ans.verifyChat[0]
        })) : dispatch(CHAT_USER({
            chatUser: ans.fullChat[0]
        }))
        setLoad(false)
    }
    const handleChatUser = (item) => {
        setLoad(true)
        dispatch(CHAT_USER({
            chatUser: item
        }))
        setLoad(false)
    }
    if(load) return <Loading/>
    return (
        <div className='contact-main'>
            <div className='contact-profile'><ProfileHeader accessToken={accessToken} /></div>
            {
                search ? <div className='contact-list'>
                    {
                        users.length>0?
                        users.map((user) => {
                            
                                return <div className='contact-div' >
                                    <ContactIdvl user={user.username} 
                                    image={user.profilePic} 
                                    icon={<FaPlus id='cancel-search-icon'/>}
                                    id={user._id}
                                    handleCreateNew = {handleCreateNew}/>
                                </div>
                           
                        })
                        :<NoUser/>
                        // <NoUser/>
                    }
                </div>

                    : <div className='contact-list'>
                        {
                            chats.map((item) => {
                                return <div className='contact-div' onClick={() => handleChatUser(item)}>
                                    <ContactIdvl user={item.chatName} 
                                    image={item.groupDP} />
                                </div>
                            })
                            
                        }
                    </div>
            }
        </div>
    )
}

export default Contacts