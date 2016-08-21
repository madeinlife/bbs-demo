var mongoose = require('mongoose');




var UserSchema = new mongoose.Schema({
    name: {type: String},
    loginname: {type: String},
    pass: {type: String},
    email: {type: String},

})

var User = mongoose.model('User',UserSchema);
module.exports = User;
