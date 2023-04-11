import{_ as s,o as a,c as l,N as n}from"./chunks/framework.7e203a6d.js";const h=JSON.parse('{"title":"其他元素","description":"","frontmatter":{},"headers":[],"relativePath":"html/eleOther.md"}'),o={name:"html/eleOther.md"},t=n(`<h1 id="其他元素" tabindex="-1">其他元素 <a class="header-anchor" href="#其他元素" aria-label="Permalink to &quot;其他元素&quot;">​</a></h1><h2 id="元素-abbr" tabindex="-1">元素 - abbr <a class="header-anchor" href="#元素-abbr" aria-label="Permalink to &quot;元素 - abbr&quot;">​</a></h2><p>在这个例子中，我们使用 abbr 标签来表示缩写。</p><h3 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h3><p>下面是一个例子：</p><p>这是一个 <abbr title="HyperText Markup Language">HTML</abbr> 文件。</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">这是一个 </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">abbr</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">title</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">HyperText Markup Language</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">HTML</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">abbr</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> 文件。</span></span>
<span class="line"></span></code></pre></div><h3 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h3><h4 id="title" tabindex="-1">title <a class="header-anchor" href="#title" aria-label="Permalink to &quot;title&quot;">​</a></h4><p>可以使用 title 属性来指定完整的单词或短语，以便用户在鼠标悬停在缩写上时可以看到完整解释。</p><p>例如：</p><p>这是一个 <abbr title="Cascading Style Sheets">CSS</abbr> 文件。</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">这是一个 </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">abbr</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">title</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Cascading Style Sheets</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">CSS</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">abbr</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> 文件。</span></span>
<span class="line"></span></code></pre></div><h2 id="元素-time" tabindex="-1">元素 - time <a class="header-anchor" href="#元素-time" aria-label="Permalink to &quot;元素 - time&quot;">​</a></h2><p>HTML 元素<code>&lt;time&gt;</code>表示时间或日期。它是 HTML5 中的新元素。</p><h3 id="常用属性" tabindex="-1">常用属性 <a class="header-anchor" href="#常用属性" aria-label="Permalink to &quot;常用属性&quot;">​</a></h3><h4 id="datetime" tabindex="-1">datetime <a class="header-anchor" href="#datetime" aria-label="Permalink to &quot;datetime&quot;">​</a></h4><p><code>datetime</code>属性定义日期/时间。</p><p>该属性的值是一个机器可读的日期字符串，如 <code>&quot;2023-03-09&quot;</code>（日期），<code>&quot;2023-03-09T09:30:00&quot;</code>（日期和时间）或<code>&quot;2023-03-09T09:30:00Z&quot;</code>（日期和时间，带有 UTC 时区）。</p><h4 id="pubdate" tabindex="-1">pubdate <a class="header-anchor" href="#pubdate" aria-label="Permalink to &quot;pubdate&quot;">​</a></h4><p><code>pubdate</code>属性表示<code>&lt;time&gt;</code>元素所包含的日期/时间是文章的发布日期/时间。</p><p>这个属性仅在嵌套在<code>&lt;article&gt;</code>元素中时才有效，并且仅在其中一个<code>&lt;time&gt;</code>元素中使用。</p><h4 id="datetime-和-pubdate-结合使用" tabindex="-1">datetime 和 pubdate 结合使用 <a class="header-anchor" href="#datetime-和-pubdate-结合使用" aria-label="Permalink to &quot;datetime 和 pubdate 结合使用&quot;">​</a></h4><p><code>datetime</code>和<code>pubdate</code>属性可以结合使用，以标识文章的发布日期/时间以及可能存在的更新日期/时间。</p><h2 id="元素-br" tabindex="-1">元素 - br <a class="header-anchor" href="#元素-br" aria-label="Permalink to &quot;元素 - br&quot;">​</a></h2><p>（line break）用于在文本中插入一个换行符，它没有闭合标签。</p><p>示例代码：</p><p>这是第一行<br> 这是第二行</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">这是第一行</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">br</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">这是第二行</span></span>
<span class="line"></span></code></pre></div><h2 id="元素-link" tabindex="-1">元素 - link <a class="header-anchor" href="#元素-link" aria-label="Permalink to &quot;元素 - link&quot;">​</a></h2><p><code>&lt;link&gt;</code> 元素定义文档与外部资源之间的关系。它通常用于链接样式表（CSS），但也可以用于创建网站图标（favicon）、指定网站图标等其他任务。</p><h3 id="常用属性-1" tabindex="-1">常用属性 <a class="header-anchor" href="#常用属性-1" aria-label="Permalink to &quot;常用属性&quot;">​</a></h3><ul><li><code>href</code>：指定外部资源的 URL。通常用于指定链接到样式表文件的 URL。</li><li><code>rel</code>：定义文档与链接资源之间的关系。在样式表的情况下，通常为 <code>stylesheet</code>。</li><li><code>type</code>：指定链接资源的 MIME 类型。</li></ul><h3 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h3><h4 id="链接到外部样式表" tabindex="-1">链接到外部样式表 <a class="header-anchor" href="#链接到外部样式表" aria-label="Permalink to &quot;链接到外部样式表&quot;">​</a></h4><p>下面的示例演示了如何使用 <code>&lt;link&gt;</code> 元素将一个外部样式表文件链接到 HTML 文档中：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;!</span><span style="color:#F07178;">DOCTYPE</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text/css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">styles.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Hello World!</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="元素-meta" tabindex="-1">元素 - meta <a class="header-anchor" href="#元素-meta" aria-label="Permalink to &quot;元素 - meta&quot;">​</a></h2><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 设置字符编码为UTF-8 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">charset</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">utf-8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 用于响应式设计，自适应调整显示比例 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">viewport</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">width=device-width, initial-scale=1.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 设置IE兼容模式 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">http-equiv</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">X-UA-Compatible</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ie=edge</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 设置网页描述信息 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">description</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">网页描述</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 设置网页关键词 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">keywords</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">关键词1, 关键词2, 关键词3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 设置网页作者信息 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">author</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">网页作者</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 设置搜索引擎抓取和索引方式 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">robots</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index, follow</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span></code></pre></div>`,39),e=[t];function p(c,r,D,F,y,i){return a(),l("div",null,e)}const u=s(o,[["render",p]]);export{h as __pageData,u as default};