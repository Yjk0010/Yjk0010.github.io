# Dom Diff 算法

<script setup>
  import {ref} from "vue"
import DetailInfo from "/components/DetailInfo/DetailInfo.vue"

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

#### 为了方便理解我这边给上流程图

<span class="cor-tip">Vue2 Dom Diff</span> 过程主要是由 **while 循环** 和 **循环后处理** 两个部分构成  
下面我通过流程图解释了这段代码简要的流程处理

::: details 点击展开 流程图中的单词解释
<DetailInfo :info="info" labelWidth="120px" :col="2" :infoConfig="infoConfig"></DetailInfo>
:::

<PicViewer title="diff处理流程 while循环流程图" src="/assets/vue/vue2_diff_while.png" darkSrc="/assets/vue/vue2_diff_while-dark.png" alt="  "/>
<PicViewer title="diff处理流程 循环后处理流程图" src="/assets/vue/vue2_diff_end.png" darkSrc="/assets/vue/vue2_diff_end-dark.png" alt="  "/>

#### 这边用一个例子展示比较过程

假设现在有节点 **1,2,3,4,5,6,7** 经过操作变成了 **1,6,4,8,2,7**

初始化开始之后呈现当前状态

- <span style="color:#a5d8ff">蓝色</span>节点是 <span class="cor-wa">旧的虚拟 dom 节点</span>
- <span style="color:#ffec99">黄色</span>节点是 <span class="cor-tip">新的虚拟 dom 节点</span>
- <span style="color:#b2f2bb">变成绿色</span>说明 **diff 成功 已经更新**

<PicViewer title="初始状态" src="/assets/vue/vue2_diff-1.png" darkSrc="/assets/vue/vue2_diff-dark1.png" alt=" "/>
第一次循环 **头头比较** <span class="cor-tip">成功</span>  执行`patchVnode` **两个头指针 右移**
<PicViewer title="第一次比较之后状态" src="/assets/vue/vue2_diff-2.png" darkSrc="/assets/vue/vue2_diff-dark2.png" alt="  "/>
第二次循环 **尾尾比较** <span class="cor-tip">成功</span>  执行`patchVnode` **两个尾指针 左移**
<PicViewer title="第二次比较之后状态" src="/assets/vue/vue2_diff-3.png" darkSrc="/assets/vue/vue2_diff-dark3.png" alt="  "/>
第三次循环 **头尾比较** <span class="cor-tip">成功</span>  执行`patchVnode` **旧节点头指针右移 新节点尾指针左移**
<PicViewer title="第三次比较之后状态" src="/assets/vue/vue2_diff-4.png" darkSrc="/assets/vue/vue2_diff-dark4.png" alt="  "/>
第四次循环 **尾头比较** <span class="cor-tip">成功</span>  执行`patchVnode` **旧节点尾指针左移 新节点头指针右移**
<PicViewer title="第四次比较之后状态" src="/assets/vue/vue2_diff-5.png" darkSrc="/assets/vue/vue2_diff-dark5.png" alt="  "/>
第五次循环 **进入复杂比较** 创建 <span class="cor-tip">oldKeyToIdx</span> 对象

```javascript
oldKeyToIdx = {
  3: 2,
  4: 3,
  5: 4,
};
```

当前新节点的 **key 为 4**，取得 <span class="cor-wa">旧列表</span> **下标为 3 的节点** 判断两个节点是否 <span class="cor-tip">相同</span>

发现 <span class="cor-tip">相同</span>

执行 `patchVnode` 并 将 <span class="cor-wa">旧节点</span> 列表 当前下标置为 `undefined` 然后 **新节点头指针右移**

<PicViewer title="第五次比较之后状态" src="/assets/vue/vue2_diff-6.png" darkSrc="/assets/vue/vue2_diff-dark6.png" alt="  "/>
第六次循环 **进入复杂比较**

当前新节点的 **key 为 8**，未取得 <span class="cor-wa">旧列表</span> 中节点

执型 `createElm` 创建一个 <span class="cor-tip">新节点</span> 然后 **新节点头指针右移**

<PicViewer title="第六次比较之后状态" src="/assets/vue/vue2_diff-7.png" darkSrc="/assets/vue/vue2_diff-dark7.png" alt="  "/>

因 **newStartIdx > newEndIdx** 终止循环 进入 <span class="cor-tip">循环后处理</span>

<span class="cor-tip">此时新节点列表已经生成</span>

<PicViewer title="循环后处理时" src="/assets/vue/vue2_diff-8.png" darkSrc="/assets/vue/vue2_diff-dark8.png" alt="  "/>

因为 **newStartIdx > newEndIdx** 可知是 <span class="cor-wa">新节点指针作用</span> <span class="cor-da">停止循环</span>

因此要卸载 <span class="cor-wa">旧节点</span> 并取消其上的 <span class="cor-tip">钩子函数</span>

#### 结果

最终形成 **1,6,4,8,2,7** 这样的新节点列表

#### 例子缺陷

该例子没有展现出 `addVnodes` 方法 因为这样的情况是要 <span class="cor-tip">新节点</span> 的数量比 <span class="cor-wa">旧节点</span> 数量多的时候才会出现。(这个好理解)

### Vue3 实现过程 <Badge type="tip">3.3.4</Badge>

> 下面是 Vue3 Diff 的代码实现
