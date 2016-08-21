
//sign up 用户注册页面处理函数
exports.showSignup = (req,res) => {
    res.render('sign/signup');
}
//signup 用户注册Post提交 处理函数
exports.signup = (req,res) => {
    res.send({sucess:true});
}

//signin 用户登陆页面
exports.showSignin = (req,res) => {
    res.render('sign/signin');
}
//sigin 用户登陆提交信息函数
exports.signin = (req,res) => {
    res.send({sucess:true});
};
