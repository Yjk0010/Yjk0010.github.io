# 数据类型

## 数据类型的介绍以及存储

> JavaScript 共有 <span class="cor-da">八种</span> 数据类型，分别是 **Undefined, Null, Boolean,
> Number, String, Object, Symbol, BigInt**

- 两种类型的区别在于存储位置的不同：
  - 栈：<span class="cor-wa">原始数据类型(Undefined、Null、Boolean、Number、String)</span>
  - 堆：<span class="cor-tip">引用数据类型(对象、数组和函数)</span>
- 原始数据类型直接存储在栈`stack`中的简单数据段，占据空间
  小、大小固定，属于被频繁使用数据，所以放入栈中存储
- 引用数据类型存储在堆`heap`中的对象，占据空间大、大小不固
  定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈
  中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引
  用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。
  堆和栈的概念存在于数据结构和操作系统内存中
- 在数据结构中
  - 栈中数据的存取方式为先进后出
  - 堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大
    小来规定
- 在操作系统中，内存被分为栈区和堆区：
  - 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的
    值等。其操作方式类似于数据结构中的栈。
  - 堆区内存一般由开发着分配释放，若开发者不释放，程序结束时可
    能由垃圾回收机制回收。

## <span class="cor-tip">Undefined</span>

_未定义(Undefined): 表示一个未被定义的值。在变量被声明但未被赋值时，它的值为 undefined。_

## <span class="cor-tip">Null</span>

_空值(Null): 表示一个空的值。可以将变量赋值为 null 来表示它是空的。_

## <span class="cor-tip">Boolean</span>

_布尔(Boolean): 用于表示逻辑上的真或假。有两个值：true 和 false。_

## <span class="cor-tip">Number</span>

_数字(Number): 用于表示数字，可以是整数或者浮点数。例如：42，3.14。_

## <span class="cor-tip">String</span>

_字符串(String): 用于表示文本数据。例如："hello"，"world"。_

## <span class="cor-tip">Object</span>

_对象(Object): 是一种复合数据类型，可以用来表示任何对象。对象由一组属性(属性名和属性值)组成。例如：{ name: "张三", age: 18 }。_

## <span class="cor-tip">Symbol</span>

_Symbol: 表示一个独一无二的值，用于对象属性的键。_

## <span class="cor-tip">BigInt</span>

_BigInt: 用于表示任意精度的整数，可以超出 JavaScript 中 Number 类型所能表示的范围。_

## 数据类型检测的方式

## typeof

```JavaScript
'number'    |  typeof  1            -> `number`
'string'    |  typeof  '1'          -> `string`
'boolean'   |  typeof  true         -> `boolean`
'function'  |  typeof  () => {}     -> `function`
'undefined' |  typeof  undefined    -> `undefined`
'symbol'    |  typeof  Symbol(1)    -> `symbol`
'bigint'    |  typeof  BigInt(1)    -> `bigint`
'null'      |  typeof  null         -> `object`
'object'    |  typeof  {}           -> `object`
'array'     |  typeof  []           -> `object`
'date'      |  typeof  new Date()   -> `object`
'regexp'    |  typeof  /1/          -> `object`
'map'       |  typeof  new Map()    -> `object`
'set'       |  typeof  new Set()    -> `object`
```

## instanceof

> instanceof 可以正确判断对象的类型，其内部运行机制是判断在其
> 原型链中能否找到该类型的原型。

```JavaScript
'undefined' |             instanceof          -> `报错`
'null'      |             instanceof          -> `报错`
'number'    |  1          instanceof Number   -> false
'string'    |  '1'        instanceof String   -> false
'boolean'   |  true       instanceof Boolean  -> false
'symbol'    |  Symbol(1)  instanceof Symbol   -> false
'bigint'    |  BigInt(1)  instanceof BigInt   -> false
'object'    |  {}         instanceof Object   -> true
'array'     |  []         instanceof Array    -> true
'function'  |  () => {}   instanceof Function -> true
'date'      |  new Date() instanceof Date     -> true
'regexp'    |  /1/        instanceof RegExp   -> true
'map'       |  new Map()  instanceof Map      -> true
'set'       |  new Set()  instanceof Set      -> true
```

可以看到，instanceof 只能正确判断引用数据类型，而不能判断基
本数据类型。instanceof 运算符可以用来测试一个对象在其原型链
中是否存在一个构造函数的 prototype 属性。

## constructor

> constructor 有两个作用，一是判断数据的类型，二是对象实例通过
> constrcutor 对象访问它的构造函数。

```JavaScript
'undefined' |             constructor                 -> `报错`
'null'      |             constructor                 -> `报错`
`number`    | (1).constructor           === Number    -> true
`string`    | ('1').constructor         === String    -> true
`boolean`   | (true).constructor        === Boolean   -> true
`object`    | ({}).constructor          === Object    -> true
`array`     | ([]).constructor          === Array     -> true
`function`  | (() => { }).constructor   === Function  -> true
`date`      | (new Date()).constructor  === Date      -> true
`regexp`    | (/1/).constructor         === RegExp    -> true
`symbol`    | (Symbol(1)).constructor   === Symbol    -> true
`bigint`    | (BigInt(1)).constructor   === BigInt    -> true
`map`       | (new Map()).constructor   === Map       -> true
`set`       | (new Set()).constructor   === Set       -> true
```

## Object.prototype.toString.call

> Object.prototype.toString.call() 使用 Object 对象的原型方法
> toString 来判断数据类型

```JavaScript
`undefined` | Object.prototype.toString.call(undefined)   -> [object Undefined]
`null`      | Object.prototype.toString.call(null)        -> [object Null]
`number`    | Object.prototype.toString.call(1)           -> [object Number]
`string`    | Object.prototype.toString.call('1')         -> [object String]
`boolean`   | Object.prototype.toString.call(true)        -> [object Boolean]
`object`    | Object.prototype.toString.call({})          -> [object Object]
`array`     | Object.prototype.toString.call([])          -> [object Array]
`function`  | Object.prototype.toString.call(() => { })   -> [object Function]
`date`      | Object.prototype.toString.call(new Date())  -> [object Date]
`regexp`    | Object.prototype.toString.call(/1/)         -> [object RegExp]
`symbol`    | Object.prototype.toString.call(Symbol(1))   -> [object Symbol]
`bigint`    | Object.prototype.toString.call(BigInt(1))   -> [object BigInt]
`map`       | Object.prototype.toString.call(new Map())   -> [object Map]
`set`       | Object.prototype.toString.call(new Set())   -> [object Set]
```
