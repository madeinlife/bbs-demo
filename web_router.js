var express = require('express');
var router = express.Router();

var site = require('./controllers/site');
var sign = require('./controllers/sign');
// 话题相关控制器
var topic = require('./controllers/topic');
// 导入auth中间件
var auth = require('./middlewares/auth');

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
// 用户登出
router.get('/signout', sign.signout);

// 话题：显示发表话题page
router.get('/topic/create',auth.requireLogin,topic.showTopicCreate);
// 话题：post发表话题,
router.post('/topic/create',topic.topicCreate);

// 显示话题 列表页面
router.get('/topic/list',topic.showTopicList);

// http://localhost:3001/topic/57beefce861ceef44421fd56
// 显示话题详情页面
router.get('/topic/:tid',topic.showDetail);
// 图片上传
router.post('/upload',topic.upload);
module.exports = router;
