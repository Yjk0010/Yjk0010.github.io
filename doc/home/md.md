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

## 颜色加粗

<span class="color-green">vite 绿</span>

```markdown
<span class="color-green">vite 绿</span>
```

<span class="color-red-light">不是太明艳的红</span>

```markdown
<span class="color-red-light">不是太明艳的红</span>
```

<span class="color-red-dark">浅浅的红</span>

```markdown
<span class="color-red-dark">浅浅的红</span>
```

<span class="color-yellow">淡淡的黄</span>

```markdown
<span class="color-yellow">淡淡的黄</span>
```

<span class="color-blue">男人魅力蓝</span>

```markdown
<span class="color-blue">男人魅力蓝</span>
```

## 加粗

不加粗**加粗**

```markdown
**加粗**
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

## 分割线

---

```markdown
---
```

## 图片

![logo](/assets/logo.png "这是头像")

```markdown
![logo](/assets/logo.png "这是头像")
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

| 姓名 | 技能 | 排行 |
| ---- | :--: | ---: |
| 刘备 |  哭  | 大哥 |
| 关羽 |  打  | 二哥 |
| 张飞 |  骂  | 三弟 |

```markdown
| 姓名 | 技能 | 排行 |
| ---- | :--: | ---: |
| 刘备 |  哭  | 大哥 |
| 关羽 |  打  | 二哥 |
| 张飞 |  骂  | 三弟 |
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

## 表情符号

:tada: :100:

```markdown
:tada: :100:
```

多数[表情符号](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)地址。

## 输出目录

> 这边就不出输出了 右侧有导航栏

```markdown
[[toc]]
```
