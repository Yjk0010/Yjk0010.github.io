# 一些常用或者比较神奇的 css 代码块

<script setup>
import flexMargin from "./flexMargin.vue"
</script>

## 超出隐藏

<style module>
.w110{
  width:110px;
}
.text-ellipsis {
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}
.multiline-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
}
.css-box{
  display:inline-block;
  margin-right:12px;
  width:100px;
  height:30px;
  background-color:blueviolet;
  line-height: 2;
}
.css-box-son{
  height:inherit;
  background-color:cadetblue;
}
.css-box-son2{
  background-color:cadetblue;
}
.css-box-son3 {
  line-height: initial;
}
</style>

### 单行超出显示省略

::: details 例子 点击展开

<div :class="[$style.w110,$style.textEllipsis]">
  单行超出显示省略
</div>

```html
<div class="w110 text-ellipsis">单行超出显示省略</div>
```

:::

```css
.text-ellipsis {
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}
```

### 多行超出显示省略

::: details 例子 点击展开

<div :class="[$style.w110,$style.multilineEllipsis]">
  一行 <br/>
  又一行 <br/>
  多行超出显示省略
</div>

```html
<div class="w110 multiline-ellipsis">
  一行 <br />
  又一行 <br />
  多行超出显示省略
</div>
```

:::

```css
.multiline-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 指定要显示的行数 */
  -webkit-box-orient: vertical;
}
```

## 取消元素所有默认样式和继承样式

> <span class="cor-wa">all: unset;</span> 可以将一个元素的所有样式都还原为默认状态，这在重置或清除元素的样式时很有用。通常，这样的样式重置用于避免继承的样式对特定元素产生影响，或者在需要完全自定义元素的样式时使用。

::: details 例子 点击展开

<input style="all: unset;" placeholder="清除了"/>
<input placeholder="原式样式"/>

```html
<input style="all: unset;" placeholder="清除了" />
<input placeholder="原式样式" />
```

:::

```javascript
all: unset;
```

## 控制继承

- <span class="cor-wa">inherit</span>: `inherit` 用于将样式属性设置为继承自其父元素的值。如果你将某个元素的属性设置为 inherit，那么它将继承其父元素的相同属性值。

::: details 例子 点击展开

> 已知 css 高度是不继承父元素的  
> 但是设置了 `inherit` 的子元素高度继承了父元素高度  
> 看 son son2 的对比

<div :class="$style.cssBox"><div :class="$style.cssBoxSon">inherit</div></div>
<div :class="$style.cssBox"><div :class="$style.cssBoxSon2">非 inherit</div></div>

```html
<style>
  .css-box {
    display: inline-block;
    margin-right: 12px;
    width: 100px;
    height: 30px;
    background-color: blueviolet;
  }
  .css-box-son {
    height: inherit;
    background-color: cadetblue;
  }
  .css-box-son2 {
    background-color: cadetblue;
  }
</style>

<div class="css-box">
  <div class="css-box-son">inherit</div>
</div>
<div class="css-box">
  <div class="css-box-son2">inherit</div>
</div>
```

:::

- <span class="cor-wa">initial</span>: `initial` 用于将样式属性重置为浏览器默认值。它将覆盖任何已经存在的样式设置，将属性还原为初始默认值。

::: details 例子 点击展开

> 已知 css `line-height`是继承父元素的  
> 但是设置了 `initial` 直接将自己的 `line-height` 改变为浏览器默认值  
> 看 son3 son4 的对比

<div :class="$style.cssBox"><div :class="$style.cssBoxSon3">initial</div></div>
<div :class="$style.cssBox"><div >非 initial</div></div>

```html
<style>
  .css-box {
    display: inline-block;
    margin-right: 12px;
    width: 100px;
    height: 30px;
    background-color: blueviolet;
    line-height: 2;
  }
  .css-box-son3 {
    line-height: initial;
  }
</style>

<div class="css-box">
  <div class="css-box-son3">inherit</div>
</div>
<div class="css-box">
  <div>inherit</div>
</div>
```

:::

- <span class="cor-wa">revert</span>: `revert` 是 CSS 的属性值，它的作用是将属性还原到用户代理（浏览器）的默认值。与 `initial` 不同，`revert` 可以在某些情况下继承父元素的值。`revert` 的使用要谨慎，因为它会随浏览器的默认样式而变化。

- <span class="cor-wa">unset</span>: `unset` 用于重置样式属性，如果属性有继承值，则设置为 `inherit`，如果属性没有继承值，则设置为 `initial`。它可以根据属性的具体情况选择是重置为继承值还是初始值

## flex+margin 的神奇布局

<flexMargin></flexMargin>

::: details 代码实现 点击展开
<<< flexMargin.vue
:::
