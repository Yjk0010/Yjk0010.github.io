# 数据类型

## 数据类型的介绍以及存储

> <TText>JavaScript</TText> 共有 <TText type="danger">八种</TText> 数据类型，分别是 **Undefined, Null, Boolean,
> Number, String, Object, Symbol, BigInt**

- 两种类型的区别在于存储位置的不同：
  - 栈(<TText type="danger">stack</TText>)：<TText type="warning">原始数据类型 **Undefined、Null、Boolean、Number、String** </TText>
  - 堆(<TText type="danger">heap</TText>)：<TText>引用数据类型 **对象(数组和函数)、Symbol、BigInt** </TText>
  - > *Symbol, BigInt* 这两个 <TText type="warning">"基础数据类型"</TText> 其实并不能说成是 `基础数据类型` <TText type="danger">而是一个</TText>
    >
    > **引用数据类型的** <TText>指针</TText>
    >
    > 所以 这两个的引用指针是放在 `stack` 中 本身是放在 `heap` 中
- `原始数据类型`是直接存储在`stack`中的`简单数据段`，
  占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储
- `引用数据类型`是存储在`heap`中的对象，占据空间大、大小不固定.
  如果存储在`stack`中，将会影响程序运行的性能；
  引用数据类型在`stack`中存储了**指针**，该指针指向堆中该实体的**起始地址**.
  当`解释器`寻找引用值时，会首先检索其在`stack`中的地址，取得地址后从`heap`中获得实体.
- 堆和栈的概念存在于**数据结构**和**操作系统**内存中
  - 在数据结构中
    - `栈`中数据的存取方式为 *先进后出*
    - `堆`是一个**优先队列**，是按优先级来进行排序的，*优先级可以按照大小来规定*
  - 在操作系统中，内存被分为**栈区**和**堆区**：
    - `栈区`内存由编译器**自动分配释放**，存放函数的参数值，局部变量的值等.
      其操作方式类似于数据结构中的栈.
    - `堆区`内存一般由**开发者分配释放**，若不释放，程序结束时 <TText type="danger">有可能</TText> 由 <TText>垃圾回收机制</TText> 回收.

### <TText>Undefined</TText>

*未定义(Undefined): 表示一个未被定义的值.在变量被声明但未被赋值时，它的值为 undefined.*

### <TText>Null</TText>

*空值(Null): 表示一个空的值.可以将变量赋值为 null 来表示它是空的.*

### <TText>Boolean</TText>

*布尔(Boolean): 用于表示逻辑上的真或假.有两个值：true 和 false.*

### <TText>Number</TText>

*数字(Number): 用于表示数字，可以是整数或者浮点数.例如：42，3.14.*

### <TText>String</TText>

*字符串(String): 用于表示文本数据.例如："hello"，"world".*

### <TText>Object</TText>

*对象(Object): 是一种复合数据类型，可以用来表示任何对象.对象由一组属性(属性名和属性值)组成.例如：{ name: "张三", age: 18 }.*

### <TText>Symbol</TText>

*Symbol: 表示一个独一无二的值，用于对象属性的键.*

### <TText>BigInt</TText>

*BigInt: 用于表示任意精度的整数，可以超出 JavaScript 中 Number 类型所能表示的范围.*

## 数据类型检测的方式

### typeof

| 类型        |                                  判断方案                                   | 结果        |
| ----------- | :-------------------------------------------------------------------------: | ----------- |
| 'number'    |                  <TText type="danger">typeof</TText> **1**                  | `number`    |
| 'string'    |                 <TText type="danger">typeof</TText> **'1'**                 | `string`    |
| 'boolean'   |                <TText type="danger">typeof</TText> **true**                 | `boolean`   |
| 'function'  |         <TText type="danger">typeof</TText> <TText>() => {}</TText>         | `function`  |
| 'undefined' | <TText type="danger">typeof</TText> <TText type="warning">undefined</TText> | `undefined` |
| 'symbol'    |        <TText type="danger">typeof</TText> <TText>Symbol(1)</TText>         | `symbol`    |
| 'bigint'    |        <TText type="danger">typeof</TText> <TText>BigInt(1)</TText>         | `bigint`    |
| 'null'      |   <TText type="danger">typeof</TText> <TText type="warning">null</TText>    | `object`    |
| 'object'    |            <TText type="danger">typeof</TText> <TText>{}</TText>            | `object`    |
| 'array'     |            <TText type="danger">typeof</TText> <TText>[]</TText>            | `object`    |
| 'date'      |        <TText type="danger">typeof</TText> <TText>new Date()</TText>        | `object`    |
| 'regexp'    |                 <TText type="danger">typeof</TText> **/1/**                 | `object`    |
| 'map'       |        <TText type="danger">typeof</TText> <TText>new Map()</TText>         | `object`    |
| 'set'       |        <TText type="danger">typeof</TText> <TText>new Set()</TText>         | `object`    |

### instanceof

> `instanceof` 可以正确判断对象的类型
>
> 其内部运行机制是判断在其原型链中能否找到该类型的原型.

| 类型        |                                   判断方案                                   | 结果   |
| ----------- | :--------------------------------------------------------------------------: | ------ |
| 'undefined' |                   <TText type="danger">instanceof</TText>                    | `报错` |
| 'null'      |                   <TText type="danger">instanceof</TText>                    | `报错` |
| 'number'    |     <TText>1</TText> <TText type="danger">instanceof</TText> **Number**      | false  |
| 'string'    |    <TText>'1'</TText> <TText type="danger">instanceof</TText> **String**     | false  |
| 'boolean'   |   <TText>true</TText> <TText type="danger">instanceof</TText> **Boolean**    | false  |
| 'symbol'    | <TText>Symbol(1)</TText> <TText type="danger">instanceof</TText> **Symbol**  | false  |
| 'bigint'    | <TText>BigInt(1)</TText> <TText type="danger">instanceof</TText> **BigInt**  | false  |
| 'object'    |     <TText>{}</TText> <TText type="danger">instanceof</TText> **Object**     | true   |
| 'array'     |     <TText>[]</TText> <TText type="danger">instanceof</TText> **Array**      | true   |
| 'function'  | <TText>() => {}</TText> <TText type="danger">instanceof</TText> **Function** | true   |
| 'date'      |  <TText>new Date()</TText> <TText type="danger">instanceof</TText> **Date**  | true   |
| 'regexp'    |    <TText>/1/</TText> <TText type="danger">instanceof</TText> **RegExp**     | true   |
| 'map'       |   <TText>new Map()</TText> <TText type="danger">instanceof</TText> **Map**   | true   |
| 'set'       |   <TText>new Set()</TText> <TText type="danger">instanceof</TText> **Set**   | true   |

可以看到，`instanceof` 只能正确判断**引用数据类型**，而不能判断 <TText>基本数据类型</TText>.  
`instanceof` 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 **prototype** 属性.

### constructor

> constructor 有两个作用，一是判断数据的类型，二是对象实例通过
> constrcutor 对象访问它的构造函数.

| 类型        |                                       判断方案                                       | 结果   |
| ----------- | :----------------------------------------------------------------------------------: | ------ |
| 'undefined' |                       <TText type="danger">constructor</TText>                       | `报错` |
| 'null'      |                       <TText type="danger">constructor</TText>                       | `报错` |
| `number`    |      <TText>(1).</TText><TText type="danger">constructor</TText> === **Number**      | true   |
| `string`    |     <TText>('1').</TText><TText type="danger">constructor</TText> === **String**     | true   |
| `boolean`   |    <TText>(true).</TText><TText type="danger">constructor</TText> === **Boolean**    | true   |
| `object`    |     <TText>({}).</TText><TText type="danger">constructor</TText> === **Object**      | true   |
| `array`     |      <TText>([]).</TText><TText type="danger">constructor</TText> === **Array**      | true   |
| `function`  | <TText>(() => { }).</TText><TText type="danger">constructor</TText> === **Function** | true   |
| `date`      |  <TText>(new Date()).</TText><TText type="danger">constructor</TText> === **Date**   | true   |
| `regexp`    |     <TText>(/1/).</TText><TText type="danger">constructor</TText> === **RegExp**     | true   |
| `symbol`    |  <TText>(Symbol(1)).</TText><TText type="danger">constructor</TText> === **Symbol**  | true   |
| `bigint`    |  <TText>(BigInt(1)).</TText><TText type="danger">constructor</TText> === **BigInt**  | true   |
| `map`       |   <TText>(new Map()).</TText><TText type="danger">constructor</TText> === **Map**    | true   |
| `set`       |   <TText>(new Set()).</TText><TText type="danger">constructor</TText> === **Set**    | true   |

### Object.prototype.toString.call

> *Object.prototype.toString.call()* 使用 `Object` 对象的原型方法
>
> **toString** 来判断数据类型
>
> 前提是不能重写 对象的 `toString` 方法 s

| 类型        |                                        判断方案                                        | 结果                 |
| ----------- | :------------------------------------------------------------------------------------: | -------------------- |
| `undefined` | <TText type="danger">Object.prototype.toString.call</TText>(<TText>undefined</TText>)  | `[object Undefined]` |
| `null`      |    <TText type="danger">Object.prototype.toString.call</TText>(<TText>null</TText>)    | `[object Null]`      |
| `number`    |     <TText type="danger">Object.prototype.toString.call</TText>(<TText>1</TText>)      | `[object Number]`    |
| `string`    |    <TText type="danger">Object.prototype.toString.call</TText>(<TText>'1'</TText>)     | `[object String]`    |
| `boolean`   |    <TText type="danger">Object.prototype.toString.call</TText>(<TText>true</TText>)    | `[object Boolean]`   |
| `object`    |     <TText type="danger">Object.prototype.toString.call</TText>(<TText>{}</TText>)     | `[object Object]`    |
| `array`     |     <TText type="danger">Object.prototype.toString.call</TText>(<TText>[]</TText>)     | `[object Array]`     |
| `function`  | <TText type="danger">Object.prototype.toString.call</TText>(<TText>() => { }</TText>)  | `[object Function]`  |
| `date`      | <TText type="danger">Object.prototype.toString.call</TText>(<TText>new Date()</TText>) | `[object Date]`      |
| `regexp`    |    <TText type="danger">Object.prototype.toString.call</TText>(<TText>/1/</TText>)     | `[object RegExp]`    |
| `symbol`    | <TText type="danger">Object.prototype.toString.call</TText>(<TText>Symbol(1)</TText>)  | `[object Symbol]`    |
| `bigint`    | <TText type="danger">Object.prototype.toString.call</TText>(<TText>BigInt(1)</TText>)  | `[object BigInt]`    |
| `map`       | <TText type="danger">Object.prototype.toString.call</TText>(<TText>new Map()</TText>)  | `[object Map]`       |
| `set`       | <TText type="danger">Object.prototype.toString.call</TText>(<TText>new Set()</TText>)  | `[object Set]`       |
