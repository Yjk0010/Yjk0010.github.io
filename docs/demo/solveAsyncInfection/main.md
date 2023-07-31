# 处理异步传染 <Badge type="tip">听说好像是个字节面试题</Badge>

<script setup>
import asyncInfection from "./asyncInfection.vue"
import demo from "./index.vue"
import timeLine from "./assets/timeLine.jpg"
import timeLine_dark from "./assets/timeLine_dark.jpg"
</script>

## 什么是异步传染？

> 要消除`异步传染性`首先要了解什么是`异步传染性`

先展示一个异步代码，实现了点击之后将异步获取图片。

<asyncInfection></asyncInfection>

::: details 点击展开 代码展示
<<< @/demo/solveAsyncInfection/asyncInfection.vue
:::

该功能代码中主要方法就是 **getImage(获取图片)** 方法，但是在它书写的时候由于是异步处理，
所以影响了 **controlLoading(loading 控制)** 方法，将该方法也`污染`成为`异步方法`，进而影响到了 **btnClick(点击事件)** 方法，
将其也影响成为`异步方法`。

> controlLoading 是我 <span class="cor-wa">故意</span> 加在当前函数中的为了解释异步影响，别让大家觉得这个博主写的代码这么。。。。

这样的污染看起来，在代码层面理解确实是挺正常的，中间有异步方法那么就把这个方法放到微队列中执行等待结果在返回主线程处理。很正确！但是总觉得这玩意有点恶心。。。

尤其是如果一个方法在 **纯函数** 中的话，这样的调用就真的让人难受的一匹。

写个伪代码展示一下

::: details 点击展开

这种操作 一个 **getData** 方法 影响调用它的 **f1** **f2** **f3** **main** 通通变成异步方法

```javascript
async function getData() {
  console.log("getData");
  const data = await fetch("https://xxx.xxx.xxx/api/data");
  console.log("getData已经获取到数据");
  return data;
}

async function f1() {
  console.log("f1");
  return await getData();
}

async function f2() {
  console.log("f2");
  return await f1();
}

async function f3() {
  console.log("f3");
  return await f2();
}

async function main() {
  console.log("main");
  const data = await f3();
  console.log("data", data);
}

main();
```

:::
<span class="cor-tip">这就叫异步传染</span>

## 原因解释

先看看上面的伪代码的按照时间线调用顺序。

<PicViewer title="时间线调用" alt=" " :src="timeLine" :darkSrc="timeLine_dark"></PicViewer>

> 调用栈使用情况是 **main->f3->f2->f1->getData** 在这出现异步操作。  
> 然后等异步结束之后。  
> 执行栈在一步一步 **getData->f1->f2->f3->main** 释放执行栈空间。

但是我们要消除异步的传染性，首先就得把当前函数变成`同步函数`。  
但是`同步函数`的话将不会等待异步处理，所以我们要开始讲解了。。。

## 首先是设计思维

遇到这样的要求，其实路最重要。

- 首先第一点，处理异步
  - 遇到异步的时候应该停止，并且告诉使用者这是个同步函数，那么这个操作就要报错处理
  - 但是报错处理时候，我们仍然还是要发异步请求
  - 虽然报错导致函数停止在 getData 函数中，但是看图 如果异步请求发送了 那么网络请求就会继续走完他的生命周期
  - 然后等到网络请求成功之后将结果保存在一个变量中
- 第二点，处理报错
  - 通过报错返回的内容控制函数重新执行
  -

<demo></demo>

## 代码实现

::: details 点击展开

<<< @/demo/solveAsyncInfection/index.vue

:::

[视频讲解](https://www.douyin.com/video/7260884471166094603)
