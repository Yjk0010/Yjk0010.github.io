# 拖拽API drag

<script setup>
import draggable from "./draggable.vue"
</script>

> HTML5 拖放 API 允许开发人员创建交互式 Web 应用程序，使用户能够在网页内或不同窗口或应用程序之间拖放元素

## 关键概念

- <TText type="warning">可拖动元素</TText>: 通过将 `draggable` 属性设置为 `true` 来使元素可拖动。
- <TText type="danger">拖动事件</TText>: 当用户拖动元素时，<TText type="success">事件主体是被拖放元素</TText> ，允许您处理拖动操作的不同阶段:
  - `dragstart`: 在用户开始拖动元素时触发。
  - `drag`: 在用户拖动元素时持续触发。
  - `dragend`: 在用户释放元素时触发。
- <TText type="danger">放置目标</TText>: <TText type="success">事件主体是目标元素</TText>,可以接收拖放元素的元素称为放置目标。它们监听以下事件:
  - `dragenter`: 当可拖动元素进入放置目标时触发。
  - `dragover`: 当可拖动元素位于放置目标上方时持续触发。
  - `dragleave`: 当可拖动元素离开放置目标时触发。
  - `drop`: 当可拖动元素被放置在放置目标上时触发。
- <TText type="success">数据传输</TText> 
  :`DataTransfer` 对象用于在可拖动元素和放置目标之间传输数据。可以使用 <TText type="danger">setData()</TText> 设置要传输的数据，并使用 <TText type="danger">getData()</TText> 检索数据。

## 基本用法

1. 使元素可拖动:
``` html
<img src="image.jpg" draggable="true">
```
1. 添加拖动事件的事件侦听器:
``` javascript
image.addEventListener('dragstart', handleDragStart);
image.addEventListener('dragend', handleDragEnd);
```
1. 实现事件处理程序:
``` javascript
function handleDragStart(event) {
    // 设置要传输的数据
    event.dataTransfer.setData('text/plain', image.id);
}

function handleDragEnd(event) {
    // 处理拖动完成
}
```
4. 使元素成为放置目标:
``` html
<div id="drop-target"></div>

```
5. 添加放置事件的事件侦听器:
``` javascript
dropTarget.addEventListener('dragenter', handleDragEnter);
dropTarget.addEventListener('dragover', handleDragOver);
dropTarget.addEventListener('drop', handleDrop);
```
6. 实现事件处理程序:
``` javascript
function handleDragEnter(event) {
    // 阻止默认行为以允许放置
    event.preventDefault();
}

function handleDragOver(event) {
    // 阻止默认行为以允许放置
    event.preventDefault();
}

function handleDrop(event) {
    // 获取传输数据
    const imageId = event.dataTransfer.getData('text/plain');
    // 使用已放置的数据执行某些操作
}
```

## 例子

> 两个格子之间图片可以相互拖拽
<draggable></draggable>

::: details 点击展开 例子代码
<<< ./draggable.vue
:::