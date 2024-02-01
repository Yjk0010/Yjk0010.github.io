# 最长递增子序列

## 什么是最长递增子序列

> 这里是 <TText type="danger">Wiki</TText> 对 [最长递增子序列](https://zh.wikipedia.org/wiki/%E6%9C%80%E9%95%BF%E9%80%92%E5%A2%9E%E5%AD%90%E5%BA%8F%E5%88%97) 的介绍

这里主要讲解 Vue3 在 Dom Diff 过程中使用的方法

::: details 点击展开 源码在此

```typescript
// 输入一个数字数组
// 返回最长递增子序列对应的索引数组
function getSequence(arr: number[]): number[] {
  // 创建一个副本作为指针数组
  const p = arr.slice();
  // 结果数组,先添加一个0作为起点
  const result = [0];
  let i, j, u, v, c;
  // arr的长度
  const len = arr.length;
  // 遍历arr每个元素
  for (i = 0; i < len; i++) {
    // 当前元素
    const arrI = arr[i];
    // 如果当前元素不为0
    if (arrI !== 0) {
      // result最后一个元素的索引
      j = result[result.length - 1];
      // 如果当前元素大于result最后一个元素
      if (arr[j] < arrI) {
        // 设置指针为result最后一个元素索引
        p[i] = j;
        // 将当前i推入result
        result.push(i);
        // 跳过剩余逻辑
        continue;
      }
      // 二分查找当前元素在result中的位置
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = (u + v) >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      // 如果当前元素比找到位置元素小
      if (arrI < arr[result[u]]) {
        // 将指针设置为上一个元素
        if (u > 0) {
          p[i] = result[u - 1];
        }
        // 更新result对应位置为当前i
        result[u] = i;
      }
    }
  }
  // 从后向前遍历result和指针数组
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    // 一步步追溯前序最长子序列
    result[u] = v;
    v = p[v];
  }
  return result;
}
```

:::

## 解析

> Vue3 在 Dom Diff 过程中使用 的 最长递增子序列,便利了 dom 的操作,极大的增加了效率.

### 使用算法

在上述代码中 使用到的 算法有 [动态规划](/highOrder/algorithm/main.html#%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92-dynamic-programming) [二分查找](/highOrder/algorithm/main.html#%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE-binary-search) [贪心算法](/highOrder/algorithm/main.html#%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95-greedy-algorithm) [回溯修正](/highOrder/algorithm/main.html#%E5%9B%9E%E6%BA%AF%E4%BF%AE%E6%AD%A3-backtracking)

### 简要流程描述为

1. <TText>遍历</TText> 当前数组 判断其 <TText type="success">是否大于</TText> 结果数组中最后一位
2. <TText>大于</TText> 最后一位,则添加到结果数组中,并记录当前索引值的前一位索引
3. <TText type="warning">不大于</TText> 的情况下 通过**二分查找**找到 大于的那一项 记录其索引值 并比较当前值 与原有值的大小
4. 通过**贪心算法** 将小的值放入结果数组中
5. 最后对循环的结果进行**回溯修正**,得出最后结果

### 举例说明

<TText type="warning">原数组</TText> 为 **[1, 3, 10, 20, 30, 7, 8]** <TText>最长递增子序列</TText> 为 **[1, 3, 10, 20, 30]**

<PicViewer title="初始状态" src="/assets/algorithm/LIS-1.png" darkSrc="/assets/algorithm/LIS-dark1.png" alt=" "/>

**初始状态** 默认将第一位放入到结果数组中

<PicViewer title="前五次循环" src="/assets/algorithm/LIS-2.png" darkSrc="/assets/algorithm/LIS-dark2.png" alt=" "/>

**前五次循环** 分别 <TText>判断</TText> 当前取值是否大于结果数组的最后一位,  
**大于直接添加**  
并在 <TText type="warning">回溯索引数组</TText> 中记录 <TText type="danger">上一位</TText> 索引值
<PicViewer title="后两次循环" src="/assets/algorithm/LIS-3.png" darkSrc="/assets/algorithm/LIS-dark3.png" alt=" "/>

**后两次循环** 分别 <TText>判断</TText> 当前取值是否大于结果数组的最后一位,  
**并不大于进行二分查找**  
**索引是 5 (值为 7)** 的时候通过 <TText>二分查找</TText> <TText type="danger">7 < 10</TText> 找到 <TText type="warning">(值为 3 的)</TText> **索引值 1** <TText>将结果数组中 10 替换 7</TText> 并且在 <TText type="warning">回溯索引数组</TText> 中记录当前 <TText type="success">上一位</TText> 索引为 **1**  
**索引是 6 (值为 8)** 的时候通过 <TText>二分查找</TText> <TText type="danger">8 < 20</TText> 找到 <TText type="warning">(值为 7 的)</TText> **索引值 5** <TText>将结果数组中 20 替换 8</TText> 并且在 <TText type="warning">回溯索引数组</TText> 中记录当前 <TText type="success">上一位</TText> 索引为 **5**

<PicViewer title="回溯修正" src="/assets/algorithm/LIS-4.png" darkSrc="/assets/algorithm/LIS-dark4.png" alt=" "/>

**最后的回溯修正**
因在上述操作中 <TText type="danger">局部贪心算法</TText> 导致 <TText type="warning">会将小的值放入结果数组,可能影响结果</TText> 所以这边 <TText>回溯修正</TText>  
**索引值为 4 时** 找到 <TText type="danger">回溯索引是 3</TText> **对应值为 20** 这个值 与原来结果 8 <TText type="danger">不同</TText> 换为 20  
**索引值为 3 时** 找到 <TText type="danger">回溯索引是 2</TText> **对应值为 10** 这个值 与原来结果 7 <TText type="danger">不同</TText> 换为 10  
**索引值为 2 时** 发现 <TText type="danger">回溯索引是 1</TText> **对应值为 3** 直接覆盖  
**索引值为 1 索引值为 0** <TText>以 2 类推</TText>

## 总结

**最终得出结果**

<TText>遍历中</TText> 通过 <TText type="danger">动态规划</TText> 将 <TText type="warning">求最长递增</TText> 规划为 <TText>求当前位置最长</TText>  
<TText>在通过</TText> <TText type="danger">贪心算法</TText> 每次都将 <TText type="warning">相较小一点</TText> 的值 <TText>替换</TText> **大** 的值  
<TText>然后</TText> <TText type="danger">二分查找</TText> <TText>替换</TText>  
<TText>最后通过</TText> <TText type="danger">回溯修正</TText> 来处理 因为 <TText type="warning">局部贪心</TText> <TText type="danger">导致</TText> 的 **结果偏差**
