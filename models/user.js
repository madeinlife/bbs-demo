var mongoose = require('mongoose');

// 创建UserSchema
var UserSchema = new mongoose.Schema({
    name: {type: String},
    loginname: {type: String},
    pass: {type: String},
    email: {type: String},

})
// 添加 创建用户的方法
UserSchema.statics.addUser = function(user,callback){
    this.create(user,callback);
}

// 添加 根据signup info 获取用户的方法
UserSchema.statics.getUserBySignupInfo = function( name,email,callback){
    // 查询条件：cond
    var  cond = {
        '$or':[{ name: name},{email: email}]
    };
    this.find(cond, callback);
}

// 根据登陆信息获取User
UserSchema.statics.getUser = function( name, pass, callback){
    this.findOne({ name:  name, pass: pass}, callback);
}

//创建user模型
var User = mongoose.model('User',UserSchema);
// 导出模型User
module.exports = User;
