var EventProxy = require('eventproxy');
var User = require('../models/user');
//sign up 用户注册页面处理函数
exports.showSignup = (req,res) => {
    res.render('sign/signup');
}

//signup 用户注册Post提交 处理函数
exports.signup = (req,res) => {
    // 1：获取post提交过来的数据
    var username = req.body.loginname;
    var pass = req.body.pass;
    var re_pass = req.body.re_pass;
    var email = req.body.email;
    var ep = new EventProxy();

    ep.on('info_error',function(msg){
        res.status(422);
        res.render('sign/signup',{error: msg});
    })
    // console.log([username, pass, re_pass, email]);
    // 2：校验数据，一般是在前台就检验一次；
    // 2-1：校验是否有空值
    var hasEmptyInfo = [username, pass, re_pass, email].some(function(item){
        return item === '';
    });
    // 2-2：校验pass和re_pass是否相同
    var isPassDiff = pass !== re_pass;
    if(hasEmptyInfo || isPassDiff){
        ep.emit('info_error','注册信息错误');
        return ;
    };
    // 3：保存到数据库中
    // 3-1：判断用户名或者邮箱是否被占用
    User.getUserBySignupInfo(username,email,function(err,users){
        if(err){
            ep.emit('info_error','获取用户数据信息出错');
            return;
        }
        if(users.length > 0){
            ep.emit('info_error','用户名或者邮箱被占用');
            return;
        }else{
            User.addUser({name: username,pass: pass,email: email}, function(err,data){
                if(data){
                    res.render('sign/signup',{sucess: '恭喜你，注册成功！'})
                }else{
                    ep.emit('info_error','注册失败！')
                }
            });
        }
    });
}

//signin 用户登陆页面
exports.showSignin = (req,res) => {
    res.render('sign/signin');
}
//sigin 用户登陆提交信息函数
exports.signin = (req,res) => {
    console.log(req.body);
    // 1. 接收post登陆 提交过来的信息
    var username = req.body.loginname;
    var pass = req.body.pass;
    // var ep = new EventProxy();

    // 2. 判断信息是否完整
    console.log(username,pass);
    if( !username || !pass){
        console.log('用户名或者密码为空！');
        res.render('sign/signin',{error: '填入的信息不完整，请重新输入！'});
        return ;
    };

    // 3. 获取用户
    User.getUser(username, pass, function(err,user){
        if(err){
            res.render('sign/signin','获取用户信息出错！')
        }else{
            if(user){
                req.session.user = user;
                // res.render('sign/signin',{sucess: '登陆成功！'});
                // app.locals.current_user 只能在模版中用，这里无current_user值的。
                // 由于session中的current_user中间件要get请求一次后，才能赋值。
                // 这里要手动赋值下current_user
                res.render('sign/signin',{sucess: '登陆成功！',current_user: 'true'});
            }else{
                res.status(422);
                res.render('sign/signin',{error: '用户名或者密码错误！'});
            }
        }
    });

};

// 账号登出
exports.signout = function(req,res){
    req.session.destroy();
    res.redirect('/');
}
