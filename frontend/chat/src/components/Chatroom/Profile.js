import React from 'react'
import { FaArrowLeft, FaCaretSquareLeft, FaLongArrowAltLeft } from 'react-icons/fa'
import bg1 from '../images/madara-4.jpg'
import '../styles/profile.css'

const Profile = ({ image, name, status, firstname, lastname, email, setShow }) => {
    return (
        <div className='profile-main'>
            <div className='profile-back' onClick={() => setShow(false)}>
                <FaArrowLeft />
            </div>
            <div className='profile-image'>
                {
                    image ? <img src={image} id='profile-img-tag' /> : <img src={bg1} id='profile-img-tag' />
                }
            </div>
            <div className='profile-content'>
                <div className='profile-con-1'>
                    <div className='profile-con'>
                        <label className='profile-label'>Username :</label>
                        <label className='profile-value'>{name}</label>
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

export default Profile