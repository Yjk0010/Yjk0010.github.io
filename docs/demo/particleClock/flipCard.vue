<template>
  <div class="container">
    <div class="card start-top">2</div>
    <div class="card start-btm">2</div>
    <!-- <div class="card end-top">3</div>
    <div class="card end-btn">3</div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const props = withDefaults(defineProps<{}>(), {});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  --container-width: 60px;
  width: var(--container-width);
  height: var(--container-width);
  .card {
    position: absolute;
    width: 100%;
    height: 50%;
    line-height: var(--container-width);
    text-align: center;
    font-size: 2em;
    background-color: black;
    overflow: hidden;
  }
  .start-top {
  }
  .start-btm {
    top: 50%;
    line-height: 0;
    transform: rotateX(30deg);
    transform-origin: center top;
  }
}
</style>
