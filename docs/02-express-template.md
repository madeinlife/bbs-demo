## express 模板引擎的使用

### 1 使用[hbs](https://github.com/donpark/hbs)
#### 基本使用
```
// 设置模版引擎
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
**设置partials**
hbs.registerPartials(path.join(__dirname,'views/partials'));
```

### 2 使用: [express-handlebars](https://github.com/ericf/express-handlebars)
#### 基本使用
`注意：`模板文件的后最名需要和`engine`的名字相同,`hbs`,`html`,`handlebars`等
```javascript
//先引入express-handlebars
var exphdb = require('express-handlebars');
// **注意：模板文件的后最名需要和engine的名字相同**
app.engine('hbs', exphbs({
  layoutsDir: __dirname + '/views',
  defaultLayout: 'layout',
  extname: '.hbs',
  partialsDir:[
      __dirname + '/views/partials/'
  ],
  //当在模板文件中需要引入静态文件时候需要用到static函数。
  helpers:{
      static:function(name){
          return require('./lib/static.js').map(name);
      }
  }
}));
app.set('views',__dirname + '/views');
app.set('view engine', 'hbs');
```
**template引入静态文件`lib/static.js`**
```js
var baseUrl = '';
exports.map= function(name){
    return baseUrl + name;
}
```
**使用静态文件**
`layout.hbs`
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>title</title>
    <link href="{{static '/css/bootstrap.min.css' }}" rel="stylesheet">
  <link href="{{static '/css/main.css'}}" rel="stylesheet">
  </head>
  <body>
    {{> header}}
    {{{body}}}
    {{>footer}}
    </body>
</html>
```

**如果在渲染模板的时候，不想使用默认的layout：**
```js
res.render('index',{layout: false});
```
