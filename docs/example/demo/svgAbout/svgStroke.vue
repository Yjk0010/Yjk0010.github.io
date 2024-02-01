<template>
  <div class="svgStroke">
    <div
      :class="['container', { active: isTrue }]"
      :style="{ '--svgStroke-color': isDark ? '#d7ecb1' : '#666' }"
    >
      <svg width="200" height="200" viewBox="0 0 300 300" ref="svgStroke">
        <ellipse ry="70" rx="70" cy="147.5" cx="137" class="p" />
        <ellipse ry="42" rx="42" cy="49" cx="48.5" class="p" />
        <ellipse ry="35" rx="35" cy="148" cx="252.5" class="p" />
        <ellipse ry="15" rx="15" cy="89" cx="278" class="p" />
        <ellipse ry="32" rx="32" cy="260.5" cx="131" class="p" />
        <ellipse ry="18" rx="18" cy="118" cx="45" class="p" />
        <path
          d="m14.17988,126c-9.96402,57.47692 15.13462,113.88462 74.82012,131"
          class="p"
        />
        <path d="m103,35c59.02702,-19 116.24324,10 136,53" class="p" />
        <path d="m173,262c36.81579,-7 55.31579,-20 71,-61" class="p" />
        <path
          d="m93,178c0.47945,10.86931 11.0274,23.41081 35,21.32056"
          class="p"
        />
      </svg>
    </div>

    <el-button @click="isTrue = true">启动动画</el-button>
    <el-button @click="isTrue = false">隐藏</el-button>
  </div>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
import { ref, onMounted } from "vue";
const { isDark } = useData();
const isTrue = ref(false);
const svgStroke = ref<SVGSVGElement>();
onMounted(() => {
  if (svgStroke.value) {
    const paths = Array.from(
      svgStroke.value?.children || []
    ) as SVGPathElement[];
    for (const path of paths) {
      const totalLength = Math.ceil(path.getTotalLength());
      path.style.setProperty("--svgStroke-l", `${totalLength}`);
    }
  }
});
</script>

<style lang="scss" scoped>
.svgStroke {
  .container {
    --svgStroke-color: #d7ecb1;
    .p {
      --svgStroke-l: 0;
      fill: none;
      stroke: var(--svgStroke-color);
      stroke-width: 4;
      stroke-dasharray: var(--svgStroke-l);
      stroke-dashoffset: var(--svgStroke-l);
      stroke-linecap: round;
    }
    &.active {
      .p {
        animation: draw 0.8s linear forwards;
      }
    }
  }
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
