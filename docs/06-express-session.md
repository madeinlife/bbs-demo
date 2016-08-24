# express中session的使用

## 使用事例：
```js
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
// 使用redis保存session
app.use(session({
    secret: 'secret balabala',
    store: RedisStore({
        port: 6079,
        host: '127.0.0.0'
    }),
    resave: false,// true or false
    saveUninitialized: false
}));
```
