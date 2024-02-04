<template>
  <PicViewer title="import引入" :src="image"></PicViewer>
</template>

<script lang="ts" setup>
import PicViewer from "./index.vue";
// import引入
import image from "./assets/scenery-4.jpg";
</script>
