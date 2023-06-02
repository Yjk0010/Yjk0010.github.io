# vue3 对比 vue2

## <span class="cor-da">核心</span> Object.defineProperty <Badge type="tip">vue2</Badge> Proxy <Badge type="tip">vue3</Badge>

::: tip 提示
开发控制台可以看到当前页面代码输出结果 对前端来说更直观
:::

## <span class="cor-tip">vue2</span> 数据响应式实现

### 响应式基础

> 对于一个对象数据来说想要控制数据响应式就要实现其中一个最重要的点

例如 一个数据被访问了 那么我就得知道你访问到了这个对象 才能对这个数据进行响应式处理

::: details 基础代码

```javascript
console.log("\n--------------代码块1--------------\n");

var obj1 = {
  a: 1,
};

obj1.a = 4;
// 无输出 无法知晓其访问了 obj1.a

console.log("输出 a = ", obj1.a);
// 输出 a =  4
```

:::

但是这样访问我们无法获得访问动作

所以 `vue2` 使用了 _Object.defineProperty_ 来实现访问控制

> 这里用 `let v = obj.a` 是为了防止 get 调用 死循环

```javascript
console.log("\n--------------代码块2--------------\n");

var obj1 = {
  a: 1,
};

// 为了不让get 方法调用出现 死循环 所以这边先定义一个变量 来存储访问的值
let v = obj1.a;

// 数据监听拦截
Object.defineProperty(obj1, "a", {
  // 读取a属性的值
  get() {
    console.log("读取 a = ", v);
    return v;
  },
  // 设置a属性的值
  set(value) {
    if (value !== v) {
      console.log("设置 a = ", value);
      v = value;
    }
  },
});

obj1.a = 5;
// 设置a =  5

console.log("打印 a =", obj1.a);
// 读取 a = 5
// 打印 a = 5
```

> 这种方法可以知道这边调用 `obj1` 的属性 `a`
> 以及给 `a` 重新赋值的时候都监听到了操作  
> 但是这样的操作，只能单个属性绑定。想要多个属性一起绑定就要递归遍历

### vue2 observe 示例

> 下面是 vue2 observe 实现代码

```javascript
console.log("\n--------------代码块3--------------\n");

var obj2 = {
  a: 1,
  b: {
    c: 3,
  },
};

// 观察者函数
function observe_defineProperty(obj) {
  // 便利对象的属性
  for (const key in obj) {
    // for in 循环遍历对象 会遍历原型链上的所有可枚举属性 这边判断 只要当前的对象属性
    if (Object.hasOwnProperty.call(obj, key)) {
      let element = obj[key];
      if (vue_isObject(element)) {
        // 递归
        observe_defineProperty(element);
      }
      // 数据监听拦截
      Object.defineProperty(obj, key, {
        get() {
          // vue2 在这里处理的东西写在下面 vue2 get中做了什么  // [!code ++]
          console.log("读取", key, "=", JSON.stringify(element));
          return element;
        },
        set(value) {
          // vue2 在这里处理的东西写在下面 vue2 set中做了什么  // [!code ++]
          if (value !== element) {
            console.log("设置", key, "=", value);
            element = value;
          }
        },
      });
    }
  }
}
// 观察
observe_defineProperty(obj2);
obj2.a = 4;
// 设置 a =  4
console.log("打印 a =", obj2.a);
// 读取 a = 4
// 打印 a = 4
obj2.b.c = 5;
// 读取 b = {"c":3}
// 设置 c =  5
console.log("打印 b.c =", obj2.b.c);
// 读取 b = {"c":5}
// 读取 c = 5
// 打印 b.c = 5
```

> 通过 **observe_defineProperty** 递归实现对于对象属性的监听和拦截  
> 但是这个操作在创建 vue 实例的时候监听  
> 也就是放在 **data** 方法中的数据才会有响应式  
> 所以才会有对象新添加属性无法实现双向数据绑定这个说法  
> 为此 <span class="cor-tip">vue2</span> 中 引入了 <span class="cor-da">$set</span> 方法 用来给**新添加属性**进行 _响应式赋予_

### <span class="cor-tip">vue2</span> <span class="cor-wa">get</span> 中做了什么

1. 将读取属性的依赖收集到该属性的**订阅者数组**内。这是 <span class="cor-tip">Vue</span> 实现 _响应式的基础_。
2. 如果属性是一个**嵌套**的属性(如 `obj.child.prop`),需要递归收集嵌套属性的依赖。
3. 如果正在**计算属性**计算中访问该属性,需要将**计算属性订阅者**添加到属性**订阅者数组**。
4. 如果正在渲染 `watcher` 中访问该属性,需要添加渲染 `watcher` 到属性**订阅者数组**。

### <span class="cor-tip">vue2</span> <span class="cor-da">set</span> 中做了什么

1. 通知属性**订阅者数组**内的所有订阅者属性值已变化。这会触发**订阅者重新计算**和**重新渲染**。
2. 如果 _新值和旧值相同_ ,**直接返回**不做任何操作。这可以避免不必要的计算和 **DOM** 操作。
3. 如果属性**是嵌套对象的子属性**,需要**继续设置**子属性以实现响应式。
4. 如果属性的数据类型从 **object/array** 变为其他类型,需要删除它的订阅者信息,因为其他类型是非响应式的。
5. 如果属性的数据类型从其他类型变为 **object/array**,需要重新实现该属性的响应式,递归设置其子属性。
6. 触发该属性的 **warden watchers**。`warden watcher` 可以看作计算属性或侦听器的高阶版本,用来管理其内部的订阅者。

## <span class="cor-tip">vue3</span> 数据响应式实现

基础代码请参考上文 **Object.defineProperty** 我这边就懒一下了

其实思路基本是一致的 还是要知道数据 **变更** 和 _访问_

> 下面代码实现了 vue3 的数据劫持

```javascript
console.log("\n--------------代码块4--------------\n");

var obj3 = {
  a: 1,
  b: {
    c: 3,
  },
};
// 判断是否是对象
function vue_isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
// 观察
function observe_proxy(obj) {
  // 创建一个代理
  const proxy = new Proxy(obj, {
    get(target, key) {
      // vue3 在这里处理的东西写在下面 vue3 get中做了什么  // [!code ++]
      let value = target[key];
      //当访问到对象的属性时创建一个代理
      if (vue_isObject(value)) {
        value = observe_proxy(value);
      }
      console.log("读取", key, "=", value);
      return value;
    },
    set(target, key, value) {
      // vue3 在这里处理的东西写在下面 vue3 set中做了什么  // [!code ++]
      if (value !== target[key]) {
        console.log("设置", key, "=", value);
        target[key] = value;
        return value;
      }
    },
  });
  return proxy;
}
// 观察
const proxy = observe_proxy(obj3);
proxy.a = 4;
// 设置 a =  4
console.log("打印 a =", proxy.a);
// 读取 a = 4
// 打印 a = 4
proxy.b.c = 5;
// 读取 b = Proxy(Object) {c: 3}
// 设置 c =  5
console.log("打印 b.c =", proxy.b.c);
// 读取 b = Proxy(Object) {c: 5}
// 读取 c = 5
// 打印 b.c = 5
```

> 通过 **observe_proxy** 实现了对于对象属性的监听和拦截  
> 而且使用 <span class="cor-tip">proxy</span> 完成代理操作不需要再去 _递归遍历了_

### <span class="cor-tip">vue3</span> <span class="cor-wa">get</span> 中做了什么

1. 收集**读取属性**的 _效应副作用函数_ 到目标对象的依赖 `map` 中。这是 <span class="cor-tip">Vue3</span> 响应式的基础。
2. 如果目标对象**自身定义了**原生的 `get` 方法,则**调用**该方法并返回其结果。这避免了 `Proxy` 阻隔用户对属性的访问。
3. 如果正在计算的值读取了该属性,则将计算属性的 `runner` 添加到依赖 `map` 中。
4. 如果正在渲染的 `effect` 读取了该属性,则将渲染 `effect` 的 `scheduler` 添加到依赖 `map` 中。

### <span class="cor-tip">vue3</span> <span class="cor-da">set</span> 中做了什么

1. 通知依赖 `map` 中所有的 `effect`,属性已更改,需要重新运行。这会触发**订阅者反应**、**重新计算**和**重新渲染**。
2. 如果新值等于旧值,则直接返回以避免不必要的计算和 `DOM` 操作。
3. 如果目标对象自身定义了原生的 `set` 方法,则调用该方法将值设置为新值。
4. 如果属性从**object/array**变为其他类型,则<span class="cor-da">删除</span>其依赖 `map` 信息,因为其他类型是非响应的。
5. 如果属性从其他类型变为**object/array**,则需要重新实现响应式并递归设置其子属性。
6. 通知 **warden reactions**设置了新的值。**warden reactions**可以看作高阶版本的计算属性或侦听器,用于管理其内部的副作用。

## 总结

- **响应式原理**需要获取属性的 _访问_ 和 _更改_
- <span class="cor-tip">vue2</span> 通过 **Object.defineProperty** 实现对已有属性的监听 <span class="cor-da">需要递归遍历</span>
- <span class="cor-tip">vue3</span> 通过 **Proxy** 实现对所有属性的监听 <span class="cor-da">无需递归遍历</span>

::: details 整体代码
<<< docs/vue/vue2PKvue3_js.js
:::
