# 节流和防抖

> 要想了解防抖和节流首先要先知道他的应用场景  
> 这里就要首先引入一个感念 <span class="cor-da">高频函数</span>
> 例如 <span class="cor-tip">浏览器监听事件</span> 的不间断执行  
> 或者在用户疯狂点击一个按钮的时候
> 都可以看作是 `高频函数`

## 什么是防抖

> 触发高频事件后 <span class="cor-wa">n 秒后</span> 函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间

### 直接撸一个防抖

```javascript
function debounce(fn, interval = 500) {
  let timeout = null;
  // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout);
    // 每当用户输入的时候把前一个 setTimeout clear 掉
    timeout = setTimeout(() => {
      // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的interval
      // 间隔内如果还有字符输入的话，就不会执行fn 函数
      fn.apply(this, arguments);
    }, interval);
  };
}
// 假设这边有一个input  触发input事件会触发sayHi
function sayHi() {
  console.log("防抖成功");
}
// 使用防抖函数可以减少他的触发次数
var inp = document.getElementById("inp");
inp.addEventListener("input", debounce(sayHi)); // 防抖
```

## 什么是节流

> 高频事件触发，但在 <span class="cor-wa">n 秒内</span> 只会执 行一次，所以节流会稀释函数的执行频率。

### 直接撸一个节流

```javascript
function throttle(fn, interval = 500) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return;
    // 在函数开头判断标记是否为 true，不为 true 则return
    canRun = false; // 立即设置为 false
    setTimeout(() => {
      // 将外部传入的函数的执行放在 setTimeout 中
      fn.apply(this, arguments);
      // 最后在 setTimeout 执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
      // 当定时器没有执行的时候标记永远是false，在开头被 return 掉
      canRun = true;
    }, interval);
  };
}

function sayHi(e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener("resize", throttle(sayHi));
```
