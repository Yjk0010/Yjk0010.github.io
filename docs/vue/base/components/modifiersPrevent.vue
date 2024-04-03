<template>
  <div class="modifiersPrevent">
    <a href="https://www.yanjinke.com" @click.prevent="consoleLog">使用prevent修饰符</a>
  </div>
</template>

<script setup lang="ts">
const consoleLog = () => {
  ElNotification({
    type: "success",
    message: "阻止了a元素跳转",
    offset: 40,
    duration: 2000,
  });
}
</script>

<style lang="scss" scoped>
.modifiersPrevent {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>