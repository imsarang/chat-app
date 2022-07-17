const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Message = require('../models/messageModel')
const User = require('../models/userModel')
const Chat = require('../models/chatModel')

exports.sendMessage = catchAsyncErrors(async(req,res)=>{
    const {content,chatID} = req.body

    if(!content || !chatID) return res.status(401).json({
        success:false,
        message:"Invalid Data"
    })

    let newMessage = {
        sender: req.user[0]._id,
        content:content,
        chat:chatID
    }

    try{
        let message = await Message.create(newMessage)
        message = await message.populate("sender","name profilePic")
        message = await message.populate("chat")
        message = await User.populate(message,{
            path:'chat.users',
            select:'name profilePic email username'
        })

        await Chat.findByIdAndUpdate(chatID,{
            latestMessage:message
        })

        return res.status(200).json({
            success:true,
            message
        })
    }catch(e){
        return res.sendStatus(400)
    }
})

exports.fetchMessage = catchAsyncErrors(async(req,res)=>{

    const message = await Message.find({chat:req.params.chatID})
    .populate("sender","name profilePic email username")
    .populate("chat")
    if(message) return res.status(200).json({
        success:true,
        message:"Success",
        message
    })
    else return res.status(400).json({
        success:false,
        message:"Error in fetching data"
    })
})