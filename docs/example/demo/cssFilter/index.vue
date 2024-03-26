<template>
  <div class="container" :style="containerStyle">
    <div class="card one">
      <div class="title">不规则图形上阴影 - drop-shadow</div>
      <img class="logo image" src="./firefox.svg" :style="styleDropShadow" />
      <div class="no-img-container image" :style="styleDropShadow">
        <img class="no-img" src="./firefox.svg" />
      </div>
    </div>
    <div class="card">
      <div class="title">增加高斯模糊 - blur</div>
      <el-input-number v-model="blurNumber" :min="0" :max="Infinity"></el-input-number>
      <img class="logo" src="./firefox.svg" :style="styleBlur" />
    </div>
    <div class="card">
      <div class="title">明暗调节 - brightness</div>
      <el-input-number v-model="brightnessNumber" :step="10" :min="0" :max="Infinity"></el-input-number>
      <img class="logo" src="./firefox.svg" :style="styleBrightness" />
    </div>
    <div class="card">
      <div class="title">对比度调节 - contrast</div>
      <el-input-number v-model="contrastNumber" :step="10" :min="0" :max="Infinity"></el-input-number>
      <img class="logo" src="./firefox.svg" :style="styleContrast" />
    </div>
    <div class="card">
      <div class="title">灰度调节 - grayscale</div>
      <el-input-number v-model="grayscaleNumber" :step="10" :min="0" :max="100"></el-input-number>
      <img class="logo" src="./firefox.svg" :style="styleGrayscale" />
    </div>
    <div class="card">
      <div class="title">色调调节 - hue-rotate</div>
      <el-input-number v-model="hueRotateNumber" :step="10" :min="0" :max="360"></el-input-number>
      <img class="logo" src="./firefox.svg" :style="styleHueRotate" />
    </div>
    <div class="card">
      <div class="title">反色调调节 - invert</div>
      <el-input-number v-model="invertNumber" :step="10" :min="0" :max="100"></el-input-number>
      <img class="logo" src="./firefox.svg" :style="styleInvert" />
    </div>
    <div class="card">
      <div class="title">透明度调节 - opacity</div>
      <el-input-number v-model="opacityNumber" :step="10" :min="0" :max="100"></el-input-number>
      <img class="logo" src="./firefox.svg" :style="styleOpacity" />
    </div>
    <div class="card">
      <div class="title">图像饱和度 - saturate</div>
      <el-input-number v-model="saturateNumber" :step="10" :min="0" :max="Infinity"></el-input-number>
      <img class="logo" src="./firefox.svg" :style="styleSaturate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
const { isDark } = useData();
import { ref, computed } from "vue";
/**
 * 不规则图形上阴影
 * drop-shadow (0 0 10px black)
 */
const styleDropShadow = computed(() => {
  return {
    filter: `drop-shadow(0 0 10px ${isDark.value ? "white" : "black"})`,
  };
});
const blurNumber = ref(0);
/**
 * 增加高斯模糊
 * min: 0
 * max: Infinity
 */
const styleBlur = computed(() => {
  return {
    filter: `blur(${blurNumber.value}px)`,
  };
});
const brightnessNumber = ref(100);
/**
 * 明暗调节
 * min: 0
 * max: Infinity
 */
const styleBrightness = computed(() => {
  return {
    filter: `brightness(${brightnessNumber.value}%)`,
  };
});
const contrastNumber = ref(100);
/**
 * 对比度调节
 * min: 0
 * max: Infinity
 * */
const styleContrast = computed(() => {
  return {
    filter: `contrast(${contrastNumber.value}%)`,
  };
});
const grayscaleNumber = ref(0);
/**
 * 灰度调节
 * min: 0
 * max: 100
 * */
const styleGrayscale = computed(() => {
  return {
    filter: `grayscale(${grayscaleNumber.value}%)`,
  };
});
const hueRotateNumber = ref(0);
/**
 * 色调调节
 * min: 0
 * max: 360
 * */
const styleHueRotate = computed(() => {
  return {
    filter: `hue-rotate(${hueRotateNumber.value}deg)`,
  };
});
const invertNumber = ref(0);
/**
 * 反色调调节
 * min: 0
 * max: 100
 * */
const styleInvert = computed(() => {
  return {
    filter: `invert(${invertNumber.value}%)`,
  };
});
const opacityNumber = ref(100);
/**
 * 透明度调节
 * min: 0
 * max: 100
 * */
const styleOpacity = computed(() => {
  return {
    filter: `opacity(${opacityNumber.value}%)`,
  };
});
const saturateNumber = ref(100);
/**
 * 图像饱和度
 * min: 0
 * max: Infinity
 * */
const styleSaturate = computed(() => {
  return {
    filter: `saturate(${saturateNumber.value}%)`,
  };
});
const containerStyle = computed(() => {
  return {
    "--cardShadowColor": isDark.value
      ? "rgba(255,255,255,.3)"
      : "rgba(0,0,0,.3)",
  };
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: left;
  justify-content: left;
  flex-wrap: wrap;

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 46%;

    @media (max-width: 768px) {
      width: 96%;
    }

    box-shadow: 0 0 10px var(--cardShadowColor);
    border-radius: 6px;
    margin: 2%;

    &.one {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto 1fr;
      grid-gap: 0;
      justify-items: center;

      .title {
        grid-column: 1 / 3;
        text-align: center;
      }
    }
  }

  .logo {
    width: 200px;
    height: 200px;
  }

  .no-img {
    width: 200px;
    height: 200px;
    clip-path: polygon(50% 0%,
        61% 35%,
        98% 35%,
        68% 57%,
        79% 91%,
        50% 70%,
        21% 91%,
        32% 57%,
        2% 35%,
        39% 35%);
  }

  img {
    margin: 10px 0;
  }

  .title {
    margin: 12px;
  }
}
</style>
