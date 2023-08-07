# 基础知识

## Key 的作用

> <span class="cor-tip">Vue</span>列表组件中写 **key**，其作用是什么

- 如果没有`key`
  - Vue 认为这是两个不同的组件,会重新创建组件实例,状态会丢失,并且会更消耗浏览器性能。
- 书写`key`的作用主要有两个:
  1. 性能更高
     通过`key`避免不必要的 DOM 更新从而提高渲染性能  
     Vue 会根据`key`的值来判断列表项目是否发生变化,从而决定是否需要重新渲染该列表项的 DOM 结构。  
     如果没有`key`Vue 只能从头开始对列表的每个项目进行 diff,进而决定是否需要重新渲染。这种情况下,尽管数据未发生变化,列表也会进行重新渲染,效率非常低。  
     而有了`key`后,Vue 会根据`key`值找出两个列表中相同的项目,进而避免不必要的 DOM 更新。
  2. 可以保持组件状态,避免重新渲染时状态丢失。  
     当列表进行重新渲染时,如果`key`值不变,Vue 会认为它是同一个组件,仅会更新该组件,而不会重新创建组件实例。  
     这意味着组件的状态会被保留下来,比如输入框的内容、复选框的选中状态等会被保留。

## **key** 在<span class="cor-tip">源码</span>中的体现

> 首先要知道一点的是，Key 函数在 vue 进行 dom diff 算法的时候对其 dom 的重新渲染加速处理的。所以想要知道 key 在其中的作用，我么就要看 key 在源码中使用时候是怎么来进行调用处理的。

### Vue2<Badge type="tip">2.6.14</Badge><Badge type="info">2.7 以后版本仅添加了关于 vue3 的部分写法支撑，所以可以说 2.6.14 是 vue2 的最后一个版本</Badge>

> dom diff 源码位置 /src/core/vdom/patch.js [点击查看源码](https://github1s.com/vuejs/vue/blob/v2.6.14/src/core/vdom/patch.js#L404)

主要位置是 **updateChildren** 函数中的 **while** 循环中的最后一个 **else** 中 代码解释如下

<span class="cor-da">因为没有 key 值导致的性能损耗位置我会用红色注释标记</span>

::: details 下面关键引用方法 点击展开

```javascript
isUndef;
// 为 undefined 和 null
function isUndef(v) {
  return v === undefined || v === null;
}
// 不为 undefined 和 null
function isDef(v) {
  return v !== undefined && v !== null;
}
// 该方法映射一个 key 到 原来 index 的对象
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}
// 遍历查找当前的index值
function findIdxInOld(node, oldCh, start, end) {
  for (let i = start; i < end; i++) {
    const c = oldCh[i];
    if (isDef(c) && sameVnode(node, c)) return i;
  }
}
// 判断在当前两个dom节点是否一致
function sameVnode(a, b) {
  return (
    // 如果有key将可以直接比较出不同不用在进行 && 之后的判断 // [!code error]
    a.key === b.key &&
    a.asyncFactory === b.asyncFactory &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error)))
  );
}
```

:::

```javascript
else {
  // oldKeyToIdx 是一个map对象 通过 createKeyToOldIdx 方法 return 出来的
  // 当 isUndef(oldKeyToIdx) 为真 也就是第一次进来的时候会触发当前方法
  if (isUndef(oldKeyToIdx))
    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
  idxInOld = isDef(newStartVnode.key)
    ? oldKeyToIdx[newStartVnode.key]
    // 就是 isDef(newStartVnode.key) 为真 将会调用 findIdxInOld // [!code error]
    // 将会遍历查找当前阶段要处理的所有节点去比对找相等 // [!code error]
    : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
  if (isUndef(idxInOld)) { // New element
    // 如果没有key将不可能进入到当前判断中 // [!code error]
    createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm,
     false, newCh, newStartIdx)
  } else {
    vnodeToMove = oldCh[idxInOld]
    // 在sameVnode判断中key也有一部分影响 // [!code error]
    if (sameVnode(vnodeToMove, newStartVnode)) {
      patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue,
      newCh, newStartIdx)
      oldCh[idxInOld] = undefined
      canMove && nodeOps.insertBefore(parentElm,
      vnodeToMove.elm, oldStartVnode.elm)
    } else {
      createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm,
       false, newCh, newStartIdx)
    }
  }
  newStartVnode = newCh[++newStartIdx]
}
```

总结下来就是 **这个影响是方方面面的** 请自行总结。

### Vue3<Badge type="tip">3.3.4</Badge>

> dom diff 源码位置 /vuejs/core/blob/main/packages/runtime-core/src/renderer.ts [点击查看源码](https://github1s.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts#L1753)

Vue3 的 Key 值影响比较直观

分为两个方法 **patchUnkeyedChildren** 和 **patchKeyedChildren** 来实现 dom 的<span class="cor-tip">更新</span>操作。

**patchUnkeyedChildren** 方法中直接就是最简单的遍历循环

- 长度一致就原地<span class="cor-tip">patch 更新(不重新渲染 dom)</span>
- 新比旧`短了`就执行<span class="cor-da">unmountChildren 卸载(删除 dom)</span>
- 新比旧`长了`就执行<span class="cor-wa">mountChildren 挂载(添加 dom)</span>
  - 没有经过**任何**的<span class="cor-tip">dom diff</span>算法加速处理。

**patchKeyedChildren** 方法中 使用了<span class="cor-tip">dom diff</span>算法

- 进行<span class="cor-tip">头尾比较</span>
- 判断是否是<span class="cor-tip">仅添加</span>或者<span class="cor-da">仅删除</span>
- 最后在进行<span class="cor-wa">复杂处理</span>
  - 通过**二分查找**和**贪心算法**实现<span class="cor-tip">最长递增子序列</span>
  - 然后以<span class="cor-tip">最小的 dom 操作</span>来更新 dom。
