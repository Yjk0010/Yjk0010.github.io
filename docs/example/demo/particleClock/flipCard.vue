<template>
  <ul :class="['flip-card', { dark: isDark }]">
    <li
      class="item"
      v-for="(item, key) in totalList"
      :class="{ active: active === item, before: item === before }"
      :key="item"
    >
      <div class="up">
        <div class="shadow"></div>
        <div class="number">{{ item }}</div>
      </div>
      <div class="down">
        <div class="shadow"></div>
        <div class="number">{{ item }}</div>
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
    countdown?: boolean;
  }>(),
  {
    total: 9,
    current: 0,
    countdown: false,
  }
);
const active = computed(() => {
  if (props.countdown) {
    return props.current < 0 ? 0 : props.current;
  } else {
    return props.current > props.total ? props.total : props.current;
  }
});
const before = computed(() => {
  if (props.countdown) {
    return active.value < props.total ? active.value + 1 : 0;
  } else {
    return active.value ? active.value - 1 : props.total;
  }
});
const totalList = computed(() => {
  const list = Array.from({ length: props.total + 1 }, (_, i) => i);
  return props.countdown ? list.reverse() : list;
});
</script>

<style lang="scss" scoped>
.vp-doc li + li {
  margin: 0;
}
@import "./flipCard.scss";
</style>
