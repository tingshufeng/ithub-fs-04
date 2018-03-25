// 加载models中的用户模块
const user = require('../models/user')

const moment = require('moment')

const md5 = require('blueimp-md5')

// 展示登录表单
exports.showSignin = (req,res,next) => {
	// res.send('get showSignin')
	res.render('signin.html')
}

// 处理登录请求
exports.signin = (req,res,next) => {
	// res.send('post signin')
	// 接收表单提交的数据
	// 普通数据校验
	// 业务数据校验
	// 持久化存储用户信息
	// 发送响应
	const body = req.body
	// 校验用户是否存在
	user.findByEmail(body.email,(err,result) => {
		if(err){
			// return res.status(500).json({
			// 	err: err.message
			// })

			// 传参的 next 方法会自动向后匹配到具有 4 个参数的应用程序级别处理中间件
			return next(err)
		}

		if(!result) {   //如果用户不存在
			return res.status(200).json({
				code: 1,
				message: 'email not exists'
			})
		}

		// 校验密码(加密的用户输入的密码和数据库中的密码做比较)
		if(md5(body.password) !== result.password){
			// 如果输入的密码和数据库中的密码不相等
			return res.status(200).json({
				code: 2,
				message: 'password invaild'   //密码不正确
			})
		}

		// 持久化保存用户登录信息
		req.session.user = result  

		// 如果邮箱和密码都正确，则返回
		res.status(200).json({
			code: 0,
			message: 'success'
		})
	})
}

// 展示注册表单
exports.showSignup = (req,res,next) => {
	// res.send('get showSignup')
	res.render('signup.html')
}

// 处理注册请求
exports.signup = (req,res,next) => {
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
	user.findByEmail(body.email,(err,result) => {
		if(err) {
			// return res.status(500).json({
			// 	error: err.message  
			// 	// err 错误对象有一个message属性是具体的错误信息
			// })

			return next(err)
		}

		if(result) {
			return res.status(200).json({
				code: 1,
				message: 'email exists'
			})
		}

		// return res.status(200).json({
		// 	code: 0,
		// 	message: 'success'
		// })

		// 校验昵称   findByNichname
		user.findByNickname(body.nickname,(err,result) => {
			if(err) {
				// return res.status(500).json({
				// 	error: err.message  
				// 	// err 错误对象有一个message属性是具体的错误信息
				// })

				return next(err)
			}

			if(result) {
				return res.status(200).json({
					code: 2,
					message: 'nickname exists'
				})
			}

			// return res.status(200).json({
			// 	code: 0,
			// 	message: 'success'
			// })

			// 如果邮箱和昵称都没有被占用，就该保存数据了
			// 插入数据   save()

			body.password = md5(body.password)
			body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
			
			user.save(body,(err,result) => {
				if(err) {
					// return res.status(500).json({
					// 	error: err.message  
					// 	// err 错误对象有一个message属性是具体的错误信息
					// })

					return next(err)
				}

				// 持久化保存用户信息
				// 注册即登录(使用Session保存用户登录状态)
				// req.session.user = {
				// 	...body,
				// 	id: result.insertId    //注册的账号id就是注册成功后返回信息信息中的insertedId
				// }

				// console.log(req.session.user)
				res.status(200).json({
					code: 0,
					message: 'success'
				})
			})
		})
	})
}

exports.signout = (req,res,next) => {
	// res.send('post signout')

	// 清除session信息
	delete req.session.user

	// 重定向到登录页
	res.redirect('/signin')
}