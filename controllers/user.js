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
	res.send('post signup')
}
exports.signout = (req,res) => {
	res.send('post signout')
}