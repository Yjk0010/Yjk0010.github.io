<template>
  <PicViewer title="import引入" :src="image"></PicViewer>
</template>

<script lang="ts" setup>
import PicViewer from "./PicViewer.vue";
// import引入
import image from "./assets/girl-4.jpg";
</script>
