# 优化

## 加载性能

1. <span class="cor-tip">css 压缩</span>
   > 将写好的 css 进行打包压缩，可以减小文件体积。
2. <span class="cor-tip">减少使用@import,建议使用 link</span>
   > 因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。
3. <span class="cor-tip">减少 HTTP 请求数量</span>
   > 将多个 CSS 文件合并为一个，可以减少浏览器发起的 HTTP 请求次数。
4. <span class="cor-tip">将样式表放在页面顶部</span>
   > 在 HTML head 中放置样式表，可以使浏览器更快地渲染页面。
5. <span class="cor-tip">缓存样式表</span>
   > 使用浏览器缓存可以减少文件传输时间，加快加载速度。
6. <span class="cor-tip">懒加载样式表</span>
   > 对于一些不必要的样式表，可以使用懒加载的方式进行加载，减少首次加载时间。
7. <span class="cor-tip">使用 CSS 预处理器</span>
   > 使用 CSS 预处理器可以帮助开发者更好地管理样式表，减少重复的样式定义。

## 选择器性能

1. <span class="cor-tip">关键选择器</span>
   > 选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。CSS 选择符是从右到左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等；
2. <span class="cor-tip">如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签</span>
   > 过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）。
3. <span class="cor-tip">避免使用通配规则</span>
   > 如\*{}计算次数惊人，只对需要用到的元素进行选择。
4. <span class="cor-tip">尽量少的去对标签进行选择，而是用 class</span>
   >
5. <span class="cor-tip">尽量少的去使用后代选择器</span>
   > 降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度降到最低，最高不要超过三层，更多的使用类来关联每一个标签元素。
6. <span class="cor-tip">了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则</span>

## 渲染性能

1. <span class="cor-tip">慎重使用高性能属性：浮动、定位</span>
   >
2. <span class="cor-tip">尽量减少页面重排、重绘</span>
   > 空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑能减少 css 文档体积。
3. <span class="cor-tip">去除空规则</span>
   >
4. <span class="cor-tip">属性值为 0 时，不加单位</span>
   >
5. <span class="cor-tip">属性值为浮动小数 0.\*\*，可以省略小数点之前的 0</span>
   >
6. <span class="cor-tip">标准化各种浏览器前缀</span>
   > 带浏览器前缀的在前。标准属性在后。
7. <span class="cor-tip">选择器优化嵌套，尽量避免层级过深</span>
   >
8. <span class="cor-tip">css 雪碧图</span>
   > 同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。
9. <span class="cor-tip">正确使用 display 的属性</span>
   > 由于 display 的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能。
10. <span class="cor-tip">不滥用 web 字体</span>
    > 对于中文网站来说 WebFonts 可能很陌生，国外却很流行。web fonts 通常体积庞大，而且一些浏览器在下载 web fonts 时会阻塞页面渲染损伤性能。

## 可维护性、健壮性

1. <span class="cor-tip">将具有相同属性的样式抽离出来</span>
   > 整合并通过 class 在页面中进行使用，提高 css 的可维护性。
2. <span class="cor-tip">样式与内容分离</span>
   > 将 css 代码定义到外部 css 中。
