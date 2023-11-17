# 适配器模式（Adapter Pattern）

## 介绍

适配器模式（Adapter Pattern）是一种结构型设计模式，它允许接口不兼容的类协同工作。该模式创建一个包装类，使得原本由于接口不匹配而不能一起工作的两个类能够协同工作。

## **主要参与角色**

1. **目标接口（Target）：** 定义客户端使用的与特定领域相关的接口。
2. **被适配者（Adaptee）：** 是需要被适配的类，它包含了一些有用的行为，但是其接口与客户端要求的接口不兼容。
3. **适配器（Adapter）：** 是一个包装类，它实现了目标接口并持有被适配者的实例，在目标接口的实现中调用被适配者的相应方法。

## **适配器模式的工作流程**

1. 客户端调用目标接口的方法。
2. 适配器接收到调用，将其转换为对被适配者的相应方法的调用。
3. 被适配者执行实际的操作。
4. 适配器将结果返回给客户端，客户端不知道实际上是被适配者在执行。

## **示例场景**

假设有一个英文词汇翻译的类（`Adaptee`）只能将英文翻译为英文单词的首字母大写，而我们需要一个词汇翻译的接口（`Target`）他本身具有将所有字母大写的功能。需要创建一个适配器，使得可以通过 Target 的接口调用 Adaptee 的英文翻译的功能。 代码实现

```javascript
// 被适配者（Adaptee）
class Adaptee {
  capitalizeWords(str) {
    // 将英文翻译为英文单词的首字母大写
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
}

// 目标接口（Target）
class Target {
  capitalizeWords(word) {
    // 空方法，由具体的适配器实现
  }
  toUpperCase(word) {
    return word.toUpperCase();
  }
}

// 适配器（Adapter）
class Adapter extends Target {
  constructor(adaptee) {
    super();
    this.adaptee = adaptee;
  }
  capitalizeWords(word) {
    // 适配器通过调用被适配者的方法，并对结果进行处理
    return this.adaptee.capitalizeWords(word);
  }
}

// 在客户端代码中，通过适配器调用被适配者的方法
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);

// 调用适配器的方法，实际上会调用被适配者的方法，并进行适当的处理
adapter.capitalizeWords("hello world"); // Hello World
adapter.toUpperCase("hello world"); // HELLO WORLD
```

在这个例子中，`Adaptee` 类代表了被适配者，具有 **capitalizeWords** 方法。  
`Target` 接口定义了客户端期望的目标接口，包含 **capitalizeWords** 方法。  
`Adapter` 类实现了 `Target` 接口，内部持有一个 `Adaptee` 类的实例，并在 **capitalizeWords** 方法中调用了 `Adaptee` 的方法，然后进行了适当的处理。
