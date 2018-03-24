// 加载models中的用户模块
const user = require('../models/user')

exports.showSignin = (req,res) => {
	// res.send('get showSignin')
	res.render('signin.html')
}
exports.signin = (req,res) => {
	res.send('post signin')
}
exports.showSignup = (req,res) => {
	// res.send('get showSignup')
	res.render('signup.html')
}

exports.signup = (req,res) => {
	// res.send('post signup')
	// res.status(200).json({"foo":"bar","name":"jack"})
	// console.log(req.body)
	// 1、接收表单提交的数据
	// 	  配置body-parser中间件解析表单请求体
	// 2、验证数据的有效性
		  // 普通数据校验
		  // 业务数据校验
	// 3、验证通过，持久化保存到数据表中
	// 4、发送响应
	const body = req.body

	// 校验邮箱   findByEmail
	user.findByEmail(body.email,(err,user) => {
		if(err) {
			return res.status(500).json({
				error: err.message  
				// err 错误对象有一个message属性是具体的错误信息
			})
		}

		if(user) {
			return res.status(200).json({
				code: 1,
				message: '邮箱被占用'
			})
		}

		return res.status(200).json({
			code: 0,
			message: '注册成功！'
		})
	})
	// 校验昵称   findByNichname
	// 插入数据   save()

}
exports.signout = (req,res) => {
	res.send('post signout')
}