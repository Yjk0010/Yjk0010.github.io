<template>
  <div class="atTimeGuardYear">
    <div class="buttons">
      <el-button type="primary" :disabled="isLoading">上一步</el-button>
      <el-button type="primary" :disabled="isLoading">下一步</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isLoading = ref(false);
</script>

<style lang="scss" scoped>
.atTimeGuardYear {
  .buttons {
    display: flex;
    justify-content: space-around;
  }
}
</style>