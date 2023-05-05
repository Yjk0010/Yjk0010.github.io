# 小知识

## Vue 列表组件中写 key，其作用是什么

- key 的作用主要有两个:
  - 性能更高,通过 key 避免不必要的 DOM 更新从而提高渲染性能
    > Vue 会根据 key 的值来判断列表项目是否发生变化,从而决定是否需要重新渲染该列表项的 DOM 结构。  
    > 如果没有 key,Vue 只能从头开始对列表的每个项目进行 diff,进而决定是否需要重新渲染。这种情况下,尽管数据未发生变化,列表也会进行重新渲染,效率非常低。  
    > 而有了 key 后,Vue 会根据 key 值找出两个列表中相同的项目,进而避免不必要的 DOM 更新。  
    > 所以使用 key 可以提高列表渲染的性能。
  - 可以保持组件状态,避免重新渲染时状态丢失。
    > 当列表进行重新渲染时,如果 key 值不变,Vue 会认为它是同一个组件,仅会更新该组件,而不会重新创建组件实例。  
    > 这意味着组件的状态会被保留下来,比如输入框的内容、复选框的选中状态等会被保留。  
    > 如果没有 key,Vue 认为这是两个不同的组件,会重新创建组件实例,状态就会丢失。