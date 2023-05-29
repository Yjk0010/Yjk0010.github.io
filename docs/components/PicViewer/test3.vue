<template>
  <PicViewer title="new URL(静态) 引入" :src="imageUrl"></PicViewer>
</template>

<script lang="ts" setup>
import PicViewer from "./PicViewer.vue";
// new URL(静态) 引入
const imageUrl = new URL("./assets/girl-1.jpg", import.meta.url).href;
</script>
