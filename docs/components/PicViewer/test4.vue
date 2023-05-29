<template>
  <PicViewer
    title="new URL(动态) 引入"
    :src="imageMap.get(`./assets/girl-2.jpg`)"
  ></PicViewer>
</template>

<script lang="ts" setup>
import PicViewer from "./PicViewer.vue";
// new URL(动态) 引入
const newURLAll = import.meta.glob([
  "./assets/*.jpg",
  "./assets/*.png",
  "./assets/*.gif",
]);
const imageMap: Map<string, string> = new Map();
for (const path in newURLAll) {
  // `${path}` 这里是动态的
  imageMap.set(path, new URL(`${path}`, import.meta.url).href);
}
</script>
