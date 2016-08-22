# scss 基本使用

## 编译
`scss --watch style.scss:style.css`
> 把sytle.scss 编译成style.css. --watch参数是：观察到scss文件修改就重新编译一次。

## 变量
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

## 嵌套(Nesting)
> sass的嵌套包括两种：一种是选择器的嵌套；另一种是属性的嵌套。我们一般说起或用到的都是选择器的嵌套。

### 选择器嵌套
所谓选择器嵌套指的是在一个选择器中嵌套另一个选择器来实现继承，从而增强了sass文件的结构性和可读性。
在选择器嵌套中，可以使用&表示父元素选择器
