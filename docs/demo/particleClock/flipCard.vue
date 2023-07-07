<template>
  <ul :class="['flip-card', { dark: isDark }]">
    <li
      class="item"
      v-for="(item, key) in total + 1"
      :class="{ active: active === key, before: key === before }"
      :key="item"
    >
      <div class="up">
        <div class="shadow"></div>
        <div class="number">{{ key }}</div>
      </div>
      <div class="down">
        <div class="shadow"></div>
        <div class="number">{{ key }}</div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
const { isDark } = useData();
const props = withDefaults(
  defineProps<{
    total?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    current?: number;
  }>(),
  {
    total: 9,
    current: 0,
  }
);
const active = computed(() => {
  return Math.abs(props.current % (props.total + 1));
});
const before = computed(() => {
  return active.value ? active.value - 1 : props.total;
});
</script>

<style lang="scss" scoped>
.vp-doc li + li {
  margin: 0;
}
@import "./flipCard.scss";
</style>
