<!--
 /** author:YanJinke
     time:2023-04-17 14:00:16
 */
-->
<template>
  <div class="detailInfo">
    <template v-for="item in infoConfig">
      <div>{{ item.label }}</div>
    </template>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const propsData = defineProps({
  infoConfig: {
    type: Array,
    default: () => [],
  },
  info: {
    type: Object,
    default: () => {},
  },
  col: {
    type: Number,
    default: 3,
  },
  labelWidth: {
    type: String,
    default: "80px",
  },
  colon: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="less" scoped>
.detailInfo {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  .detail-info-item {
    display: flex;
    margin: 6px 0;
    .label {
      position: relative;
      text-align: right;
      color: var(--vp-c-text-2);
      padding-right: 16px;
    }
    .colon {
      &::after {
        content: ":";
        position: absolute;
        right: 10px;
        top: 0;
      }
    }
    .value {
      flex: 1;
      color: var(--vp-c-text-1);
      padding-right: 24px;
      &.nowrap {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &.wrap {
        white-space: pre-wrap;
      }
    }
  }
}
</style>
