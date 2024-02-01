# img 元素

# 图片元素

## img 元素

> 全称 image

### 主要属性

- src: 图片地址书写位置

- alt: 当图片资源失效时，将使用该属性的文字替代图片展示

<img src="/assets/no-img.jpg" alt="此处无图" />

```html
<img src="/assets/no-img.jpg" alt="此处无图" />
```

## 和 map figure 元素 连用

### map 地图

- map 的子元素：area

  area 元素属性

- shape

  1. circle 圆形
  2. rect 矩形
  3. poly 多边形

- coords
  给热点区域设定具体的<span class="cor-in">坐标值</span>.这个值的数值和意义取决于这个值所描述的形状属性.
  - 对于<span class="cor-wa">圆形</span>，这个值是 `x,y,r`，这里的 `x,y` 是一对确定圆的中心的坐标而 `r` 则表示的是半径值.
  - 对于<span class="cor-wa">矩形</span>，这个 coords 值为两个 `X,Y` 对：左上、右下.
  - 对于<span class="cor-wa">多边形</span>，这个值是用 `x,y` 对表示的多边形的每一个点：`x1,y1,x2,y2,x3,y3` 等等.

### figure 图形

指代、定义，通常用于把图片、图片标题、描述包裹起来

- 子元素：figcaption 图形描述

> 下面例子展示了连用实现区域点击效果（图中大型天体均可点击）

<figure>
  <img
    usemap="#solarMap"
    src="/assets/html/solarSystem.jpg"
    alt="这是一张太阳系的图片"
  />
  <figcaption>
    <h2>太阳系</h2>
  </figcaption>
  <p>
    太阳系是以太阳为中心，和所有受到太阳的引力约束天体的集合体.包括八大行星（由离太阳从近到远的顺序：水星、金星、地球、火星、木星、土星、天王星、海王星）、以及至少173颗已知的卫星、5颗已经辨认出来的矮行星和数以亿计的太阳系小天体,和哈雷彗星.
  </p>
</figure>

<script setup>
const areaList = [
  {
      shape: 'circle',
      coords: "282,660,56",
      href: "https://baike.baidu.com/item/%E6%9C%A8%E6%98%9F/222105",
      target: "_blank",
      title: "木星"
    },
    {
      shape: 'circle',
      coords: "282,422,48",
      href: "https://baike.baidu.com/item/%E5%9C%9F%E6%98%9F/136354",
      target: "_blank",
      title: "土星"
    },
    {
      shape: 'circle',
      coords: "282,336,22",
      href: "https://baike.baidu.com/item/%E5%A4%A9%E7%8E%8B%E6%98%9F/21805",
      target: "_blank",
      title: "天王星"
    },
    {
      shape: 'circle',
      coords: "282,278,22",
      href: "https://baike.baidu.com/item/%E6%B5%B7%E7%8E%8B%E6%98%9F/30351",
      target: "_blank",
      title: "海王星"
    },
    {
      shape: 'circle',
      coords: "282,794,10",
      href: "https://baike.baidu.com/item/%E7%81%AB%E6%98%9F/5627",
      target: "_blank",
      title: "火星"
    },
    {
      shape: 'circle',
      coords: "282,822,14",
      href: "https://baike.baidu.com/item/%E5%9C%B0%E7%90%83/6431",
      target: "_blank",
      title: "地球"
    },
    {
      shape: 'circle',
      coords: "282,850,12",
      href: "https://baike.baidu.com/item/%E9%87%91%E6%98%9F/19410",
      target: "_blank",
      title: "金星"
    },
    {
      shape: 'circle',
      coords: "282,878,10",
      href: "https://baike.baidu.com/item/%E6%B0%B4%E6%98%9F/135917",
      target: "_blank",
      title: "水星"
    },
    {
      shape: 'rect',
      coords: "128,930,440,1000",
      href: "https://baike.baidu.com/item/%E5%A4%AA%E9%98%B3/24010",
      target: "_blank",
      title: "太阳"
    },
    {
      shape: 'poly',
      coords: "135,169,248,146,248,183,140,197",
      href: "https://baike.baidu.com/item/%E6%9F%AF%E4%BC%8A%E4%BC%AF%E5%B8%A6",
      target: "_blank",
      title: "柯伊伯带"
    },
    {
      shape: 'poly',
      coords: "127,52,237,36,243,67,131,84",
      href: "https://baike.baidu.com/item/%E5%A5%A5%E5%B0%94%E7%89%B9%E4%BA%91",
      target: "_blank",
      title: "奥尔特云"
    },
    {
      shape: 'poly',
      coords: "90,90,102,38,126,82,142,141,110,149",
      href: "https://baike.baidu.com/item/%E9%95%BF%E5%91%A8%E6%9C%9F%E5%BD%97%E6%98%9F",
      target: "_blank",
      title: "长周期彗星"
    }
]
</script>

<map name="solarMap">
  <area
    v-for="item in areaList"
    :shape="item.shape"
    :coords="item.coords"
    :href="item.href"
    :target="item.target"
    :data-title="item.title"
  />
</map>

::: details 代码展示

```html
<figure>
  <img
    usemap="#solarMap"
    src="../assets/solarSystem.jpg"
    alt="这是一张太阳系的图片"
  />
  <figcaption>
    <h2>太阳系</h2>
  </figcaption>
  <p>
    太阳系是以太阳为中心，和所有受到太阳的引力约束天体的集合体.包括八大行星（由离太阳从近到远的顺序：水星、金星、地球、火星、木星、土星、天王星、海王星）、以及至少173颗已知的卫星、5颗已经辨认出来的矮行星和数以亿计的太阳系小天体,和哈雷彗星.
  </p>
</figure>

<map name="solarMap">
  <area
    v-for="item in areaList"
    :shape="item.shape"
    :coords="item.coords"
    :href="item.href"
    :target="item.target"
    :data-title="item.title"
  />
</map>

<script setup>
  const areaList = [
    {
      shape: "circle",
      coords: "282,660,56",
      href: "https://baike.baidu.com/item/%E6%9C%A8%E6%98%9F/222105",
      target: "_blank",
      title: "木星",
    },
    {
      shape: "circle",
      coords: "282,422,48",
      href: "https://baike.baidu.com/item/%E5%9C%9F%E6%98%9F/136354",
      target: "_blank",
      title: "土星",
    },
    {
      shape: "circle",
      coords: "282,336,22",
      href: "https://baike.baidu.com/item/%E5%A4%A9%E7%8E%8B%E6%98%9F/21805",
      target: "_blank",
      title: "天王星",
    },
    {
      shape: "circle",
      coords: "282,278,22",
      href: "https://baike.baidu.com/item/%E6%B5%B7%E7%8E%8B%E6%98%9F/30351",
      target: "_blank",
      title: "海王星",
    },
    {
      shape: "circle",
      coords: "282,794,10",
      href: "https://baike.baidu.com/item/%E7%81%AB%E6%98%9F/5627",
      target: "_blank",
      title: "火星",
    },
    {
      shape: "circle",
      coords: "282,822,14",
      href: "https://baike.baidu.com/item/%E5%9C%B0%E7%90%83/6431",
      target: "_blank",
      title: "地球",
    },
    {
      shape: "circle",
      coords: "282,850,12",
      href: "https://baike.baidu.com/item/%E9%87%91%E6%98%9F/19410",
      target: "_blank",
      title: "金星",
    },
    {
      shape: "circle",
      coords: "282,878,10",
      href: "https://baike.baidu.com/item/%E6%B0%B4%E6%98%9F/135917",
      target: "_blank",
      title: "水星",
    },
    {
      shape: "rect",
      coords: "128,930,440,1000",
      href: "https://baike.baidu.com/item/%E5%A4%AA%E9%98%B3/24010",
      target: "_blank",
      title: "太阳",
    },
    {
      shape: "poly",
      coords: "135,169,248,146,248,183,140,197",
      href: "https://baike.baidu.com/item/%E6%9F%AF%E4%BC%8A%E4%BC%AF%E5%B8%A6",
      target: "_blank",
      title: "柯伊伯带",
    },
    {
      shape: "poly",
      coords: "127,52,237,36,243,67,131,84",
      href: "https://baike.baidu.com/item/%E5%A5%A5%E5%B0%94%E7%89%B9%E4%BA%91",
      target: "_blank",
      title: "奥尔特云",
    },
    {
      shape: "poly",
      coords: "90,90,102,38,126,82,142,141,110,149",
      href: "https://baike.baidu.com/item/%E9%95%BF%E5%91%A8%E6%9C%9F%E5%BD%97%E6%98%9F",
      target: "_blank",
      title: "长周期彗星",
    },
  ];
</script>
```

:::
