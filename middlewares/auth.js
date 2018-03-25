exports.checkLogin = (req,res,next) => {
	// 判断有没有登录状态
	if(!req.session.user){
		// 如果没有重定向到登录页面
		return res.redirect('/signin')
	}
	// 如果有，则匹配下一个中间件
	next()
}