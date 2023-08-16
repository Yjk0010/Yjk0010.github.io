# a 元素

> 超链接
> <a href="https://image.baidu.com/search/index?tn=baiduimage&word=%E7%BE%8E%E5%A5%B3"
> target="_blank">点一下看美女</a>

```html
<a
  href="https://image.baidu.com/search/index?tn=baiduimage&word=%E7%BE%8E%E5%A5%B3"
  id="123"
  target="_blank"
>
  点一下看美女
</a>
```

## href 属性

> 全称 hyper reference
>
> > 通常表示跳转地址

- 普通链接

  1. 值里面写了<span class="cor-tip">协议名称</span>`http` 或者 `https` 那无所谓
  2. 如果没写 当前网站是什么协议 访问出去就是什么协议
  3. `http` 和 `https` 是不能相互访问的 一般网站都是通过 `nginx` 之类的配置实现的 <span class="cor-in">均可访问</span>

- 锚链接

```html
<a href="#chapter1">章节1</a>
<a href="#chapter2">章节2</a>

<h2 id="chapter1">章节1</h2>
<h2 id="chapter2">章节2</h2>
```

- 就是在 `Url` 后置上面添加 `#chapter1` 页面就主动滚动到 `id` 是 `chapter1` 的位置了
- 右侧导航栏展示当前效果

## id 属性

> 全局属性，表示元素在文档中的唯一编号

## target 属性

> 表示跳转窗口位置。

target 的取值：

- `_self` 在当前页面窗口中打开，默认值
- `_blank` 在新窗口中打开

## 功能链接

> 点击后，触发某个功能

<a href="javascript:alert('你好！')"> 弹出：你好！ </a>

<a href="mailto:yanjinke2008@gmail.com"> 点击给我发送邮件 </a>

<a href="tel:13601834080"> 点击给我拨打电话 </a>

```html
<a href="javascript:alert('你好！')"> 弹出：你好！ </a>

<a href="mailto:yanjinke2008@gmail.com"> 点击给我发送邮件 </a>

<a href="tel:13601834080"> 点击给我拨打电话 </a>
```

- <span class="cor-in">执行 JS 代码</span> `javascript:`
- <span class="cor-in">发送邮件</span> `mailto:`
  要求用户计算机上安装有邮件发送软件
- <span class="cor-in">拨号</span> `tel:`
  要求用户计算机上安装有拨号软件，或使用的是移动端访问
