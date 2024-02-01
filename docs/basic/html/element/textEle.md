# 文本元素

HTML5 中支持的元素: HTML5 元素周期表

## h 标题

> 标题: head

```html
<h1>1级标题</h1>
<h2>2级标题</h2>
<h3>3级标题</h3>
<h4>4级标题</h4>
<h5>5级标题</h5>
<h6>6级标题</h6>
```

h1~h6: 表示 1 级标题~6 级标题

## p 段落

> 段落: paragraphs

```html
<p>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste nihil maiores
  libero laudantium vitae aperiam, alias eos quos! Incidunt, optio! Architecto,
  repellat non cupiditate impedit eaque sequi ducimus corrupti tempore.
</p>
```

::: tip 提示
vscode 快捷输入  
lorem，乱数假文，没有任何实际含义的文字
:::

## span 无语义

> 没有语义，仅用于设置样式

三原色包含：<span style="color:red">红</span>、<span style="color:green">绿</span>、<span style="color:blue">蓝</span>

```html
三原色包含：<span style="color:red">红</span>、
<span style="color:green">绿</span>、 <span style="color:blue">蓝</span>
```

## pre 预格式化

预格式化文本元素

> 空白折叠: <br>
> 在源代码中的连续空白字符（空格、换行、制表）在页面显示时，会被折叠为一个空格

```html
代码展示不出来效果 就当看到了哈
```

### 例外

在 pre 元素中的内容不会出现空白折叠 在 pre
元素内部出现的内容，会按照源代码格式显示到页面上.
该元素通常用于在网页中显示一些代码. pre 元素功能的本质: 它有一个默认的 css 属性

> 显示代码时，通常外面套 code 元素，code 表示代码区域.
