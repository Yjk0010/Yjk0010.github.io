# vue3 对比 vue2

## <span class="cor-da">核心</span> Object.defineProperty <Badge type="tip">vue2</Badge> Proxy <Badge type="tip">vue3</Badge>

### vue2 数据响应式实现

> 对于一个对象数据来说想要控制数据响应式就要实现其中一个最重要的点

例如 一个数据被访问了 那么我就得知道你访问到了这个对象 才能对这个数据进行响应式处理

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3,
};
console.log(obj.a, "output 1");
// 1 'output 1'
obj.b = 4; // 这里没有输出;
console.log("===我是分割线===");
```

但是这样访问我们无法获得访问动作

所以 `vue2` 使用了 _Object.defineProperty_ 来实现访问控制

> 这里用 `let v = obj.a` 是为了方式 get 调用 死循环

```javascript
let v = obj.a;
Object.defineProperty(obj, "a", {
  get() {
    console.log("get a", "output 3");
    // return obj.a  // 这样调用返回会重新调用get 死循环
    return v;
  },
  set(value) {
    if (value !== v) {
      console.log("set", "output 2");
      v = value;
    }
  },
});
obj.a = 4;
// set output 2
console.log(obj.a, "output 4");
// get a output 3
// 4 'output 4'
console.log("===我是分割线===");
```

通过这种方法 可以知道这边 调用 `obj` 的属性 `a` 和 给 `a` 重新赋值的时候都监听到了操作
