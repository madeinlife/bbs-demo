# 富文本选择器的

## simditor的使用
### 参考文档
1. [官网](http://simditor.tower.im/)
2.

### 使用事例
```html
<link rel="stylesheet" type="text/css" href="/public/libs/simditor/styles/simditor.css" />
<script type="text/javascript" src="/public/libs/simditor/scripts/jquery.min.js"></script>
<script type="text/javascript" src="/public/libs/simditor/scripts/module.js"></script>
<script type="text/javascript" src="/public/libs/simditor/scripts/hotkeys.js"></script>
<script type="text/javascript" src="/public/libs/simditor/scripts/uploader.js"></script>
<script type="text/javascript" src="/public/libs/simditor/scripts/simditor.js"></script>
<!-- 使用simditor富文本编辑器 -->
<script>
    $(function(){
        var toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', '|', 'indent', 'outdent'];
        var toolbar_all = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment'];
        var mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];
        var editor = new Simditor({
              textarea: $('#editor'),
              toolbar: toolbar,
              placeholder: '',
            //   upload: true,
              //optional options
              defaultImage:'',
              pasteImage: true,

            });

    });
</script>
```

```html
(function() {
  $(function() {
    var $preview, editor, mobileToolbar, toolbar;
    Simditor.locale = 'en-US';
    toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment'];
    mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];
    if (mobilecheck()) {
      toolbar = mobileToolbar;
    }
    editor = new Simditor({
      textarea: $('#txt-content'),
      placeholder: '这里输入文字...',
      toolbar: toolbar,
      pasteImage: true,
      <!-- defaultImage: 'assets/images/image.png', -->
      defaultImage: '',
      upload: location.search === '?upload' ? {
        url: '/upload'
      } : false
    });
    $preview = $('#preview');
    if ($preview.length > 0) {
      return editor.on('valuechanged', function(e) {
        return $preview.html(editor.getValue());
      });
    }
  });

}).call(this);

```
