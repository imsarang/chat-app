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
const Contacts = ({ accessToken,chats }) => {

    const search = useSelector(searching)
    const users = useSelector(contacts)
    const [image, setImage] = useState([])
    const e_mail = useSelector(username)
    const [load, setLoad] = useState(false)

    const dispatch = useDispatch()
    

    
    const handleChatUser = (item) => {
        setLoad(true)
        dispatch(CHAT_USER({
            chatUser: item
        }))
        setLoad(false)
    }
    if (load) return <Loading />
    return (
        <div className='contact-main'>
            <div className='contact-profile'><ProfileHeader accessToken={accessToken} /></div>
            {
                search ? <div className='contact-list'>
                    {
                        users.length > 0 ?
                            users.map((user) => {

                                return <div className='contact-div' >
                                    <ContactIdvl user={user.username}
                                        image={user.profilePic}
                                        icon={<FaPlus id='cancel-search-icon' />}
                                        id={user._id}
                                        accessToken={accessToken}
                                        setLoad={setLoad}/>
                                </div>

                            })
                            : <NoUser />
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