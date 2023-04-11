import{_ as a,o as e,c as o,N as l}from"./chunks/framework.7e203a6d.js";const b=JSON.parse('{"title":"层叠 Cascading","description":"","frontmatter":{},"headers":[],"relativePath":"css/terminology/cascade.md"}'),t={name:"css/terminology/cascade.md"},c=l('<h1 id="层叠-cascading" tabindex="-1">层叠 Cascading <a class="header-anchor" href="#层叠-cascading" aria-label="Permalink to &quot;层叠 Cascading&quot;">​</a></h1><p>声明冲突: 同一个样式，多次应用到同一个元素</p><p>层叠: 解决声明冲突的过程，浏览器自动处理（权重计算）</p><h2 id="比较重要性" tabindex="-1">比较重要性 <a class="header-anchor" href="#比较重要性" aria-label="Permalink to &quot;比较重要性&quot;">​</a></h2><p>重要性从高到底:</p><blockquote><p>作者样式表: 开发者书写的样式</p></blockquote><ol><li>作者样式表中的!important 样式</li><li>作者样式表中的普通样式</li><li>浏览器默认样式表中的样式</li></ol><h2 id="比较特殊性" tabindex="-1">比较特殊性 <a class="header-anchor" href="#比较特殊性" aria-label="Permalink to &quot;比较特殊性&quot;">​</a></h2><blockquote><p>看选择器</p></blockquote><ul><li><p>总体规则: 选择器选中的范围越窄，越特殊</p></li><li><p>具体规则: 通过选择器，计算出一个 4 位数<code>（x x x x）</code></p></li></ul><ol><li><span class="color-success">千位: </span>如果是内联样式，记 1，否则记 0</li><li><span class="color-error">百位: </span>等于选择器中所有 id 选择器的数量</li><li><span class="color-warn">十位: </span>等于选择器中所有类选择器、属性选择器、伪类选择器的数量</li><li><span class="color-info">个位: </span>等于选择器中所有元素选择器、伪元素选择器的数量</li></ol><h2 id="比较源次序" tabindex="-1">比较源次序 <a class="header-anchor" href="#比较源次序" aria-label="Permalink to &quot;比较源次序&quot;">​</a></h2><blockquote><p>代码书写靠后的胜出</p></blockquote><h2 id="小知识" tabindex="-1">小知识 <a class="header-anchor" href="#小知识" aria-label="Permalink to &quot;小知识&quot;">​</a></h2><blockquote><p>重置样式表</p></blockquote><p>书写一些作者样式，覆盖浏览器的默认样式</p><p>重置样式表 -&gt; 浏览器的默认样式</p><p>常见的重置样式表: normalize.css、reset.css、meyer.css</p><blockquote><p>爱恨法则</p></blockquote><p>link &gt; visited &gt; hover &gt; active</p>',20),s=[c];function i(r,n,p,d,h,u){return e(),o("div",null,s)}const q=a(t,[["render",i]]);export{b as __pageData,q as default};
