# 书写

## 认识注释

注释：提供给代码阅读者使用，不会参与执行

- 单行注释 **//**

```JavaScript
// 单行注释
```

- 多行注释 **/\* \*/**

```JavaScript
/* 多
   行
   注
   释
***/
```

## 书写规范

> JavaScript 的书写规范包括语言规范和代码风格两个方面。

## 语言规范

<span class="cor-tip">推荐</span> 严格模式 "use strict"

<span class="cor-da">避免</span> 将 `JavaScript` 嵌入到 `HTML` 中, <span class="cor-tip">推荐</span> 将 `JavaScript` 代码放在外部文件中，

<span class="cor-da">避免</span> 使用 `全局变量` , <span class="cor-tip">推荐</span> 使用 _var, let 或 const_ 关键字声明变量，

<span class="cor-da">避免</span> 使用 `eval()` 方法

<span class="cor-da">避免</span> 在 `循环中创建新对象`

<span class="cor-da">避免</span> 使用 `with` 语句

<span class="cor-da">避免</span> `== 和 !=` <span class="cor-tip">推荐</span> 使用 _=== 和 !==_

<span class="cor-da">避免</span> `在条件语句中进行赋值`操作

<span class="cor-da">避免</span> 使用 `不必要的分号`。

## 代码风格

<span class="cor-tip">推荐</span> 使用 `驼峰命名法` 来命名 _变量、函数、对象_ 等

<span class="cor-tip">推荐</span> 使用一个 **Tab** 缩进代码，而不是**空格**

<span class="cor-tip">推荐</span> 将**左大括号**放在代码块的 _同一行_，<span class="cor-da">而不是</span> _新开一行_

<span class="cor-tip">推荐</span> 使用`单引号`或`双引号`来表示字符串，**保持一致性**

<span class="cor-tip">推荐</span> 将`逗号`放在行末，而不是行首

<span class="cor-tip">推荐</span> 使用**分号**来**结束语句**

<span class="cor-tip">推荐</span> 对于条件语句和循环语句，使用**花括号**来明确代码块的 _开始和结束_

<span class="cor-da">避免</span> 行尾空格

<span class="cor-tip">尽可能</span> 注释代码，让其易于**阅读和理解**。

> 以上是一些常用的 JavaScript 书写规范，可以帮助开发者编写出更加规范、易于维护的代码。
