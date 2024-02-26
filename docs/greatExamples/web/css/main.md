# CSS 代码块

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
.content{
  display:flex;
  align-items: center;
}
.content>span{
  margin-right:12px;
}
.css-box{
  display:inline-block;
  margin-right:12px;
  width:260px;
  background-color:var(--jk-color-purple);
}
.css-height{
  height:40px;
}
.css-line-height{
  line-height: 40px;
}
.css-box-son{
  height:inherit;
  background-color:var(--jk-color-blue);
}
.css-box-son2{
  background-color:var(--jk-color-blue);
}
.css-box-son3 {
  line-height: initial;
}
.btnOld{
  border: revert;
  padding: revert;
  line-height: revert;
  color: revert;
  font-family: revert;
  background-color: revert;
  background-image: revert;
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



## 取消元素样式

<TText type="danger">取消元素默认样式</TText> 和 <TText type="success">继承样式</TText>

```javascript
all: unset;
```
可以将元素的所有样式都还原为默认状态，这在重置或清除元素的样式时很有用。  
> 通常，这样的样式重置用于避免继承的样式对特定元素产生影响，或者在需要完全自定义元素的样式时使用。

::: details 例子 点击展开

<button :class="$style.btnOld">按钮-原式样式</button>
<br/>
<button style="all: unset;">按钮-清除了原有样式</button>

```html
<button >按钮-原式样式</button>
<button style="all: unset;">按钮-清除了原有样式</button>
```

<style model>

</style>

:::



## 控制继承

### <TText type="success">inherit 继承</TText>
`inherit` 用于将样式属性设置为 <TText type="danger">继承自其父元素</TText> 的值。

> 已知高度是不继承父元素的  
> 但是设置了 `inherit` 的子元素高度继承了父元素高度  
> 看 son son2 的对比


<div :class="$style.content">
  <span>son:</span>
  <div :class="[$style.cssBox,$style.cssHeight]">
    <div :class="$style.cssBoxSon">设置了inherit,继承高度</div>
  </div>
  <span>son2:</span>
  <div :class="[$style.cssBox,$style.cssHeight]">
    <div :class="$style.cssBoxSon2">未设置</div>
  </div>
</div>

::: details 例子代码 点击展开

```html
<div class="content">
  <span>son:</span>
  <div class="css-box">
    <div class="css-box-son">设置了inherit,继承高度</div>
  </div>
  <span>son2:</span>
  <div class="css-box">
    <div class="css-box-son2">未设置</div>
  </div>
</div>

<style>
  .css-box {
    display: inline-block;
    width: 100px;
    height: 40px;
    background-color: var(--jk-color-purple);
  }
  .css-box-son {
    height: inherit;
    background-color: var(--jk-color-blue);
  }
  .css-box-son2 {
    background-color: var(--jk-color-blue);
  }
</style>
```

:::

### <TText type="danger">initial 重置</TText>
- `initial` 用于将样式属性 <TText type="danger">重置为浏览器默认值</TText>。
- 它将 <TText>覆盖任何已经存在的样式</TText> 设置，将属性还原为 <TText type="success">初始默认值</TText> 。

> 已知 css `line-height`是继承父元素的  
> 但是设置了 `initial` 直接将自己的 `line-height` 改变为浏览器默认值  
> 看 son3 son4 的对比

<div :class="$style.content">
  <span>son3:</span>
  <div :class="[$style.cssBox,$style.cssLineHeight]">
    <div :class="$style.cssBoxSon3">设置inherit (line-height:normal)</div>
  </div>
  <span>son4:</span>
  <div :class="[$style.cssBox,$style.cssLineHeight]">
    <div>不设置 继承(line-height:40px)</div>
  </div>
</div>

::: details 例子代码 点击展开

```html
<div class="content">
  <span>son3:</span>
  <div class="css-box">
    <div class="css-box-son3">设置inherit (line-height:normal)</div>
  </div>
  <span>son4:</span>
  <div class="css-box">
    <div>不设置 继承 (line-height:40px)</div>
  </div>
</div>

<style>
  .css-box {
    width: 100px;
    background-color:var(--jk-color-purple);
    line-height: 40px;
  }
  .css-box-son3 {
    line-height: initial;
  }
</style>
```

:::

### <TText type="warning">revert 还原</TText>
- `revert` 它的作用是将属性还原到 <TText type="danger">用户代理（浏览器,user agent stylesheet）</TText> 的默认值。
- 与 `initial` 不同，`revert` 可以在某些情况下继承父元素的值。`revert` 的使用要谨慎，因为它会随浏览器的默认样式而变化。

### <TText type="warning">unset 条件重置</TText>
-  `unset` 用于重置样式属性，如果属性有继承值，则设置为 `inherit`，如果属性没有继承值，则设置为 `initial`。它可以根据属性的具体情况选择是重置为继承值还是初始值.