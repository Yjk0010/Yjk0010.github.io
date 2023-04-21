# 数据类型

## 数据类型的介绍以及存储

> <span class="cor-tip">JavaScript</span> 共有 <span class="cor-da">八种</span> 数据类型，分别是 **Undefined, Null, Boolean,
> Number, String, Object, Symbol, BigInt**

- 两种类型的区别在于存储位置的不同：
  - 栈(<span class="cor-da">stack</span>)：<span class="cor-wa">原始数据类型 **Undefined、Null、Boolean、Number、String** </span>
  - 堆(<span class="cor-da">heap</span>)：<span class="cor-tip">引用数据类型 **对象(数组和函数)、Symbol、BigInt** </span>
  - > _Symbol, BigInt_ 这两个 <span class="cor-wa">"基础数据类型"</span> 其实并不能说成是 `基础数据类型` <span class="cor-da">而是一个</span>
    >
    > **引用数据类型的** <span class="cor-tip">指针</span>
    >
    > 所以 这两个的引用指针是放在 `stack` 中 本身是放在 `heap` 中
- `原始数据类型`是直接存储在`stack`中的`简单数据段`，
  占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储
- `引用数据类型`是存储在`heap`中的对象，占据空间大、大小不固定。
  如果存储在`stack`中，将会影响程序运行的性能；
  引用数据类型在`stack`中存储了**指针**，该指针指向堆中该实体的**起始地址**。
  当`解释器`寻找引用值时，会首先检索其在`stack`中的地址，取得地址后从`heap`中获得实体。
- 堆和栈的概念存在于**数据结构**和**操作系统**内存中
  - 在数据结构中
    - `栈`中数据的存取方式为 _先进后出_
    - `堆`是一个**优先队列**，是按优先级来进行排序的，_优先级可以按照大小来规定_
  - 在操作系统中，内存被分为**栈区**和**堆区**：
    - `栈区`内存由编译器**自动分配释放**，存放函数的参数值，局部变量的值等。
      其操作方式类似于数据结构中的栈。
    - `堆区`内存一般由**开发者分配释放**，若不释放，程序结束时 <span class="cor-da">有可能</span> 由 <span class="cor-tip">垃圾回收机制</span> 回收。

### <span class="cor-tip">Undefined</span>

_未定义(Undefined): 表示一个未被定义的值。在变量被声明但未被赋值时，它的值为 undefined。_

### <span class="cor-tip">Null</span>

_空值(Null): 表示一个空的值。可以将变量赋值为 null 来表示它是空的。_

### <span class="cor-tip">Boolean</span>

_布尔(Boolean): 用于表示逻辑上的真或假。有两个值：true 和 false。_

### <span class="cor-tip">Number</span>

_数字(Number): 用于表示数字，可以是整数或者浮点数。例如：42，3.14。_

### <span class="cor-tip">String</span>

_字符串(String): 用于表示文本数据。例如："hello"，"world"。_

### <span class="cor-tip">Object</span>

_对象(Object): 是一种复合数据类型，可以用来表示任何对象。对象由一组属性(属性名和属性值)组成。例如：{ name: "张三", age: 18 }。_

### <span class="cor-tip">Symbol</span>

_Symbol: 表示一个独一无二的值，用于对象属性的键。_

### <span class="cor-tip">BigInt</span>

_BigInt: 用于表示任意精度的整数，可以超出 JavaScript 中 Number 类型所能表示的范围。_

## 数据类型检测的方式

### typeof

| 类型        |                                  判断方案                                  | 结果        |
| ----------- | :------------------------------------------------------------------------: | ----------- |
| 'number'    |                  <span class="cor-da">typeof</span> **1**                  | `number`    |
| 'string'    |                 <span class="cor-da">typeof</span> **'1'**                 | `string`    |
| 'boolean'   |                <span class="cor-da">typeof</span> **true**                 | `boolean`   |
| 'function'  |  <span class="cor-da">typeof</span> <span class="cor-tip">() => {}</span>  | `function`  |
| 'undefined' |  <span class="cor-da">typeof</span> <span class="cor-wa">undefined</span>  | `undefined` |
| 'symbol'    | <span class="cor-da">typeof</span> <span class="cor-tip">Symbol(1)</span>  | `symbol`    |
| 'bigint'    | <span class="cor-da">typeof</span> <span class="cor-tip">BigInt(1)</span>  | `bigint`    |
| 'null'      |    <span class="cor-da">typeof</span> <span class="cor-wa">null</span>     | `object`    |
| 'object'    |     <span class="cor-da">typeof</span> <span class="cor-tip">{}</span>     | `object`    |
| 'array'     |     <span class="cor-da">typeof</span> <span class="cor-tip">[]</span>     | `object`    |
| 'date'      | <span class="cor-da">typeof</span> <span class="cor-tip">new Date()</span> | `object`    |
| 'regexp'    |                 <span class="cor-da">typeof</span> **/1/**                 | `object`    |
| 'map'       | <span class="cor-da">typeof</span> <span class="cor-tip">new Map()</span>  | `object`    |
| 'set'       | <span class="cor-da">typeof</span> <span class="cor-tip">new Set()</span>  | `object`    |

### instanceof

> `instanceof` 可以正确判断对象的类型
>
> 其内部运行机制是判断在其原型链中能否找到该类型的原型。

| 类型        |                                         判断方案                                          | 结果   |
| ----------- | :---------------------------------------------------------------------------------------: | ------ |
| 'undefined' |                          <span class="cor-da">instanceof</span>                           | `报错` |
| 'null'      |                          <span class="cor-da">instanceof</span>                           | `报错` |
| 'number'    |     <span class="cor-tip">1</span> <span class="cor-da">instanceof</span> **Number**      | false  |
| 'string'    |    <span class="cor-tip">'1'</span> <span class="cor-da">instanceof</span> **String**     | false  |
| 'boolean'   |   <span class="cor-tip">true</span> <span class="cor-da">instanceof</span> **Boolean**    | false  |
| 'symbol'    | <span class="cor-tip">Symbol(1)</span> <span class="cor-da">instanceof</span> **Symbol**  | false  |
| 'bigint'    | <span class="cor-tip">BigInt(1)</span> <span class="cor-da">instanceof</span> **BigInt**  | false  |
| 'object'    |     <span class="cor-tip">{}</span> <span class="cor-da">instanceof</span> **Object**     | true   |
| 'array'     |     <span class="cor-tip">[]</span> <span class="cor-da">instanceof</span> **Array**      | true   |
| 'function'  | <span class="cor-tip">() => {}</span> <span class="cor-da">instanceof</span> **Function** | true   |
| 'date'      |  <span class="cor-tip">new Date()</span> <span class="cor-da">instanceof</span> **Date**  | true   |
| 'regexp'    |    <span class="cor-tip">/1/</span> <span class="cor-da">instanceof</span> **RegExp**     | true   |
| 'map'       |   <span class="cor-tip">new Map()</span> <span class="cor-da">instanceof</span> **Map**   | true   |
| 'set'       |   <span class="cor-tip">new Set()</span> <span class="cor-da">instanceof</span> **Set**   | true   |

可以看到，`instanceof` 只能正确判断**引用数据类型**，而不能判断 <span class="cor-tip">基本数据类型</span>。  
`instanceof` 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 **prototype** 属性。

### constructor

> constructor 有两个作用，一是判断数据的类型，二是对象实例通过
> constrcutor 对象访问它的构造函数。

| 类型        |                                             判断方案                                              | 结果   |
| ----------- | :-----------------------------------------------------------------------------------------------: | ------ |
| 'undefined' |                              <span class="cor-da">constructor</span>                              | `报错` |
| 'null'      |                              <span class="cor-da">constructor</span>                              | `报错` |
| `number`    |      <span class="cor-tip">(1).</span><span class="cor-da">constructor</span> === **Number**      | true   |
| `string`    |     <span class="cor-tip">('1').</span><span class="cor-da">constructor</span> === **String**     | true   |
| `boolean`   |    <span class="cor-tip">(true).</span><span class="cor-da">constructor</span> === **Boolean**    | true   |
| `object`    |     <span class="cor-tip">({}).</span><span class="cor-da">constructor</span> === **Object**      | true   |
| `array`     |      <span class="cor-tip">([]).</span><span class="cor-da">constructor</span> === **Array**      | true   |
| `function`  | <span class="cor-tip">(() => { }).</span><span class="cor-da">constructor</span> === **Function** | true   |
| `date`      |  <span class="cor-tip">(new Date()).</span><span class="cor-da">constructor</span> === **Date**   | true   |
| `regexp`    |     <span class="cor-tip">(/1/).</span><span class="cor-da">constructor</span> === **RegExp**     | true   |
| `symbol`    |  <span class="cor-tip">(Symbol(1)).</span><span class="cor-da">constructor</span> === **Symbol**  | true   |
| `bigint`    |  <span class="cor-tip">(BigInt(1)).</span><span class="cor-da">constructor</span> === **BigInt**  | true   |
| `map`       |   <span class="cor-tip">(new Map()).</span><span class="cor-da">constructor</span> === **Map**    | true   |
| `set`       |   <span class="cor-tip">(new Set()).</span><span class="cor-da">constructor</span> === **Set**    | true   |

### Object.prototype.toString.call

> _Object.prototype.toString.call()_ 使用 `Object` 对象的原型方法
>
> **toString** 来判断数据类型
>
> 前提是不能重写 对象的 `toString` 方法 s

| 类型        |                                              判断方案                                               | 结果                 |
| ----------- | :-------------------------------------------------------------------------------------------------: | -------------------- |
| `undefined` | <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">undefined</span>)  | `[object Undefined]` |
| `null`      |    <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">null</span>)    | `[object Null]`      |
| `number`    |     <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">1</span>)      | `[object Number]`    |
| `string`    |    <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">'1'</span>)     | `[object String]`    |
| `boolean`   |    <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">true</span>)    | `[object Boolean]`   |
| `object`    |     <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">{}</span>)     | `[object Object]`    |
| `array`     |     <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">[]</span>)     | `[object Array]`     |
| `function`  | <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">() => { }</span>)  | `[object Function]`  |
| `date`      | <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">new Date()</span>) | `[object Date]`      |
| `regexp`    |    <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">/1/</span>)     | `[object RegExp]`    |
| `symbol`    | <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">Symbol(1)</span>)  | `[object Symbol]`    |
| `bigint`    | <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">BigInt(1)</span>)  | `[object BigInt]`    |
| `map`       | <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">new Map()</span>)  | `[object Map]`       |
| `set`       | <span class="cor-da">Object.prototype.toString.call</span>(<span class="cor-tip">new Set()</span>)  | `[object Set]`       |
