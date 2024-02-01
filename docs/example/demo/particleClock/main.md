# 卡片返转计时 + 粒子时钟

<script setup>
import demo from "./index.vue"
import cardTest from "./cardTest.vue"
import festivalCountdown from "./festivalCountdown.vue"

</script>

## 翻转卡片展示

<cardTest/>

::: details 翻转卡片组件 代码 点击展开
模板 和 逻辑

<<< @/example/demo/particleClock/flipCard.vue

样式 和 动画

<<< @/example/demo/particleClock/flipCard.scss
:::
::: details 翻转卡片调用 代码 点击展开
<<< @/example/demo/particleClock/cardTest.vue
:::

[翻转卡片 视频讲解](https://www.douyin.com/search/渡一前端必修课_卡片翻动效果)

## 小长假倒计时

<festivalCountdown/>

::: details 小长假倒计时 代码 点击展开
<<< @/example/demo/particleClock/festivalCountdown.vue
:::

## 粒子时钟

<demo></demo>

::: details 粒子时钟 代码 点击展开
<<< @/example/demo/particleClock/index.vue
:::

[粒子时钟 视频讲解](https://www.douyin.com/search/渡一前端必修课_粒子时钟)
