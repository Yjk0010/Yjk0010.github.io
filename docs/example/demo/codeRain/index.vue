<template>
  <div class="container">
    <el-row style="align-items: center">
      <el-col :span="4" style="text-align: right">展示代码</el-col>
      <el-col :span="1"></el-col>
      <el-col :span="12">
        <el-input type="textarea" v-model="code" :rows="3"></el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="3">
        <el-button @click="handleClick">重新来</el-button>
      </el-col>
    </el-row>
    <canvas class="bg" ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
import { ref, computed, onMounted, onUnmounted } from "vue";
const { isDark } = useData();
const drawTime = 60;

// 随机颜色
const fontColors: string[] = [
  "#33B5E5",
  "#0099CC",
  "#AA66CC",
  "#9933CC",
  "#99CC00",
  "#669900",
  "#FFBB33",
  "#FF8800",
  "#FF4444",
  "#CC0000",
];
// 随机颜色
const getRandomColor = (): string => {
  return fontColors[Math.floor(Math.random() * fontColors.length)];
};
// 随机文字
const code = ref(`console.log("hello world")`);
const showCode = ref(``);
const columnWidth = 20;
let columnCount = 0; // 列数
let columnNextIndexes: number[] = [];
let ctx: CanvasRenderingContext2D | null = null;
let width = 0;
let height = 0;
let intervalId: any = null;
// 随机值
const getRandomChar = (): string => {
  return showCode.value[Math.floor(Math.random() * showCode.value.length)];
};
const handleClick = () => {
  showCode.value = code.value;
  if (intervalId) {
    clearInterval(intervalId);
    ctx?.clearRect(0, 0, width, height);
    columnCount = Math.floor(width / columnWidth);
    columnNextIndexes = new Array(columnCount);
    columnNextIndexes.fill(1);
    intervalId = setInterval(draw, drawTime);
  }
};
const canvasRef = ref<HTMLCanvasElement | null>(null);
onMounted(() => {
  showCode.value = code.value;
  if (canvasRef.value) {
    // 创建画布进行绘画
    ctx = canvasRef.value.getContext("2d");
    canvasRef.value.width = 640;
    canvasRef.value.height = 640;
    width = canvasRef.value.clientHeight;
    height = canvasRef.value.height;
    // 根据列宽计算列数
    columnCount = Math.floor(width / columnWidth);
    columnNextIndexes = new Array(columnCount);
    columnNextIndexes.fill(1);
  }
  intervalId = setInterval(draw, drawTime);
});
const draw = () => {
  if (ctx) {
    // 每次画布都画一个0.1 多画几次就盖住了原来的 就显示出渐渐消失的感觉
    ctx.fillStyle = isDark.value
      ? "rgba(0, 0, 0, 0.1)"
      : "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(0, 0, width, height);
    const fz = 20;
    ctx.fillStyle = getRandomColor();
    ctx.font = `${fz}px DingTalkJinBuTi`;
    for (let i = 0; i < columnCount; i++) {
      const x = i * columnWidth;
      const y = fz * columnNextIndexes[i];
      ctx.fillText(getRandomChar(), x, y);
      if (y > height && Math.random() > 0.99) {
        columnNextIndexes[i] = 0;
      } else {
        columnNextIndexes[i]++;
      }
    }
  }
};
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style lang="scss" scoped>
.container {
  .bg {
    margin-top: 20px;
    $canvasSize: 640px;
    width: $canvasSize;
    height: $canvasSize;
  }
}
</style>
