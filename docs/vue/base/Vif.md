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

经过 `compile` 编译之后是这样的

```javascript
return _c(
  /* xxxxx */,
  _l([1, 2, 3], function (item) {
    return item !== 2 ? _c("div") : _e();
  }),
  0
);
```

::: details <TText> 前置知识 compile 编译之后其中使用的方法含义。</TText>

`_c()` 方法…………用于创建 VNode（虚拟节点）的函数。

> 接收三个参数：
>
> 1. `tag`：要创建的元素的标签名或组件选项对象。
> 2. `data`：元素的属性、指令、事件等数据对象。
> 3. `children`：元素的子节点，可以是文本节点、其他 VNode、或者是嵌套的 VNode 数组。

`_l()` 方法…………用于处理 `v-for` 指令，它的作用是生成列表元素。

> 接收三个参数：
>
> 1. `arr`：要遍历的数组或对象。
> 2. `cb`：用于生成每个元素的回调函数。
> 3. `alias`：可选参数，用于指定每个元素的别名。

`_e()` 方法…………用于处理空白或占位节点。

> 接收一个参数：
>
> 1. `text`：要显示的文本内容。

:::

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

### 举例

还是这个最简单的代码来说

```html
<div v-for="item in [1,2,3]" v-if="item !== 2"></div>
```

经过 `compile` 编译之后是这样的

```javascript
function render(_ctx, _cache) {
  return _ctx.item !== 2
    ? (_openBlock(),
      _createElementBlock(
        _Fragment,
        { key: 0 },
        _renderList([1, 2, 3], (item) => {
          return _createElementVNode("div");
        }),
        64 /* STABLE_FRAGMENT */
      ))
    : _createCommentVNode("v-if", true);
}
```

::: details <TText> 前置知识 compile 编译之后其中使用的方法含义。</TText>

`_openBlock()`方法…………用于在渲染函数中开启一个新的渲染“块”。

该函数通常不直接接受显式的参数。

`_createElementBlock()` 方法…………用于创建 VNode（虚拟节点）的函数。

> **参数说明：**
>
> - **type**: 表示要创建的 VNode 的类型。它可以是字符串形式的 HTML 标签名（如 `'div'`、`'span'`等）或一个指向 Vue 组件类的引用（如 `typeof Fragment`，这里`Fragment`通常表示一个特殊的组件，允许在模板中创建多个子节点而不包裹在一个单独的 DOM 元素内）。此参数决定了 VNode 所代表的元素或组件的基本身份。
> - **props**: 一个可选的、键值对形式的对象，表示 VNode 所对应的元素或组件的属性。这些属性会被传递给实际的 DOM 元素或 Vue 组件实例。
> - **children**: 可选的子节点列表。可以是字符串（代表文本节点）、其他 VNode 对象、或用于表示动态子节点的特殊值。这些子节点将作为当前 VNode 的嵌套内容。
> - **patchFlag**: 可选的整数，用于标记 VNode 的某些属性或子树是否包含动态内容。这些标记有助于 Vue 的更新算法在后续渲染时更高效地识别和处理变化。
> - **dynamicProps**: 可选的字符串数组，列举了 VNode 中那些值会随响应式数据变化的动态属性名。
> - **shapeFlag**: 可选的整数，编码了 VNode 的形状信息，如是否为元素节点、是否为组件节点、是否有子节点等。这有助于 Vue 在运行时快速识别 VNode 的结构特征。

`_renderList()`方法…………用于渲染列表数据。它的作用是将一个数组或对象转换为 VNode 数组，每个数组项或对象属性对应一个 VNode。

> **参数说明：**
>
> 1. source: 要渲染的项目数据源。它可以是数组、字符串、数字或对象。
> 2. renderItem: 渲染子节点函数
> 3. cache (可选): 用于缓存渲染结果的数组。
> 4. index (可选): 当前循环的索引 (仅在使用缓存时使用)。

`_createElementVNode()`和`_createCommentVNode()`基本与`_createElementBlock()`类似

:::

在上述代码中 可以看到，跟 Vue2 不同的是，Vue3 中是先走判断，然后再走循环的，也就是：

> 1. 先走 `v-if` 判断
> 2. 如果 <TText type="warning">item !== 2</TText>，就去走循环也就是 `v-for`
> 3. 如果 <TText type="warning">item == 2</TText>，就执行 `createCommandVNode`，创建一个注释节点
>    也就是在 Vue3 中，`v-if` 优先级是高于 `v-for` 的，<TText type="success">真正循环的只有 1、3 这两个节点</TText>，这 <TText type="success">提高了性能</TText>

但是我们会看到，代码会报错：**item 找不到？**

这是因为在 `v-for` 和 `v-if` 共存的时候，`Vue3` 会在底层帮我们转换成

```html
<template>
  <template v-if="item !== 2">
    <div v-for="item in [1,2,3]"></div>
  </template>
</template>
```

::: tip
item 是在外层的，所以报错说 item 找不到，大家都知道为啥了吧？在外层怎么能获取到 item 呢？
:::

### 总结

总结就是不要让 `v-if` 和 `v-for` 共存在同一个标签中，遇到这种情况需要使用 `computed` 去计算，然后再去渲染。

```vue
<div v-for="item in list" :key="item"></div>
<script setup lang="ts">
import { computed } from "vue";
const list = computed(() => [1, 2, 3].filter((item) => item !== 2));
</script>
```
