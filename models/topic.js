const {query} = require('../utilities/db-helper')


exports.findById = (id,callback) => {
	const sqlStr = 'SELECT * FROM `topics` WHERE `id` = ?'
	query(sqlStr,[id],(err,results) => {
		if(err){
			return callback(err)
		}
		callback(null,results[0])
	})
}

exports.findByIdAndUpdate = (id,topic,callback) => {
	const sqlStr = 'UPDATE `topics` SET `title` = ?,`content` = ?,`categoryId` = ? WHERE `id` = ?'
	query(sqlStr,[topic.title,topic.content,topic.categoryId,id],callback)
}

exports.findByIdAndRemove = (id,callback) => {
	const sqlStr = 'DELETE FROM `topics` WHERE `id` = ?'
	query(sqlStr,[id],callback)
}

exports.save = (topic,callback) => {
	const sqlStr = 'INSERT INTO `topics` SET ?'
	query(sqlStr,topic,callback)
}