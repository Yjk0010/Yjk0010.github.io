# v-for 和 v-if 为啥不共存

## 就是 为啥不能共存

提到这个问题，很多人肯定会脱口而出：

- <TText type="warning">Vue2</TText> 中 不可以
- <TText type="success">Vue3</TText> 中 可以

再往深问，可能少部分人会回答出：

- <TText type="warning">Vue2</TText> 中 v-for 优先级比 v-if 高
- <TText type="success">Vue3</TText> 中 v-if 优先级比 v-for 高

> 其实很多人都是背的答案，让他们再具体讲一的话就讲不出来了。
>
> 所以我们，重新认识一下优先级。

## <TText type="warning">Vue2</TText>

### 举例

我就拿一个最简单的代码来说

```html
<div v-for="item in [1,2,3]" v-if="item !== 2"></div>
```

经过 compile 编译之后是这样的

```javascript
return _c(
  /* xxxxx */,
  _l([1, 2, 3], function (item) {
    return item !== 2 ? _c("div") : _e();
  }),
  0
);
```

> 看到这个代码之后首先要知道这里面使用的三个方法的含义

### <TText>\_c()方法</TText>

`_c` 方法是 Vue 2 编译之后用于创建 VNode（虚拟节点）的函数。

具体来说，`_c` 方法接收三个参数：

1. `tag`：要创建的元素的标签名或组件选项对象。
2. `data`：元素的属性、指令、事件等数据对象。
3. `children`：元素的子节点，可以是文本节点、其他 VNode、或者是嵌套的 VNode 数组。

### <TText>\_l()方法</TText>

`_l` 方法用于处理 `v-for` 指令，它的作用是生成列表元素。

具体来说，`_l` 方法会接收三个参数：

1. `arr`：要遍历的数组或对象。
2. `cb`：用于生成每个元素的回调函数。
3. `alias`：可选参数，用于指定每个元素的别名。

### <TText>\_e()方法</TText>

`_e` 方法用于处理空白或占位节点。

具体来说，`_e` 方法接收一个参数：

1. `text`：要显示的文本内容。

在上述代码中

可以看到在 Vue2 中，会 <TText type="success">先循环</TText>，然后在 <TText type="danger">循环中去判断</TText>，判断为 <TText type="danger">真</TText> 则正常渲染，判断为 <TText type="warning">假</TText> 则执行 `_e` 函数.

> 1. 先走 v-for 循环 3 次
> 2. 在循环体中走 v-if 判断
> 3. 判断 item !== 2 则正常渲染，item === 2 则把该节点注释掉

### 结论

**所以最终渲染出来 1、3 两个节点.**

::: tip
这样就能知道 Vue2 在共存的时候会给我们控制台提出 <TText type="warning">警告</TText> 了

因为其实我们只需要渲染 2 个节点，但是最终还是循环了 3 次，造成了性能浪费，也就是 v-for 优先级高于 v-if，共存时会造成 <TText type="danger">性能浪费</TText>.
:::

## <TText type="success">Vue3</TText>
