const express = require('express')

const router = express.Router()

const indexController = require('./controllers/index')
const userController = require('./controllers/user')
const topicController = require('./controllers/topic')
const commentController = require('./controllers/comment')

// 首页相关
router
	.get('/',indexController.showIndex)

// 用户相关
router
	.get('/signin',userController.showSignin)
	.post('/signin',userController.signin)
	.get('/signup',userController.showSignup)
	.post('/signup',userController.signup)
	.get('/signout',userController.signout)

// 话题相关
router
	.get('/topic/create',topicController.showCreate)
	.post('/topic/create',topicController.create)
	.get('/topic/:topicId',topicController.showDetail)
	.get('/topic/:topicId/edit',topicController.showEdit)
	.post('/topic/:topicId/edit',topicController.edit)
	.post('/topic/:topicId/delete',topicController.delete)

// 导出路由模块
module.exports = router