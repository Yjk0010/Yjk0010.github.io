import{_ as a,o as e,c as o,N as t}from"./chunks/framework.72c3014c.js";const m=JSON.parse('{"title":"路径的写法","description":"","frontmatter":{},"headers":[],"relativePath":"home/route.md"}'),l={name:"home/route.md"},s=t(`<h1 id="路径的写法" tabindex="-1">路径的写法 <a class="header-anchor" href="#路径的写法" aria-label="Permalink to &quot;路径的写法&quot;">​</a></h1><h2 id="站内资源和站外资源" tabindex="-1">站内资源和站外资源 <a class="header-anchor" href="#站内资源和站外资源" aria-label="Permalink to &quot;站内资源和站外资源&quot;">​</a></h2><ul><li><p>站内资源：当前网站的资源</p></li><li><p>站外资源：非当前网站的资源</p></li></ul><h2 id="绝对路径和相对路径" tabindex="-1">绝对路径和相对路径 <a class="header-anchor" href="#绝对路径和相对路径" aria-label="Permalink to &quot;绝对路径和相对路径&quot;">​</a></h2><p>推荐写法</p><ul><li><p>站外资源：绝对路径</p></li><li><p>站内资源：相对路径</p></li></ul><h2 id="绝对路径" tabindex="-1">绝对路径 <a class="header-anchor" href="#绝对路径" aria-label="Permalink to &quot;绝对路径&quot;">​</a></h2><blockquote><p>绝对路径 可以理解成绝对地址</p></blockquote><p>url 地址：</p><div class="language-md"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">协议名://主机名:端口号/路径</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">schema://host:port/path</span></span>
<span class="line"></span></code></pre></div><p>当跳转目标和当前页面的协议相同时，可以省略协议</p><h2 id="相对路径" tabindex="-1">相对路径 <a class="header-anchor" href="#相对路径" aria-label="Permalink to &quot;相对路径&quot;">​</a></h2><blockquote><p>相对路径是相对于当前文件位置的</p></blockquote><p>以<code>./</code>开头，<code>./</code>表示当前资源所在的目录</p><p>可以书写<code>../</code>表示返回上一级目录</p><p>相对路径中：<code>./</code>可以省略</p>`,16),n=[s];function p(c,r,i,d,h,u){return e(),o("div",null,n)}const b=a(l,[["render",p]]);export{m as __pageData,b as default};
