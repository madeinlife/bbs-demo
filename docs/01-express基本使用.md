## express 项目基本使用
---
### 依赖库：
1. expree
2. body-parser
3. cookie-parser
4. express-session
5. morgan
6. loadsh



### 文件布局说明：
- 目录`controllers`:控制器函数，路由中的各种函数统一放在controllers目录中；
- 目录`docs`：放置一些项目进行中，用到的基础知识；
- 目录`lib`：一些功能性插件；
- 目录`models`:数据模型
- 目录`public`:静态文件目录；
- 目录`views`：模板文件放在这里；
- 文件`web_router.js`:网站路由的总汇集处；
- 文件`app.js`：程序入口。


#### controllers
1. `site.js`；
2. `sign.js`:用户注册，登陆等处理函数。
    - `showSignin`: 显示登陆页面；
    - `signin`：post 登陆处理函数；
    - `showSignup`: 用户注册页面；
    - `signup`: post 提交注册信息处理函数；
3. `user.js`:用户
