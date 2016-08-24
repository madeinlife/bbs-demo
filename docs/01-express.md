# express 项目基本使用

## 基本使用

### 依赖库：
1. express
2. body-parser
3. cookie-parser
4. express-session
5. morgan
6. loadsh
7. mongoose
8. connect-redis
9. validator

### 简单用例
```javascript
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
//静态文件处理
app.use('/public',express.static(path.join(__dirname,'public')));
app.use('/',(req,res) => {res.send('Hello World!')});
app.listen(3000);
```

## 项目结构说明
### 文件布局说明：
- 目录`controllers`:控制器函数，路由中的各种函数统一放在controllers目录中；
- 目录`docs`：放置一些项目进行中，用到的基础知识；
- 目录`lib`：一些功能性插件；
- 目录`models`:数据模型
- 目录`public`:静态文件目录；
- 目录`views`：模板文件放在这里；
- 目录`middlewares`: 中间件目录
- 文件`web_router.js`:网站路由的总汇集处；
- 文件`app.js`：程序入口。


#### controllers
1. `site.js`；
2. `sign.js`:用户注册，登陆等处理函数。
    - `showSignin`: 显示登陆页面；
    - `signin`：post 登陆处理函数；
    - `showSignup`: 用户注册页面；
    - `signup`: post 提交注册信息处理函数；
3. `topic.js`:话题相关的控制函数
    - `showCreate`

#### middlewares
1. `auth.js`: 用户校验中间件
    - `requireLogin`:需要登陆才能next，发帖、回帖等需要校验。在web路由中第二个参数就可以调用；
2.
