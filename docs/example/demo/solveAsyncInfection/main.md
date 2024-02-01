# 消除异步的传染性 <Badge type="tip">听说好像是个字节面试题</Badge>

<script setup>
import demo from "./index.vue"
import timeLine from "./assets/timeLine.png"
import timeLine_dark from "./assets/timeLine-dark.png"
import thinking from "./assets/thinking.png"
import thinking_dark from "./assets/thinking-dark.png"
</script>

## 什么是异步传染？

> 要消除`异步传染性`首先要了解什么是`异步传染性`

先展示一个异步代码，实现了点击之后将异步获取图片。

<demo></demo>

::: details 点击展开 代码展示
<<< @/example/demo/solveAsyncInfection/index.vue
:::

该功能代码中主要方法就是 **getImage(获取图片)** 方法，但是在它书写的时候由于是异步处理，
所以影响了 **controlLoading(loading 控制)** 方法，将该方法也`污染`成为`异步方法`，进而影响到了 **btnClick(点击事件)** 方法，
将其也影响成为`异步方法`。

> controlLoading 是我<TText type="warning">故意</TText>加在当前函数中的为了解释异步影响，别让大家觉得这个博主写的代码这么。。。。

这样的污染看起来，在代码层面理解确实是挺正常的，中间有异步方法那么就把这个方法放到微队列中执行等待结果在返回主线程处理。很正确！但是总觉得这玩意有点恶心。。。

尤其是如果一个方法在 **纯函数** 中的话，这样的调用就真的让人难受的一匹。

## 示例代码

写个示例代码展示一下

这种操作 一个 **myFetch** 方法 影响调用它的 **f1** **f2** **f3** **main** 通通变成异步方法

```javascript
// 异步方法
myFetch = async () => {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => resolve("这里返回数据"), 1000);
  });
  return data;
};
// 被传染的同步函数
async function f1() {
  return await myFetch();
}
// 被传染的同步函数
async function f2() {
  return await f1();
}
// 被传染的同步函数
async function f3() {
  return await f2();
}
// 被传染的同步函数
async function main() {
  const data = await f3();
  console.log(data);
}
main();
```

<TText>这就叫异步传染</TText>

## 原因解释

先看看上面的示例代码按照时间线调用情况。

<PicViewer title="时间线调用" alt=" " :src="timeLine" :darkSrc="timeLine_dark"></PicViewer>

> 调用栈使用情况是 **main->f3->f2->f1->myFetch** 在这出现异步操作。  
> 然后等异步结束之后。  
> 执行栈在一步一步 **myFetch->f1->f2->f3->main** 释放执行栈空间。

中间的请求数据操作会导致<TText>时间线</TText>后面的函数需要等待才能执行，  
所以要解决异步处理就需要 **重新设计异步流程**

## 设计

遇到这样的问题，理清楚思路才好解决问题。

- 目的 ~~ 让`异步函数`转变为可以通过`同步`调用
- 问题
  1. 异步需要等待如何同步调用
     - 首先执行异步函数 不等待结果
     - 然后再异步调用成功之后再次执行原函数
  2. 如何执型异步函数但是不等待
     - 第一次处理时候 **发送请求**
     - 然后通过<TText type="danger">报错</TText>,来<TText type="warning">取消</TText>之前函数调用
  3. 对宿主环境产生影响
     - 提供一个新的执行环境
     - 保存原有 **myFetch** 函数实现
     - 重新实现 **myFetch** 函数 并调用 原有 **myFetch** 发送请求
  4. 如何取得数据
     - 等待请求结果出现时 将其 _缓存_ 到一个地方
     - 再次调再次执行原函数<TText>命中</TText>缓存直接返回

> 这样就实现了同步调用异步方法,虽然还是要等待请求结果但是同步处理的纯函数就不需要书写 **async** **await** 关键字了。

<PicViewer title="思路流程" alt=" " :src="thinking" :darkSrc="thinking_dark"></PicViewer>

## 示例代码实现

```javascript
// 注意这里是let声明 后面要变更的
let myFetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("这里成功返回数据"), 1000);
  });
};
function m1() {
  return myFetch();
}
function m2() {
  return m1();
}

function m3() {
  return m2();
}
function main() {
  console.log("main调用了");
  const { status, data } = m3();
  console.log("data", data, status);
}
// run函数提供执行环境
function run(func) {
  // 定义cache来进行缓存
  const cache = {
    status: "pending",
    data: null,
    err: null,
  };
  // 将原来异步函数进行缓存
  const beforeAsyncFn = myFetch;
  // 重写myFetch函数
  myFetch = (...args) => {
    // 如果发现状态已经不是pending 就返回
    if (cache.status !== "pending") return cache;
    // 通过抛出错误来执行异步数据请求
    throw beforeAsyncFn(...args)
      .then((res) => {
        // 成功更改缓存状态
        cache.status = "fulfilled";
        cache.data = res;
      })
      .catch((err) => {
        // 失败改变缓存状态
        cache.status = "rejected";
        cache.err = err;
      });
  };
  try {
    // 使用try 调用原函数 捕获错误
    func();
  } catch (err) {
    // 判断返回值是否是是promise
    // 这个判断并不严谨因为有些异步函数并不都是promise 这个具体情况要针对性看待
    if (err instanceof Promise) {
      // 当通过异常抛出的 promise 发生回调 重新调用 原函数
      err.finally(() => {
        func();
        // 还原原始请求方法 不造成污染
        myFetch = beforeAsyncFn;
      });
    }
  }
}
// 运行
run(main);
```

## 优缺点

<TText>优点</TText>：编写代码时直接编写同步代码即可，不需要使用 **async、await**  
<TText type="danger">缺点</TText>：函数需要多次重复执行，**async、await** 只需要执行一次。假如函数有其他大量计算，将影响性能  
<TText type="warning">共同点</TText>：仍然是异步有结果后，才能真正进行下一步操作

[视频讲解](https://www.douyin.com/search/渡一前端必修课_消除异步的传染性)
