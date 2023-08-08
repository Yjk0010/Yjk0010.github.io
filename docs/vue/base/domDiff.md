# Dom Diff 算法

## 为什么要有 Dom Diff 算法

> Vue 实现 DOM Diff 算法的主要原因有:

1. <span class="cor-tip">提高重渲染效率</span>  
   Vue 使用虚拟 DOM 来追踪数据变更和 DOM 状态。当数据变化时,diff 算法可以找出需要更新的最小 DOM 元素,而不是全部重新渲染,从而提高效率。
2. <span class="cor-tip">实现响应式视图</span>  
   diff 算法让 Vue 可以精确知晓哪些部件需要更新,从而实现视图与数据的响应式绑定,当数据变化时视图自动更新。
3. <span class="cor-tip">优化性能消耗</span>  
   减少不必要的 DOM 操作是提高性能的关键。diff 算法生成补丁运算,最小化了页面重绘与回流,大幅优化了性能消耗。
4. <span class="cor-tip">解耦视图与数据</span>  
   Vue 通过虚拟 DOM 实现了视图和数据的解耦,开发者只需要关注数据变更,无需直接操作 DOM。
5. <span class="cor-tip">提供统一编程模型</span>  
   diff 算法为 Vue 的声明式编程模型提供了核心支持,开发者可以声明视图的期望状态。

综上,diff 算法是 Vue 高效实现响应式视图的关键,既降低了视图更新的性能消耗,也提高了框架的易用性。这是 Vue 作为主流框架的重要基石。

## Diff 对比规则

<span class="cor-tip">Vue</span> 的 <span class="cor-tip">diff</span> 算法是<span class="cor-wa">同层</span>比较，不会<span class="cor-da">跨层比较</span>，时间复杂度为 **O(N)**。

<PicViewer title="多层节点比较关系" src="/assets/vue/vue_diff.png" darkSrc="/assets/vue/vue_diff-dark.png" alt=""/>

## 同层级内比较规则

> 这个同层级比较规则 vue2 和 vue3 实现略有不同

### vue2 实现过程<Badge type="tip">2.6.14</Badge>

> 下面代码是 vue2 的代码实现过程

::: details 点击这里展开主要代码 有注释 [点击这里查看官方源码](https://github1s.com/vuejs/vue/blob/v2.6.14/src/core/vdom/patch.js#L404)

```javascript
/**
 * parentElm 父节点
 * oldCh  原来子节点数组
 * newCh  新子节点数组
 * insertedVnodeQueue 已插入的虚拟节点队列
 *    在 diff 结束后,insertedVnodeQueue 会被遍历 用来调用节点的钩子函数
 * removeOnly 是一个特殊标志 由transition group控制
 */
function updateChildren(
  parentElm,
  oldCh,
  newCh,
  insertedVnodeQueue,
  removeOnly
) {
  let oldStartIdx = 0; // 旧节点起始指针
  let newStartIdx = 0; // 新节点起始指针
  let oldEndIdx = oldCh.length - 1; // 旧节点结束指针
  let oldStartVnode = oldCh[0]; // 旧节点开始虚拟节点
  let oldEndVnode = oldCh[oldEndIdx]; // 旧节点结束虚拟节点
  let newEndIdx = newCh.length - 1; // 新节点结束指针
  let newStartVnode = newCh[0]; // 新节点开始虚拟节点
  let newEndVnode = newCh[newEndIdx]; // 新节点结束虚拟节点
  let oldKeyToIdx, idxInOld, vnodeToMove, refElm;
  // removeOnly是一个特殊标志，
  // 仅由＜transition group＞使用
  // 以确保移除的元件在离开过渡期间保持在正确的相对位置
  const canMove = !removeOnly;

  if (process.env.NODE_ENV !== "production") {
    // 检查key是否重复
    checkDuplicateKeys(newCh);
  }
  while (
    oldStartIdx <= oldEndIdx &&
    newStartIdx <= newEndIdx /* diff 处理 以及终止条件 */
  ) {
    if (isUndef(oldStartVnode) /* 确保oldStartIdx 始终指向正确的虚拟节点 */) {
      // 旧虚拟列表开始指针右移
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (
      isUndef(oldEndVnode) /* 确保oldEndIdx 始终指向正确的虚拟节点 */
    ) {
      // 旧虚拟列表结束指针左移
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode) /*头头比较*/) {
      // 在newStartIdx位置patch更新
      patchVnode(
        oldStartVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      // 所有开始指针右移
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode) /*尾尾比较*/) {
      // 在newEndIdx位置patch更新
      patchVnode(
        oldEndVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      // 所有结束指针左移
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (
      sameVnode(oldStartVnode, newEndVnode) /*旧虚拟列表头与新虚拟列表尾比较*/
    ) {
      // 在newEndIdx位置patch更新
      patchVnode(
        oldStartVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      canMove &&
        nodeOps.insertBefore(
          parentElm,
          oldStartVnode.elm,
          nodeOps.nextSibling(oldEndVnode.elm)
        );
      // 旧虚拟列表开始指针右移
      oldStartVnode = oldCh[++oldStartIdx];
      // 新虚拟列表结束指针左移
      newEndVnode = newCh[--newEndIdx];
    } else if (
      sameVnode(oldEndVnode, newStartVnode) /*旧虚拟列表尾与新虚拟列表头比较*/
    ) {
      // 在newStartIdx位置patch更新
      patchVnode(
        oldEndVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      canMove &&
        nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      // 旧虚拟列表结束指针左移
      oldEndVnode = oldCh[--oldEndIdx];
      // 新虚拟列表开始指针右移
      newStartVnode = newCh[++newStartIdx];
    } /* 复杂比较 */ else {
      // oldKeyToIdx 是一个 map 对象 内部存储了由 key 到 index 的映射
      if (isUndef(oldKeyToIdx))
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      // 取出当前newStartVnode针对于 oldCh 的 index
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
      // 如果idxInOld 无值 则说明 newStartVnode 在旧虚拟列表中不存在
      if (isUndef(idxInOld)) {
        // 在 newStartIdx 位置创建一个新的虚拟节点
        createElm(
          newStartVnode,
          insertedVnodeQueue,
          parentElm,
          oldStartVnode.elm,
          false,
          newCh,
          newStartIdx
        );
      } else {
        // 用idxInOld索引值在旧虚拟列表中取出对应的虚拟节点
        vnodeToMove = oldCh[idxInOld];
        // 如果当前newStartVnode与 取出的节点相同
        if (sameVnode(vnodeToMove, newStartVnode)) {
          // 在newStartIdx位置patch更新
          patchVnode(
            vnodeToMove,
            newStartVnode,
            insertedVnodeQueue,
            newCh,
            newStartIdx
          );
          // 并将旧虚拟节点移除
          oldCh[idxInOld] = undefined;
          canMove &&
            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
        } else {
          // 不同则在newEndIdx位置创建一个新的虚拟节点
          createElm(
            newStartVnode,
            insertedVnodeQueue,
            parentElm,
            oldStartVnode.elm,
            false,
            newCh,
            newStartIdx
          );
        }
      }
      // 新虚拟列表开始指针右移
      newStartVnode = newCh[++newStartIdx];
    }
  }
  //
  if (oldStartIdx > oldEndIdx /* 如果新节点开始位置大于旧节点结束位置 */) {
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
    // 从newStartIdx到newEndIdx位置添加新的虚拟节点
    addVnodes(
      parentElm,
      refElm,
      newCh,
      newStartIdx,
      newEndIdx,
      insertedVnodeQueue
    );
  } else if (
    newStartIdx > newEndIdx /* 如果新节点开始位置大于新节点结束位置 */
  ) {
    // 从oldStartIdx到oldEndIdx位置删除旧的虚拟节点
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
}
```

:::

#### 为了方便理解我这边放上图解过程

假设现在有节点 **1,2,3,4,5,6,7** 经过操作变成了 **1,2,5,6,8,7**

diff 过程是这样的：
