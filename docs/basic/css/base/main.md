# CSS

> 全称 层叠样式表 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

## CSS 简介

::: tip 简介
层叠样式表（Cascading Style Sheets，缩写为 CSS）是一种样式表语言，用来描述 HTML 或 XML（包括如 SVG、MathML 或 XHTML 之类的 XML 分支语言）文档的呈现.CSS 描述了在屏幕、纸质、音频等其他媒体上的元素应该如何被渲染的问题.
:::

# 更多的选择器

## 更多伪类选择器

1. first-child

选择第一个子元素

first-of-type，选中子元素中第一个指定类型的元素

2. last-child

3. nth-child

选中指定的第几个子元素

even：关键字，等同于 2n
odd: 关键字，等同于 2n+1

4. nth-of-type

选中指定的子元素中第几个某类型的元素

## 更多的伪元素选择器

1. first-letter

选中元素中的第一个字母

2. first-line

选中元素中第一行的文字

3. selection

选中被用户框选的文字

## @规则

at-rule: @规则、@语句、CSS 语句、CSS 指令

1. import

@import "路径";

导入另外一个 css 文件

2. charset

@charset "utf-8";

告诉浏览器该 CSS 文件，使用的字符编码集是 utf-8，必须写到第一行
