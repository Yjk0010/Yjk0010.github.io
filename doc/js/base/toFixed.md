# toFixed 不准

## 为啥 toFixed 不准

> toFixed 的原因是因为 计算机存储小数的精度问题

这里要使用到一个函数 <span class="cor-wa">Number.prototype.toPrecision()</span> [MDN toPrecision](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision)

> toPrecision(precision) 方法以指定的精度返回该数值对象的字符串表示。
>
> <span class="cor-wa">precision</span> 一个用来指定有效数个数的整数。

<span class="cor-tip">看一下例子</span>

```javascript
(2.55).toPrecision(20);
// '2.5499999999999998224'
(2.55).toFixed(1);
// '2.5'
(2.45).toPrecision(20);
// '2.4500000000000001776'
(2.45).toFixed(1);
// '2.5'
```

> 所以用 `toFixed` 这玩意四舍五入就是坑 所以使用 `toLocaleString` 来实现相应功能

## toLocaleString 介绍

[Number.prototype.toLocaleString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)

```javascript
(2.55).toLocaleString(undefined, {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
  useGrouping: false,
});
// '2.6'
(2.45).toLocaleString(undefined, {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
  useGrouping: false,
});
// '2.5'
```

<span class="cor-wa">toLocaleString(locales, options)</span>

- locales :

  - 语言代码
    - 中国 -> `zh`
    - 英国 -> `en`

- options :
  1. `maximumFractionDigits` : 四舍五入最大位数
  2. `minimumFractionDigits` : 四舍五入最小位数
  3. `useGrouping` : 分组符号 根据语言来的大多数是 `,`、`.`和 ` `
     1. <Badge type="tip">default</Badge>` "auto"` 根据区域设置偏好显示分组分隔符，这也可能取决于货币。
     2. `"always"` 显示分组分隔符，即使语言环境不喜欢。
     3. `false` 不显示分隔符。
     4. `true` 同 `"always"`
  4. `style` 格式化样式
     1. <Badge type="tip">default</Badge> `"decimal"` 用于纯数字格式
     2. `"currency"` 用于货币格式 需要配置
     3. `"percent"` 用于百分比格式
     4. `"unit"` 用于货币格式
  5. `currency` <span class="cor-tip">style</span> 属性为 <span class="cor-wa">currency</span> 时候必含 [钱代码可选](https://en.wikipedia.org/wiki/ISO_4217)
  6. `unit` <span class="cor-tip">style</span> 属性为 <span class="cor-wa">unit</span> 时候必含 [单位可选值](https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier)

```javascript
(1232.45).toLocaleString("zh", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
  style: "currency",
  currency: "CNY",
});
// '¥1,232.5'
(1232.45).toLocaleString("en-US", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
  style: "currency",
  currency: "USD",
});
// '$1,232.5'
(1232.45).toLocaleString("zh", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
  style: "unit",
  unit: "milliliter",
});
// '1,232.5毫升'
```

## 重写 toFixed 方法

> 这里不能使用箭头函数 因为要通过 `this` 拿到当前输入的值 `Number` <span class="cor-da">this</span>

```javascript
Number.prototype.toFixed = function (digits = 0) {
  return this.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    // 不使用分组符号
    useGrouping: false,
  });
};

(2.55).toFixed(1);
// '2.6'
(2.45).toFixed(1);
// '2.5'
```
