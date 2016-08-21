var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var hbs = require('hbs');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var logger = require('morgan');

var app = express();
// var routers = require('./routes/index');
// var userRouter = require('./routes/users');
var webRouter = require('./web_router');

// 设置模版引擎 hbs模块版本
/*
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
hbs.registerPartials(path.join(__dirname,'views/partials'));
*/

//设置模板引擎 express-handlebars
app.engine('html',exphbs({
    layoutsDir: path.join(__dirname,'views'),
    // layoutsDir: __dirname + '/views',
    defaultLayout: 'layout',
    //注意：模板文件的后最名需要和engine的名字相同
    extname:'.html',//也可以是hbs、handlebars等
    partialsDir: [
        path.join(__dirname,'views/partials')
        // __dirname + '/views/partials'
    ],
    //静态文件引用
    helpers : {
        static: function(name) {
            return require('./lib/static').map(name);
        }
    }
}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');

// 设置loger信息，这样方便在终端查看日志信息
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

//mongoose 链接数据库
mongoose.connect("mongodb://127.0.0.1:27017/bbs_demo");
// 使用路由
app.use('/',webRouter);
// app.use('/',routers);
// app.use('/user',userRouter)

// 捕获404错误
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.set('env','developent');


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//启动服务
app.listen(3001,function(){
    console.log('http://localhost:3001/');
})
