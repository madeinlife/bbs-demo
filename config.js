var path = require('path');

var config = {
    //网站logo 用绝对路径，如果用相对路径，多级页面会出错。
    site_logo: '/public/images/nodejs_light.svg',
    // session 密匙
    session_secret: '@#ljsdflsajflsdfj$JLJdfj%%jjdklf',
    // 储存session的redis db 信息
    redis_db: {
        prot: 6379, //默认的redis端口
        host: '127.0.0.1',
        db: 'bbs_demo',
        pass: ''
    }
};

module.exports = config;
