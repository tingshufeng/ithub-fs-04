const topic = require('../models/topic')
const marked = require('marked')
const moment = require('moment')

// 展示话题表单
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

// 出来添加话题请求
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
			address: {
				redirect: `/topic/${result.insertId}`
			},
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

// 处理删除请求
exports.delete = (req,res,next) => {
	const {topicId} = req.params
	// console.log(topicId)
	// 根据当前的话题ID查询当前登录的用户ID
	topic.findById(topicId,(err,result) => {
		if(err){
			return next(err)    // 服务端错误
		}
		// 如果当前话题不存在
		if(!result){
			return res.status(200).json({
				code: 1,
				message: '对不起，该资源已不存在！'
			})
		}
		// 如果服务端没有错误并查到了当前话题 信息
		// 判断当前话题的用户id是不是当前登录用户的id
		if(result.userId !== req.session.user.id){
			return res.status(200).json({
				code: 2,
				message: '对不起，您没有权限删除该话题'
			})
		}
		// 删除话题
		topic.findByIdAndRemove(topicId,(err,results) => {
			if(err){
				return next(err)
			}
			return res.status(200).json({
				code: 0,
				message: 'success'
			})
		})
	})
	
}