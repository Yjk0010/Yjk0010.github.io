<template>
  <div class="asyncInfection">
    <span class="cor-tip pointer" @click="btnClick">点击将会更换图片</span>
    <PicViewer v-loading="loading" title="图片展示" :src="imgUrl"></PicViewer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getRandomNum } from "/utils/index.ts";
// 默认图片
const imgUrl = ref("/assets/no-img.jpg");
// loading控制
const loading = ref(false);
// 按钮
const btnClick = async () => {
  await controlLoading();
};
// loading控制
const controlLoading = async () => {
  loading.value = true;
  imgUrl.value = await getImage();
  loading.value = false;
};
// 图片获取方法
const getImage = async () => {
  return await fetch(
    `https://picsum.photos/200/200?r=${getRandomNum(0, 100)}`
  ).then(async (res: Response) => URL.createObjectURL(await res.blob()));
};
onMounted(() => {
  btnClick();
});
</script>
