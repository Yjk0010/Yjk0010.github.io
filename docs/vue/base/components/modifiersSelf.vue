<template>
  <div class="modifiersSelf">
    <div @click="consoleTop">
      <el-button @click="consoleLog">未使用self修饰符</el-button>
    </div>
    <div class="self" @click.self="consoleTop">
      <el-button type="primary" @click="consoleLog">使用self修饰符</el-button>
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
.modifiersSelf {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.self {
  padding: 0 25px;
  cursor: pointer;
  background-color: var(--jk-color-purple);
}
</style>