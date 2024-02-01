# Svg 相关

<script setup>
import svgStroke from "./svgStroke.vue"
import svgLine from "./svgLine.vue"
</script>

## Svg 描边动画

> 请点击启动按钮

<svgStroke></svgStroke>

### 代码实现

::: details 点击展开
<<< svgStroke.vue
:::

[视频讲解](https://www.douyin.com/search/渡一前端教科书_SVG的描边动画)

## Svg 路径动画

### svg 路径创建

- path 属性 路径的 dom 节点

> 例子直线

<style>
  .svg{
    width:50px;
    height:30px;
    stroke:blueviolet;
    stroke-width:2px;
    fill:none
  }
</style>

<svg view="0 0 50 30" class="svg">
  <path d="M0,25 L50,5"></path>
</svg>

```html
<svg view="0 0 50 30" class="svg">
  <path d="M0,25 L50,5"></path>
</svg>
```

**M**[x,y] <TText>移动</TText> 到 x,y 点  
**L**[x,y] <TText>直线</TText> 到 x,y 点

> 二次贝塞尔曲线

<svg view="0 0 50 30" class="svg">
  <path d="M2,2 Q50,0 40,20"></path>
</svg>

```html
<svg view="0 0 50 30" class="svg">
  <path d="M2,2 Q50,0 40,20"></path>
</svg>
```

**Q**[`xq,yq` x,y] <TText>二次贝塞尔曲线</TText> 到 x,y 点 `xq,yq` 是控制点

> 三次贝塞尔曲线

<svg view="0 0 50 30" class="svg">
  <path d="M2,15 C10,0 30,30 40,15"></path>
</svg>

```html
<svg view="0 0 50 30" class="svg">
  <path d="M2,15 C10,0 30,30 40,15"></path>
</svg>
```

**C**[`xq1,yq1 xq2,yq2` x,y] <TText>三次贝塞尔曲线</TText> 到 x,y 点 `xq1,yq1 xq2,yq2`是两个控制点

> 椭圆弧

<svg view="0 0 50 30" class="svg">
  <path d="M2,15 A30,60 10,0,0 50,0"></path>
</svg>

```html
<svg view="0 0 50 30" class="svg">
  <path d="M2,15 A30,60 10,0,0 50,0"></path>
</svg>
```

**A**[`r1,r1 r2,r2 x-axis-rotation,large-arc-flag,sweep-flag` x,y] <TText>椭圆弧</TText> 到 x,y 点

- `r1,r1 r2,r2` 是椭圆的两个半径 半径相等就是正圆
- `x-axis-rotation` 旋转角度 用来矫正椭圆弧线（正圆怎么转都是一个弧度）旋转 取值 0-360
- `large-arc-flag` 是标记绘制大弧(1)还是小弧(0)部分
- `sweep-flag` 是标记向顺时针(1)还是逆时针(0)方向绘制

### 来个恋爱过程

<TText>见面</TText> → <TText type="danger">kiss</TText> → <TText type="warning">pa pa pa</TText>

<svgLine/>

### 代码实现

::: details 点击展开
<<< svgLine.vue
:::
