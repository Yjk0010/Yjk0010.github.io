import{_ as e,o,c as n,N as d}from"./chunks/framework.72c3014c.js";const m=JSON.parse('{"title":"短面试题","description":"","frontmatter":{},"headers":[],"relativePath":"js/interviewQuestion/main.md"}'),c={name:"js/interviewQuestion/main.md"},t=d('<h1 id="短面试题" tabindex="-1">短面试题 <a class="header-anchor" href="#短面试题" aria-label="Permalink to &quot;短面试题&quot;">​</a></h1><h2 id="null-和-undefined-区别" tabindex="-1">null 和 undefined 区别 <a class="header-anchor" href="#null-和-undefined-区别" aria-label="Permalink to &quot;null 和 undefined 区别&quot;">​</a></h2><blockquote><p>首先 Undefined 和 Null 都是基本数据类型, 这两个基本数据类型 分别都只有一个值, 就是 undefined 和 null。</p></blockquote><ul><li><p><code>undefined</code> 代表的含义是 <span class="cor-da">未定义</span></p></li><li><p><code>null</code> 代表的含义是 <span class="cor-tip">空对象</span></p><blockquote><p>一般变量声明了但还没有定义的时候会返回 undefined</p><p>null 主要用于赋值给一些可能会返回对象的变量, 作为初始化。</p></blockquote></li></ul><div class="warning custom-block"><p class="custom-block-title">提示</p><p>undefined 在 JavaScript 中不是一个保留字, 这意味着可以使用 undefined 来作为一个变量名, 但是这样的做法是非常危险的, 它会 影响对 undefined 值的判断。我们可以通过一些方法获得安全的 undefined 值, 比如说 void 0。</p></div><ul><li>当对这两种类型使用 <em>typeof</em> 进行判断时, Null 类型化会返回 <em>object</em> 。 <blockquote><p>是因位在之前 <code>32</code> 位计算机中为了方便保存 <code>object</code> 类型 设置的 <code>object</code> 机器码 是用 <code>000</code> 开头的 然而 <code>null</code> 的所有位都是 <code>0</code> 所以 被 <code>typeof</code> 类型推导为 <code>object</code></p></blockquote></li></ul>',6),l=[t];function a(i,u,s,p,r,_){return o(),n("div",null,l)}const b=e(c,[["render",a]]);export{m as __pageData,b as default};
