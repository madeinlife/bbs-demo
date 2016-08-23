# mongoose在express中的使用

eg：`users.js`
```js
var mongoose = require('mongoose');
//在app.js中链接上数据库：
//`mongoose.connect("mongodb://127.0.0.1:27017/bbs_demo");`
var UserSchema = new mongoose.Schema({
    name: {type: String},
    loginname: {type: String},
    pass: {type: String},
    email: {type: String},

});
//创建user模型
var User = mongoose.model('User',UserSchema);
module.exports = User;
```
## 基本使用


### schema
#### schema types
- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array

#### statics
> 给模型添加静态的方法

```js
// assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function(name, callback) {
  return this.find({ name: new RegExp(name, 'i') }, callback);
};

var Animal = mongoose.model('Animal', animalSchema);
Animal.findByName('fido', function(err, animals) {
  console.log(animals);
});
```

#### virtual
> 假如一个`Person`的模型，`name`中有`first`,`last`两个字段。在使用中我们需要全名，这时候就可以用到virtual。
`eg`：
```js
var personSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    }
});
//用virtual链接两个字段
personSchema.virtual("name.full").get(function(){
    return this.name.first + " " + this.name.last;
});
// 创建Person模型；
var Person = mongoose.model("Person", personSchema);
//使用
var p1 = new Person({
    name:{first:"Sundy",last:"Smith"}
});
console.log(p1.name.full); //Sundy Smith;
```
