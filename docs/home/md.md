# markdown 语法

## 标题

```markdown
# 标题 1
```

```markdown
## 标题 2
```

```markdown
### 标题 3
```

## 引用

> 引用 1
>
> > 引用 2

```markdown
> 引用 1
>
> > 引用 1
```

## type Text

<TText>默认色</TText>

```html
<TText>默认色</TText>
```

<TText type="success">成功色</TText>

```html
<TText type="success">成功色</TText>
```

<TText type="danger">异常色</TText>

```html
<TText type="danger">异常色</TText>
```

<TText type="warning">告警色</TText>

```html
<TText type="warning">告警色</TText>
```

<TText type="info">提示色</TText>

```html
<TText type="info">提示色</TText>
```

## 徽章


### info<Badge type="info">badge</Badge>

```html
info<Badge type="info">badge</Badge>
```

### tip<Badge type="tip">badge</Badge>

```html
tip<Badge type="tip">badge</Badge>
```

### warning<Badge type="warning">badge</Badge>

```html
warning<Badge type="warning">badge</Badge>
```

### danger<Badge type="danger">badge</Badge>

```html
danger<Badge type="danger">badge</Badge>
```

## 加粗

不加粗 **加粗**

```markdown
**加粗**
```

## 斜体

不斜体 _斜体_

```markdown
_斜体_
```

## 框框

::: tip 提示
123456
:::

```markdown
::: tip 提示
123456
:::
```

::: warning 警告
123456
:::

```markdown
::: warning 警告
123456
:::
```

::: danger 错误
123456
:::

```markdown
::: danger 错误
123456
:::
```

::: info 提示
123456
:::

```markdown
::: info 提示
123456
:::
```

::: details 折叠面板

```javascript
var a = 1;
```

:::

````markdown
::: details 折叠面板

```javascript
var a = 1;
```

:::
````

## 分割线

---

```markdown
---
```

## 图片

![logo](/logo.png "这是头像")

```markdown
![logo](/logo.png "这是头像")
```

## 图片组件展示

> 具有查看，放大缩小，拖拽等功能

<PicViewer title="这是头像" src="/logo.png" alt=""/>

```html
<PicViewer title="这是头像" src="/logo.png" alt=""></PicViewer>
```

## 超链接

[github](https://github.com/Yjk0010)

```markdown
[github](https://github.com/Yjk0010)
```

## 无序列表

- 列表 1
  - 子列表
    - 孙列表
- 列表 2

```markdown
- 列表 1
  - 子列表
    - 孙列表
- 列表 2
```

## 有序列表

1. 列表 1
   1. 子列表
      1. 孙列表
1. 列表 2

```markdown
1. 列表 1
   1. 子列表
      1. 孙列表
1. 列表 2
```

## 表格
 
| 浏览器        |       公司        |           内核 |
| ------------- | :---------------: | -------------: |
| 左对齐        |     中间对齐      |         右对齐 |
| QQ浏览器      |       腾讯        | Trident、Blink |
| 360安全浏览器 |      奇虎360      | Trident、Blink |
| 搜狗浏览器    |       搜狗        | Trident、Blink |
| UC浏览器      | UCWeb（阿里巴巴） |         U2内核 |


```markdown
| 浏览器        |       公司        |           内核 |
| ------------- | :---------------: | -------------: |
| 左对齐        |     中间对齐      |         右对齐 |
| QQ浏览器      |       腾讯        | Trident、Blink |
| 360安全浏览器 |      奇虎360      | Trident、Blink |
| 搜狗浏览器    |       搜狗        | Trident、Blink |
| UC浏览器      | UCWeb（阿里巴巴） |         U2内核 |
```

## 代码

这里是`代码内容`代码

```markdown
`代码内容`
```

## 代码块

```javascript
var a = 15;
```

````markdown
```javascript
var a = 15;
```
````

## 代码组

::: code-group

```sh [npm]
$ npm add -D vitepress
```

```sh [pnpm]
$ pnpm add -D vitepress
```

```sh [yarn]
$ yarn add -D vitepress
```

:::

## 代码块中的高亮行

```javascript{1,3-5}
var a = 1;
var a = 2;
var a = 3;
var a = 4;
var a = 5;
var a = 6;
```

````markdown
```javascript{1,3-5}
var a = 1;
var a = 2;
var a = 3;
var a = 4;
var a = 5;
var a = 6;
```
````

## 代码块中的特殊行

```javascript
var a = 10; // [!code hl]
var a = 11;
var a = 12; // [!code hl:2]
var a = 13;
var a = 14; // [!code ++]
var a = 15; // [!code --]
var a = 16; // [!code focus]
var a = 17; // [!code error]
var a = 18; // [!code warning]
```

````markdown
```javascript
var a = 10; // [!code  hl]
var a = 11;
var a = 12; // [!code  hl:2]
var a = 13;
var a = 14; // [!code  ++]
var a = 15; // [!code  --]
var a = 16; // [!code  focus]
var a = 17; // [!code  error]
var a = 18; // [!code  warning]
```
````

> // [!code xxx:lines] 代码高亮语法

- xxx **取值有**
  - `hl` 高亮
  - `++` 表示添加
  - `--` 表示减少
  - `focus` 表述聚焦
  - `error` 表述错误
  - `warning` 表示警告
- lines **表示往下应用的行数**
- `code` 和 `xxx` 中间只能有一个空格才有效

## 表情符号

:tada: :100:

```markdown
:tada: :100:
```

多数[表情符号](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)地址.

## 输出目录

> 这边就不出输出了 右侧有导航栏

```markdown
[[toc]]
```
