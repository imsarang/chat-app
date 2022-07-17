const jwt = require('jsonwebtoken')

exports.generateRefreshToken =(id)=>{
    return jwt.sign({id},process.env.JWT_REFRESH_SECRET,{
        expiresIn:'1h'
    })
}