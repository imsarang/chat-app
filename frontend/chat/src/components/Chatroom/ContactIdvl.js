import React from 'react'
import '../styles/contactIdvl.css'

const ContactIdvl = ({user,image}) => {
  return (
    <div className='contact-idvl-main'>
        <div className='contact-idvl-image'>
            {
                image?<div className='image-div'>
                    <img src={image} className='idvl-image-tag'/>
                </div>:<div></div>
            }
        </div>
        <div className='contact-idvl-username'>
              {user}  
        </div>
    </div>
  )
}

export default ContactIdvl