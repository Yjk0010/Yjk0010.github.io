# 层叠 Cascading

声明冲突: 同一个样式，多次应用到同一个元素

层叠: 解决声明冲突的过程，浏览器自动处理（权重计算）

## 比较重要性

重要性从高到底:

> 作者样式表: 开发者书写的样式

1. 作者样式表中的!important 样式
2. 作者样式表中的普通样式
3. 浏览器默认样式表中的样式

## 比较特殊性

> 看选择器

- 总体规则: 选择器选中的范围越窄，越特殊

- 具体规则: 通过选择器，计算出一个 4 位数`（x x x x）`

1. <span class="color-success">千位: </span>如果是内联样式，记 1，否则记 0
2. <span class="color-error">百位: </span>等于选择器中所有 id 选择器的数量
3. <span class="color-warn">十位: </span>等于选择器中所有类选择器、属性选择器、伪类选择器的数量
4. <span class="color-info">个位: </span>等于选择器中所有元素选择器、伪元素选择器的数量

## 比较源次序

> 代码书写靠后的胜出

## 小知识

> 重置样式表

书写一些作者样式，覆盖浏览器的默认样式

重置样式表 -> 浏览器的默认样式

常见的重置样式表: normalize.css、reset.css、meyer.css

> 爱恨法则

link > visited > hover > active