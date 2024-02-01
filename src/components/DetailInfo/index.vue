<!--
 /** author:YanJinke
     time:2023-04-17 14:00:16
 */
-->
<template>
  <div class="detailInfo">
    <template v-for="item in infoConfig">
      <template v-if="item.type === 'line'">
        <Line v-if="show(info[item.key], item, info)" style="width: 100%; margin-bottom: 12px" :key="item.key"
          :title="item.label" :position="item.position"></Line>
      </template>
      <div :key="item.key" class="detail-info-item" :style="{ width: `${100 / (item.col || col)}%` }"
        v-else-if="show(info[item.key], item, info)">
        <span :style="{ width: `${labelWidth}` }" :class="['label', { colon: colon }]">{{
          item.labelCustomRender
          ? item.labelCustomRender(item.label, info[item.key], item, info)
          : item.label
        }}</span>
        <span v-if="item.slotName" style="flex: 1">
          <slot :name="item.slotName" :value="info[item.key]" :item="item" :info="info"></slot>
        </span>
        <span v-else :class="['value', 'nowrap', { wrap: item.wrap }]"
          :title="item.ellipsis ? valueCustomRender(item) : ''" v-html="valueCustomRender(item)"></span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import Line from "../Line/Line.vue";
import type { infoConfigItem } from "docs/types/index.ts";

const props = withDefaults(
  defineProps<{
    infoConfig: Array<infoConfigItem>;
    info: any;
    col?: number;
    labelWidth?: string;
    colon?: boolean;
  }>(),
  {
    infoConfig: () => [],
    info: () => { },
    col: 3,
    labelWidth: "80px",
    colon: true,
  }
);

const show = (
  text: string,
  item: infoConfigItem,
  info: { [key: string]: any }
): Boolean => {
  if (typeof item.show === "function") {
    return item.show(text, item, info);
  } else {
    return item.show === undefined ? true : item.show;
  }
};

const valueCustomRender = (item: infoConfigItem): string => {
  const { key, customRender } = item;
  return customRender
    ? customRender(props.info[key], item, props.info)
    : [null, undefined, ""].includes(props.info[key])
      ? "--"
      : props.info[key];
};
</script>

<style lang="scss" scoped>
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
