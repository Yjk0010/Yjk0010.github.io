# 修饰符（Modifiers）

> Vue 修饰符是用来修饰事件处理函数或指令的行为的特殊后缀。它们可以用来改变事件的触发方式、指令的执行方式等等。

<script setup>
import { ref } from "vue"
import modifiersStop from "./components/modifiersStop.vue"
import modifiersCapture from "./components/modifiersCapture.vue"
import modifiersSelf from "./components/modifiersSelf.vue"
import modifiersOnce from "./components/modifiersOnce.vue"
import modifiersPrevent from "./components/modifiersPrevent.vue"
import { ElNotification } from "element-plus"

const lazyValue = ref("lazyValue")
const trimValue = ref("    trim  Value    ")
const numberValue = ref("")
const consoleLog = (text) => {
  ElNotification({
    type: "success",
    message: text,
    offset: 40,
    duration: 2000,
  });
}
</script>

## .lazy

改变输入框的值时`value`不会改变，当光标离开输入框时，`v-model`绑定的值`value`才会改变

<input v-model.lazy="lazyValue"> <span>{{ lazyValue }}</span>

``` html
<input v-model.lazy="lazyValue"> <span>{{ lazyValue }}</span>
```

``` javascript
import { ref } from "vue"
const lazyValue = ref("lazyValue")
```

## .trim

类似于`JavaScript`中的`trim()`方法，作用是把`v-model`绑定的值的**首尾空格**给过滤掉。

<input v-model.trim="trimValue"> <span>{{ trimValue }}</span>

``` html
<input v-model.trim="trimValue"> <span>{{ trimValue }}</span>
```

``` javascript
import { ref } from "vue"
const trimValue = ref("trimValue")
```

## .number 

将 <TText type="success">绑定的值转成数字</TText> ，但是先输入字符串和先输入数字，是两种情况

- 先输入数字的话，只取前面数字部分
- 先输入字母的话，`.number`修饰符无效
  
<input v-model.number="numberValue" placeholder="请输入内容进行测试"> <span>{{ numberValue }}</span>

``` html
<input v-model.number="numberValue" placeholder="请输入内容进行测试"> 
<span>{{ numberValue }}</span>
```
``` javascript
const numberValue = ref("")
```

## .stop

作用是 <TText type="danger">阻止冒泡</TText>

<modifiersStop></modifiersStop>

::: details 代码展示 点击展开
<<< ./components/modifiersStop.vue
:::

## .capture

事件 <TText type="success">默认</TText> 是由里往外 <TText type="danger">冒泡</TText>，`capture`修饰符的作用是 <TText type="warning">反过来</TText>，由外网内 <TText type="danger">捕获</TText>

> 请注意两个弹窗出来的顺序

<modifiersCapture></modifiersCapture>


::: details 代码展示 点击展开
<<< ./components/modifiersCapture.vue
:::

## .self

作用是，只有点击事件绑定的 <TText type="danger">本身</TText> 才会触发事件

<modifiersSelf></modifiersSelf>


::: details 代码展示 点击展开
<<< ./components/modifiersSelf.vue
:::

## .once

事件 <TText type="danger">只执行一次</TText>

> 第一次点击执型外部出发，第二次就只触发一次了

<modifiersOnce></modifiersOnce>


::: details 代码展示 点击展开
<<< ./components/modifiersOnce.vue
:::

## .prevent

是阻止 <TText type="danger">默认事件</TText>

> 阻止了a元素跳转

<modifiersPrevent></modifiersPrevent>

::: details 代码展示 点击展开
<<< ./components/modifiersPrevent.vue
:::

## .native

用在自定义组件的事件上，保证事件能执行，可以穿透到根元素上

``` html
<!-- 执行不了 -->
<My-component @click="alert("hello")"></My-component>

<!-- 可以执行 -->
<My-component @click.native="alert("hello")"></My-component>
```

## .left,.right,.middle

是鼠标的 <TText type="danger">左中右</TText> 按键触发的事件

<style module>
  .box {
    display:inline-block;
    padding:8px;
    background-color:var(--jk-color-purple)
  }
</style>

<div :class="[$style.box]" 
  @click.left="consoleLog('left')" 
  @click.middle="consoleLog('middle')"
  @click.right="consoleLog('right')" 
  oncontextmenu="return false">
  测试鼠标三个按键位置
</div>

``` html
<div
  @click.left="consoleLog('left')" 
  @click.middle="consoleLog('middle')"
  @click.right="consoleLog('right')" 
  oncontextmenu="return false">
  测试鼠标三个按键位置
</div>
```

## .passive

当我们在监听 <TText type="success">元素滚动事件</TText> 的时候，会一直触发`onscroll`事件，在pc端是没啥问题的，但是在移动端，会让我们的 <TText type="danger">网页变卡</TText>，因此我们使用这个修饰符的时候，相当于给`onscroll`事件整了一个`.lazy`修饰符

``` html
<div @scroll.passive="onScroll">...</div>
```

## .camel

当在 `DOM` 内模板使用 `.camel` 修饰符，可以驼峰化 `v-bind attribute` 的名称，例如 `SVG viewBox attribute`：

``` html
<!-- 不加camel viewBox会被识别成小写的viewbox -->
<svg :view-box.camel="viewBox"></svg>
```

## .sync

当父组件传值进子组件，子组件想要改变这个值时，可以通过这个简化代码

``` html
<!-- 父组件里 -->
<children :foo="bar" @update:foo="val => bar = val"></children>
```
``` javascript
// 子组件里
this.$emit('update:foo', newValue)
```

可以 <TText type="success">简写</TText> 成 

``` html
<!-- 父组件里 -->
<children :foo.sync="bar"></children>
```
``` javascript
// 子组件里
this.$emit('update:foo', newValue)
```

## .keyCode

监听键盘事件

<input @keyup="consoleLog($event.target.value)" placeholder="按所有按键都可触发"> <br></br>

<input @keyup.enter="consoleLog($event.target.value)" placeholder="按enter按键触发"> <br></br>

<input @mousedown.ctrl.="consoleLog($event.target.value)" placeholder="按ctrl再鼠标点击触发"> <br></br>

<input @keyup.alt.enter="consoleLog($event.target.value)" placeholder="按alt + enter触发"> <br></br>

``` html
<input 
  @keyup="consoleLog($event.target.value)" 
  placeholder="按所有按键都可触发">

<input 
  @keyup.enter="consoleLog($event.target.value)" 
  placeholder="按enter按键触发">

<input 
  @mousedown.ctrl.="consoleLog($event.target.value)" 
  placeholder="按ctrl再鼠标点击触发">

<input 
  @keyup.alt.enter="consoleLog($event.target.value)" 
  placeholder="按alt + enter触发">
```
