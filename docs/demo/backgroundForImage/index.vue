<template>
  <div class="container">
    <button @click="handleClick" class="cor-tip">更换图片</button>
    <div class="grid" :style="style">
      <div class="item" v-for="(url, i) in images">
        <img
          crossorigin="anonymous"
          @mouseenter="handleMouseEnter($event, i)"
          @mouseleave="handleMouseLeave"
          :src="url"
          :style="{
            opacity: hoverIndex === -1 ? 1 : i === hoverIndex ? 1 : 0.2,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import ColorThief from "colorthief";
import { ref, computed, reactive } from "vue";
// const colorThief = new ColorThief();
const images: string[] = reactive([]);
for (let i = 0; i < 4; i++) {
  images.push(`https://picsum.photos/200/200?r=${i}`);
}
// 获取min到max之间的随机数
const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const quantize = (pixels: number[], colorDelta: number) => {
  const histo: Record<string, number> = {};
  // 量化树建立颜色空间网格
  const ptrs = [];
  for (let r = 0; r < 256; r += colorDelta) {
    for (let g = 0; g < 256; g += colorDelta) {
      for (let b = 0; b < 256; b += colorDelta) {
        ptrs.push([r, g, b]);
        histo[`${r},${g},${b}`] = 0;
      }
    }
  }

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const index =
      Math.floor(r / colorDelta) * (256 / colorDelta) * (256 / colorDelta) +
      Math.floor(g / colorDelta) * (256 / colorDelta) +
      Math.floor(b / colorDelta);
    const [rr, gg, bb] = ptrs[index];
    if (rr && gg && bb) {
      histo[`${rr},${gg},${bb}`]++;
    }
  }
  const groups = Object.keys(histo).sort((a, b) => histo[b] - histo[a]);
  return groups;
};
const getMainColor = (img: any, k = 5) => {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx: any = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.innerHTML = "";
  const colors = quantize(imageData.data, 16);
  return colors.slice(0, k);
};
const handleMouseEnter = async (event: MouseEvent, index: number) => {
  hoverIndex.value = index;
  // 得到这张图片的调色盘（前三种主要颜色）
  // const colors = await colorThief.getPalette(event.target, 5);
  // const [c1, c2, c3, c4, c5] = colors.map(
  //   (c) => `rgb(${c[0]},${c[1]},${c[2]})`
  // );
  // color1.value = c1;
  // color2.value = c2;
  // color3.value = c3;
  const mainColor = getMainColor(event.target, 5);
  const [mc1, mc2, , mc3] = mainColor;
  color1.value = `rgb(${mc1})`;
  color2.value = `rgb(${mc2})`;
  color3.value = `rgb(${mc3})`;
};
const handleClick = () => {
  images.splice(0);
  for (let i = 4; i > 0; i--) {
    images.push(`https://picsum.photos/200/200?r=${random(0, 100)}`);
  }
};
const handleMouseLeave = () => {
  hoverIndex.value = -1;
  color1.value = "transparent";
  color2.value = "transparent";
  color3.value = "transparent";
};
const hoverIndex = ref(-1);
const color1 = ref("transparent");
const color2 = ref("transparent");
const color3 = ref("transparent");
const style = computed(() => {
  return {
    "--c1": color1.value,
    "--c2": color2.value,
    "--c3": color3.value,
  };
});
</script>

<style lang="scss" scoped>
.grid {
  width: 650px;
  margin-top: 20px;
  padding: 70px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 70px;
  background: linear-gradient(
    to bottom,
    var(--c1) 33%,
    var(--c2) 66%,
    var(--c3) 100%
  );
  animation: spread 0.5s ease-in forwards;
  transition-property: --c1, --c2, --c3;
  transition-duration: 0.5s;
  transition-timing-function: ease-in;
  .item {
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
    border-radius: 5px;
    border: 0px solid #fff;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.5s;
    }
    &:hover {
      filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.5));
      border-width: 5px;
      transform: scale(1.1);
    }
  }
}
</style>
