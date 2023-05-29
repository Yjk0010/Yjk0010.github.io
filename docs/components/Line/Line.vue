<!--
 /** author:Jinke Yan
     time:2023-04-17 18:32:17
 */
-->

<template>
  <div class="line">
    <div v-if="isShow('left')" class="line-text line-left">
      {{ viewTitle("left") }}
    </div>
    <div class="line-online" :style="computedLineStyle"></div>
    <div v-if="isShow('center')" class="line-text line-center">
      {{ viewTitle("center") }}
    </div>
    <div class="line-online" :style="computedLineStyle"></div>
    <div v-if="isShow('right')" class="line-text line-right">
      {{ viewTitle("right") }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { StyleValue } from "vue";
import type { position, numberRange10, color, lineStyle } from "docs/types";

interface Props {
  lineTitle: string | string[];
  linePosition: position | position[];
}
const props = withDefaults(
  defineProps<{
    title?: Props["lineTitle"];
    position?: Props["linePosition"];
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

const computedLineStyle = computed<StyleValue>(() => {
  return {
    flex: 1,
    borderTop: `${props.lineWidth}px ${props.lineStyle} ${props.color}`,
  };
});

const isShow = (position: position): boolean => {
  const positionArray = Array.isArray(props.position)
    ? props.position
    : [props.position];
  return positionArray.includes(position);
};
const viewTitle = (position: position): string => {
  const titleArray = Array.isArray(props.title) ? props.title : [props.title];
  const positionArray = Array.isArray(props.position)
    ? props.position
    : [props.position];
  return titleArray[
    Math.min(titleArray.length - 1, positionArray.indexOf(position))
  ];
};
</script>

<style lang="scss" scoped>
@import "./style.module.scss";
</style>
