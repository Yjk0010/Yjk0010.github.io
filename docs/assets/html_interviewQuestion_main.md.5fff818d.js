import{_ as a,o as e,c as l,N as o}from"./chunks/framework.7e203a6d.js";const s="/assets/main-1.1d7d6c45.jpg",b=JSON.parse('{"title":"面试题","description":"","frontmatter":{},"headers":[],"relativePath":"html/interviewQuestion/main.md"}'),t={name:"html/interviewQuestion/main.md"},c=o('<h1 id="面试题" tabindex="-1">面试题 <a class="header-anchor" href="#面试题" aria-label="Permalink to &quot;面试题&quot;">​</a></h1><p>基础短题位置</p><h2 id="对-html-语义化的理解" tabindex="-1">对 HTML 语义化的理解 <a class="header-anchor" href="#对-html-语义化的理解" aria-label="Permalink to &quot;对 HTML 语义化的理解&quot;">​</a></h2><p><a href="/html/semantic.html">语义化</a></p><h2 id="doctype-文档类型-的作用" tabindex="-1">DOCTYPE(⽂档类型) 的作⽤ <a class="header-anchor" href="#doctype-文档类型-的作用" aria-label="Permalink to &quot;DOCTYPE(⽂档类型) 的作⽤&quot;">​</a></h2><blockquote><p><code>DOCTYPE</code> 是 <code>HTML5</code> 中一种标准通用标记语言的文档类型声明, 它的目 的是告诉浏览器(解析器)应该以什么样(<code>html</code> 或 <code>xhtml</code>)的文档类 型定义来解析文档, 不同的渲染模式会影响浏览器对 CSS 代码甚⾄ JavaScript 脚本的解析。<br><span class="color-error">它必须声明在 HTML ⽂档的第⼀⾏。</span> 浏览器渲染页面的两种模式</p><p>可通过 <code>document.compatMode</code>获取</p><p><code>CSS1Compat</code>: <span class="color-success">标准模式(Strick mode)</span><br> 默认模式, 浏览器使用 W3C 的标准解析渲染页面。<br> 在标准模式中, 浏览器以其支持的最高标准呈现页面。</p><p><code>BackCompat</code>: <span class="color-warn">怪异模式(混杂模式)(Quick mode)</span><br> 浏览器使用自己的怪异模式解析渲染页面。<br> 在怪异模式中, 页面以一种比较宽松的向后兼容的方式显示。</p></blockquote><h2 id="script-标签中-defer-和-async-的区别" tabindex="-1">script 标签中 defer 和 async 的区别 <a class="header-anchor" href="#script-标签中-defer-和-async-的区别" aria-label="Permalink to &quot;script 标签中 defer 和 async 的区别&quot;">​</a></h2><blockquote><p>如果没有 defer 或 async 属性, 浏览器会立即加载并执行相应的脚本。 它不会等待后续加载的文档元素, 读取到就会开始加载和执行, 这样 就阻塞了后续文档的加载。</p></blockquote><p>下图可以直观的看出三者之间的区别:</p><p><img src="'+s+`" alt="image"></p><p>其中 <span class="color-info">蓝色</span> 代表 <code>js</code> 脚本<code>网络加载时间</code>, <span class="color-error">红色</span> 代表 <code>js</code> 脚本<code>执行时间</code>, <span class="color-success">绿 色</span> 代表 <code>html 解析</code>。</p><p>defer 和 async 属性都是去异步加载外部的 JS 脚本文件, 它们都不会阻塞页面的解析, 其区别如下:</p><ul><li>执行顺序 <ul><li>多个带 <code>async</code> 属性的标签, 不能保证加载的顺序</li><li>多个带 <code>defer</code> 属性的标签, 按照加载顺序执行</li></ul></li><li>脚本是否并行执行 <ul><li><code>async</code> 属性, 表示后续文档的加载和执行与 js 脚本的加载和执行是并行进行的, 即异步执行</li><li><code>defer</code> 属性, 加载后续文档的过程和 js 脚本的加载(此时仅加载不执行)是并行进行的(异步), js 脚本需要等到文档所有元素解析完成之后, DOMContentLoaded 事件触发执行之前, 才执行.</li></ul></li></ul><h2 id="行内元素有哪些-块级元素有哪些-空-void-元素有那些" tabindex="-1">行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？ <a class="header-anchor" href="#行内元素有哪些-块级元素有哪些-空-void-元素有那些" aria-label="Permalink to &quot;行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？&quot;">​</a></h2><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">行内元素有: a b span img input select strong；</span></span>
<span class="line"><span style="color:#A6ACCD;">块级元素有: div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p；</span></span>
<span class="line"><span style="color:#A6ACCD;">空元素, 即没有内容的 HTML 元素。空元素是在开始标签中关闭的,</span></span>
<span class="line"><span style="color:#A6ACCD;">也就是空元素没有闭合标签:</span></span>
<span class="line"><span style="color:#A6ACCD;">常见的有: &lt;br&gt;、&lt;hr&gt;、&lt;img&gt;、&lt;input&gt;、&lt;link&gt;、&lt;meta&gt;；</span></span>
<span class="line"><span style="color:#A6ACCD;">鲜见的有: &lt;area&gt;、&lt;base&gt;、&lt;col&gt;、&lt;colgroup&gt;、&lt;command&gt;、&lt;embed&gt;、</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;keygen&gt;、&lt;param&gt;、&lt;source&gt;、&lt;track&gt;、&lt;wbr&gt;。</span></span>
<span class="line"></span></code></pre></div><h2 id="浏览器是如何对-html5-的离线储存资源进行管理和加载" tabindex="-1">浏览器是如何对 HTML5 的离线储存资源进行管理和加载？ <a class="header-anchor" href="#浏览器是如何对-html5-的离线储存资源进行管理和加载" aria-label="Permalink to &quot;浏览器是如何对 HTML5 的离线储存资源进行管理和加载？&quot;">​</a></h2><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Manifest" target="_blank" rel="noreferrer">MDN Manifest</a></p><p>在线的情况下, 浏览器发现 <code>html</code> 头部有 <code>manifest</code> 属性, 它会请求 <code>manifest</code> 文件, 如果是第一次访问页面 , 那么浏览器就会根据 <code>manifest</code> 文件的内容下载相应的资源并且进行离线存储。如果已经 访问过页面并且资源已经进行离线存储了, 那么浏览器就会使用离线 的资源加载页面, 然后浏览器会对比新的 <code>manifest</code> 文件与旧的 <code>manifest</code> 文件, 如果文件没有发生改变, 就不做任何操作, 如果文 件改变了, 就会重新下载文件中的资源并进行离线存储。 离线的情况下, 浏览器会直接使用离线存储的资源。</p><h2 id="canvas-和-svg-的区别" tabindex="-1">Canvas 和 SVG 的区别 <a class="header-anchor" href="#canvas-和-svg-的区别" aria-label="Permalink to &quot;Canvas 和 SVG 的区别&quot;">​</a></h2><h3 id="svg" tabindex="-1">SVG <a class="header-anchor" href="#svg" aria-label="Permalink to &quot;SVG&quot;">​</a></h3><blockquote><p>SVG 可缩放矢量图形（Scalable Vector Graphics）是基于可扩展标 记语言 XML 描述的 2D 图形的语言, SVG 基于 XML 就意味着 SVG DOM 中的每个元素都是可用的, 可以为某个元素附加 Javascript 事件处 理器。在 SVG 中, 每个被绘制的图形均被视为对象。如果 SVG 对象 的属性发生变化, 那么浏览器能够自动重现图形。</p></blockquote><ul><li>其特点如下: <ul><li>不依赖分辨率</li><li>支持事件处理器</li><li>最适合带有大型渲染区域的应用程序（比如谷歌地图）</li><li>复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）</li><li>不适合游戏应用</li></ul></li></ul><h3 id="canvas" tabindex="-1">Canvas <a class="header-anchor" href="#canvas" aria-label="Permalink to &quot;Canvas&quot;">​</a></h3><blockquote><p>Canvas 是画布, 通过 Javascript 来绘制 2D 图形, 是逐像素进行渲 染的。其位置发生改变, 就会重新进行绘制。</p></blockquote><ul><li>其特点如下: <ul><li>依赖分辨率</li><li>不支持事件处理器</li><li>弱的文本渲染能力</li><li>能够以 .png 或 .jpg 格式保存结果图像</li><li>最适合图像密集型的游戏, 其中的许多对象会被频繁重绘</li></ul></li></ul><div class="tip custom-block"><p class="custom-block-title">提示</p><p>注: 矢量图, 也称为面向对象的图像或绘图图像, 在数学上定义为一 系列由线连接的点。矢量文件中的图形元素称为对象。每个对象都是 一个自成一体的实体, 它具有颜色、形状、轮廓、大小和屏幕位置等 属性。</p></div><h2 id="说一下-html5-drag-api" tabindex="-1">说一下 HTML5 drag API <a class="header-anchor" href="#说一下-html5-drag-api" aria-label="Permalink to &quot;说一下 HTML5 drag API&quot;">​</a></h2><ul><li><code>dragstart</code>: 事件主体是被拖放元素, 在开始拖放被拖放元素时触发。</li><li><code>darg</code>: 事件主体是被拖放元素, 在正在拖放被拖放元素时触发。</li><li><code>dragenter</code>: 事件主体是目标元素, 在被拖放元素进入某元素时触发。</li><li><code>dragover</code>: 事件主体是目标元素, 在被拖放在某元素内移动时触发。</li><li><code>dragleave</code>: 事件主体是目标元素, 在被拖放元素移出目标元素是触发。</li><li><code>drop</code>: 事件主体是目标元素, 在目标元素完全接受被拖放元素时触发。</li><li><code>dragend</code>: 事件主体是被拖放元素, 在整个拖放操作结束时触发。</li></ul>`,28),i=[c];function n(r,d,p,h,m,u){return e(),l("div",null,i)}const f=a(t,[["render",n]]);export{b as __pageData,f as default};
