# 小技巧汇总

## data- 属性

利用 `data-` 属性存储数据* 可以在任何 `HTML` 元素上使用 <TText type="danger">data-*</TText> 属性来存储自定义数据。这种方式可以让 `HTML、CSS 和 JavaScript` 之间共享数据。

<div data-jk="JK">这里展示了css选中效果</div>

<style module>
[data-jk="JK"] {
    color: var(--jk-color-purple);
}
</style>

``` html
<div data-jk="JK">这里展示了css选中效果</div>
```

``` css
/* css选中方式 */
[data-jk="JK"] {
    color: var(--jk-color-purple);
}
```

## 下载链接

<TText type="success">a 标签配置download成为下载链接</TText>

<a href="/logo.png" download>点这玩意下载logo</a>

``` html
<a href="/logo.png" download>点这玩意下载logo</a>
```


## 根据屏幕尺寸显示相应图片

<TText type="warning">可自行放大缩小浏览器大小尝试图片更换</TText>
> 若浏览器不支持picture元素,则会展示img内容.


<picture>
   <source media="(min-width: 900px)" srcset="/assets/no-img.jpg">
   <source media="(min-width: 700px)" srcset="/logo.png">
   <img src="/logo.png" alt="avatar">
</picture>

``` html
<picture>
   <source media="(min-width: 900px)" srcset="/assets/no-img.jpg">
   <source media="(min-width: 700px)" srcset="/logo.png">
   <img src="/logo.png" alt="avatar">
</picture>
```

## oncontextmenu 属性：禁用右键

<div :class="$style.oncontextmenu" oncontextmenu="return false">这里禁用了右键操作</div>

``` html
<div oncontextmenu="return false">这里禁用了右键操作</div>
```

<style module>
  .oncontextmenu{
    height:40px;
    background-color:var(--jk-color-purple)
  }
</style>

## input标签：颜色选择器

<input type="color" value="#e66465">

``` html
<input type="color" value="#e66465">
```



