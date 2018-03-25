const express = require('express')

const userController = require('../controllers/user')

const router = express.Router()

// 用户相关
router
	.get('/signin',userController.showSignin)
	.post('/signin',userController.signin)
	.get('/signup',userController.showSignup)
	.post('/signup',userController.signup)
	.get('/signout',userController.signout)


// 导出路由模块
module.exports = router