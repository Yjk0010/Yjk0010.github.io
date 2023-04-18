<!--
 /** author:Jinke Yan
     time:2023-04-17 18:32:17
 */
-->

<template>
  <div class="jk-line">
    <div class="jk-line-text">
      {{ title }}
    </div>
    <div class="jk-line" :style="computedLineStyle"></div>
    <div class="jk-line-text">
      {{ lineWidth }}
    </div>
    <div class="jk-line" :style="computedLineStyle"></div>
    <div class="jk-line-text">
      {{ lineStyle }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  // 位置
  position: {
    type: String,
    default: "left",
  },
  // 线宽度
  lineWidth: {
    type: Number,
    default: 1,
  },
  // 默认颜色
  color: {
    type: String,
    default: "rgba(220,220,220,0.4)",
  },
  // 线条样式
  lineStyle: {
    type: String,
    default: "solid",
  },
});
// 计算属性 计算生成lineStyle 样式

const computedLineStyle = computed(() => {
  return {
    flex: 1,
    borderTop: `${props.lineWidth}px ${props.lineStyle} ${props.color}`,
  };
});
</script>

<style lang="less" scoped>
.jk-line {
  display: flex;
  align-items: center;
}
</style>
