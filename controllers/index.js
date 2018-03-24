exports.showIndex = (req,res) => {
	// res.send('get index')
	res.render('index.html',{
		user: req.session.user
	})
}