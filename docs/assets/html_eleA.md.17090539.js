import{_ as s,o as a,c as l,N as o}from"./chunks/framework.7e203a6d.js";const h=JSON.parse('{"title":"a 元素","description":"","frontmatter":{},"headers":[],"relativePath":"html/eleA.md"}'),n={name:"html/eleA.md"},p=o(`<h1 id="a-元素" tabindex="-1">a 元素 <a class="header-anchor" href="#a-元素" aria-label="Permalink to &quot;a 元素&quot;">​</a></h1><blockquote><p>超链接 <a href="https://image.baidu.com/search/index?tn=baiduimage&amp;word=%E7%BE%8E%E5%A5%B3" target="_blank">点一下看美女</a></p></blockquote><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://image.baidu.com/search/index?tn=baiduimage&amp;word=%E7%BE%8E%E5%A5%B3</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">123</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">target</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">_blank</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  点一下看美女</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="href-属性" tabindex="-1">href 属性 <a class="header-anchor" href="#href-属性" aria-label="Permalink to &quot;href 属性&quot;">​</a></h2><blockquote><p>全称 hyper reference</p><blockquote><p>通常表示跳转地址</p></blockquote></blockquote><ul><li><p>普通链接</p><ol><li>值里面写了<span class="color-success">协议名称</span><code>http</code> 或者 <code>https</code> 那无所谓</li><li>如果没写 当前网站是什么协议 访问出去就是什么协议</li><li><code>http</code> 和 <code>https</code> 是不能相互访问的 一般网站都是通过 <code>nginx</code> 之类的配置实现的 <span class="color-info">均可访问</span></li></ol></li><li><p>锚链接</p></li></ul><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#chapter1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">章节1</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#chapter2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">章节2</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h2</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">chapter1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">章节1</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h2</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h2</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">chapter2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">章节2</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h2</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><ul><li>就是在 <code>Url</code> 后置上面添加 <code>#chapter1</code> 页面就主动滚动到 <code>id</code> 是 <code>chapter1</code> 的位置了</li><li>右侧导航栏展示当前效果</li></ul><h2 id="id-属性" tabindex="-1">id 属性 <a class="header-anchor" href="#id-属性" aria-label="Permalink to &quot;id 属性&quot;">​</a></h2><blockquote><p>全局属性，表示元素在文档中的唯一编号</p></blockquote><h2 id="target-属性" tabindex="-1">target 属性 <a class="header-anchor" href="#target-属性" aria-label="Permalink to &quot;target 属性&quot;">​</a></h2><blockquote><p>表示跳转窗口位置。</p></blockquote><p>target 的取值：</p><ul><li><code>_self</code> 在当前页面窗口中打开，默认值</li><li><code>_blank</code> 在新窗口中打开</li></ul><h2 id="功能链接" tabindex="-1">功能链接 <a class="header-anchor" href="#功能链接" aria-label="Permalink to &quot;功能链接&quot;">​</a></h2><blockquote><p>点击后，触发某个功能</p></blockquote><p><a href="javascript:alert(&#39;你好！&#39;)"> 弹出：你好！ </a></p><p><a href="mailto:yanjinke2008@gmail.com"> 点击给我发送邮件 </a></p><p><a href="tel:13601834080"> 点击给我拨打电话 </a></p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">javascript:alert(&#39;你好！&#39;)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> 弹出：你好！ </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">mailto:yanjinke2008@gmail.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> 点击给我发送邮件 </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">tel:13601834080</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> 点击给我拨打电话 </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><ul><li><span class="color-info">执行 JS 代码</span> <code>javascript:</code></li><li><span class="color-info">发送邮件</span> <code>mailto:</code> 要求用户计算机上安装有邮件发送软件</li><li><span class="color-info">拨号</span> <code>tel:</code> 要求用户计算机上安装有拨号软件，或使用的是移动端访问</li></ul>`,21),e=[p];function t(c,r,D,F,i,y){return a(),l("div",null,e)}const u=s(n,[["render",t]]);export{h as __pageData,u as default};
