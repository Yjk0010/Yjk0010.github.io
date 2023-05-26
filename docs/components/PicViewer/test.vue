<template>
  <PicViewer
    title="文件位置图"
    src="/assets/components/fileImg-1.jpg"
  ></PicViewer>
  <PicViewer
    title="文件位置图"
    src="/assets/components/fileImg-2.jpg"
  ></PicViewer>
  <PicViewer
    title="静态(不加hash)路径"
    src="/assets/no-img.jpg"
    alt="静态(打包不加hash)路径,但是不是相对路径不能让图片文件放到随意文件夹,这个开发生产都行"
  ></PicViewer>
  <PicViewer
    title="最简单的相对路径"
    src="./assets/no-img.jpg"
    alt="开发生产都不行"
  ></PicViewer>
  <PicViewer
    title="import引入"
    :src="image"
    alt="这个开发生产都行，但是每一张图都需要import引入"
  ></PicViewer>
  <PicViewer
    title="new URL 引入"
    :src="imageUrl"
    alt="这个开发生产都行"
  ></PicViewer>
  <PicViewer
    title="modImg1 引入"
    :src="modImg[1]"
    alt="这个开发行生产不行"
  ></PicViewer>
  <PicViewer
    title="modImg2 引入"
    :src="imgUrl('cloud')"
    alt="这个开发行生产不行"
  ></PicViewer>
</template>

<script setup lang="ts">
import PicViewer from "./PicViewer.vue";
import image from "./assets/no-img.jpg";
import { computed } from "vue";

// vite提供
const imageUrl = new URL("./assets/no-img.jpg", import.meta.url).href;

const modules = import.meta.glob("./assets/*.jpg");

let modImg: any[] = [];
for (const path in modules) {
  modImg.push(new URL(`${path}`, import.meta.url).href);
}
const imgUrl = (url: string) => {
  return new URL(`./assets/${url}.jpg`, import.meta.url).href;
};
</script>
