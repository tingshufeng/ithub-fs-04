const express = require('express')

const app = express()

// 加载路由模块
const router = require('./router')

// 配置模板引擎
// 配置解析表单请求体
// 挂载路由容器到 app 应用程序中使用生效
app.use(router)

app.listen(3000,() => {
	console.log('running......')
})