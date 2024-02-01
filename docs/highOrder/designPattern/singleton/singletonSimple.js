class Singleton {
  constructor(name) {
    this.name = name;
  }
}

Singleton.getInstance = (() => {
  // 通过自执行函数和闭包实现单例模式
  let instance;
  return (...args) => {
    if (!instance) {
      instance = new Singleton(...args); // 缓存
    }
    return instance;
  };
})();

// 约定调用方式如下：
const instance1 = Singleton.getInstance("111");
const instance2 = Singleton.getInstance("222");
console.log(instance1 === instance2, instance1.name);
// 输出：true 111, instance1 和 instance2 是同一个实例
//但是如果这样调用：
const instance3 = new Singleton("333");
console.log(instance1 === instance3, instance3.name);
// 输出：false 333, instance1 和 instance3 不是同一个实例
export default Singleton;
