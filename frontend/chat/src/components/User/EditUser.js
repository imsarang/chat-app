import React, { useEffect, useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading'
import { CLICK_CONTACT, CLICK_CONTACT_INFO, CLICK_YOUR_PROFILE } from '../redux/clickReducer'
import '../styles/editUser.css'
import { storage } from '../firebase/firebase'
import { username } from '../redux/userReducer'
import { useNavigate } from 'react-router-dom'
const EditUser = ({ accessToken }) => {

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        status: '',
        profilePic: null,
        username: ''
    })

    const dispatch = useDispatch()
    const e_mail = useSelector(username)
    const navigate = useNavigate()

    const [load, setLoad] = useState(false)
    const [seconds, setSeconds] = useState()

    const handleInputs = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handlePic = async (e) => {
        // setLoad(true)
        const file = e.target.files[0]
        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        const fileUrl = await fileRef.getDownloadURL()

        setUser({ ...user, profilePic: fileUrl })

        // setLoad(false)

    }
    const handleUser = async () => {
        const result = await fetch(`/api/user/show/${e_mail}`)
        const ans = await result.json()

        setUser(ans.user[0])
    }
    useEffect(() => {
        handleUser()
    }, [])
    const handleTrash = async () => {
        const fileUrl = user.profilePic
        const fileRef = storage.refFromURL(fileUrl)
        await fileRef.delete()
        setUser({ ...user, profilePic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        // setLoad(true)

        const result = await fetch(`/api/user/edit/${user.email}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                status: user.status,
                pic: user.profilePic
            })
        })
        // setLoad(false)
        dispatch(CLICK_YOUR_PROFILE({ userProfile: false }))
        dispatch(CLICK_CONTACT({ contact: true }))
        dispatch(CLICK_CONTACT_INFO({ userInfo: false }))
        window.location.reload(false)
    }
    const handleDeleteFromFirebase = async (image) => {
        const fileUrl = image;
        const fileRef = storage.refFromURL(fileUrl)
        await fileRef.delete()
    }
    const handleDelete = async () => {
        const result = await fetch(`/api/user/delete`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            withCredentials: true
        })
        const ans = await result.json()
        if (ans.success) {
            handleDeleteFromFirebase(user.profilePic)
            navigate('/')
        }
    }
    if (load) return <Loading />
    return (
        <div className='edit'>
            <form onSubmit={handleSubmit}>
                <div className='edit-pic'>
                    <img id='profile-pic' src={user.profilePic} />
                </div>
                <div className='profile-add-del'>
                    <div id='profile-pic-div'>
                        <input type='file' accept='image/*' id='add-image' onChange={(e) => handlePic(e)} />
                    </div>
                    <div id='profile-pic-btns'>
                        <div id='add-pic-div'><label id='add-pic' htmlFor='add-image'><FaPlus /></label></div>
                        <div id='remove-pic-div' onClick={handleTrash}><label id='remove-pic'><FaTrash /></label></div>
                    </div>

                </div>

                <div className='edit-content'>
                    <div className='edit-div-label'>
                        <div className='edit-div-con'>Username</div>
                        <div className='edit-div-con'>Firstname</div>
                        <div className='edit-div-con'>Lastname</div>
                        <div className='edit-div-con'>Email</div>
                        <div className='edit-div-con'>Status</div>
                    </div>
                    <div className='edit-div-input'>
                        <div><input type='text' className='edit-div-in' name='username' value={user.username} onChange={(e) => handleInputs(e)} /></div>
                        <div><input type='text' className='edit-div-in' placeholder='Enter Firstname' name='firstname' value={user.firstname} onChange={(e) => handleInputs(e)} /></div>
                        <div><input type='text' className='edit-div-in' placeholder='Enter Lastname' name='lastname' value={user.lastname} onChange={(e) => handleInputs(e)} /></div>
                        <div className='edit-div-in-email' name='email'>{user.email}</div>
                        <div><input type='text' className='edit-div-in' placeholder='Status' name='status' value={user.status} onChange={(e) => handleInputs(e)} /></div>

                    </div>
                </div>
                <div className='save-edit'>
                    <button className='delete-btn' type='button' onClick={handleDelete}>Delete</button>
                    <button className='save-edit-btn' type='submit' onClick={handleSubmit}>
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditUser