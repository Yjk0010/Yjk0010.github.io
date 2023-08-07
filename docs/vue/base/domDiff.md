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

## vue2 实现过程
