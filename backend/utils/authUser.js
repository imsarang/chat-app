const jwt = require('jsonwebtoken')
const User = require("../models/userModel")
const RefreshToken = require('../models/refreshTokenModel')

exports.authUser = async(req,res,next)=>{
    let token = req.headers['authorization']
    
    if(!token) return res.status(401)

    token = token.split(' ')[1]
    const refToken = req.cookies.jwt

    try{
        const user = await RefreshToken.find({token:refToken})
    
        const decoded = jwt.verify(refToken,process.env.JWT_REFRESH_SECRET)
        console.log(decoded);
        if(user)
        req.user = await User.find({_id:decoded.id}).select("-password")
        // console.log(req.user);
        next()
    }catch(e){
        return res.status(401).json({
            success:false,
            message:'User not logged IN!'
        })
        // throw new Error("User not authorized")
    }
}