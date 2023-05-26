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
    title="静态(没指纹)路径"
    src="/assets/no-img.jpg"
    alt="静态(没指纹)路径,但是不是相对路径不能让图片文件放到随意文件夹,这个开发生产都行"
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
    title="imgUrl方法"
    :src="imgUrl('cloud')"
    alt="这个开发行，生产环境 链接进入可以 但是 刷新页面就不行了"
  ></PicViewer>
  <PicViewer
    title="computed计算属性"
    :src="imgUrlStrComputed"
    alt="这个开发行，生产环境 链接进入可以 但是 刷新页面就不行了，单张图片切换比较爽多张图片就比较鸡肋"
  ></PicViewer>
</template>

<script setup lang="ts">
import PicViewer from "./PicViewer.vue";
import image from "./assets/no-img.jpg";
import { ref, computed } from "vue";

// vite提供
const imageUrl = new URL("./assets/no-img.jpg", import.meta.url).href;

const modules = import.meta.glob("./assets/*.jpg");

let modImg: any[] = [];
const imgUrlStr = ref("no-img");
for (const path in modules) {
  modImg.push(new URL(`${path}`, import.meta.url).href);
}
const imgUrl = (url: string) => {
  const obj = new URL(`./assets/${url}.jpg`, import.meta.url);
  console.log(obj, "imgUrl");
  return obj.pathname;
};
const imgUrlStrComputed = computed(() => {
  const obj = new URL(`./assets/${imgUrlStr.value}.jpg`, import.meta.url);
  console.log(obj, "imgUrlStrComputed");
  return obj.pathname;
});
</script>
