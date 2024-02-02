# 小技巧汇总


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