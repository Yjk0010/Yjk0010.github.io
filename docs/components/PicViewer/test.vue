<template>
  <PicViewer
    :picSrc="imgMap.get(`./assets/no-img.jpg`)"
    picAlt="picAlt"
  ></PicViewer>
</template>

<script setup lang="ts">
import PicViewer from "./PicViewer.vue";
const images = Object.keys(import.meta.glob("./assets/*.jpg", { eager: true }));
const imgMap = new Map(
  images.map((item) => [item, new URL(item, import.meta.url).href])
);
images.forEach((item) => console.log(item));
console.log(images, imgMap);
</script>
