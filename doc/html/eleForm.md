# 表单元素

<style>
  @import "../style/form.css"
</style>

一系列元素, 主要用于收集用户数据

## form 元素

> form 元素有自己的提交方式 `form-data`

通常, 会将整个表单元素, 放置 form 元素的内部, 作用是当提交表单时, 会将 form 元素内部的表单内容以合适的方式提交到服务器。

## input 元素

输入框

- type 属性: 输入框类型

  1. `text`, 普通文本输入框
  2. `password`, 密码框
  3. `date`, 日期选择框, 兼容性问题
  4. `search`, 搜索框, 兼容性问题
  5. `number`, 数字输入框
  6. `checkbox`, 多选框
  7. `radio`, 单选框

- value 属性: 输入框的值

- placeholder 属性: 显示提示的文本, 文本框没有内容时显示

- input 元素可以制作按钮

  当 type 值为 reset、button、submit 时, input 表示按钮。

## select 元素

下拉列表选择框

通常和 option 元素配合使用

## textarea 元素

文本域, 多行文本框

## 按钮元素

button

type 属性: reset、submit、button, 默认值 submit

## 表单状态

`readonly` 属性: 布尔属性, 是否只读, 不会改变表单显示样式

`disabled` 属性: 布尔属性, 是否禁用, 会改变表单显示样式

## label 在表单中作关联作用

> 普通元素, 通常配合单选和多选框使用

- 显示关联

可以通过 `for` 属性, 让 `label` 元素关联某一个表单元素, `for` 属性书写表单元素 `id` 的值

- 隐式关联
  > 点击文字也可以选中 radio

<label>
    <input name="gender" type="radio">男
</label>

<label>
    <input name="gender" type="radio">女
</label>

```html
<label> <input name="gender" type="radio" /> 男 </label>

<label> <input name="gender" type="radio" /> 女 </label>
```

## datalist

数据列表

> 类似模糊搜索下拉列表

该元素本身不会显示到页面, 通常用于和普通文本框配合

<p>
    请输入你常用的浏览器：
    <input list="userAgent" type="text">
</p>

<datalist id="userAgent">
    <option value="Chrome">谷歌浏览器</option>
    <option value="IE">IE浏览器</option>
    <option value="Opera">欧鹏浏览器</option>
    <option value="Safari">苹果浏览器</option>
    <option value="Fire fox">火狐浏览器</option>
</datalist>

```html
<p>
  请输入你常用的浏览器：
  <input list="userAgent" type="text" />
</p>

<datalist id="userAgent">
  <option value="Chrome">谷歌浏览器</option>
  <option value="IE">IE浏览器</option>
  <option value="Opera">欧鹏浏览器</option>
  <option value="Safari">苹果浏览器</option>
  <option value="Fire fox">火狐浏览器</option>
</datalist>
```

## fieldset 元素

> 出现一个框框 框住

表单分组

<form action="">
  <fieldset>
    <legend>账号信息</legend>
    <p>
      用户账号：
      <input type="text" value="aaaaa" readonly>
    </p>
     </fieldset>
    <fieldset>
    <legend>密码信息</legend>
    <p>
      用户密码：
      <input type="password">
    </p>
  </fieldset>
</form>

```html
<form action="">
  <fieldset>
    <legend>账号信息</legend>
    <p>
      用户账号：
      <input type="text" value="aaaaa" readonly />
    </p>
  </fieldset>
  <fieldset>
    <legend>密码信息</legend>
    <p>
      用户密码：
      <input type="password" />
    </p>
  </fieldset>
</form>
```

## 新的伪类

- focus

元素聚焦时的样式

 <input type="text" value="focus">

```css
input:focus {
  background-color: #10b981;
}
```

```html
<input type="text" value="focus" />
```

- checked

<p>
    请选择性别：
    <label class="radio-item">
        <input name="gender" type="radio" checked>
        <span class="radio"></span>
        <span>男</span>
    </label>
    &nbsp;
    <label class="radio-item">
        <input name="gender" type="radio">
        <span class="radio"></span>
        <span>女</span>
    </label>
</p>

```css
.radio-item .radio {
  width: 12px;
  height: 12px;
  border: 1px solid #999;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
}

.radio-item input:checked + .radio {
  border-color: #008c8c;
}

.radio-item input:checked ~ span {
  color: #008c8c;
}

.radio-item input:checked + .radio::after {
  content: "";
  display: block;
  width: 4px;
  height: 4px;
  background: #008c8c;
  margin-left: 2.5px;
  margin-top: 3px;
  border-radius: 50%;
}

.radio-item input[type="radio"] {
  display: none;
}
```

```html
<p>
  请选择性别：
  <label class="radio-item">
    <input name="gender" type="radio" checked />
    <span class="radio"></span>
    <span>男</span>
  </label>
  &nbsp;
  <label class="radio-item">
    <input name="gender" type="radio" />
    <span class="radio"></span>
    <span>女</span>
  </label>
</p>
```

单选或多选框被选中的样式

## textarea 调整尺寸

css 属性 resize

- `both`: 默认值，两个方向都可以调整尺寸
- `none`: 不能调整尺寸
- `horizontal`: 水平方向可以调整尺寸
- `vertical`: 垂直方向可以调整尺寸
