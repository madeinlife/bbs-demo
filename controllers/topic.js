// 话题 方面的控制函数
var validator = require('validator');
var TopicModel = require('../models/topic');

// 创建话题: get
exports.showTopicCreate = function(req,res){
    res.render('topic/create');
    // res.render('topic/create',{error: '发帖失败咯!'});
    // res.render('topic/create',{error: '发帖失败咯!',sucess: '发帖成功咯!'});
};

// 创建话题：post,  处理post过来的话题信息
exports.topicCreate = function(req, res){
    // 1 获取post过来的信息
    var title = req.body.title;
    var tab = req.body.tab;
    var content = req.body.t_content;

    // 2. 对数据进行校验
    var hasEmptyInfo = [title,tab, content].some(function(item) {
        return item === '';
    });
    if(hasEmptyInfo){
        res.status(422);
        res.render('topic/create',{error: '您填写的信息不完整'});
        return;
    }
    var topicData = {
        tab: tab,
        title: title,
        content: content,
        author_id: req.session.user._id,
        create_at: Date.now()
    };
    console.log(topicData);
    TopicModel.addTopic(topicData, function(err,data){
        res.render('topic/create', {sucess: '创建话题《' + title + '》成功:'});
    })

};
