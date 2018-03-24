// 0、引包
const mysql = require('mysql')

const {dbConfig} = require('../config')   //加载配置数据库信息模块

// 1、创建一个连接池
const pool = mysql.createPool(dbConfig)

// 2、封装一个操作数据库的方法
// ...args是将传递的参数展开
exports.query = (...args) => {
	const callback = args.pop()   //删除并获取最后一个参数回调函数
	// 从连接池中获取一个连接
	pool.getConnection((err, connection) =>{
		// 如果获取连接失败，则将错误抛给callback
		if(err){
			return callback(err)
		}
		// 如果成功，则操作数据库
		connection.query(...args,(...results) => {
			//释放连接
			connection.release()
			// if(err) {
			// 	return callback(err)
			// }
			// callback(results)
			// 在自定义回调函数中调用传入的callback，并将原query方法的callback参数传给自己调用时传递的callback参数
			// error,results,field
			callback(...results)
		})
	})
}

// exports.getPosts = callback => {
// 	query('SELECT * FROM `posts`',(err, results) =>{
// 		if(err){
// 			return callback(err)
// 		}
// 		callback(null,results)
// 	})
// }


// select 操作的结果是数组，没有结果也是空数组
// insert、update、delete操作的结果都是对象
	// affectedRows 受影响的行数
	// insertedID 插入数据自动增长的id
	// changedRows 执行更新操作所改变的行数


// exports.addPost = (post,callback) => {
// 	post.createdAt = null
// 	query('INSERT INTO `posts` SET ?',post,(err,results) => {
// 		if(err){
// 			return callback(err)
// 		}
// 		callback(null,results)
// 	})
// }
