# HTML

## 什么是 HTML

### 全称: Hyper Text Markup Language

> 查询 **HTML** 最新消息 传送门 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML)

HTML 是 W3C 组织定义的语言标准：HTML 是用于描述<span class="color-info">页面结构</span>结构的语言。

## 网页基础模版

```html
<!DOCTYPE html>
<html lang="cmn-hans">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>这是俺的第一个网页</title>
  </head>
  <body>
    <!-- 超链接 -->
    <a href="https://github.com/Yjk0010" title="这是我的github">github</a>
  </body>
</html>
```

## 注释

> 注释为代码的阅读者提供帮助，注释不参与运行

在 HTML 中，注释使用如下格式书写：

```html
<!-- 超链接 -->
```

## 元素

> 其他叫法：标签、标记

- 整体：element （元素）

```html
<a href="https://github.com/Yjk0010" title="这是我的github">github</a>
```

- 元素 = 起始标记（begin tag） + 结束标记（end tag） + 元素内容 + 元素属性

- 属性 = 属性名 + 属性值

### 属性的分类：

- 局部属性：某些元素特有的属性
- 全局属性：所有元素通用

  有些元素没有结束标记，这样的元素叫做：<span class="color-info">空元素</span>

```html
<meta charset="UTF-8" />
```

空元素的两种写法：

1. `<meta charset="UTF-8">`
2. `<meta charset="UTF-8" />`

### 网站标题

```html
<title>Document</title>
```

## 元素的嵌套

元素不能相互嵌套

```html
<!-- 这样是不行的 -->
<h1><span></h1></span>
```

### 元素又分为

- 父元素
- 子元素
- 祖先元素
- 后代元素
- 兄弟元素（拥有同一个父元素的两个元素）

## 标准的文档结构

HTML： <span class="color-warn">\<!DOCTYPE <span class="color-error">html</span>
\></span>

文档声明，告诉浏览器，当前文档使用的 HTML 标准是 HTML5。

不写文档声明，将导致浏览器进入<span class="color-info">怪异渲染模式。</span>

### 根元素 - html

> 一个页面最多只能一个，并且该元素是所有其他元素的父元素或祖先元素。

> HTML5 版本中没有强制要求书写该元素

```html
<html></html>
```

### lang 属性

> language，全局属性，表示该元素内部使用的文字是使用哪一种自然语言书写而成的。  
> `cmn-hans` <span class="color-info">简体中文</span>

```html
<head lang="cmn-hans"> </head>
```

文档头，文档头内部的内容，不会显示到页面上。

文档的元数据：附加信息。

```html
<meta charset="UTF-8" />
```

charset：指定网页内容编码。

UTF-8 是 Unicode 编码的一个版本

### 网页标题

```html
<title>Document</title>
```

### 文档体

> 页面上所有要参与显示的元素，都应该放置到文档体中。

```html
<body></body>
```
