# 小知识

## null 和 undefined 区别

> 首先 Undefined 和 Null 都是基本数据类型, 这两个基本数据类型
> 分别都只有一个值, 就是 undefined 和 null。

- `undefined` 代表的含义是 <span class="cor-da">未定义</span>
- `null` 代表的含义是 <span class="cor-tip">空对象</span>

  > 一般变量声明了但还没有定义的时候会返回 undefined
  >
  > null 主要用于赋值给一些可能会返回对象的变量, 作为初始化。

::: warning 提示
undefined 在 JavaScript 中不是一个保留字, 这意味着可以使用
undefined 来作为一个变量名, 但是这样的做法是非常危险的, 它会
影响对 undefined 值的判断。我们可以通过一些方法获得安全的
undefined 值, 比如说 void 0。
:::

- 当对这两种类型使用 _typeof_ 进行判断时, Null 类型化会返回
  _object_ 。
  > 是因位在之前 `32` 位计算机中为了方便保存 `object` 类型 设置的 `object` 机器码
  > 是用 `000` 开头的
  > 然而 `null` 的所有位都是 `0` 所以 被 `typeof` 类型推导为 `object`

## ['1', '2', '3'].map(parseInt)

> 答案是 <span class="cor-tip">[1, NaN, NaN]</span>

- Array.prototype.map(callbackFn)

  > 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

- 参数 callbackFn(element,index,array)

  - `element`
    数组中当前正在处理的元素。
  - `index`
    正在处理的元素在数组中的索引。
  - `array`
    调用了 map() 的数组本身。

- parseInt(string, radix)
  > 则是用来解析字符串的，使字符串成为指定基数的整数 ;
  - `string`
    要被解析的值。如果参数不是一个字符串，则将其转换为字符串 (使用 ToString 抽象操作)。字符串开头的空白符将会被忽略。
  - `radix`
    从 2 到 36 的整数，表示进制的基数。

了解这两个函数后，我们可以模拟一下运行情况

```javascript
// map 的 第一次循环 得到的结果为
parseInt("1", 0);
// radix 为 0 时，且 string 参数不以“0x”和“0”开头时按照 10 为基数处理。
// 这个时候返回 1

// map 的 第二次循环 得到的结果为
parseInt("2", 1); // 基数为 1（1 进制）表示的数中，最大值小于 2，所以无法解析，返回 NaN

// map 的 第三次循环 得到的结果为
parseInt("3", 2); //基数为 2（2 进制）表示的数中，最大值小于 3，所以无法解析，返回 NaN
```

可以根据以上判断执行一下 **['3', '2', '1'].map(parseInt)**

::: details 答案在里面 想想在点开

```javascript
["3", "2", "1"].map(parseInt); // [3, NaN, 1]
```

:::
