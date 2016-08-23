# scss 基本使用

## 基本使用

### 安装
1. mac下使用homebrew：`brew install sass`;
2. sass是用ruby写的，可以用ruby的gem安装：`gem install sass`;
	- 列出gem安装的程序：`gem list`;
	- 如果是多版本sass，删除某个版本：`gem uninstal sass --version=3.4.20`
### 后缀名sass,scss
1. 两种后缀名，使用两种语法格式，一般使用`.scss`;
2. `.scss`跟css语法基本一致，有`{}`;
3. `.sass`，语法格式用到缩进，类似python、ruby的缩进对齐等,无`{}`;
4. `.scss`转成`.sass`文件：`sass-convert main.scss main.sass`;
5. 以underscore`_`开头的文件为局部文件。

### 编译
1. 单文件编译：`sass style.scss style.css`;
2. 单文件监听命令：`sass --watch style.scss:style.css`;
3. 文件夹监听： `sass sassFileDir:cssFileDir`;
4. 不同语法文件转换：`sass-convert style.scss style.sass; sass-covert style.css style.scss`;
> 把sytle.scss 编译成style.css. --watch参数是：观察到scss文件修改就重新编译一次。

### 注释
1. `//`双斜杠的注释，在编译的文件中看不到;
2. `/**/`在编译的文件中可以看到；
`scss 代码:`
```scss
//这个注释看不到
/*
这个注释看的到
*/
.test {
	margin: 10px;
	padding: 10px;
	border: 1px solid #555;
}
```
`//css 代码:`
```css
@charset "UTF-8";
/*
这个注释看的到
*/
.test {
  margin: 10px;
  padding: 10px;
  border: 1px solid #555; }
```

### 变量
定义变量格式：`$name:value;`
```sass
$gray1: #e1e1e1;
$gray2: #f6f6f6;
$fontsize1: 13px;
body{
    background-color: $gray1;
    font-size: $fontsize1;
}

```

### 嵌套(Nesting)
> sass的嵌套包括两种：一种是选择器的嵌套；另一种是属性的嵌套。我们一般说起或用到的都是选择器的嵌套。

#### 选择器嵌套
> 所谓选择器嵌套指的是在一个选择器中嵌套另一个选择器来实现继承，从而增强了sass文件的结构性和可读性。
在选择器嵌套中，可以使用`&`表示父元素选择器

```scss
.search-query{
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    background:#888 url('../images/search.png') no-repeat 4px 4px;
    padding: 3px 5px 3px 22px;
    color: #666;
    border: 0px;
    margin-top: 2px;
    &:hover {
        background-color: white;
        transition: all 0.5s;
    }
    &:focus, &.focused {
        background-color: white;
        // transition: all 0.5s;
    }

}
```
> `@at-root`可以跳出选择器的嵌套。

### 导入
1. sass的导入(@import)规则和CSS的有所不同，编译时会将@import的scss文件合并进来只生成一个CSS文件。
2. 如果导入css文件，如`@import 'reset.css'`，那效果跟普通`CSS`导入样式文件一样，导入的`css`文件不会合并到编译后的文件中，而是以@import方式存在。
3. 所有的sass导入文件都可以忽略后缀名.scss。
4. 如_mixin.scss。这种文件在导入的时候可以不写下划线，可写成@import "mixin"。

`@import 'base';`


### 混合
1. `sass`中使用`@mixin`声明混合，可以传递参数，参数名以`$`开始，多个以逗号分开，也可给参数设置默认值
2. 声明的`@mixin`通过`@include`来调用。

`sass style:`
```scss
@mixin col-6 {
    width: 50%;
    float: left;
}
.demo{
    @include col-6();
}
```
`css style`
```css
.demo{
    width: 50%;
    float: left;
}
```

### 继承（extend）
> 继承可以方便代码的维护。
eg:
```scss
.error {
    color: #f00;
}
.serious-error {
    @extend .error;
    border: 1px #f00;
}
```
