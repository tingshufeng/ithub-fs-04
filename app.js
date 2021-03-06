const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const responseTime = require('response-time')
const compression = require('compression')
const { checkLogin } = require('./middlewares/auth')
const { dbConfig } = require('./config')

const sessionStore = new MySQLStore(dbConfig);

const app = express()

// 压缩所有响应
app.use(compression())


// 加载路由模块
// const router = require('./router')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const topicRouter = require('./routes/topic')
// const commentRouter = require('./routes/comment')

// 配置响应时间
app.use(responseTime())     

// 配置模板引擎 
app.engine('html',require('express-art-template'))

// 配置bodyParser表单解析体
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 开放静态资源
app.use('/node_modules',express.static('./node_modules/'))
app.use('/public',express.static('./public/'))


// 该插件会为 req 请求对象添加一个成员：req.session 默认是一个对象
// 这是最简单的配置方式，暂且先不用关心里面参数的含义
app.use(session({    //服务器重启 session 不会丢失
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'itcast',
  store: sessionStore,
  // 配置cookie的过期时间在3天后(关闭浏览器session数据不会丢失)
  cookie: {
  	maxAge: 1000 * 60 * 60 * 24 * 3
  },

  resave: false,
  saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

// 模板引擎中可以访问到app.locals中的成员，不需要向模板中传递
// 该中间件一定要写在配置 Session 中间件之后，路由之前
// 因为在 Session 之后才可以访问到 req.session 这个对象
// 在路由之前就要携带 Session 信息
app.use((req,res,next) => {
	app.locals.user = req.session.user
	next()
})

// 配置解析表单请求体
// 挂载路由容器到 app 应用程序中使用生效
// app.use(router)
app.use(indexRouter)
app.use(userRouter)
app.use('/topic',checkLogin,topicRouter)
// app.use(commentRouter)


//错误处理中间件
// 他需要显示的接收 4 个参数
// err 错误对象
// req 请求对象
// res 响应对象
// next 下一个中间件
app.use((err,req,res,next) => {
	console.error(err.stack)
	res.status(500).send({
		error: err.message
	})
})

// 当前面所有的中间件这都匹配不上时就进入该中间件
app.use((req,res,next) => {
	res.render('404.html')
})

app.listen(3000,() => {
	console.log('running.....')
})