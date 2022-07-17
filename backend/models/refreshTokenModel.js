const mongoose = require('mongoose')

const refreshTokenSchema = new mongoose.Schema({
    token:{type:String},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model("RefreshToken",refreshTokenSchema)