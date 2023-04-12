# 短面试题

## null 和 undefined 区别

> 首先 Undefined 和 Null 都是基本数据类型, 这两个基本数据类型
> 分别都只有一个值, 就是 undefined 和 null。

- `undefined` 代表的含义是 <span class="color-danger">未定义</span>
- `null` 代表的含义是 <span class="color-tip">空对象</span>

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
