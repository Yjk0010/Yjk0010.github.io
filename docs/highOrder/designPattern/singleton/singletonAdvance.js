class Singleton {
  constructor(name) {
    // 判断是否已经有实例
    this.name = name;
    if (typeof Singleton.instance === "object") {
      // 开发环境下可以打印警告
      if (process.env.NODE_ENV === "development") console.warn("已经有实例了");
      return Singleton.instance;
    }
    Singleton.instance = this; // 缓存
    return this;
  }
  static getInstance = (() => {
    // 通过自执行函数和闭包实现单例模式
    let instance;
    return (...args) => {
      if (!instance) {
        Singleton.instance = new Singleton(...args);
        instance = Singleton.instance; // 缓存
      }
      return instance;
    };
  })();
}

const instance1 = new Singleton("111");
const instance2 = new Singleton("222");
const instance3 = Singleton.getInstance("333");
console.log(instance1 === instance2, instance1.name);
// 输出：true 111, instance1 和 instance2 是同一个实例
console.log(instance1 === instance3, instance2.name);
// 输出：true 111, instance1 和 instance3 是同一个实例
console.log(instance2 === instance3, instance3.name);
// 输出：true 111, instance2 和 instance3 是同一个实例

export default Singleton;
