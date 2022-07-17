const jwt = require('jsonwebtoken')
const RefreshToken = require('../models/refreshTokenModel')
const User = require('../models/userModel')
const { generateToken } = require('./generateToken')

exports.handleRefreshToken = async(req,res)=>{
    const cookies = req.cookies
    if(!cookies) return res.sendStatus(401)
    
    const refreshToken = cookies.jwt
    try{
        const refToken = await RefreshToken.find({
        token : refreshToken
    })
  
    const foundUser = await User.find({_id:refToken.user})
    if(!foundUser) res.sendStatus(403)

    const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET)
        
        if(foundUser._id != decoded._id) return res.sendStatus(401)
        const accessToken = generateToken(refToken.user)
        res.status(200).json({
            success:true,
            accessToken
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"User login required"
        })
    }
}