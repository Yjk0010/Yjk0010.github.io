# 基础知识

##<span class="cor-tip">Vue</span>列表组件中写 **key**，其作用是什么

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

### vue2<Badge type="tip">2.6.14</Badge><Badge type="info">2.7 以后版本主要添加了关于 vue3 的部分写法支撑</Badge>

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

Vue3<Badge type="tip">3.3.4</Badge>

> dom diff 源码位置 /vuejs/core/blob/main/packages/runtime-core/src/renderer.ts [点击查看源码](https://github1s.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts#L1753)

::: details dom diff 关键源码 点击展开

```typescript
const patchUnkeyedChildren = (
  c1: VNode[],
  c2: VNodeArrayChildren,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopeIds: string[] | null,
  optimized: boolean
) => {
  c1 = c1 || EMPTY_ARR;
  c2 = c2 || EMPTY_ARR;
  const oldLength = c1.length;
  const newLength = c2.length;
  const commonLength = Math.min(oldLength, newLength);
  let i;
  for (i = 0; i < commonLength; i++) {
    const nextChild = (c2[i] = optimized
      ? cloneIfMounted(c2[i] as VNode)
      : normalizeVNode(c2[i]));
    patch(
      c1[i],
      nextChild,
      container,
      null,
      parentComponent,
      parentSuspense,
      isSVG,
      slotScopeIds,
      optimized
    );
  }
  if (oldLength > newLength) {
    // remove old
    unmountChildren(
      c1,
      parentComponent,
      parentSuspense,
      true,
      false,
      commonLength
    );
  } else {
    // mount new
    mountChildren(
      c2,
      container,
      anchor,
      parentComponent,
      parentSuspense,
      isSVG,
      slotScopeIds,
      optimized,
      commonLength
    );
  }
};

// can be all-keyed or mixed
const patchKeyedChildren = (
  c1: VNode[],
  c2: VNodeArrayChildren,
  container: RendererElement,
  parentAnchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopeIds: string[] | null,
  optimized: boolean
) => {
  let i = 0;
  const l2 = c2.length;
  let e1 = c1.length - 1; // prev ending index
  let e2 = l2 - 1; // next ending index

  // 1. sync from start
  // (a b) c
  // (a b) d e
  while (i <= e1 && i <= e2) {
    const n1 = c1[i];
    const n2 = (c2[i] = optimized
      ? cloneIfMounted(c2[i] as VNode)
      : normalizeVNode(c2[i]));
    if (isSameVNodeType(n1, n2)) {
      patch(
        n1,
        n2,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      break;
    }
    i++;
  }

  // 2. sync from end
  // a (b c)
  // d e (b c)
  while (i <= e1 && i <= e2) {
    const n1 = c1[e1];
    const n2 = (c2[e2] = optimized
      ? cloneIfMounted(c2[e2] as VNode)
      : normalizeVNode(c2[e2]));
    if (isSameVNodeType(n1, n2)) {
      patch(
        n1,
        n2,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      break;
    }
    e1--;
    e2--;
  }

  // 3. common sequence + mount
  // (a b)
  // (a b) c
  // i = 2, e1 = 1, e2 = 2
  // (a b)
  // c (a b)
  // i = 0, e1 = -1, e2 = 0
  if (i > e1) {
    if (i <= e2) {
      const nextPos = e2 + 1;
      const anchor = nextPos < l2 ? (c2[nextPos] as VNode).el : parentAnchor;
      while (i <= e2) {
        patch(
          null,
          (c2[i] = optimized
            ? cloneIfMounted(c2[i] as VNode)
            : normalizeVNode(c2[i])),
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        i++;
      }
    }
  }

  // 4. common sequence + unmount
  // (a b) c
  // (a b)
  // i = 2, e1 = 2, e2 = 1
  // a (b c)
  // (b c)
  // i = 0, e1 = 0, e2 = -1
  else if (i > e2) {
    while (i <= e1) {
      unmount(c1[i], parentComponent, parentSuspense, true);
      i++;
    }
  }

  // 5. unknown sequence
  // [i ... e1 + 1]: a b [c d e] f g
  // [i ... e2 + 1]: a b [e d c h] f g
  // i = 2, e1 = 4, e2 = 5
  else {
    const s1 = i; // prev starting index
    const s2 = i; // next starting index

    // 5.1 build key:index map for newChildren
    const keyToNewIndexMap: Map<string | number | symbol, number> = new Map();
    for (i = s2; i <= e2; i++) {
      const nextChild = (c2[i] = optimized
        ? cloneIfMounted(c2[i] as VNode)
        : normalizeVNode(c2[i]));
      if (nextChild.key != null) {
        if (__DEV__ && keyToNewIndexMap.has(nextChild.key)) {
          warn(
            `Duplicate keys found during update:`,
            JSON.stringify(nextChild.key),
            `Make sure keys are unique.`
          );
        }
        keyToNewIndexMap.set(nextChild.key, i);
      }
    }

    // 5.2 loop through old children left to be patched and try to patch
    // matching nodes & remove nodes that are no longer present
    let j;
    let patched = 0;
    const toBePatched = e2 - s2 + 1;
    let moved = false;
    // used to track whether any node has moved
    let maxNewIndexSoFar = 0;
    // works as Map<newIndex, oldIndex>
    // Note that oldIndex is offset by +1
    // and oldIndex = 0 is a special value indicating the new node has
    // no corresponding old node.
    // used for determining longest stable subsequence
    const newIndexToOldIndexMap = new Array(toBePatched);
    for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;

    for (i = s1; i <= e1; i++) {
      const prevChild = c1[i];
      if (patched >= toBePatched) {
        // all new children have been patched so this can only be a removal
        unmount(prevChild, parentComponent, parentSuspense, true);
        continue;
      }
      let newIndex;
      if (prevChild.key != null) {
        newIndex = keyToNewIndexMap.get(prevChild.key);
      } else {
        // key-less node, try to locate a key-less node of the same type
        for (j = s2; j <= e2; j++) {
          if (
            newIndexToOldIndexMap[j - s2] === 0 &&
            isSameVNodeType(prevChild, c2[j] as VNode)
          ) {
            newIndex = j;
            break;
          }
        }
      }
      if (newIndex === undefined) {
        unmount(prevChild, parentComponent, parentSuspense, true);
      } else {
        newIndexToOldIndexMap[newIndex - s2] = i + 1;
        if (newIndex >= maxNewIndexSoFar) {
          maxNewIndexSoFar = newIndex;
        } else {
          moved = true;
        }
        patch(
          prevChild,
          c2[newIndex] as VNode,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        patched++;
      }
    }

    // 5.3 move and mount
    // generate longest stable subsequence only when nodes have moved
    const increasingNewIndexSequence = moved
      ? getSequence(newIndexToOldIndexMap)
      : EMPTY_ARR;
    j = increasingNewIndexSequence.length - 1;
    // looping backwards so that we can use last patched node as anchor
    for (i = toBePatched - 1; i >= 0; i--) {
      const nextIndex = s2 + i;
      const nextChild = c2[nextIndex] as VNode;
      const anchor =
        nextIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor;
      if (newIndexToOldIndexMap[i] === 0) {
        // mount new
        patch(
          null,
          nextChild,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else if (moved) {
        // move if:
        // There is no stable subsequence (e.g. a reverse)
        // OR current node is not among the stable sequence
        if (j < 0 || i !== increasingNewIndexSequence[j]) {
          move(nextChild, container, anchor, MoveType.REORDER);
        } else {
          j--;
        }
      }
    }
  }
};
```

:::

Vue3 的 Key 值影响比较直观

分为两个方法 **patchUnkeyedChildren** 和 **patchKeyedChildren** 来实现 dom 的<span class="cor-tip">patch</span>

**patchUnkeyedChildren** 方法中直接就是最简单的遍历循环

- 长度一致就原地<span class="cor-tip">patch 更新(不重新渲染 dom)</span>
- 长度不一致就行进行 -<span class="cor-da">unmountChildren 卸载(删除 dom)</span>-<span class="cor-wa">mountChildren 挂载(添加 dom)</span>
  - 没有经过**任何**的<span class="cor-tip">dom diff</span>算法加速处理。

**patchKeyedChildren** 方法中 使用了<span class="cor-tip">dom diff</span>算法

- 进行<span class="cor-tip">头尾比较</span>
- 判断是否是<span class="cor-tip">仅添加</span>或者<span class="cor-da">仅删除</span>
- 最后在进行<span class="cor-wa">复杂处理</span>
  - 通过**二分查找**和**贪心算法**实现<span class="cor-tip">最长递增子序列</span>
  - 然后以<span class="cor-tip">最小的 dom 操作</span>来更新 dom。
