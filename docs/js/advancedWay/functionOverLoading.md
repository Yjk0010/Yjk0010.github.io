# 如何使用 js,TS 实现函数重载

## C++机制

> 是 `C++` 语言中的一个重要特性，它允许使用相同的函数名声明多个函数，只要这些函数的参数列表不同，即可实现不同的功能。

上个 c++代码：

```c++
#include <iostream>
std::string fn(const std::string& name) {
    return "我是" + name;
}
std::string fn(const std::string& name, int age) {
    return "我是" + name + ", 我" + std::to_string(age) + "岁了！";
}
int main() {
    std::cout << fn("KingKe") << std::endl; // 我是KingKe
    std::cout << fn("KingKe", 30) << std::endl; // 我是KingKe，我30岁了！
    return 0;
}
```

在此处 `C++`会直接函数重载通过不同调用方式来输出不同结果。

## TS 实现

接下来看一下`TS`的实现过程

```typeScript
function fn(name: string): string; // 方法头 无方法体
function fn(name: string, age?: number): string {
  if (age !== undefined) {
    return `我是${name}，我${age}岁了！`;
  } else {
    return `我是${name}！`;
  }
}
fn("KingKe") // 我是KingKe
fn("KingKe",30) // 我是KingKe，我30岁了！
```

`TS` 实现重载方法主要是通过一个没有 <TText type="warning">函数体</TText> 的 <TText type="success">方法头</TText> 来实现。

<script setup lang="ts">
function fn(name: string): string;
function fn(name: string, age?: number): string {
  if (age) {
    return `我是${name}，我${age}岁了！`;
  } else {
    return `我是${name}！`;
  }
}
</script>

## js 实现

> 那么 问题来了 这个函数重载 JS 要 怎么来实现呢？

我就立马想到了一个东西 `arguments.length`

然后就到了这个写法

```javascript
function fn() {
  switch (arguments.length) {
    case 1:
      var [name] = arguments;
      return `我是${name}`;
      break;
    case 2:
      var [name, age] = arguments;
      return `我是${name},今年${age}岁`;
      break;
  }
}

fn("KingKe"); // 我是KingKe
fn("KingKe", 30); // 我是KingKe，我30岁了！
```

::: tip 提示
但是这个写法感觉好蠢
:::

然后我找到了其他的写法 `jQuery` 之父 `John Resig` 写在 <TText type="warning">《secrets of the JavaScript ninja》</TText> 中,这种方法充分的利用了闭包的特性！

```javascript
function addMethod(object, name, fn) {
  var old = object[name]; //把前一次添加的方法存在一个临时变量old里面
  object[name] = function () {
    // 重写了object[name]的方法
    // 如果调用object[name]方法时，传入的参数个数跟预期的一致，则直接调用
    if (fn.length === arguments.length) {
      return fn.apply(this, arguments);
      // 否则，判断old是否是函数，如果是，就调用old
    } else if (typeof old === "function") {
      return old.apply(this, arguments);
    }
  };
}

addMethod(window, "fn", (name) => `我是${name}`);
addMethod(window, "fn", (name, age) => `我是${name},今年${age}岁`);
addMethod(
  window,
  "fn",
  (name, age, sport) => `我是${name},今年${age}岁,喜欢玩${sport}`
);

window.fn("KingKe"); // 我是KingKe
window.fn("KingKe", 30); // 我是KingKe，我30岁了！
window.fn("KingKe", 30, "台球"); // 我是KingKe，我30岁了,喜欢玩台球
```
