# 资源提示关键词

本文主要包含以下内容：

- 渲染阻塞回顾
- _defer_ 和 _async_
- _preload_
- _prefetch_
- _prerender_
- _preconnect_

## 渲染阻塞回顾

我们都知道，_HTML_ 用于描述网页的整体结构.为了理解 _HTML_，浏览器必须将它转为自己能够理解的格式，也就是 _DOM_（文档对象模型）

浏览器引擎有一段特殊的代码，称为解析器，用于将数据从一种格式转换为另一种格式.

<PicViewer title="解析器" src="/assets/browser/resourceTips-1.jpg" alt=""/>

浏览器一点一点地构建 _DOM_.一旦第一块代码进来，它就会开始解析 _HTML_，将节点添加到树结构中.

<PicViewer title="Dom对象构建" src="/assets/browser/resourceTips-2.gif" alt=""/>

构建出来的 _DOM_ 对象，实际上有 _2_ 个作用：

- _HTML_ 文档的结构以对象的方式体现出来，形成我们常说的 _DOM_ 树

- 作为外界的接口供外界使用，例如 _JavaScript_.当我们调用诸如 _document.getElementById_ 的方法时，返回的元素是一个 _DOM_ 节点.每个 _DOM_ 节点都有许多可以用来访问和更改它的函数，用户看到的内容也会相应地发生变化.

<PicViewer title="JS构建" src="/assets/browser/resourceTips-3.gif" alt=""/>

_CSS_ 样式会被映射为 _CSSOM_（ _CSS_ 对象模型），它和 _DOM_ 很相似，但是针对的是 _CSS_ 而不是 _HTML_.

在构建 _CSSOM_ 的时候，无法进行增量构建（不像构建 _DOM_ 一样，解析到一个 _DOM_ 节点就扔到 _DOM_ 树结构里面），因为 _CSS_ 规则是可以相互覆盖的，浏览器引擎需要经过复杂的计算才能弄清楚 _CSS_ 代码如何应用于 _DOM_.

<PicViewer title="CSSOM 构建" src="/assets/browser/resourceTips-4.png" alt=""/>

当浏览器正在构建 _DOM_ 时，如果它遇到 _HTML_ 中的 `<script>...</script>` 标记，它必须立即执行它.如果脚本是外部的，则必须先下载脚本.

过去，为了执行脚本，必须暂停解析.解析会在 _JavaScript_ 引擎执行完脚本中的代码后再次启动.

<PicViewer title="解析停止" src="/assets/browser/resourceTips-5.png" alt=""/>

为什么解析必须停止呢？

原因很简单，这是因为 _Javascript_ 脚本可以改变 _HTML_ 以及根据 _HTML_ 生成的 _DOM_ 树结构.例如，脚本可以通过使用 _document.createElement( )_ 来添加节点从而更改 _DOM_ 结构.

<PicViewer title="js操作变更dom" src="/assets/browser/resourceTips-6.gif" alt=""/>

这也是为什么我们建议将 _script_ 标签写在 _body_ 元素结束标签前面的原因.

```html
<body>
    <!-- HTML Code -->
    <script>
        JS Code...
    </scirpt>
</body>
```

接下来我们回头来看一下 _CSS_ 是否会阻塞渲染.

看上去 _JavaScript_ 会阻止解析，是因为它可以修改文档.那么 _CSS_ 不能修改文档，所以它似乎没有理由阻止解析，对吧？

但是，如果脚本中需要获取一些尚未解析的样式信息怎么办？在 _JavaScript_ 中完全可以访问到 _DOM_ 节点的某些样式，或者使用 _JavaScript_ 直接访问 _CSSOM_.

<PicViewer title="JS操作对dom和cssom的影响" src="/assets/browser/resourceTips-7.png" alt=""/>

因此，_CSS_ 可能会根据文档中外部样式表和脚本的顺序阻止解析.如果在文档中的脚本之前放置了外部样式表，则 _DOM_ 和 _CSSOM_ 对象的构建可能会相互干扰.

当解析器到达一个脚本标签时，在 _JavaScript_ 执行完成之前无法继续构建 _DOM_，然而如果这一段 _JavaScript_ 中涉及到访问和使用 _CSSOM_，那么必须等待 _CSS_ 文件被下载、解析并且 _CSSOM_ 可用.如果 _CSSOM_ 处于未可用状态，则会阻塞 _JavaScript_ 的执行.

<PicViewer title="遇到js要操作的css时等待css加载" src="/assets/browser/resourceTips-8.png" alt=""/>

（上图中 _JavaScript_ 的执行被 _CSS_ 构建 _CSSOM_ 的过程阻塞了）

另外，虽然 _CSS_ 不会阻塞 _DOM_ 的构建，但是也会阻塞渲染.

还记得我们前面有讲过要 _DOM_ 树和 _CSSOM_ 树都准备好，才会生成渲染树（ _Render Tree_ ）么，浏览器在拥有 _DOM_ 和 _CSSOM_ 之前是不会显示任何内容.

这是因为没有 _CSS_ 的页面通常无法使用.如果浏览器向你展示了一个没有 _CSS_ 的凌乱页面，那么片刻之后就会进入一个有样式的页面，不断变化的内容和突然的视觉变化会给用户带来混乱的用户体验.

<PicViewer title="一个不舒服的加载页面过程" src="/assets/browser/resourceTips-9.gif" alt=""/>

（这种糟糕的用户体验有一个名字，叫做“无样式内容闪现”，_Flash of Unstyled Content_，或者简称 _FOUC_ ）

为了解决这些问题，所以我们需要尽快的交付 _CSS_.

这也解释了为什么“顶部样式，底部脚本”被称之为“最佳实践”.

随着现代浏览器的普及，浏览器为我们提供了更多强大的武器（资源提示关键词），合理利用，方可大幅提高页面加载速度.

## _defer_ 和 _async_

现代浏览器引入了 _defer_ 和 _async_.

_async_ 表示加载和渲染后续文档元素的过程将和 _script.js_ 的加载与执行并行进行（异步）.也就是说下载 _JS_ 文件的时候不会阻塞 _DOM_ 树的构建，但是执行该 _JS_ 代码会阻塞 _DOM_ 树的构建.

```html
<script async src="script.js"></script>
```

_defer_ 表示加载后续文档元素的过程将和 _script.js_ 的加载并行进行（异步），但是 _script.js_ 的执行要在所有元素解析完成之后，_DOMContentLoaded_ 事件触发之前完成.也就是说，下载 _JS_ 文件的时候不会阻塞 _DOM_ 树的构建，然后等待 _DOM_ 树构建完毕后再执行此 _JS_ 文件.

```html
<script defer src="myscript.js"></script>
```

具体加载瀑布图如下图所示：

<PicViewer title="瀑布图" src="/assets/browser/resourceTips-10.png" alt=""/>

## _preload_

_preload_ 顾名思义就是一种预加载的方式，它通过声明向浏览器声明一个需要提前加载的资源，当资源真正被使用的时候立即执行，就无需等待网络的消耗.

```html
<link rel="stylesheet" href="style2.css" />
<script src="main2.js"></script>

<link rel="preload" href="style1.css" as="style" />
<link rel="preload" href="main1.js" as="script" />
```

在上面的代码中，会先加载 _style1.css_ 和 _main1.js_ 文件（但不会生效），在随后的页面渲染中，一旦需要使用它们，它们就会立即可用.

可以使用 _as_ 来指定将要预加载的内容类型.

<PicViewer title="预加载" src="/assets/browser/resourceTips-11.png" alt=""/>

_preload_ 指令的一些优点如下：

- 允许浏览器设置资源优先级，从而允许 _Web_ 开发人员优化某些资源的交付.

- 使浏览器能够确定资源类型，因此它可以判断将来是否可以重用相同的资源.

- 浏览器可以通过引用 _as_ 属性中定义的内容来确定请求是否符合内容安全策略.

- 浏览器可以根据资源类型发送合适的 _Accept_ 头（例如：_image/webp_ ）

## _prefetch_

_prefetch_ 是一种利用浏览器的空闲时间加载页面将来可能用到的资源的一种机制，通常可以用于加载非首页的其他页面所需要的资源，以便加快后续页面的首屏速度.

_prefetch_ 加载的资源可以获取非当前页面所需要的资源，并且将其放入缓存至少 _5_ 分钟（无论资源是否可以缓存）.并且，当页面跳转时，未完成的 _prefetch_ 请求不会被中断;

它的用法跟 _preload_ 是一样的：

```html
<link rel="prefetch" href="/path/to/style.css" as="style" />
```

**_DNS prefetching_**

_DNS prefetching_ 允许浏览器在用户浏览时在后台对页面执行 _DNS_ 查找.这最大限度地减少了延迟，因为一旦用户单击链接就已经进行了 _DNS_ 查找.

通过将 _rel="dns-prefetch"_ 标记添加到链接属性，可以将 _DNS prefetching_ 添加到特定 _URL_.建议在诸如 _Web_ 字体、_CDN_ 之类的东西上使用它.

```html
<!-- Prefetch DNS for external assets -->
<link rel="dns-prefetch" href="//fonts.googleapis.com" />
<link rel="dns-prefetch" href="//www.google-analytics.com" />
<link rel="dns-prefetch" href="//cdn.domain.com" />
```

## _prerender_

_prerender_ 与 _prefetch_ 非常相似，_prerender_ 同样也是会收集用户接下来可能会用到的资源.

不同之处在于 _prerender_ 实际上是在后台渲染整个页面.

```html
<link rel="prerender" href="https://www.keycdn.com" />
```

## _preconnect_

我们要讨论的最后一个资源提示是 _preconnect_.

_preconnect_ 指令允许浏览器在 _HTTP_ 请求实际发送到服务器之前设置早期连接.

我们知道，浏览器要建立一个连接，一般需要经过 _DNS_ 查找，_TCP_ 三次握手和 _TLS_ 协商（如果是 _https_ 的话），这些过程都是需要相当的耗时的.所以 _preconnet_，就是一项使浏览器能够预先建立一个连接，等真正需要加载资源的时候就能够直接请求了.

<PicViewer title="preconnect" src="/assets/browser/resourceTips-12.png" alt=""/>

以下是为 _CDN URL_ 启用 _preconnect_ 的示例.

```html
<link href="https://cdn.domain.com" rel="preconnect" crossorigin />
```

在上面的代码中，浏览器会进行以下步骤：

- 解释 _href_ 的属性值，判断是否是合法的 _URL_.如果是合法的 _URL_，然后继续判断 _URL_ 的协议是否是 _http_ 或者 _https_，如果不是合法的 _URL_，则结束处理.
- 如果当前页面 _host_ 不同于 _href_ 属性中的 _host_，那么将不会带上 _cookie_，如果希望带上 _cookie_ 等信息，可以加上 _crossorign_ 属性.

---

-_EOF_-
