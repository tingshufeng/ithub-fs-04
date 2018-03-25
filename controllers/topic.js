const topic = require('../models/topic')
const marked = require('marked')

const moment = require('moment')

exports.showCreate = (req,res,next) => {
	// res.send('get showCreate')
	topic.findAll((err,topics) => {
		if(err){
			return next(err)
		}
		res.render('topic/create.html',{
			topics
		})
	})
	
}


exports.create = (req,res,next) => {
	// res.send('post create')
	// 1、获取表单提交的数据
	// 2、数据验证
	// 3、操作数据库
	// 4、发送响应
	// const body = req.body
	const topicData = {
		...req.body,    
		createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
		userId: req.session.user.id
	}
	// console.log(topicData)
	// 获取到数据表需要的数据后，调用模型中的保存数据方法保存到数据库中
	topic.save(topicData,(err,result) => {
		if(err){
			return next(err)
		}
		res.status(200).json({
			code:0,
			message: 'success'
		})
	})
}

exports.showDetail = (req,res,next) => {
	// res.send('get showDetail')
	// 获取动态数据
	const {topicId} = req.params
	// console.log(topicId)
	topic.findById(topicId,(err,topic) => {
		if(err){
			return next(err)
		}

		// if(topic){
		// 	return topic.content = marked(topic.content)
		// }

		topic && (topic.content = marked(topic.content))

		res.render('topic/show.html',{
			topic
		})
	})
}

exports.showEdit = (req,res,next) => {
	res.send('get showEdit')
}

exports.edit = (req,res,next) => {
	res.send('post edit')
}

exports.delete = (req,res,next) => {
	res.send('post delete')
}