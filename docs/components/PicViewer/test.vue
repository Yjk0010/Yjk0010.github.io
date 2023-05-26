<template>
  <!-- public/assets/no-img.jpg  打包不加hash-->
  <PicViewer
    title="静态(不加hash)路径"
    src="/assets/no-img.jpg"
    alt="这个开发生产都行"
  ></PicViewer>
  <!-- ./assets/no-img.jpg 打包加hash-->
  <PicViewer
    title="相对路径"
    src="./assets/no-img.jpg"
    alt="这个不行"
  ></PicViewer>
  <!-- import引入 image-->
  <PicViewer title="import引入" :src="image" alt="这个开发生产都行"></PicViewer>
  <!-- new URL-->
  <PicViewer
    title="new URL 引入"
    :src="imageUrl"
    alt="这个开发生产都行"
  ></PicViewer>
  <!-- modImg-->
  <PicViewer
    title="modImg1 引入"
    :src="modImg[1]"
    alt="这个开发行生产不行"
  ></PicViewer>
  <PicViewer
    title="modImg2 引入"
    :src="modImg[0]"
    alt="这个开发行生产不行"
  ></PicViewer>
</template>

<script setup lang="ts">
import PicViewer from "./PicViewer.vue";
import image from "./assets/no-img.jpg";

// vite提供
const imageUrl = new URL("./assets/no-img.jpg", import.meta.url).href;

const modules = import.meta.glob("./assets/*.jpg");

let modImg: any[] = [];
for (const path in modules) {
  modImg.push(new URL(path, import.meta.url).href);
}
</script>
