const topic = require('../models/topic')

exports.checkEditAndRemove = (req,res,next) => {

	const {topicId} = req.params

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
				message: '对不起，您没有操作该话题的权限'
			})
		}

		next()
	})
}