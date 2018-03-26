const topic = require('../models/topic')
const topicCategory = require('../models/topic-category')

exports.showIndex = (req,res,next) => {
	// res.send('get index')
		// try{
		// 	JSON.parse('cejrifjerin')
		// 	res.render('index.html',{
		// 	user: req.session.user
		// 	})
		// }catch(err){
		// 	next(err)
		// }

		// req.query  获取动态字符串
		// req.params 获取动态路径参数
		// req.body   获取表单请求体

		let {categoryId} = req.query
		categoryId = parseInt(categoryId)
		// console.log(categoryId)
		// 查询出所有的分类id
		// 如果没有当前话题分类
		if(!categoryId){
			// 先查出所有的话题分类 
			topicCategory.findAll((err,topicCategories) => {
				if(err){
					return next(err)
				}
				// 查询所有话题分类的所有话题
				topic.findAll((err,topics) => {
					if(err){
						return next(err)
					}
					res.render('index.html',{
						topics,
						topicCategories,
						categoryId
					})
				})
			})
		}else{
			// 如果该分类存在，就查询出所有的分类
			topicCategory.findAll((err,topicCategories) => {
				if(err){
					return next(err)
				}
				// 根据查询出的id再去查询该分类的所有话题
				topic.findByCategoryId(categoryId,(err,topics) => {
					if(err){
						return next(err)
					}
					res.render('index.html',{
						topics,
						topicCategories,
						categoryId
					})
				})
			})
		}
		
}