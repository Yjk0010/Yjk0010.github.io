<template>
  <canvas
    ref="canvasRef"
    :width="size"
    :height="size"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
  ></canvas>
</template>

<script setup lang="ts">
import { ref, watchEffect, onUnmounted } from "vue";
import { PropsType } from "./PolygonScoreTypes";
import { draw } from "./PolygonScoreHooks";
const canvasRef = ref<HTMLCanvasElement | null>(null);
const props = withDefaults(defineProps<PropsType>(), {
  size: 300,
  maxScore: 100,
});
const stop = watchEffect(() => {
  if (!canvasRef.value) {
    return;
  }
  draw(canvasRef.value, props);
});
onUnmounted(stop);
</script>

<style scoped></style>
