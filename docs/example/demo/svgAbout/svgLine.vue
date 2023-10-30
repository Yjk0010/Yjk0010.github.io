<template>
  <div class="svgLine">
    <svg class="lineSvg" viewbox="0 0 660 200">
      <linearGradient id="PF" x1="0" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="rgba(250,113,133,0)" />
        <stop offset="100%" stop-color="rgba(250,113,133,1)" />
      </linearGradient>
      <linearGradient id="NF" x1="0" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="rgba(52,211,153,0)" />
        <stop offset="100%" stop-color="rgba(52,211,153,1)" />
      </linearGradient>
      <path
        :d="isPF(type) ? PFPath : NFPath"
        id="path"
        fill="none"
        :stroke-width="rectHeight"
        :class="['line-path']"
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
          repeatCount="indefinite"
          :begin="lineMoveStartTime(num)"
        >
          <mpath href="#path" />
        </animateMotion>
      </rect>
    </svg>
    <div class="btn">
      <span>光效流动方向</span>
      <span>{{ type }}</span>
      <el-button @click="changeDirection">改变方向</el-button>
      <span>&nbsp;</span>
      <span>光效的长度</span>
      <span>{{ rectWidth }}</span>
      <el-button @click="changeRectWidth(true)">++</el-button>
      <el-button @click="changeRectWidth(false)">--</el-button>
      <span>光效及线的粗细</span>
      <span>{{ rectHeight }}</span>
      <el-button @click="changeRectHeight(true)">++</el-button>
      <el-button @click="changeRectHeight(false)">--</el-button>
      <span>光点数量</span>
      <span>{{ pointNumber }}</span>
      <el-button @click="changePointNumber(true)">++</el-button>
      <el-button @click="changePointNumber(false)">--</el-button>
      <span>光点运动时间</span>
      <span>{{ pointDur }}</span>
      <el-button @click="changePointDur(false)">++</el-button>
      <el-button @click="changePointDur(true)">--</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
// 控制光点变化时候的重新渲染
const show = ref(true);
// 光点数量
const pointNumber = ref(25);
// 光点运动时间
const pointDur = ref(15);
const PFPath = `M20,150 L70,150
  A15,15 0,0,1 85,160 L90,170 L110,60 L130,180 L160,10 L170,135 A15,15 0,0,0 185,150
  L300,150
  Q230,80 250,40 A44,44 0,0,1 330,50 A44,44 0,0,1 410,40 Q430,80 360,150
  L470,150
  Q480,100 470,60 A28,28 0,0,1 490,25 A10,12 0,0,1 510 25 A28,28 0,0,1 530,60 Q520,100 530,150
  L600,150`;
// 上面路径的返转
const NFPath = `M600,150 L530,150
  Q520,100 530,60 A28,28 0,0,0 510 25 A10,12 0,0,0 490,25 A28,28 0,0,0 470,60 Q480,100 470,150
  L360,150
  Q430,80 410,40  A44,44 0,0,0 330,50  A44,44 0,0,0 250,40 Q230,80 300,150
  L185,150
  A15,15 0,0,1 170,135 L160,10 L130,180 L110,60 L90,170 L85,160 A15,15 0,0,0 70,150
  L20,150`;
// 光点的方向
const type = ref("PF");
// 判断是否是正方向
const isPF = (type: string) => {
  return type === "PF";
};
// 光点运动开始时间
const lineMoveStartTime = (num: number) => {
  return ((-1 * pointDur.value) / pointNumber.value) * num;
};
// 光点的长度
const rectWidth = ref(10);
// 光点的粗细
const rectHeight = ref(4);
// 方向改变方法
const changeDirection = () => {
  if (type.value === "PF") {
    type.value = "NF";
  } else {
    type.value = "PF";
  }
};
// 光点长度改变方法
const changeRectWidth = (flag: boolean) => {
  let midNumber = rectWidth.value;
  midNumber += flag ? 1 : -1;
  rectWidth.value = Math.min(Math.max(midNumber, 1), 20);
};
// 光点粗细改变方法
const changeRectHeight = (flag: boolean) => {
  let midNumber = rectHeight.value;
  midNumber += flag ? 1 : -1;
  rectHeight.value = Math.min(Math.max(midNumber, 1), 10);
};
// 光点数量改变方法
const changePointNumber = (flag: boolean) => {
  show.value = false;
  nextTick(() => {
    let midNumber = pointNumber.value;
    midNumber += flag ? 2 : -2;
    pointNumber.value = Math.min(Math.max(midNumber, 1), 50);
    show.value = true;
  });
};
// 光点运动时间改变方法
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
    width: 660px;
    height: 200px;
  }
  .line-path {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke: rgba(160, 160, 160, 0.2);
  }
  .btn {
    width: 500px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    .el-button + .el-button {
      margin-left: 0;
    }
  }
}
</style>
