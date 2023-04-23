<template>
  <div class="flowchart" :id="id"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as Flowchart from "flowchart.js";

const props = defineProps({
  chart: {
    type: String,
    required: true,
  },
});

const id = ref<string>("chart-" + Math.random().toString(36).substring(2, 9));

function renderChart() {
  Flowchart.parse(props.chart).drawSVG(id.value);
}

onMounted(() => renderChart());
</script>

<style lang="less" model>
.flowchart {
  stroke-width: 1;
  stroke: var(--vp-c-text-1);
  fill: var(--vp-sidebar-bg-color);
  font-family: DingTalkJinBuTi !important;
  letter-spacing: 0.1em;
  path {
    stroke-width: 2;
    stroke: var(--vp-c-text-1);
  }
  rect {
    fill: var(--vp-sidebar-bg-color);
  }
  [text-anchor="start"] {
    stroke: var(--vp-c-text-1);
  }
  text {
    stroke-width: 0.8;
  }
}
</style>
