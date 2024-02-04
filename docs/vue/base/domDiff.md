# Dom Diff 算法

<script setup>
  import {ref} from "vue"
import DetailInfo from "docs/components/DetailInfo/index.vue"

const info = ref({
  oldStartIdx:"旧列表头指针",
  oldEndIdx:"旧列表尾指针",
  newStartIdx:"新列表头指针",
  newEndIdx:"新列表尾指针",
  patchVnode:"节点原地更新方法，对dom操作影响小",
  addVnodes:"循环调用 patchVnode",
  createElm:"创建新节点方法",
  removeVnodes:"删除节点，以及解绑节点上的钩子函数",
  idxInOld:'当前 新列表 key 对应的 旧列表索引',
  oldCh:"旧列表",
  newStartVnode:"当前新节点",
})
const infoConfig = [
  {
    label: "oldStartIdx",
    key: "oldStartIdx",
  },
  {
    label: "oldEndIdx",
    key: "oldEndIdx",
  },
  {
    label: "newStartIdx",
    key: "newStartIdx",
  },
  {
    label: "newEndIdx",
    key: "newEndIdx",
  },
  {
    label: "patchVnode",
    key: "patchVnode",
    col:1
  },
  {
    label: "addVnodes",
    key: "addVnodes",
  },
  {
    label: "createElm",
    key: "createElm",
  },
  {
    label: "removeVnodes",
    key: "removeVnodes",
    col:1
  },
  {
    label: "idxInOld",
    key: "idxInOld",
    col:1
  },
  {
    label: "oldCh",
    key: "oldCh",
  },
  {
    label: "newStartVnode",
    key: "newStartVnode",
  },
]
</script>

## 为什么要有 Dom Diff 算法

> Vue 实现 DOM Diff 算法的主要原因有:

1. <TText>提高重渲染效率</TText>  
   Vue 使用虚拟 DOM 来追踪数据变更和 DOM 状态.当数据变化时,diff 算法可以找出需要更新的最小 DOM 元素,而不是全部重新渲染,从而提高效率.
2. <TText>实现响应式视图</TText>  
   diff 算法让 Vue 可以精确知晓哪些部件需要更新,从而实现视图与数据的响应式绑定,当数据变化时视图自动更新.
3. <TText>优化性能消耗</TText>  
   减少不必要的 DOM 操作是提高性能的关键.diff 算法生成补丁运算,最小化了页面重绘与回流,大幅优化了性能消耗.
4. <TText>解耦视图与数据</TText>  
   Vue 通过虚拟 DOM 实现了视图和数据的解耦,开发者只需要关注数据变更,无需直接操作 DOM.
5. <TText>提供统一编程模型</TText>  
   diff 算法为 Vue 的声明式编程模型提供了核心支持,开发者可以声明视图的期望状态.

综上,diff 算法是 Vue 高效实现响应式视图的关键,既降低了视图更新的性能消耗,也提高了框架的易用性.这是 Vue 作为主流框架的重要基石.

## Diff 对比规则

<TText>Vue</TText> 的 <TText>diff</TText> 算法是<TText type="warning">同层</TText>比较，不会<TText type="danger">跨层比较</TText>，时间复杂度为 **O(N)**.

<PicViewer title="多层节点比较关系" src="/assets/vue/vue_diff.png" darkSrc="/assets/vue/vue_diff-dark.png" alt=""/>

## 同层级内比较规则

> 这个同层级比较规则 vue2 和 vue3 实现略有不同

### Vue2 实现过程<Badge type="tip">2.6.14</Badge>

> 下面代码是 Vue2 Diff 的代码实现

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

#### 流程图

> 为了方便理解我这边给上流程图

<TText>Vue2 Dom Diff</TText> 过程主要是由 **while 循环** 和 **循环后处理** 两个部分构成

::: details 点击展开 流程图中的单词解释
<DetailInfo :info="info" labelWidth="120px" :col="2" :infoConfig="infoConfig"></DetailInfo>
:::

<PicViewer title="diff处理流程 while循环流程图" src="/assets/vue/vue2_diff_while.png" darkSrc="/assets/vue/vue2_diff_while-dark.png" alt="  "/>
<PicViewer title="diff处理流程 循环后处理流程图" src="/assets/vue/vue2_diff_end.png" darkSrc="/assets/vue/vue2_diff_end-dark.png" alt="  "/>

#### <TText>例子展示比较过程</TText>

假设现在有节点 **1,2,3,4,5,6,7** 经过操作变成了 **1,6,4,8,2,7**

- <span style="color:#a5d8ff">蓝色</span> 节点是 <TText type="success">旧的虚拟 dom 节点</TText>
- <span style="color:#ffec99">黄色</span> 节点是 <TText type="warning">新的虚拟 dom 节点</TText>
- <span style="color:#b2f2bb">变成绿色</span> 说明 <TText>diff 成功 已经更新</TText>

<PicViewer title="初始状态" src="/assets/vue/vue2_diff-1.png" darkSrc="/assets/vue/vue2_diff-dark1.png" alt=" "/>
第一次循环 **头头比较** <TText>成功</TText>  执行`patchVnode` **两个头指针 右移**
<PicViewer title="第一次比较之后状态" src="/assets/vue/vue2_diff-2.png" darkSrc="/assets/vue/vue2_diff-dark2.png" alt="  "/>
第二次循环 **尾尾比较** <TText>成功</TText>  执行`patchVnode` **两个尾指针 左移**
<PicViewer title="第二次比较之后状态" src="/assets/vue/vue2_diff-3.png" darkSrc="/assets/vue/vue2_diff-dark3.png" alt="  "/>
第三次循环 **头尾比较** <TText>成功</TText>  执行`patchVnode` **旧节点头指针右移 新节点尾指针左移**
<PicViewer title="第三次比较之后状态" src="/assets/vue/vue2_diff-4.png" darkSrc="/assets/vue/vue2_diff-dark4.png" alt="  "/>
第四次循环 **尾头比较** <TText>成功</TText>  执行`patchVnode` **旧节点尾指针左移 新节点头指针右移**
<PicViewer title="第四次比较之后状态" src="/assets/vue/vue2_diff-5.png" darkSrc="/assets/vue/vue2_diff-dark5.png" alt="  "/>
第五次循环 **进入复杂比较** 创建 <TText>oldKeyToIdx</TText> 对象

```javascript
oldKeyToIdx = {
  3: 2,
  4: 3,
  5: 4,
};
```

当前新节点的 **key 为 4**，取得 <TText type="warning">旧列表</TText> **下标为 3 的节点** 判断两个节点是否 <TText>相同</TText>

发现 <TText>相同</TText>

执行 `patchVnode` 并 将 <TText type="warning">旧节点</TText> 列表 当前下标置为 `undefined` 然后 **新节点头指针右移**

<PicViewer title="第五次比较之后状态" src="/assets/vue/vue2_diff-6.png" darkSrc="/assets/vue/vue2_diff-dark6.png" alt="  "/>
第六次循环 **进入复杂比较**

当前新节点的 **key 为 8**，未取得 <TText type="warning">旧列表</TText> 中节点

执型 `createElm` 创建一个 <TText>新节点</TText> 然后 **新节点头指针右移**

<PicViewer title="第六次比较之后状态" src="/assets/vue/vue2_diff-7.png" darkSrc="/assets/vue/vue2_diff-dark7.png" alt="  "/>

因 **newStartIdx > newEndIdx** 终止循环 进入 <TText>循环后处理</TText>

<TText>此时新节点列表已经生成</TText>

<PicViewer title="循环后处理时" src="/assets/vue/vue2_diff-8.png" darkSrc="/assets/vue/vue2_diff-dark8.png" alt="  "/>

因为 **newStartIdx > newEndIdx** 可知是 <TText type="warning">新节点指针作用</TText> <TText type="danger">停止循环</TText>

因此要卸载 <TText type="warning">旧节点</TText> 并取消其上的 <TText>钩子函数</TText>

#### 结果

复杂遍历过程之中 只 <TText type="danger">删除了</TText> **3,5 节点**， <TText>添加了</TText> **8 节点**， <TText type="success">复制</TText> **4,6 节点**.<TText type="danger">高效的完成了新旧节点的遍历转换</TText>.

#### 例子缺陷

> 该例子没有展现出 `addVnodes` 方法 因为这样的情况是要 <TText>新节点</TText> 的数量比 <TText type="warning">旧节点</TText> 数量多的时候才会出现.(这个好理解)

### Vue3 实现过程 <Badge type="tip">3.3.4</Badge>

> 下面是 Vue3 Diff 的代码实现

::: details 点击这里展开主要代码 有注释 [点击这里查看官方源码](https://github1s.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts#L1753)

```typescript
// can be all-keyed or mixed
const patchKeyedChildren = (
  c1: VNode[], // 旧虚拟节点列表
  c2: VNodeArrayChildren, // 新虚拟节点列表
  container: RendererElement, // 父容器的真实DOM元素
  parentAnchor: RendererNode | null, // 新子节点将插入在该节点前面
  parentComponent: ComponentInternalInstance | null, // 父组件实例
  parentSuspense: SuspenseBoundary | null, // 父组件的 SuspenseBoundary 实例
  isSVG: boolean, // 是否是 SVG
  slotScopeIds: string[] | null, // 编译作用域id数组
  optimized: boolean // 是否启用优化模式
) => {
  let i = 0; // 记录前置索引值
  const l2 = c2.length; // 记录新节点列表长度
  let e1 = c1.length - 1; // 记录旧节点后置索引值
  let e2 = l2 - 1; // 记录新节点后置索引值

  // 1. 预处理前置节点
  // (a b) c
  // (a b) d e
  while (i <= e1 && i <= e2) {
    const n1 = c1[i];
    const n2 = (c2[i] = optimized
      ? cloneIfMounted(c2[i] as VNode)
      : normalizeVNode(c2[i]));
    if (isSameVNodeType(n1, n2)) {
      // 判断相同原地patch更新
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

  // 2. 预处理后置节点
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

  // 3. 处理仅新增节点情况
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

  // 4. 处理仅删除节点情况
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

  // 5. 处理其他情况
  // [i ... e1 + 1]: a b [c d e] f g
  // [i ... e2 + 1]: a b [e d c h] f g
  // i = 2, e1 = 4, e2 = 5
  else {
    const s1 = i; // 记录旧节点列表遍历开始节点索引
    const s2 = i; // 记录新节点列表遍历开始节点索引

    // 5.1 创建 新节点位置映射表
    const keyToNewIndexMap: Map<string | number | symbol, number> = new Map();
    for (i = s2; i <= e2; i++) {
      const nextChild = (c2[i] = optimized
        ? cloneIfMounted(c2[i] as VNode)
        : normalizeVNode(c2[i]));
      // key值重复的提示
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

    // 5.2 遍历需要patch的节点以及删除不存在的节点
    let j;
    let patched = 0;
    // 记录需要处理节点的长度
    const toBePatched = e2 - s2 + 1;
    // 用于跟踪是有有任何节点移动
    let moved = false;
    // 当前距离新节点最远位置  用来判断是否需要移动
    let maxNewIndexSoFar = 0;
    // 新旧节点位置映射表 注意内部存储的值是 是s1+1的值  因为0是一个 特殊值  用来判断是否是新增节点
    const newIndexToOldIndexMap = new Array(toBePatched);
    for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;

    for (i = s1; i <= e1; i++) {
      const prevChild = c1[i];
      if (patched >= toBePatched) {
        // 所有的节点在之前处理已经全部patch过 如果再出现那就是需要删除的节点
        unmount(prevChild, parentComponent, parentSuspense, true);
        continue;
      }
      // 新节点的位置索引
      let newIndex;
      if (prevChild.key != null) {
        newIndex = keyToNewIndexMap.get(prevChild.key);
      } else {
        // 无KEY得时候查找
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
        // 未找到key进行删除操作
        unmount(prevChild, parentComponent, parentSuspense, true);
      } else {
        // 找到值之后放入 新旧节点位置映射表 中 并根据最远位置判断是否需要移动
        newIndexToOldIndexMap[newIndex - s2] = i + 1;
        if (newIndex >= maxNewIndexSoFar) {
          maxNewIndexSoFar = newIndex;
        } else {
          moved = true;
        }
        // 并patch更新
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
        // 更新指针右移
        patched++;
      }
    }

    // 5.3 移动和挂载
    // 仅当节点移动时生成最长的稳定子序列
    const increasingNewIndexSequence = moved
      ? getSequence(newIndexToOldIndexMap)
      : EMPTY_ARR;
    j = increasingNewIndexSequence.length - 1;
    // 倒序遍历以方便使用最后一个节点为根节点方便循序
    for (i = toBePatched - 1; i >= 0; i--) {
      const nextIndex = s2 + i;
      const nextChild = c2[nextIndex] as VNode;
      const anchor =
        nextIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor;
      if (newIndexToOldIndexMap[i] === 0) {
        // 新节点挂载
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
        // 在以下情况下移动：
        // 没有 最长递增子序列（例如反向）
        // 当前节点不在 最长递增子序列中
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

#### 流程图

> 为了方便理解我这边给上流程图

<PicViewer title="diff处理流程" src="/assets/vue/vue3_diff_flow.png" darkSrc="/assets/vue/vue3_diff_flow-dark.png" alt="  "/>

> 从流程上看 Vue3 相较于 Vue2 简化了很多但是性能上却另有提升，主要是分情况处理了仅添加和仅删除的情况，以及通过最长递增子序列来进行 dom 移动最小化的减少了 dom 的处理.

#### <TText>例子展示比较过程</TText>

假设现在有节点 **n1,n2,n3,n4,n5,n6,n7** 经过操作变成了 **n1,n6,n4,n5,n8,n7**

- <span style="color:#a5d8ff">蓝色</span> 节点是 <TText type="success">旧的虚拟 dom 节点</TText>
- <span style="color:#ffec99">黄色</span> 节点是 <TText type="warning">新的虚拟 dom 节点</TText>
- <span style="color:#ffc9c9">红色</span> 节点是 <TText type="danger">当前选中比较的节点</TText>
- <span style="color:#b2f2bb">变成绿色</span> 说明 <TText>diff 成功 已经更新</TText>

<PicViewer title="预处理前置节点" src="/assets/vue/vue3_diff-1.png" darkSrc="/assets/vue/vue3_diff-dark1.png" alt=" "/>

- <TText>创建遍历索引</TText> **i = 0**
- <TText type="success">创建旧节点结束索引</TText> **e1 = 6**
- <TText type="warning">创建新节点结束索引</TText> **e2 = 5**
- **开始** <TText>预处理前置节点</TText>
- <TText>n1 节点相同</TText> <TText type="danger">patch</TText> <TText>n1</TText>
- **继续处理** <TText>预处理前置节点</TText> `i++`

<PicViewer title="处理情况改变" src="/assets/vue/vue3_diff-2.png" darkSrc="/assets/vue/vue3_diff-dark2.png" alt=" "/>

- **此时 i = 1**
- <TText type="success">节点 n2</TText> 和 <TText type="warning">节点 n6</TText> <TText type="info">不相等</TText>
- <TText type="danger">结束</TText> <TText>预处理前置节点</TText>
- **开始进行** <TText>预处理后置节点</TText>

<PicViewer title="预处理后置节点" src="/assets/vue/vue3_diff-3.png" darkSrc="/assets/vue/vue3_diff-dark3.png" alt=" "/>

- <TText type="success">旧节点索引</TText> **e1 = 6**
- <TText type="warning">新节点索引</TText> **e2 = 5**
- <TText>n7 节点相同</TText> <TText type="danger">patch</TText> <TText>n7</TText>
- **继续处理** <TText>预处理后置节点</TText> `e1--` `e2--`

<PicViewer title="处理情况改变" src="/assets/vue/vue3_diff-4.png" darkSrc="/assets/vue/vue3_diff-dark4.png" alt=" "/>

- <TText type="success">旧节点索引</TText> **el = 5**
- <TText type="warning">新节点索引</TText> **e2 = 4**
- <TText type="success">节点 n6</TText> 和 <TText type="warning">节点 n8</TText> <TText type="info">不相等</TText>
- <TText type="danger">结束</TText> <TText>预处理后置节点</TText>

> <TText>仅新增</TText> 和 <TText type="danger">仅删除</TText> 情况无法进入复杂处理 展示如下

::: details 这里是仅新增的情况

处理旧节点列表为 **n1,n7** 新节点列表为 **n1,n6,n4,n5,n8,n7**

<PicViewer title="预处理后置节点" src="/assets/vue/vue3_diff-21.png" darkSrc="/assets/vue/vue3_diff-dark21.png" alt=" "/>

- <TText>预处理前置节点</TText> 已省略 直接过度到 <TText>预处理后置节点</TText>
- <TText>索引</TText> **i = 1**
- <TText type="success">旧节点索引</TText> **el = 1**
- <TText type="warning">新节点索引</TText> **e2 = 5**
- <TText type="danger">patch</TText> <TText>n7</TText>
- **继续** <TText>预处理后置节点</TText>

<PicViewer title="仅新增判断" src="/assets/vue/vue3_diff-22.png" darkSrc="/assets/vue/vue3_diff-dark22.png" alt=" "/>

- <TText>索引</TText> **i = 1**
- <TText type="success">旧节点索引</TText> **el = 0**
- <TText type="warning">新节点索引</TText> **e2 = 4**
- <TText type="success">节点 n1</TText> 和 <TText type="warning">节点 n8</TText> <TText type="info">不相等</TText>
- <TText type="danger">结束</TText> <TText>预处理后置节点</TText>
- 但 **此时可以发现** 当 **i > e1 && i <= e2** 即可证明剩下节点即为 <TText>仅新增节点</TText>
- 所以只需要对 **n6,n4,n5,n8** 进行 **新增即可**.

<PicViewer title="新增操作" src="/assets/vue/vue3_diff-23.png" darkSrc="/assets/vue/vue3_diff-dark23.png" alt=" "/>
:::

::: details 这里是仅删除的情况
处理旧节点列表为 **n1,n2,n3,n4,n5,n6,n7** 新节点列表为 **n1,n7**

<PicViewer title="预处理后置节点" src="/assets/vue/vue3_diff-31.png" darkSrc="/assets/vue/vue3_diff-dark31.png" alt=" "/>

- <TText>预处理前置节点</TText> 已省略 直接过度到 <TText>预处理后置节点</TText>
- <TText>索引</TText> **i = 1**
- <TText type="success">旧节点索引</TText> **el = 6**
- <TText type="warning">新节点索引</TText> **e2 = 1**
- <TText type="danger">patch</TText> <TText>n7</TText>
- **继续** <TText>预处理后置节点</TText>

<PicViewer title="仅新增判断" src="/assets/vue/vue3_diff-32.png" darkSrc="/assets/vue/vue3_diff-dark32.png" alt=" "/>

- <TText>索引</TText> **i = 1**
- <TText type="success">旧节点索引</TText> **el = 5**
- <TText type="warning">新节点索引</TText> **e2 = 0**
- <TText type="success">节点 n6</TText> 和 <TText type="warning">节点 n1</TText> <TText type="info">不相等</TText>
- <TText type="danger">结束</TText> <TText>预处理后置节点</TText>
- 但 **此时可以发现** 当 **i > e2 && i <= e1** 即可证明剩下节点即为 <TText>仅删除节点</TText>
- 所以只需要对 **n2,n3,n4,n5,n6** 进行 **删除即可**.

<PicViewer title="删除操作" src="/assets/vue/vue3_diff-33.png" darkSrc="/assets/vue/vue3_diff-dark33.png" alt=" "/>
:::

> 这里就是 <TText type="danger">其他复杂情况 也就是 diff 处理核心</TText> 了

<PicViewer title="diff处理 旧节点遍历" src="/assets/vue/vue3_diff-5.png" darkSrc="/assets/vue/vue3_diff-dark5.png" alt=" "/>

- <TText>创建</TText> **s1 = s2 = i = 1**
- <TText>创建</TText> <TText type="warning">新节点位置映射表</TText> 如图
- <TText>创建</TText> <TText type="success">新旧节点位置映射表</TText> 如图
- <TText type="success">设置</TText> **当前最远位置 = 0**
- <TText type="success">设置</TText> **移动标识 = false**
- <TText>开始</TText> <TText type="warning">遍历旧节点列表</TText>
- **此时 s1 = 1**
- **在** <TText type="warning">新节点位置映射表</TText> 中 <TText type="danger">未找到</TText> **n2** <TText type="danger">删除 n2 节点</TText>
- <TText>继续</TText> `s1++`

<PicViewer title="diff处理 旧节点遍历" src="/assets/vue/vue3_diff-6.png" darkSrc="/assets/vue/vue3_diff-dark6.png" alt=" "/>

- **此时 s1 = 2**
- **在** <TText type="warning">新节点位置映射表</TText> 中 <TText type="danger">未找到</TText> **n3** <TText type="danger">删除 n3 节点</TText>
- <TText>继续</TText> `s1++`

<PicViewer title="diff处理 旧节点遍历" src="/assets/vue/vue3_diff-7.png" darkSrc="/assets/vue/vue3_diff-dark7.png" alt=" "/>

- **此时 s1 = 3 , s2 = 1**
- **在** <TText type="warning">新节点位置映射表</TText> 中 <TText>找到</TText> **n4** 取得 <TText type="warning">新节点索引值 2</TText> 将 **s1+1** 的值 放入 <TText type="success">新旧节点映射表</TText> 索引为 **2 - s2** 的 **位置**
- <TText>patch 节点 n4</TText>
- **判断** <TText type="danger">当前最远位置值</TText> **0 < 2** 将**其值置**为 **2**
- <TText>继续</TText> `s1++`

<PicViewer title="diff处理 旧节点遍历" src="/assets/vue/vue3_diff-8.png" darkSrc="/assets/vue/vue3_diff-dark8.png" alt=" "/>

- **此时 s1 = 4 , s2 = 1**
- **在** <TText type="warning">新节点位置映射表</TText> 中 <TText>找到</TText> **n5** 取得 <TText type="warning">新节点索引值 3</TText> 将 **s1+1** 的值 放入 <TText type="success">新旧节点映射表</TText> 索引为 **3 - s2** 的 **位置**
- <TText>patch 节点 n5</TText>
- **判断** <TText type="danger">当前最远位置值</TText> **2 < 3** 将**其值置**为 **3**
- <TText>继续</TText> `s1++`

<PicViewer title="diff处理 旧节点遍历" src="/assets/vue/vue3_diff-9.png" darkSrc="/assets/vue/vue3_diff-dark9.png" alt=" "/>

- **此时 s1 = 5 , s2 = 1**
- **在** <TText type="warning">新节点位置映射表</TText> 中 <TText>找到</TText> **n6** 取得 <TText type="warning">新节点索引值 1</TText> 将 **s1+1** 的值 放入 <TText type="success">新旧节点映射表</TText> 索引为 **1 - s2** 的 **位置**
- <TText>patch 节点 n6</TText>
- **判断** <TText type="danger">当前最远位置值</TText> **3 > 1** 将 <TText type="success">移动标识置为</TText> **true**
- <TText>继续</TText> `s1++`

<PicViewer title="diff处理 新旧节点关系映射表倒序遍历" src="/assets/vue/vue3_diff-10.png" darkSrc="/assets/vue/vue3_diff-dark10.png" alt=" "/>

- **此时 s1 = 6 , e1 = 5**
- **s1 > e1** <TText type="danger">结束</TText> <TText>旧节点列表遍历</TText>
- 原有节点已经 <TText type="danger">patch</TText> 完毕了，剩下就是 <TText>新增</TText> 和 <TText type="success">移动</TText> 节点了
- 因为 **移动标识** 是 **true**
- <TText type="warning">基于</TText> <TText type="success">新旧节点关系映射表</TText> 取出其 <TText>最长递增子序列</TText> **[4,5]** <TText type="danger">此处返回的是其索引值</TText> **[1,2]**
- 然后 <TText>倒序遍历</TText> <TText type="success">新旧节点关系映射表</TText>
- <TText>创建</TText> <TText type="success">新旧节点关系映射表</TText> <TText type="danger">索引</TText> **i = 3** , <TText>最长递增子序列</TText> <TText type="danger">索引</TText> **j = 1**
- **此时 i = 3** 对应 **n8 节点** <TText type="success">新旧节点关系映射表</TText> 中 **值为 0**, 说明 **节点 n8** 是一个 <TText>新增节点</TText> <TText>新增 n8</TText>
- <TText>继续</TText> `i--`

<PicViewer title="diff处理 新旧节点关系映射表倒序遍历" src="/assets/vue/vue3_diff-11.png" darkSrc="/assets/vue/vue3_diff-dark11.png" alt=" "/>

- **此时 i = 2 , j = 1**
- 因为 <TText>最长递增子序列的第 j 位的值</TText> 与 **i** 相等 **所以** `j--`
- <TText>继续</TText> `i--`

<PicViewer title="diff处理 新旧节点关系映射表倒序遍历" src="/assets/vue/vue3_diff-12.png" darkSrc="/assets/vue/vue3_diff-dark12.png" alt=" "/>

- **此时 i = 1 , j = 0**
- 因为 <TText>最长递增子序列的第 j 位的值</TText> 与 **i** 相等 **所以** `j--`
- <TText>继续</TText> `i--`

<PicViewer title="diff处理 新旧节点关系映射表倒序遍历" src="/assets/vue/vue3_diff-13.png" darkSrc="/assets/vue/vue3_diff-dark13.png" alt=" "/>

- **此时 i = 0 , j = -1**
- 因为 **j < 0** 所以 **执型** <TText type="success">move 函数</TText>
- 将 <TText type="success">n6 移动到 新节点列表</TText> **对应位置**
- <TText>继续</TText> `i-- = -1` 小于 0 <TText type="danger">停止倒序遍历</TText>
- **至此遍历结束**

#### 结果

- 复杂遍历过程之中 只 <TText type="danger">删除了</TText> **n2,n3 节点**， <TText>添加了</TText> **n8 节点**， <TText type="success">移动了</TText> **n6 节点**.<TText type="danger">极高效的完成了新旧节点的遍历转换</TText>.

## 总结

> Dom Diff 算法 Vue3 相较于 Vue2 中 针对 新增 删除 ，以及 复杂 diff 中的最长递增子序列都增加了对 dom 处理的速度.
