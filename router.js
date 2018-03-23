const express = require('express')

const router = express.Router()


router.get('/',(req,res) => {
	res.send('Hello World!')
})

router.get('/signin', (req,res) => {
	res.send('signin')
})

router.get('/signup', (req,res) => {
	res.send('signup')
})

router.get('/signout', (req,res) => {
	res.send('signout')
})

// 导出路由模块
module.exports = router