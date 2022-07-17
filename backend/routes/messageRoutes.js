const express = require('express')
const { sendMessage, fetchMessage } = require('../controllers/messageControllers')
const { authUser } = require('../utils/authUser')
const router = express.Router()

router.route('/').post(authUser,sendMessage)
router.route('/fetch/:chatID').get(authUser,fetchMessage)
module.exports = router