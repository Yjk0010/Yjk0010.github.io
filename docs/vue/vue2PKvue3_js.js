console.log("\n--------------代码块1--------------\n");

var obj1 = {
  a: 1,
};

obj1.a = 4;
// 无输出 无法知晓其访问了 obj1.a

console.log("输出 a = ", obj1.a);
// 输出 a =  4

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
    // for in 循环遍历对象 会遍历原型链上的所有可枚举属性 这边做一个判断 只要当前对象属性
    if (Object.hasOwnProperty.call(obj, key)) {
      let element = obj[key];
      if (vue_isObject(element)) {
        // 递归
        observe_defineProperty(element);
      }
      // 数据监听拦截
      Object.defineProperty(obj, key, {
        get() {
          // vue2 在这里处理的东西写在下面 vue2 get中做了什么  // [!code hl]
          console.log("读取", key, "=", JSON.stringify(element));
          return element;
        },
        set(value) {
          // vue2 在这里处理的东西写在下面 vue2 set中做了什么  // [!code hl]
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
      // vue3 在这里处理的东西写在下面 vue3 get中做了什么  // [!code hl]
      let value = target[key];
      //当访问到对象的属性时创建一个代理
      if (vue_isObject(value)) {
        value = observe_proxy(value);
      }
      console.log("读取", key, "=", value);
      return value;
    },
    set(target, key, value) {
      // vue3 在这里处理的东西写在下面 vue3 set中做了什么  // [!code hl]
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

export default {};
