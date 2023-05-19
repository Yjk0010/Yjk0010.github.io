<template>
  <div class="pic-viewer">
    <img :src="picSrc" :alt="picAlt" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const props = withDefaults(
  defineProps<{
    picSrc: string;
    picAlt: string;
  }>(),
  {
    picSrc: "",
    picAlt: "",
  }
);
</script>

<style lang="scss" scoped></style>
