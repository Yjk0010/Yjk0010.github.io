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

<span class="cor-tip">主色绿</span>

```markdown
<span class="cor-tip">主色绿</span>
```

<span class="cor-da">来个红</span>

```markdown
<span class="cor-da">来个红</span>
```

<span class="cor-wa">淡淡的黄</span>

```markdown
<span class="cor-wa">淡淡的黄</span>
```

<span class="cor-in">男人深沉灰</span>

```markdown
<span class="cor-in">男人深沉灰</span>
```

## 徽章

### Badge<Badge type="info">badge</Badge>

```markdown
Badge<Badge type="info">badge</Badge>
```

### Badge<Badge type="tip">badge</Badge>

```markdown
Badge<Badge type="tip">badge</Badge>
```

### Badge<Badge type="warning">badge</Badge>

```markdown
Badge<Badge type="warning">badge</Badge>
```

### Badge<Badge type="danger">badge</Badge>

```markdown
Badge<Badge type="danger">badge</Badge>
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

::: info 提示
123456
:::

```markdown
::: info 提示
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

## 流程图

<flowchart :chart="
`
start=>start: 开始
e=>end: 结束
op1=>operation: 操作1
op2=>operation: 操作2
cond=>condition: 条件1
c2=>condition: 条件2
io=>inputoutput: 输入输出
para=>parallel: 并行
start->op1->cond
cond(no)->para
cond(yes, right)->c2
c2(true, top)->io
c2(false)->e
para(path2, right)->op2->e
`"></flowchart>
