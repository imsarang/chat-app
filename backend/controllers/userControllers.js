const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const { findOne } = require('../models/userModel')
const User = require('../models/userModel')
const Chat = require('../models/chatModel')
const RefreshToken = require('../models/refreshTokenModel')
const { generateToken } = require('../utils/generateToken')
const { generateRefreshToken } = require('../utils/refreshToken')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
exports.registerUser = catchAsyncErrors(async (req, res) => {
    let { firstname, lastname, username, email, password, profilePic, status } = req.body

    if (!email || !password) res.status(401).json({
        success: false,
        message: "Invalid Registration"
    })
    console.log(email);
    const userExist = await User.findOne({ email })
    if (userExist) res.status(403).json({
        success: false, message: "User already exists"
    })
    else {
        if (!profilePic) profilePic = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"

        const user = await User.create({
            username, firstname, lastname, email, password, profilePic, status
        })
        if (user) res.status(201).json({
            success: true,
            message: "User Registered",
            user,
            token: generateToken(user._id),
            pic: user.profilePic
        })
    }
})

exports.loginUser = catchAsyncErrors(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) return res.send({
        success: false,
        message: "User not found"
    })

    const result = await bcrypt.compare(password, user.password)

    if (result) {
        const accessToken = generateToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        const refToken = await RefreshToken.findOne({ user: user._id })

        if (!refToken) {
            const tokenRef = await RefreshToken.create({
                token: refreshToken,
                user: user.id
            })

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })
            res.status(201).json({
                success: true,
                message: "Login Successful",
                user,
                accessToken
            })
        }
        else {
            const tokenRef = await RefreshToken.updateOne({ $set: { token: refreshToken, user: user._id } })

            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })
            res.status(201).json({
                success: true,
                message: "Login Successful",
                user,
                accessToken
            })
        }


    }
    else return res.status(403).json({
        success: false,
        message: "Invalid Credentials"
    })
})

exports.logoutUser = catchAsyncErrors(async (req, res) => {
    const cookies = req.cookies
    if (!cookies.jwt) res.sendStatus(401)
    const refToken = cookies.jwt
    const token = await RefreshToken.findOne({
        token: refToken
    })
    if (!token) {
        res.clearCookie('jwt', { httpOnly: true })
        res.status(200).json({
            success: true,
            message: "USER LOGGED OUT"
        })
    }

    const foundUser = await User.findOne({
        _id: token.user
    })
    if (!foundUser) return res.sendStatus(403)

    const refreshToken = await RefreshToken.deleteOne({
        user: foundUser._id
    })

    res.clearCookie('jwt', { httpOnly: true })
    res.status(200).json({
        success: true,
        message: "LOGOUT SUCCESSFUL"
    })

})

exports.showUser = catchAsyncErrors(async (req, res) => {
    const user = await User.find({
        email: req.params.email
    })

    const token = req.cookies.jwt
    if (user) res.status(200).json({
        success: true,
        user,
        token
    })
    else res.status(404).json({
        success: false,
        message: "User not found"
    })
})

exports.editUser = catchAsyncErrors(async (req, res) => {

    const { username, firstname, lastname, pic, status, email } = req.body

    const user = await User.updateOne({
        email: req.params.email
    }, {
        $set: {
            username: username,
            firstname: firstname,
            lastname: lastname,
            profilePic: pic,
            status: status,
            email: email
        }
    })
    
    if (user) res.status(200).json({
        success: true,
        message: "User Profile Updated"
    })
})

exports.allUsers = catchAsyncErrors(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { username: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        } : {}

    const users = await User.find(keyword).find({ _id: { $ne: req.user[0]._id } })

    res.json({ users })
})


exports.showUsers = catchAsyncErrors(async (req, res) => {
    const user = await User.find()
    res.status(200).json({
        success: true,
        user
    })
})

exports.deleteUser = catchAsyncErrors(async (req, res) => {

    if (!req.user[0]._id) return res.sendStatus(401)

    const user = await User.findByIdAndDelete(req.user[0]._id)
    const chats = await Chat.deleteMany({
        users: { $elemMatch: { $eq: req.user[0]._id } }
    })
    if (chats) res.status(200).json({
        success: true,
        message: 'Account Deleted'
    })
    else res.status(400).json({
        success: false,
        message: 'Could Not Delete Account'
    })
    res.clearCookie('jwt', { httpOnly: true })
})