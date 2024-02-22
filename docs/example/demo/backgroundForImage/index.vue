<template>
  <blockquote>点击图片将会更换图片</blockquote>
  <el-button @click="handleClick" class="cor-tip button">点击更换图片</el-button>
  <div class="container">
    <div class="grid" :style="style">
      <div class="item" v-for="(url, i) in images">
        <img crossorigin="anonymous" @mouseenter="handleMouseEnter($event, i)" @mouseleave="handleMouseLeave" :src="url"
          @click="handleClick" :style="{
            opacity: hoverIndex === -1 ? 1 : i === hoverIndex ? 1 : 0.2,
          }" />
      </div>
      <transition name="fade">
        <div class="mask" v-show="loading">
          <div class="dot" v-for="item in 36" :key="item"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, onMounted, nextTick } from "vue";
import quantize from "quantize";
import type { RgbPixel } from "quantize";
import { getRandomNum } from "docs/utils/index.ts";
import { HtmlHTMLAttributes } from "vue";
const address = "https://picsum.photos/200/200";
const images: string[] = reactive([]);
const loading = ref(true);
const hoverIndex = ref(-1);
const color1 = ref("transparent");
const color2 = ref("transparent");
const color3 = ref("transparent");
const useQuantize = (pixels: number[], k: number = 5) => {
  // 存储颜色的数组
  const colors: RgbPixel[] = [];
  // 遍历每个像素
  for (let i = 0; i < pixels.length; i += 4) {
    // 提取像素的RGB值
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    // 取出不透明以及透明属性在
    if (typeof a === "undefined" || a >= 128) {
      if (!(r > 250 && g > 250 && b > 250)) {
        colors.push([r, g, b]);
      }
    }
  }
  const camp = quantize(colors, k);
  return camp ? camp.palette() : [];
};
const getMainColor = (img: HTMLImageElement) => {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx: any = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.innerHTML = "";
  return useQuantize(imageData.data, 3);
};
const handleMouseEnter = async (event: MouseEvent, index: number) => {
  hoverIndex.value = index;
  const mainColor = getMainColor(event.target as HTMLImageElement);
  const [c1, c2, c3] = mainColor.map(
    (c: number[]) => `rgb(${c[0]},${c[1]},${c[2]})`
  );
  color1.value = c1;
  color2.value = c2;
  color3.value = c3;
};
const handleClick = () => {
  getImage();
};
const handleMouseLeave = () => {
  hoverIndex.value = -1;
  color1.value = "transparent";
  color2.value = "transparent";
  color3.value = "transparent";
};
const style = computed(() => {
  return {
    "--c1": color1.value,
    "--c2": color2.value,
    "--c3": color3.value,
  };
});
onMounted(() => {
  getImage();
});
const getImage = () => {
  loading.value = true;
  const arr = new Array(4).fill(0);
  Promise.all(
    arr.map((_) => fetch(`${address}?r=${getRandomNum(0, 100)}`))
  ).then((res) => {
    images.splice(0, 4);
    Promise.all(res.map((r) => r.blob())).then((abc) => {
      images.push(...abc.map((r) => URL.createObjectURL(r)));
      nextTick(() => {
        loading.value = false;
      });
    });
  });
};
</script>

<style lang="scss" scoped>
.container {
  $containerSize: 640px; // 容器尺寸
  position: relative;
  width: $containerSize;
  height: $containerSize;
  margin-top: 20px;
  overflow: hidden;

  .grid {
    width: $containerSize;
    padding: 80px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 80px;
    background: linear-gradient(-61.8deg,
        var(--c1) 0%,
        var(--c2) 20%,
        var(--c3) 40%,
        var(--c1) 60%,
        var(--c2) 80%,
        var(--c3) 100%);
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
        border-width: 2px;
        transform: scale(1.1);
      }
    }
  }

  .mask {
    $loadingSize: 60px; // 加载中的尺寸
    $ballSize: 8px; // 小球尺寸
    $n: 36;
    $stepDeg: calc(360deg / $n);
    $ani-duration: 2000ms;
    position: absolute;
    $multiple: 1.4;
    $maskSize: $containerSize * $multiple;
    width: $maskSize;
    height: $maskSize;
    top: calc($containerSize / 2) - calc($maskSize / 2);
    left: calc($containerSize / 2) - calc($maskSize / 2);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    border-radius: 50%;

    .dot {
      position: absolute;
      left: 50%;
      top: 50%;
      width: $ballSize;
      height: $ballSize;
      margin-left: calc(-1 * $ballSize / 2);
      margin-top: calc(-1 * $ballSize / 2);
      perspective: 70px;
      transform-style: preserve-3d;

      &::before,
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      &::before {
        background: #7c6abb;
        top: -100%;
        animation: moveBlack $ani-duration infinite;
      }

      &::after {
        background: #55ad6f;
        top: 100%;
        animation: moveWhite $ani-duration infinite;
      }

      @mixin setBallDiff($i) {
        @if $i < $n +1 {
          &:nth-child(#{$i}) {
            transform: rotate($stepDeg * $i) translateY(-$loadingSize);

            &::before,
            &::after {
              animation-delay: calc(-1 * $ani-duration / $n) * 6 * $i;
            }
          }

          @include setBallDiff($i + 1);
        }
      }

      @include setBallDiff(1);
    }

    @keyframes moveWhite {
      0% {
        animation-timing-function: ease-in;
      }

      25% {
        transform: translate3d(0, -100%, -$ballSize);
        animation-timing-function: ease-out;
      }

      50% {
        transform: translate3d(0, -200%, 0);
        animation-timing-function: ease-in;
      }

      75% {
        transform: translate3d(0, -100%, $ballSize);
        animation-timing-function: ease-out;
      }
    }

    @keyframes moveBlack {
      0% {
        animation-timing-function: ease-in;
      }

      25% {
        transform: translate3d(0, 100%, $ballSize);
        animation-timing-function: ease-out;
      }

      50% {
        transform: translate3d(0, 200%, 0);
        animation-timing-function: ease-in;
      }

      75% {
        transform: translate3d(0, 100%, -$ballSize);
        animation-timing-function: ease-out;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.8s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: rotate(60deg);
  }
}
</style>
