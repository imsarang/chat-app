const express = require('express')
const { addChat, getChat, createGroup, renameGroup, removeUserFromGroup, addUserToGroup, setGroupDp } = require('../controllers/chatControllers')
const { authUser } = require('../utils/authUser')
const router = express.Router()

router.route('/add').post(authUser,addChat)
router.route('/show').get(authUser,getChat)
router.route('/group/create').post(authUser,createGroup)
router.route('/group/rename').put(authUser,renameGroup)
router.route('/group/remove/user').put(authUser,removeUserFromGroup)
router.route('/group/add/user').put(authUser,addUserToGroup)
router.route('/group/addDp').put(authUser,setGroupDp)

module.exports = router