<script setup>
import test1 from "/components/PicViewer/test1.vue"
import test2 from "/components/PicViewer/test2.vue"
import test3 from "/components/PicViewer/test3.vue"
import test4 from "/components/PicViewer/test4.vue"
import test5 from "/components/PicViewer/test5.vue"
import test6 from "/components/PicViewer/test6.vue"
import test7 from "/components/PicViewer/test7.vue"
</script>

# 图片组件

## 图片组件展示

> 景色图片均通过 <span class="cor-tip">AI 生成</span>

<PicViewer title="图片组件展示" src="/assets/components/scenery-1.jpg"></PicViewer>

```javascript
<PicViewer
  title="图片组件展示"
  src="/assets/components/scenery-1.jpg"
></PicViewer>
```

## vite 对图片加载引用的介绍

首先 `vite` 在图片资源的处理上有一些不同于 `webpack`,在 `webpack` 中常用的 `require` 在 `vite` 中不存在。

> 所以在这里简单介绍一下 vite 图片资源引用的问题。

首先图片资源的引用有`相对路径`和`绝对路径`之分，还有`打包前`和`打包后`增加`文件指纹`之分。

路径问题先上一些图片位置图
<PicViewer
  title="文件位置图"
  src="/assets/components/fileImg-1.jpg"
  alt="该位置位于public/assets文件目录下，该文件的资源将不会被增加文件指纹">
</PicViewer>
<PicViewer
  title="文件位置图"
  src="/assets/components/fileImg-2.jpg"
  alt="该位置位于当前文件目录下，该文件的资源将会增加文件指纹">
</PicViewer>

## 以下是图片资源引用的情况

### 第一种 - 静态引入

> 使用地址是 public 文件夹(静态资源路径/根地址路径)下的文件，结果

主要代码

- <span class="cor-tip">优点</span> 开发生产环境都可以使用
- <span class="cor-da">缺点</span> 但是不是相对路径不能让图片文件放到随意文件夹
- <span class="cor-da">缺点</span> 而且没有图片指纹容易在更新文件时候导致资源不加载最新文件

> 因为直接使用静态资源路径，就等于直接访问图片，不经过打包所以不出问题

<test1></test1>

::: details 调用代码展示
<<< @/components/PicViewer/test1.vue
:::

### 第二种 - 相对路径

> 直接使用相对路径

- <span class="cor-da">缺点</span> 开发生产图片都不展示，不可用

> 直接使用相对路径，组件`声明位置`和`文档展示位置`不同,(受资源位置限制太大)  
> 所以相对路径拿不到相应的文件所以展示不了

<test2></test2>

::: details 调用代码展示
<<< @/components/PicViewer/test2.vue
:::

### 第三种 - new URL(静态)

> new URL 引入，new URL 是 vite 提供的静态资源引用方法

主要代码

```javascript
const imageUrl = new URL("./assets/scenery-1.jpg", import.meta.url).href;
```

- <span class="cor-da">缺点</span> 开发环境没问题，生产环境刷新页面之后丢失
- <span class="cor-tip">优点</span> 可以放在任意文件夹
- <span class="cor-da">缺点</span> 但是在加载的时候 必须显示的使用 new URL 引入资源 有点蠢

> new URL(静态) 引入 会动态解析资源映射关系所以可以使用

<test3></test3>

::: details 调用代码展示
<<< @/components/PicViewer/test3.vue
:::

### 第四种 - new URL(动态)

> new URL 引入，new URL 是 vite 提供的静态资源引用方法

主要代码

```javascript
const newURLAll = import.meta.glob([
  "./assets/*.jpg",
  "./assets/*.png",
  "./assets/*.gif",
]);
const imageMap: Map<string, string> = new Map();
for (const path in newURLAll) {
  // `${path}` 这里是动态的
  imageMap.set(path, new URL(`${path}`, import.meta.url).href);
}
```

- <span class="cor-da">缺点</span> 开发可以，但是生产不行
- <span class="cor-tip">优点</span> 可以放在任意文件夹
- <span class="cor-tip">小优点</span> 在加载的时候 可以使用循环方式引入图片资源

> new URL(动态) 引入 使用变量来控制图片加载，vite 将不解析。
>
> 在生产构建时，Vite 才会进行必要的转换保证 URL 在打包和资源哈希后仍指向正确的地址。然而，这个 URL 字符串必须是静态的，这样才好分析。否则代码将被原样保留、因而在 build.target 不支持 import.meta.url 时会导致运行时错误。
>
> [vite 对于动态引入的解释](https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url)

<test4></test4>

::: details 调用代码展示
<<< @/components/PicViewer/test4.vue
:::

### 第五种 - imageUrl 方法

> imageUrl 方法 通过一个方法传值来进行图片调用 使用的还是 new URL 方法但是转换成半静态了

主要代码

```javascript
const imageUrl = (url: string) => {
  // `./assets/${url}` 这个在vite的理解中是静态的
  const obj = new URL(`./assets/${url}`, import.meta.url);
  return obj.pathname;
};
```

- <span class="cor-da">缺点</span> 开发环境没问题，生产环境刷新页面之后丢失
- <span class="cor-tip">优点</span> 可以放在任意文件夹
- <span class="cor-tip">优点</span> 在加载的时候 只需要传一个文件名 但是限制了当前路径的 `assets` 文件夹

> new URL 在 `./assets/${url}` 代码中被理解成静态代码，所以进行资源映射处理。

<test5></test5>

::: details 调用代码展示
<<< @/components/PicViewer/test5.vue
:::

### 第六种 - import

> import 引入

- <span class="cor-tip">优点</span> 开发生产都可以使用图片，没问题
- <span class="cor-tip">优点</span> 可以放在任意文件夹
- <span class="cor-da">缺点</span> 但是在加载的时候 必须显示的使用 import 引入资源 有点蠢

> import 引入 会动态解析资源映射关系所以可以使用

<test6></test6>

::: details 调用代码展示
<<< @/components/PicViewer/test6.vue
:::

### 第七种 - import.meta.glob

> import.meta.glob 引入

- <span class="cor-tip">优点</span> 开发生产都可以使用图片，没问题
- <span class="cor-tip">优点</span> 可以放在任意文件夹
- <span class="cor-tip">优点</span> 在加载的时候 可以使用一个导入方法加载完所有图片

```javascript
import.meta.glob(["./assets/*.jpg", "./assets/*.png", "./assets/*.gif"], {
  eager: true,
  import: "default",
});
```

> 该语句是 vite 的资源引入语句 [import.meta.glob](https://cn.vitejs.dev/guide/features.html#glob-import)

- `["./assets/*.jpg", "./assets/*.png","./assets/*.gif"]` :
  匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的
  chunk
- `eager: true` : 直接引入所有的模块
- `import: "default"` : import 为 default 可以加载默认导出

<test7></test7>

::: details 调用代码展示
<<< @/components/PicViewer/test7.vue
:::

## 总结

在 vite 静态资源引用中 单个文件引用使用 <span class="cor-tip">import</span> 是最方便的，多个文件引用的话推荐使用 <span class="cor-tip">import.meta.glob</span> 方法
