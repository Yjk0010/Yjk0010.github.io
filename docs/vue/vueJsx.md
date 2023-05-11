# <span class="cor-tip">Vue</span> 中使用 <span class="cor-da">jsx</span> 写法

基本汇集了所有你在写 `Vue3` 项目可能会用到的常用 `JSX` 语法。

## 文本插值

> Vue 里面文本插值默认是用双大括号:

```javascript
<h1>{{ msg }}</h1>
```

> 在 JSX 中变成了单大括号：

```javascript
const name = "JinKe";
const element = <h1>Hello, {name}</h1>;
```

> 和 `Vue` 模板语法中的文本插值一样，大括号内支持任何有效的 `JavaScript` 表达式。  
> 比如：`2 + 2`，`obj.firstName`，`fun(arg1)`等。

## 条件渲染

`jsx` 本身也是一个条件表达式，不再需要使用 `v-if` 指令。

### 使用 `if/else`

```javascript
const element = (name) => {
  if (name) {
    return <h1>Hello, {name}</h1>;
  } else {
    return <h1>Hello, Word</h1>;
  }
};
```

> 以上代码等效于：

```javascript
const element = (name) => <h1>Hello, {name || "Word"}</h1>;
```

### 使用三目运算符

```javascript
const element = title ? <span>{{ title }}</span> : null;
```

> 以上代码等效于：

```javascript
const element = title && <span>{{ title }}</span>;
```

## 列表渲染

列表渲染直接使用 `JS` 数组的 `map` 方法即可，不需要使用 `v-for` 指令。

```javascript
const list = [
  {
    id: 1,
    title: "title1",
  },
  {
    id: 2,
    title: "title2",
  },
];

const element = list.map((item) => {
  return <div>{item.title}</div>;
});
```

## 标签属性绑定

属性绑定也是使用大括号包裹，不需要使用 `v-bind` 指令。

```javascript
const href = "https://yjk0010.github.io/";

const element = <a href={href}>JinKe Blog</a>;
```

## class 类名绑定

直接使用 `JS` 模板字符串即可。

```javascript
const element = (
  <button className={`jk-btn ${disabled ? "disabled" : ""}`}>
    {{ btnText }}
  </button>
);
```

> 也可以使用数组：

```javascript
const element = (
  <button class={["jk-btn", disabled && "disabled"]}>{{ btnText }}</button>
);
```

## style 样式绑定

样式绑定需要使用双大括号。

```javascript
const width = "100px";

const element = <button style={{ width, fontSize: "16px" }}></button>;
```

## 事件绑定

绑定事件也是用大括号，注意事件名前面要加上 `on` 前缀，比如 `click` 事件要写成 `onClick`，`mouseenter` 事件要写成 `onMouseenter`。

```javascript
const confirm = () => {
  // 确认提交
};

<button onClick={confirm}>确定</button>;
```

> 如果要带参数，需要使用箭头函数进行包裹：

```javascript
const confirm = (event, type) => {
  // 确认提交
};
<button onClick={(event) => confirm(event, "type1")}>确定</button>;
```

## 事件修饰符

`jsx` 中给事件增加修饰符需要借助 `withModifiers` 方法。

```javascript
import { withModifiers, defineComponent, ref } from "vue";

const App = defineComponent({
  setup() {
    const count = ref(0);

    const inc = () => {
      count.value++;
    };

    return () => (
      <div onClick={withModifiers(inc, ["self"])}>{count.value}</div>
    );
  },
});
```

> 注意：Vue 模板中 ref 变量是可以直接解构的，但是在 jsx 中不行，需要记得添加.value，比如上面的{ count.value }。

## v-model 双向绑定

### 绑定 modelValue

这种情况比较简单。

> JSX 写法：

```javascript
<jk-show v-model={visible.value}></jk-show>
```

> SFC 写法：

```javascript
<jk-show v-model="visible"></jk-show>
```

### 绑定自定义名称

比如绑定 `visible`，`JSX` 中不能直接用 `v-model:visible` 的语法，需要传入一个数组`[menuShow.value, 'visible']`，数组的第二个参数就是要绑定的自定义名称。

> JSX 写法：

```javascript
<jk-show v-model={[showObj.value, "visible"]}></jk-show>
```

> SFC 写法：

```javascript
<jk-show v-model:visible="showObj"></jk-show>
```

## slot 插槽

`jsx` 中没有`<slot>`标签，定义插槽需要使用双大括号。

如果是具名插槽，则将 `default` 改成具名插槽的名称，比如 `mySlot`，则使用 `ctx.slots.mySlot?.()`。

插槽从 `setup` 的第二个参数 `ctx` 中获取，不需要加`$`前缀。

```javascript
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { slots }) {
    // 逻辑
    return () => {
      return <button>{slots.default?.()}</button>;
    };
  },
});
```

> 还可以使用 renderSlot 方法：

```javascript
import { renderSlot } from "vue";

<button>{renderSlot(slots, "default")}</button>;
```

## Scoped Slots 作用域插槽

使用作用域插槽可以实现插槽传参，以下是具体的示例。

JSX 和 SFC 中插槽使用的写法对比。

JSX 写法：

```javascript
<jk-tree data={data}>
  {{
    mySlot: (item) => (item.open ? <IconOpen /> : <IconClose />),
  }}
</jk-tree>
```

> 还可以通过 v-slots 的方式使用：

```javascript
<jk-tree
  data={data}
  v-slots={{
    mySlot: (item) => (item.open ? <IconOpen /> : <IconClose />),
  }}
></jk-tree>
```

> SFC 写法：

```javascript
<jk-tree :data="data">
  <template #mySlot="item">
    <IconOpen v-if="item.open" />
    <IconClose v-else />
  </template>
</jk-tree>

```

> 其中的 item 是插槽的参数，通过

```javascript
ctx.slots.mySlot(item);
```

> 的方式给插槽传入参数。

> 或者使用 renderSlot 方法，第三个参数就是要传给插槽的参数：

```javascript
import { renderSlot, useSlots } from "vue";

<button>{renderSlot(useSlots(), "mySlot", item)}</button>;
```

## 小结

本文是一个小册子，主要介绍在 `Vue3` 中使用 `JSX` 的语法和实践，  
包含了`文本插值`、`属性绑定`、`事件绑定`、`双向绑定`、`条件渲染`、`列表渲染`、`插槽`等几乎所有的 Vue3 语法，  
如果你也在 `Vue3` 中写 `JSX`，这份指南或许能提供一点参考。
