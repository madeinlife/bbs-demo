// 用户登陆校验中间件

exports.requireLogin = function(req, res, next){
	if(req.session.user){
		return next();
	}
	res.status(422);
	res.redirect('/signin');
}
