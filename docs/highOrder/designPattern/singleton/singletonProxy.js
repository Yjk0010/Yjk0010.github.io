class MyClass {
  constructor(name) {
    this.name = name;
  }
}

const singleton = (className) => {
  // 通过闭包实现单例模式
  let instance;
  // 通过 Proxy 代理构造函数，实现单例模式
  const proxy = new Proxy(className, {
    construct(target, args) {
      // 判断是否已经有实例
      if (!instance) {
        instance = new target(...args);
      } else {
        // 开发环境下可以打印警告
        process.env.NODE_ENV === "development" && console.warn("已存在实例");
      }
      return instance;
    },
  });
  // 更改原型指向 使得 通过实例的constructor属性 仍然指向 代理
  className.prototype.constructor = proxy;
  return proxy;
};

const SingletonMyClass = singleton(MyClass);

const instance1 = new SingletonMyClass("111");
const instance2 = new SingletonMyClass("222");
const instance3 = new instance1.constructor("333");

console.log(instance1 === instance2, instance1.name);
// 输出：true 111, instance1 和 instance2 是同一个实例
console.log(instance1 === instance3, instance3.name);
// 输出：true 111, instance1 和 instance3 是同一个实例
console.log(instance2 === instance3, instance3.name);
// 输出：true 111, instance2 和 instance3 是同一个实例
export default SingletonMyClass;
