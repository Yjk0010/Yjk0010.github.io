# 工厂模式（Factory Pattern）

## 介绍

工厂模式（Factory Pattern）是一种创建型设计模式，它提供了一种创建对象的接口，但允许子类决定实例化的类。工厂模式使一个类的实例化延迟到其子类。

## **结构**

1. **抽象产品（Abstract Product）：** 定义产品的接口，具体产品通过实现这个接口来提供产品的具体实现。
2. **具体产品（Concrete Product）：** 实现抽象产品接口，是工厂模式创建的对象。
3. **抽象工厂（Abstract Factory）：** 定义创建产品的接口，包含一个或多个创建产品的方法。
4. **具体工厂（Concrete Factory）：** 实现抽象工厂接口，负责实例化产品对象。

**优点：**

1. **封装性好：** 客户端无需关心对象如何被创建，只需关心接口。
2. **扩展性好：** 可以轻松地添加新产品或改变产品的实现。
3. **符合单一职责原则：** 每个具体工厂类负责创建一类产品。

**缺点：**

1. **类的个数增加：** 每增加一个产品就需要增加一个具体产品类和一个对应的具体工厂类。

**使用场景：**

1. 当一个类不知道它所需要的类的时候。
2. 当一个类希望通过其子类来指定创建对象的时候。

**示例：**

```javascript
// 抽象产品
class Product {
  operation() {
    return "Abstract Product";
  }
}

// 具体产品 A
class ConcreteProductA extends Product {
  operation() {
    return "Product A";
  }
}

// 具体产品 B
class ConcreteProductB extends Product {
  operation() {
    return "Product B";
  }
}

// 抽象工厂
class Factory {
  createProduct() {
    return new Product();
  }
}

// 具体工厂 A
class ConcreteFactoryA extends Factory {
  createProduct() {
    return new ConcreteProductA();
  }
}

// 具体工厂 B
class ConcreteFactoryB extends Factory {
  createProduct() {
    return new ConcreteProductB();
  }
}

// 客户端代码
function clientCode(factory) {
  const product = factory.createProduct();
  console.log(product.operation());
}

// 使用具体工厂 A
const factoryA = new ConcreteFactoryA();
clientCode(factoryA);

// 使用具体工厂 B
const factoryB = new ConcreteFactoryB();
clientCode(factoryB);
```

在上述示例中，`clientCode` 函数通过传递不同的工厂实例来创建不同的产品实例。这种方式使得客户端代码与具体产品的实现相分离，从而更容易扩展和维护。
