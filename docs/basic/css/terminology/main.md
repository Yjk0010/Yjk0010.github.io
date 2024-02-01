# 术语

## 选择器 `Selector`

> CSS 选择器用于指定 CSS 样式应该应用到哪些 HTML 元素上.以下是一些常用的 CSS 选择器及其示例：

- 元素选择器：通过 HTML 元素名称选取元素.

示例：选择所有段落元素.

```css
p {
  color: red;
}
```

- ID 选择器：通过元素的 ID 属性选取元素.

示例：选择 ID 为 "my-element" 的元素.

```css
#my-element {
  color: blue;
}
```

- 类选择器：通过元素的 class 属性选取元素.

示例：选择 class 为 "my-class" 的所有元素.

```css
.my-class {
  font-size: 16px;
}
```

- 后代选择器：选取某个元素的后代元素.

示例：选择所有 div 元素内部的 p 元素.

```css
div p {
  text-align: center;
}
```

- 属性选择器：根据元素的属性值来选取元素.

示例：选择所有含有 title 属性的元素.

```css
[title] {
  border: 1px solid black;
}
```

- 伪类选择器：根据元素的状态来选取元素.

示例：选择所有未被访问过的链接元素

```css
a:link {
  color: purple;
}
```

- 伪元素选择器：用于在元素的某个位置插入内容.

示例：a 元素前面加指向性箭头.

```css
a::before {
  content: "->";
}
```

## 盒子模型 `Box model`

> CSS 盒子模型（Box Model）指的是网页中的元素在页面上所呈现的盒子模型形状.这个盒子模型包含了元素的内容（content）、内边距（padding）、边框（border）和外边距（margin）四个部分，这些部分以层叠方式依次放置.

以下是一个简单的例子，展示了一个 div 元素的盒子模型组成部分：

```html
<div
  style="width: 200px; height: 100px; padding: 20px; border: 2px solid black; margin: 30px;"
>
  Hello, World!
</div>
```

在上述例子中，该 div 元素的内容为 "Hello, World!"，宽度为 200px，高度为 100px，内边距为 20px，边框为 2px 的黑色实线，外边距为 30px.

CSS 盒子模型在页面布局中发挥着重要的作用，通过设置不同的盒子模型属性，可以使网页中的元素产生不同的排列方式和视觉效果.

## 盒子尺寸 `Box sizing`

> 盒子尺寸 Box sizing 是 CSS 盒子模型的一个重要属性，用于控制盒子的尺寸如何计算.默认情况下，盒子尺寸的值为 content-box，表示盒子的尺寸只包括内容的宽度和高度，不包括内边距、边框和外边距.而如果将盒子尺寸设置为 border-box，则表示盒子的尺寸包括内容、内边距和边框的宽度，但不包括外边距.
>
> 使用 Box sizing 可以方便地控制盒子的大小和位置，避免了因为内边距、边框和外边距的影响而导致的布局问题.

以下是一个使用 Box sizing 属性的示例：

```css
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 1px solid #ccc;
}
```

在上述示例中，.box 类的盒子尺寸被设置为 border-box，宽度为 200px，内边距为 20px，边框宽度为 1px，这些属性都被包含在盒子的尺寸之内，因此最终的盒子大小为 200px 宽，40px 高（包括上下内边距），边框为 1px 宽，而外边距则不影响盒子大小.

## 浮动 `Float`

> 浮动是 CSS 中常用的一种布局方式，用于控制元素在页面中的位置.当一个元素设置了浮动之后，它会脱离文档流，然后向左或向右移动，直到遇到了父容器边界或者另一个浮动元素.因为浮动元素不在文档流中，所以其他元素的位置和大小不会受到它的影响.
>
> 浮动通常用于实现图文混排、多列布局、导航栏等，但是也容易引发一些问题，比如高度塌陷、清除浮动等.

以下是一个简单的例子，展示了如何使用 float 属性将两个 div 元素进行左右浮动：

```html
<div class="left">左侧内容</div>
<div class="right">右侧内容</div>
```

```css
.left {
  float: left;
  width: 50%;
}

.right {
  float: right;
  width: 50%;
}
```

在这个例子中，我们将两个 div 元素都设置了 50%的宽度，并分别向左和向右浮动.这样，它们就会排列在同一行，左侧元素占据页面的左半部分，右侧元素占据页面的右半部分.

## 清除浮动 `Clear float`

> 在 CSS 中，浮动（float）可以让元素在页面中左浮动或右浮动.但是浮动元素会脱离文档流，导致其父元素的高度塌陷，影响页面布局.为了解决这个问题，可以使用清除浮动（clear float）的技巧.
> 清除浮动可以通过在容器元素中设置 clear 属性来实现.

常见的清除浮动的方法有以下几种：

1. 额外标签法：在浮动元素的父容器内添加一个空标签，设置 clear: both，使其成为一个块级元素占满整行，从而清除浮动.

```html
<div class="parent">
  <div class="float-left"></div>
  <div class="float-left"></div>
  <div class="clear"></div>
</div>
```

```css
.clear {
  clear: both;
}
```

2. 父元素添加 overflow 属性法：在浮动元素的父容器内添加 overflow: hidden 或 overflow: auto，使其成为一个 BFC（块级格式上下文），从而清除浮动.

```html
<div class="parent">
  <div class="float-left"></div>
  <div class="float-left"></div>
</div>
```

```css
.parent {
  overflow: hidden;
}
```

3. 使用 :after 伪元素法：在浮动元素的父容器内添加 :after 伪元素，设置 content 属性为空字符串，display 属性为 block，clear 属性为 both，使其成为一个块级元素占满整行，从而清除浮动.

```html
<div class="parent">
  <div class="float-left"></div>
  <div class="float-left"></div>
</div>
```

```css
.parent:after {
  content: "";
  display: block;
  clear: both;
}
```

::: tip
需要注意的是，清除浮动会增加额外的 HTML 元素或 CSS 属性，需要根据实际情况进行选择和权衡.
:::

## 层叠 `Cascading`

> 层叠（Cascading）是 CSS 的一个重要特性，指的是当多个选择器对同一个元素设置相同的属性时，这些属性如何被应用的规则.

- 层叠机制分为以下三个部分：
  1. 优先级（Specificity）：确定哪个选择器具有更高的优先级，以决定最终应用哪个样式.
  2. 派生（Inheritance）：某些属性值是继承的，即子元素会从父元素继承一些属性，如字体大小、颜色等.
  3. 权重（Weight）：某些属性值可以通过权重来控制其应用顺序，如 !important 标记.
- 具体来说，优先级（Specificity）是通过计算选择器中各个选择器的权重（ID 选择器 > 类选择器 > 元素选择器）得出的，权重越高的选择器样式会覆盖权重较低的选择器的样式.

```html
<style>
  #myId {
    color: blue;
  }
  .myClass {
    color: red;
  }
  div {
    color: green;
  }
</style>

<div id="myId" class="myClass">Hello, world!</div>
```

上面的代码中，三个选择器都设置了 color 属性，但是 #myId 的权重最高，因此 Hello, world! 文字会显示为蓝色.

如果你想要查看某个元素具体应用了哪些 CSS 属性，可以在浏览器中使用开发者工具来查看其计算样式.

## 响应式设计 `Responsive design`

> 响应式设计是指网站或应用程序能够根据不同的设备（如桌面、平板电脑、手机）自动调整其布局和样式，以便在各种不同的屏幕尺寸上提供最佳的用户体验.响应式设计通常使用媒体查询、弹性布局、图像和媒体资源的自适应等技术来实现.例如，在较小的屏幕上，页面可能会将元素的大小和间距缩小，以使它们适合较小的屏幕.此外，响应式设计还可以确保页面的内容在各种设备上都能够良好地显示和导航，不会因为显示区域较小而导致用户无法正确查看和交互.

## 继承

> 子元素会继承父元素的某些 CSS 属性
>
> 通常，跟文字内容相关的属性都能被继承

## 高度坍塌

高度坍塌的根源：常规流盒子的自动高度，在计算时，不会考虑浮动盒子

清除浮动，涉及 css 属性：clear

- 默认值：none
- left：清除左浮动，该元素必须出现在前面所有左浮动盒子的下方
- right：清除右浮动，该元素必须出现在前面所有右浮动盒子的下方
- both：清除左右浮动，该元素必须出现在前面所有浮动盒子的下方
