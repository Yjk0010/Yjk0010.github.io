<template>
  <div class="modifiersCapture">
    <div @click="consoleTop">
      <el-button @click="consoleLog">未使用capture修饰符</el-button>
    </div>
    <div @click.capture="consoleTop">
      <el-button @click="consoleLog">使用capture修饰符</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const consoleLog = () => {
  ElNotification({
    type: "success",
    message: "内部事件触发",
    offset: 40,
    duration: 2000,
  });
}

const consoleTop = () => {
  ElNotification({
    type: "success",
    message: "外部事件触发",
    offset: 40,
    duration: 2000,
  });
}
</script>

<style lang="scss" scoped>
.modifiersCapture {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>