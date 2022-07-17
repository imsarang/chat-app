const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    chatName:{
        type:String,
        trim:true
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    groupDP:{
        type:String,
        default:"https://icon-library.com/images/users-icon/users-icon-7.jpg"
    }
},{
    timestamps:true
})


module.exports = mongoose.model("Chat",chatSchema)