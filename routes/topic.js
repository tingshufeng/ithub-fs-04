const express = require('express')

const topicController = require('../controllers/topic')
const {checkEditAndRemove} = require('../middlewares/topic')

const router = express.Router()

// 话题相关
router
	.get('/create',topicController.showCreate)
	.post('/create',topicController.create)
	.get('/:topicId',topicController.showDetail)
	.get('/:topicId/edit',topicController.showEdit)
	.post('/:topicId/edit',checkEditAndRemove,topicController.edit)
	.post('/:topicId/delete',checkEditAndRemove,topicController.delete)

// 导出路由模块
module.exports = router