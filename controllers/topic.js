// 话题 方面的控制函数
var validator = require('validator');
var TopicModel = require('../models/topic');
var EventProxy = require('eventproxy');

var store = require('../lib/store.js');

// 显示话题列表页面
exports.showTopicList = function(req,res){
    // TopicModel.getList();
    TopicModel.find({},{},{sort:{create_at:-1}},function(error,topics){
        res.render('topic/list',{topics: topics});
    });

}
// 显示话题详情页
exports.showDetail = function(req,res){
    // 1. 先取到文章的id
    var topicId = req.params.tid;

    var ep = new EventProxy();
    ep.on('topic_data_ok',function(topic){
        res.render('topic/detail',{topic: topic});
    });
    TopicModel.getTopic(topicId,function(error,topic){
        if(error){
            res.status(404);
            return;
        }
        if(topic){
            ep.emit('topic_data_ok',topic);
        }
    });
}

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

// 图片上传
exports.upload = function (req, res, next) {
  var isFileLimit = false;
  req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      file.on('limit', function () {
        isFileLimit = true;
        res.json({
          success: false,
          msg: 'File size too large. Max is ' + config.file_limit
        })
      });
      store.upload(file, {filename: filename}, function (err, result) {
        if (err) {
          return next(err);
        }
        if (isFileLimit) {
          return;
        }
        console.log(result.url);
        res.json({
          success: true,
          url: result.url,
          file_path:result.url,
        });
      });
    });
  req.pipe(req.busboy);
};
