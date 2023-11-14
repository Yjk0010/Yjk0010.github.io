# 单例模式 (Singleton pattern)

## 单例模式介绍

> 单例模式是一种创建型设计模式，确保某个类只有一个实例，并提供全局访问点。

这种模式适用于当需要确保系统中的特定类只有一个实例存在，且需要在整个应用中全局访问该实例时。单例模式的核心思想是通过私有化构造函数以及全局访问方法，控制实例的创建和访问。

要实现单例模式，常常需要考虑以下几点：

1. **私有化构造函数**：通过将类的构造函数设置为私有，可以防止外部直接实例化对象。
2. **静态方法获取实例**：提供一个静态方法来获取单例对象，该方法负责确保只创建一个实例并返回该实例。
3. **懒加载**：延迟对象的实例化，只有在首次调用时才创建对象。
4. **线程安全**：如果在多线程环境下使用单例模式，需要确保线程安全，避免出现多个实例同时创建的问题。

单例模式在许多场景下都有广泛应用，例如数据库连接池、线程池、配置信息对象等。它可以减少系统中的内存占用、节省资源、提高程序性能，并且方便对实例进行管理和维护。

`但在实际应用中需要注意线程安全、懒加载等问题，以确保单例模式的有效性。`

## <span class="cor-tip">基础实现</span>

<<< singletonSimple.js

## <span class="cor-wa">进阶版</span>

解决了 `new` 调用的问题

<<< singletonAdvance.js

## <span class="cor-da">高级版</span>

在原有基础上不需要单独在 `class` 中处理 而是通过`代理`实现

<<< singletonProxy.js

## <span class="cor-tip">模块化抽离使用</span>

还可以将 <span class="cor-da">singleton</span> 方法抽离出来 <span class="cor-wa">模块化使用</span>
::: details 模块化抽离使用 点击展开
**模块化**

```javascript
const singleton = (className) => {
  let instance;
  const proxy = new Proxy(className, {
    construct(target, args) {
      if (!instance) {
        instance = new target(...args);
      } else {
        process.env.NODE_ENV === "development" && console.warn("已存在实例");
      }
      return instance;
    },
  });
  className.prototype.constructor = proxy;
  return proxy;
};
export default singleton;
```

**使用**

```javascript
import singleton from "singleton.js";

class MyClass {
  constructor(name) {
    this.name = name;
  }
}

const SingletonMyClass = singleton(MyClass);

export default SingletonMyClass;
```

:::
