<!--
 /** author:Jinke Yan
     time:2023-04-17 18:32:17
 */
-->

<template>
  <div class="line">
    <div class="line-text line-left">
      {{ title }}
    </div>
    <div class="line" :style="computedLineStyle"></div>
    <div class="line-text line-center">
      {{ lineWidth }}
    </div>
    <div class="line" :style="computedLineStyle"></div>
    <div class="line-text line-right">
      {{ lineStyle }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { position, numberRange10, color, lineStyle } from "/types";
const props = withDefaults(
  defineProps<{
    title?: string;
    position?: position;
    lineWidth?: numberRange10;
    color?: color;
    lineStyle?: lineStyle;
  }>(),
  {
    title: "",
    position: "left",
    lineWidth: 1,
    color: "rgb(220, 220, 220)",
    lineStyle: "solid",
  }
);
// 计算属性 计算生成lineStyle 样式

const computedLineStyle = computed(() => {
  return {
    flex: 1,
    borderTop: `${props.lineWidth}px ${props.lineStyle} ${props.color}`,
  };
});
</script>

<style lang="less" scoped>
.line {
  display: flex;
  align-items: center;
  .line-text {
    font-weight: bold;
  }
  &-left {
    margin-right: 12px;
  }
  &-center {
    margin-right: 12px;
    margin-left: 12px;
  }
  &-right {
    margin-left: 12px;
  }
}
</style>
