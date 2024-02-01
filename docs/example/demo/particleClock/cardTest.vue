<template>
  <div class="cardTest">
    <el-button @click="countChange">加一下</el-button>
    <flipCard :total="8" :current="refCount"></flipCard>
    <flipCard :total="8" :current="refCount2" countdown></flipCard>
    <el-button @click="countChange2">减一下</el-button>
  </div>
</template>

<script setup lang="ts">
import flipCard from "./flipCard.vue";
import { ref } from "vue";
const refCount = ref(0);
const refCount2 = ref(8);
const countChange = () => {
  if (refCount.value === 8) {
    refCount.value = 0;
  } else {
    refCount.value++;
  }
};
const countChange2 = () => {
  if (refCount2.value === 0) {
    refCount2.value = 8;
  } else {
    refCount2.value--;
  }
};
</script>

<style lang="scss" scoped>
.cardTest {
  display: flex;
  align-items: center;
}
</style>
