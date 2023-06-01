<template>
  <div class="complexAnimation" :style="style">
    <div class="block"></div>
    <div
      class="ball animate"
      :style="{
        animationName: isAnimateReverse ? 'ballMoveReverse' : 'ballMove',
      }"
    ></div>
    <div class="face">
      <div class="eye left animate"></div>
      <div class="eye right animate"></div>
      <div class="mouse animate"></div>
    </div>
    <input
      type="range"
      class="range"
      min="0"
      max="1"
      step="0.01"
      v-model="sliderValue"
      @input="rangeInput"
    />
    <div class="title">来划一划试试</div>
    <div>{{ sliderValue }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const sliderValue = ref(0.5);
const style = computed(() => {
  return {
    "--progress": sliderValue.value,
  };
});
let prev = 0;
const isAnimateReverse = ref(false);
const rangeInput = (e: Event) => {
  if (prev > sliderValue.value) {
    isAnimateReverse.value = true;
  } else {
    isAnimateReverse.value = false;
  }
  prev = sliderValue.value;
};
</script>

<style>
@keyframes ballMove {
  0% {
    transform: translate(-200px, 0) scale(1);
    clip-path: polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 0 50%);
  }
  25% {
    transform: translate(-100px, 0) scale(1.5);
    clip-path: polygon(25% 45%, 15% 15%, 100% 50%, 15% 85%, 25% 55%, 50% 50%);
  }
  50% {
    transform: translate(0, 0) scale(3);
    clip-path: polygon(25% 45%, 15% 15%, 100% 50%, 15% 85%, 25% 55%, 50% 50%);
  }
  75% {
    transform: translate(100px, 0) scale(1.5);
    clip-path: polygon(25% 45%, 15% 15%, 100% 50%, 15% 85%, 25% 55%, 50% 50%);
  }
  100% {
    transform: translate(200px, 0) scale(1);
    clip-path: polygon(15% 0, 50% 40%, 100% 50%, 50% 60%, 15% 100%, 30% 50%);
  }
}
@keyframes ballMoveReverse {
  0% {
    transform: translate(-200px, 0) scale(1);
    clip-path: polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 0 50%);
  }
  25% {
    transform: translate(-100px, 0) scale(1.5);
    clip-path: polygon(85% 15%, 75% 45%, 50% 50%, 75% 55%, 85% 85%, 0 50%);
  }
  50% {
    transform: translate(0, 0) scale(3);
    clip-path: polygon(85% 15%, 75% 45%, 50% 50%, 75% 55%, 85% 85%, 0 50%);
  }
  75% {
    transform: translate(100px, 0) scale(1.5);
    clip-path: polygon(85% 15%, 75% 45%, 50% 50%, 75% 55%, 85% 85%, 0 50%);
  }
  100% {
    transform: translate(200px, 0) scale(1);
    clip-path: polygon(45% 40%, 85% 0, 65% 50%, 85% 100%, 45% 60%, 0 50%);
  }
}
</style>

<style lang="scss" scoped>
.complexAnimation {
  display: flex;
  flex-direction: column;
  align-items: center;
  --progress: 0.5;
  --hue1: calc(120 * var(--progress));
  --hue2: calc(330 + var(--hue1));
  --color1: hsl(var(--hue1), 90%, 55%);
  --color2: hsl(var(--hue2), 90%, 45%);
  .animate {
    animation-duration: 1s;
    animation-delay: calc(-1s * var(--progress));
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-play-state: paused;
  }
  .block {
    margin-left: 10px;
    width: calc(400px * var(--progress));
    background-image: linear-gradient(to left, var(--color2), var(--color1));
    height: 6px;
    border-radius: 3px;
    margin-bottom: 20px;
  }
  .ball {
    width: 20px;
    height: 20px;
    background-color: aquamarine;
    position: relative;
    animation-name: ballMove;
    background-image: linear-gradient(to left, var(--color2), var(--color1));
    margin-bottom: 20px;
  }
  .range {
    background-color: #e3e4e8;
    background-image: linear-gradient(to right, var(--color1), var(--color2));
    background-size: calc(var(--progress) * 100%) 100%;
    background-repeat: no-repeat;
    border-radius: 0.25em;
    height: 0.5em;
    appearance: none;
    &::-webkit-slider-thumb {
      background-color: #fff;
      border: 0;
      border-radius: 50%;
      box-shadow: 0 0.125em 0.8em
        hsla(calc(180 * var(--progress)), 80%, 35%, 0.5);
      width: 1.5em;
      height: 1.5em;
      transition: background-color 0.15s linear;
      -webkit-appearance: none;
      appearance: none;
      cursor: pointer;
    }
    &::-moz-range-thumb {
      background-color: #fff;
      border: 0;
      border-radius: 50%;
      box-shadow: 0 0.125em 0.8em
        hsla(calc(180 * var(--progress)), 80%, 35%, 0.5);
      width: 1.5em;
      height: 1.5em;
      transition: background-color 0.15s linear;
      cursor: pointer;
    }
    &::-webkit-slider-thumb:hover {
      background-color: #ffffff7c;
    }
    &::-moz-range-thumb:hover {
      background-color: #ffffff7c;
    }
  }

  .face {
    width: 80px;
    height: 80px;
    background-image: linear-gradient(135deg, var(--color1), var(--color2));
    border-radius: 50%;
    margin-bottom: 30px;
    position: relative;

    .eye {
      position: absolute;
      width: 20%;
      height: 20%;
      background: #fff;
      top: 30%;
      left: 50%;
      border-radius: 50%;
      margin-left: -10%;
      &.left {
        transform: translateX(-90%);
        animation-name: leftEyeChange;
      }
      &.right {
        transform: translateX(90%);
        animation-name: rightEyeChange;
      }
    }

    .mouse {
      position: absolute;
      --w: 32px;
      --h: 32px;
      width: var(--w);
      height: var(--h);
      top: 66px;
      left: 30%;
      // background: mediumaquamarine;
      border-radius: var(--w);
      box-shadow: inset 0 2px 0 #fff;
      animation-name: mouseChange;
      transform: translateY(calc(var(--h) / -2));
    }
  }
  @keyframes leftEyeChange {
    0% {
      clip-path: polygon(0 75%, 100% 0, 100% 100%, 0 100%);
    }
    50%,
    100% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }
  }
  @keyframes rightEyeChange {
    0% {
      clip-path: polygon(0 0, 100% 70%, 100% 100%, 0 100%);
    }
    50%,
    100% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
  @keyframes mouseChange {
    50% {
      height: 4px;
      box-shadow: inset 0 4px 0 #fff;
      transform: translateY(calc(var(--h) / -3));
      clip-path: inset(0% 0% 0% 0%);
    }
    50.1% {
      height: 4px;
      box-shadow: inset 0 -4px 0 #fff;
      transform: translateY(calc(var(--h) / -3));
      clip-path: inset(50% 0% 0% 0%);
    }
    to {
      height: var(--h);
      box-shadow: inset 0 -50px 0 #fff;
      transform: translateY(calc(var(--h) / -1));
      clip-path: inset(50% 0% 0% 0%);
    }
  }
}
</style>
