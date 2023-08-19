<template>
  <div class="borderLight" ref="borderLight">
    <div
      class="card"
      ref="cardsRef"
      :class="isDark ? 'dark' : ''"
      v-for="(item, key) in cardsConfig"
      :key="key"
    >
      <div class="inner">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from "vue";
import { useData } from "vitepress";
const { isDark } = useData();
const borderLight = ref<HTMLElement>();
const cardsRef = ref<HTMLElement[]>();
const cardsConfig = [
  "将鼠标",
  "移动到",
  "当前区域",
  "然后",
  "疯狂晃动",
  "观察边框变化",
];
onMounted(() => {
  if (borderLight.value) {
    borderLight.value.onmousemove = (e: MouseEvent) => {
      if (cardsRef.value) {
        for (const card of cardsRef.value) {
          const rect = card.getBoundingClientRect();
          const left = e.clientX - rect.left;
          const top = e.clientY - rect.top;
          card.style.setProperty("--left", `${left}px`);
          card.style.setProperty("--top", `${top}px`);
        }
      }
    };
  }
});
onBeforeMount(() => {
  if (borderLight.value) {
    borderLight.value.onmousemove = null;
  }
});
</script>

<style lang="scss" scoped>
.borderLight {
  width: 680px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  border-radius: 6px;
  .card {
    position: relative;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: inherit;
    aspect-ratio: 8/5;
    overflow: hidden;
    &.dark {
      background-color: rgba(255, 255, 255, 0.1);
      .inner {
        background-color: #222;
      }
    }
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 150%;
      top: var(--top, 1000px);
      left: var(--left, 1000px);
      background: radial-gradient(
        closest-side circle,
        rgba(16, 185, 129, 0.8),
        transparent
      );
      transform: translate(-50%, -50%);
      border-radius: inherit;
      z-index: 2;
    }
    .inner {
      position: absolute;
      border-radius: inherit;
      inset: 2px;
      padding: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      z-index: 3;
    }
  }
}
</style>
