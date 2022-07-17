const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Chat = require('../models/chatModel')
const User = require('../models/userModel')

exports.addChat = catchAsyncErrors(async (req, res) => {
    const { userID } = req.body

    if (!userID) res.status(401).json({
        success: false,
        message: 'USER NOT FOUND'
    })

    let verifyChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user[0]._id } } },
            { users: { $elemMatch: { $eq: userID } } }
        ]
    }).populate("users", "-password").populate("latestMessage")

    verifyChat = await User.populate(verifyChat, {
        path: "latestMessage.sender",
        select: "username firstname lastname profilePic email"
    })

    if (verifyChat.length > 0)
        res.status(200).json({
            success: true,
            verifyChat
        })
    else {
        const user = await User.findById(userID)
        const chatInfo = {
            chatName:'sender',
            isGroupChat: false,
            users: [req.user[0]._id, userID]
        }

        const chat = await Chat.create(chatInfo)

        const fullChat = await Chat.find({ _id: chat._id }).populate(
            "users", "-password"
        )

        res.status(200).json({
            fullChat
        })
    }
})

exports.getChat = catchAsyncErrors(async (req, res) => {

    const chat = await Chat.find({users:{$elemMatch:{$eq:req.user[0]._id}}})
    .populate("users","-password")
    .populate("groupAdmin","-password")
    .populate("latestMessage")
    .sort({updatedAt:-1})
    .populate({
        path:"latestMessage.sender",
        select:"username firstname lastname profilePic email"
    })
    if(chat)
    res.status(200).json({
        success:true,
        chat
    })
    else
    res.sendStatus(403) 

})

exports.createGroup = catchAsyncErrors(async (req, res) => {
    if(!req.body.chatName){
        return res.status(400).json({
            success:false,
            message:"Please fill all the fields"
        })
    }

    let users = req.body.users

    if(users.length<2){
        return res.status(400).json({
            success:false,
            message:"More than 2 users are required to form a group"
        })
    }

    users.push(req.user[0])
    if(!req.body.groupDP)
        req.body.groupDP = "https://icon-library.com/images/users-icon/users-icon-7.jpg"
    try{
        const groupChat = await Chat.create({
            chatName:req.body.chatName,
            users:users,
            isGroupChat:true,
            groupAdmin:req.user[0],
            groupDP:req.body.groupDP
        })

        const fullGroup = await Chat.find({
            _id:groupChat._id
        }).populate("users","-password")
        .populate("groupAdmin","-password")

        if(fullGroup) res.status(200).json({
            success:true,
            message:"Group Successfully Created",
            fullGroup
        })
    }catch(e){console.log(e);}
})

exports.renameGroup = catchAsyncErrors(async (req, res) => {
    let {groupId,groupName,groupDP} = req.body

    if(!groupDP) groupDP = "https://icon-library.com/images/users-icon/users-icon-7.jpg"
    const group = await Chat.findByIdAndUpdate({_id:groupId},{
        chatName:groupName,
        groupDP
    },{new:true})
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(group) res.status(200).json({
        success:true,
        group
    })
})

exports.removeUserFromGroup = catchAsyncErrors(async (req, res) => {
    const {groupId,userId} = req.body

    const group = await Chat.findByIdAndUpdate({_id:groupId},{
        $pull:{users:userId}
    },{new:true})
    .populate("users","-password").populate("groupAdmin","-password")

    if(group) res.status(200).json({
        success:true,
        group
    })
})
exports.addUserToGroup = catchAsyncErrors(async (req, res) => {
    const {groupId,userId} = req.body

    const group = await Chat.findByIdAndUpdate({
        _id:groupId
    },{
        $addToSet:{users:userId}
    },{new:true})
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(group) res.status(200).json({
        success:true,
        group
    })
})

exports.setGroupDp = catchAsyncErrors(async(req,res)=>{
    const {imageUrl,id} = req.body
    const group = await Chat.findByIdAndUpdate(id,{
        groupDP:imageUrl
    },{new:true})
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(group) return res.status(200).json({
        success:true,
        message:"Changes Updated",
        group
    })
})