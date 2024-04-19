<template>
  <span :class="['TypeText', type]">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
defineOptions({
  name: "TypeText",
});
withDefaults(defineProps<{
  type?: "info" | "tip" | "success" | "warning" | "danger";
}>(), {
  type: "tip",
});
</script>

<style lang="scss" scoped>
.TypeText {
  font-weight: bold;

  &.info {
    color: var(--vp-badge-info-text);
  }

  &.success {
    color: var(--vp-c-green-1);
  }

  &.tip {
    color: var(--vp-c-indigo-1);
  }

  &.warning {
    color: var(--vp-c-yellow-1);
  }

  &.danger {
    color: var(--vp-c-red-2);
  }
}
</style>