const express = require('express')
const { registerUser, loginUser, logoutUser, showUser, editUser, allUsers, showUsers, deleteUser, getAddUser } = require('../controllers/userControllers')
const { authUser } = require('../utils/authUser')
const { handleRefreshToken } = require('../utils/handleRefreshToken')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/show/:email').get(showUser)
router.route('/edit/:email').put(authUser,editUser)
router.route('/refresh/token').get(handleRefreshToken)

router.route('/all/users').get(authUser,allUsers)
router.route('/show').get(showUsers)
router.route('/delete').delete(authUser,deleteUser)

module.exports = router