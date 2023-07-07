# 粒子时钟

## 展示

<script setup>
import demo from "./index.vue"
import card from "./flipCard.vue"
import {ref} from 'vue'
const refCount = ref(0)
const countChange = ()=>{
    refCount.value+=1
}
</script>

<card :total="8" :current="refCount"></card>
<button @click="countChange">+++</button>
<demo ></demo>

::: details 点击展开
<<< docs/demo/particleClock/index.vue
:::

[视频讲解](https://www.douyin.com/video/7238231456416402748)
