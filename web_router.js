var express = require('express');
var router = express.Router();

var site = require('./controllers/site');
var sign = require('./controllers/sign');
//网站首页
router.get('/',site.index);

//用户注册页面
router.get('/signup',sign.showSignup);
//提交用户登陆信息
router.post('/signup',sign.signup);

//用户登陆页面
router.get('/signin',sign.showSignin);
//提交用户登陆信息
router.post('/signin',sign.signin);





module.exports = router;
