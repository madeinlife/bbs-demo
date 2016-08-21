/*
 express-hanlebars模板引擎使用静态文件的时候需要用到这个map函数
*/
var baseUrl = '';
exports.map= function(name){
    return baseUrl + name;
}
