import React from 'react'
import { FaArrowLeft, FaCaretSquareLeft, FaLongArrowAltLeft } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import bg1 from '../images/madara-4.jpg'
import { CLICK_CONTACT, CLICK_CONTACT_INFO, CLICK_YOUR_PROFILE } from '../redux/clickReducer'
import '../styles/profile.css'

const ContactProfile = ({ image, username, status, firstname, lastname, email, setShow }) => {
    
    const dispatch = useDispatch()

    const handleBack = ()=>{
        dispatch(CLICK_CONTACT_INFO({userProfile:false}))
        dispatch(CLICK_CONTACT({contact:true}))
        dispatch(CLICK_YOUR_PROFILE({userProfile:false}))
    }
    return (
        <div className='profile-main'>
            <div className='profile-back' onClick={handleBack}>
                <FaArrowLeft />
            </div>
            <div className='profile-image'>
               <img src={image} id='profile-img-tag' /> 
            </div>
            <div className='profile-content'>
                <div className='profile-con-1'>
                    <div className='profile-con'>
                        <label className='profile-label'>Username :</label>
                        <label className='profile-value'>{username}</label>
                    </div>
                    <div className='profile-con'>
                        <label className='profile-label'>Status :</label>
                        <label className='profile-value'>{status}</label>
                    </div>
                    <div className='profile-con-flex'>
                        <div className='profile-con'>
                            <label className='profile-label'>Firsname :</label>
                            <label className='profile-value'>{firstname}</label>
                        </div>
                        <div className='profile-con'>
                            <label className='profile-label'>Lastname :</label>
                            <label className='profile-value'>{lastname}</label>
                        </div>
                    </div>

                    <div className='profile-con'>
                        <label className='profile-label'>Email :</label>
                        <label className='profile-value'>{email}</label>
                    </div>
                </div>

                <div className='profile-con-2'>
                    <div className='profile-block'>
                        <span id='profile-block-label'>Block User</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ContactProfile