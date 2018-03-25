const express = require('express')

const router = express.Router()

const indexController = require('../controllers/index')

// 首页相关
router
	.get('/',indexController.showIndex)

// 导出路由模块
module.exports = router