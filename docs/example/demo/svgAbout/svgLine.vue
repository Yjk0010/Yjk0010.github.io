<template>
  <div class="svgLine">
    <svg class="lineSvg" viewbox="0 0 800 200">
      <linearGradient id="PF" x1="0" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="rgba(88,255,250,0)" />
        <stop offset="100%" stop-color="rgba(145,255,253,1)" />
      </linearGradient>
      <linearGradient id="NF" x1="0" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="rgba(88,148,255,0)" />
        <stop offset="100%" stop-color="rgba(145,183,255,.2)" />
      </linearGradient>
      <path
        :d="PFPath"
        fill="none"
        :stroke-width="rectHeight"
        :class="['line-path', isDark ? 'dark' : 'light']"
      />
      <rect
        v-if="show"
        :width="rectWidth"
        :height="rectHeight"
        :rx="rectHeight / 2"
        :y="-rectHeight / 2"
        :x="-rectWidth / 2"
        v-for="num in pointNumber"
        :key="num"
        :fill="`url(#${type})`"
      >
        <animateMotion
          rotate="auto"
          :dur="pointDur"
          :path="isPF(type) ? PFPath : NFPath"
          repeatCount="indefinite"
          :begin="lineMoveStartTime(num)"
        />
      </rect>
    </svg>
    <div class="btn">
      <span>{{ type }}</span>
      <el-button @click="changeDirection">改变方向</el-button>
      <span>&nbsp;</span>
      <span>{{ rectWidth }}</span>
      <el-button @click="changeRectWidth(true)">width++</el-button>
      <el-button @click="changeRectWidth(false)">width--</el-button>
      <span>{{ rectHeight }}</span>
      <el-button @click="changeRectHeight(true)">height++</el-button>
      <el-button @click="changeRectHeight(false)">height--</el-button>
      <span>{{ pointNumber }}</span>
      <el-button @click="changePointNumber(true)">Point++</el-button>
      <el-button @click="changePointNumber(false)">Point--</el-button>
      <span>{{ pointDur }}</span>
      <el-button @click="changePointDur(true)">速度--</el-button>
      <el-button @click="changePointDur(false)">速度++</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useData } from "vitepress";
const { isDark } = useData();
const show = ref(true);
const pointNumber = ref(25);
const pointDur = ref(15);
const PFPath =
  "M20,150 L70,150 A 15,15 0,0,1 85,160 L90,170 L110,60 L130,180 L160,10 L170,135 A 15,15 0,0,0 185,150 L300,150 Q230,80 250 40 A 44,44 0,0,1 330,50 A 44,44 0,0,1 410,40 Q430,80 360,150 L470,150";
const NFPath = "M20,85 L110,32 Q150,12 180,25 L200,35";
const type = ref("PF");
const isPF = (type: string) => {
  return type === "PF";
};
const lineMoveStartTime = (num: number) => {
  return ((-1 * pointDur.value) / pointNumber.value) * num;
};
const rectWidth = ref(10);
const rectHeight = ref(4);
const changeDirection = () => {
  if (type.value === "PF") {
    type.value = "NF";
  } else {
    type.value = "PF";
  }
};
const changeRectWidth = (flag: boolean) => {
  let midNumber = rectWidth.value;
  midNumber += flag ? 1 : -1;
  rectWidth.value = Math.min(Math.max(midNumber, 1), 20);
};
const changeRectHeight = (flag: boolean) => {
  let midNumber = rectHeight.value;
  midNumber += flag ? 1 : -1;
  rectHeight.value = Math.min(Math.max(midNumber, 1), 10);
};
const changePointNumber = (flag: boolean) => {
  show.value = false;
  nextTick(() => {
    let midNumber = pointNumber.value;
    midNumber += flag ? 2 : -2;
    pointNumber.value = Math.min(Math.max(midNumber, 1), 50);
    show.value = true;
  });
};
const changePointDur = (flag: boolean) => {
  show.value = false;
  nextTick(() => {
    let midNumber = pointDur.value;
    midNumber += flag ? 2 : -2;
    pointDur.value = Math.min(Math.max(midNumber, 1), 30);
    show.value = true;
  });
};
</script>

<style lang="scss" scoped>
.svgLine {
  .lineSvg {
    width: 800px;
    height: 200px;
  }
  .line-path {
    fill: none;

    stroke-linejoin: round;
    stroke-linecap: round;
    &.light {
      stroke: rgba($color: #000, $alpha: 0.3);
    }
    &.dark {
      stroke: rgba($color: #fff, $alpha: 0.3);
    }
  }
  .btn {
    width: 300px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    .el-button + .el-button {
      margin-left: 0;
    }
  }
}
</style>
