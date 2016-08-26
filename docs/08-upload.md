## Express中的文件上传

### [connect-busyboy](https://www.npmjs.com/package/connect-busboy)
#### 使用事例
```js
// 文件上传connect-busboy
var busboy = require('connect-busboy');
//....

app.use(busboy({
  limits: {
    fileSize: 10 * 1024 * 1024
  }
}));
```
**`lib/store.js`文件存储lib**
```js
var utility = require('utility');
var path    = require('path');
var fs      = require('fs');
var config = require('../config');

exports.upload = function (file, options, callback) {
  var filename = options.filename;

  var newFilename = utility.md5(filename + String((new Date()).getTime())) +
    path.extname(filename);

  var upload_path = config.upload.path;
  var base_url    = config.upload.url;
  var filePath    = path.join(upload_path, newFilename);
  var fileUrl     = base_url + newFilename;

  file.on('end', function () {
    callback(null, {
      url: fileUrl
    });
  });

  file.pipe(fs.createWriteStream(filePath));
};
```
#### req.busyboy的使用
```js
// 图片上传
exports.upload = function (req, res, next) {
  var isFileLimit = false;
  req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      file.on('limit', function () {
        isFileLimit = true;
        res.json({
          success: false,
          msg: '文件太大了. 最大大小为： ' + config.file_limit
        })
      });
      store.upload(file, {filename: filename}, function (err, result) {
        if (err) {
          return next(err);
        }
        if (isFileLimit) {
          return;
        }
        console.log(result.url);
        res.json({
          success: true,
          url: result.url,
          file_path:result.url,//simditor 渲染内容需要返回file_path
        });
      });
    });
  req.pipe(req.busboy);
};
```
