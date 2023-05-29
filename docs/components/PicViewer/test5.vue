<template>
  <PicViewer title="imgUrl方法" :src="imageUrl('girl-3.jpg')"></PicViewer>
</template>

<script lang="ts" setup>
import PicViewer from "./PicViewer.vue";
// imageUrl 方法
const imageUrl = (url: string) => {
  // `./assets/${url}` 这个在vite的理解中是静态的
  const obj = new URL(`./assets/${url}`, import.meta.url);
  return obj.pathname;
};
</script>
