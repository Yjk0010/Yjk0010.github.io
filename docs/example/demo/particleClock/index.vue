<template>
  <div class="content">
    <canvas class="canvas" ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getRandomNum } from "docs/utils/index.ts";
const canvasRef = ref<HTMLCanvasElement>();
// 设置设备像素比为1 兼容高清屏
const devicePixelRatio = 1;
// const devicePixelRatio = window.devicePixelRatio || 1;

onMounted(() => {
  if (!canvasRef.value) {
    return;
  }
  // 创建字体
  const getText = (): string => {
    return new Date().toTimeString().substring(0, 8);
  };
  const canvas: HTMLCanvasElement = canvasRef.value;
  const ctx = canvas.getContext("2d", {
    // 频繁访问像素点优化配置
    willReadFrequently: true,
  });
  // 初始化画布大小
  const initCanvasSize = () => {
    canvas.width = 650 * devicePixelRatio;
    canvas.height = 650 * devicePixelRatio;
  };
  // 粒子
  class Particle {
    x: number;
    y: number;
    size: number;
    duration: number;
    constructor() {
      // 半径
      const r = Math.min(canvas.width, canvas.height) / 2 - 10;
      // 圆心坐标
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      // 随机角度
      const rad = (getRandomNum(0, 360) * Math.PI) / 180;
      // 粒子位置
      this.x = cx + r * Math.cos(rad);
      this.y = cy + r * Math.sin(rad);
      // 粒子大小
      this.size = getRandomNum(2 * devicePixelRatio, 7 * devicePixelRatio);
      // 位移时间
      this.duration = 500;
    }
    // 画粒子
    draw() {
      if (ctx) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(200, 200, 200, .3)";
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    // 移动粒子
    moveTo(tx: number, ty: number) {
      const sx = this.x;
      const sy = this.y;
      const xSpeed = (tx - sx) / this.duration;
      const ySpeed = (ty - sy) / this.duration;
      const startTime = Date.now();
      // 缓动效果
      const _move = () => {
        const t = Date.now() - startTime;
        this.x = sx + xSpeed * t;
        this.y = sy + ySpeed * t;
        if (t > this.duration) {
          this.x = tx;
          this.y = ty;
          return;
        }
        requestAnimationFrame(_move);
      };
      _move();
    }
  }
  // 创建粒子数组
  const particles: Particle[] = [];
  let text: string = "";
  // 清空画布
  const clear = () => {
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };
  // 获取粒子坐标数组
  const getPoints = (): number[][] | undefined => {
    if (ctx) {
      const { width, height, data } = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      const points = [];
      const gap = 4;
      for (let i = 0; i < width; i += gap) {
        for (let j = 0; j < height; j += gap) {
          const index = (i + j * width) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const a = data[index + 3];
          if (r === 0 && g === 0 && b === 0 && a === 255) {
            points.push([i, j]);
          }
        }
      }
      return points;
    }
  };
  // 更新
  const update = () => {
    const newText = getText();
    if (text !== newText) {
      clear();
      text = newText;
      // 画文本
      if (ctx) {
        ctx.fillStyle = "#000";
        ctx.textBaseline = "middle";
        ctx.font = `${120 * devicePixelRatio}px DingTalkJinBuTi,sans-serif`;
        ctx.fillText(
          text,
          (canvas.width - ctx.measureText(text).width) / 2,
          canvas.height / 2
        );
        const points = getPoints();
        if (!points?.length) return;
        clear();
        for (let i = 0; i < points?.length; i++) {
          let p = particles[i];
          if (!p) {
            p = new Particle();
            particles.push(p);
          }
          const [x, y] = points[i];
          p.moveTo(x, y);
        }
        if (points?.length < particles.length) {
          particles.splice(points.length);
        }
      }
    }
  };
  // 绘制
  const draw = () => {
    clear();
    update();
    particles.forEach((p) => {
      p.draw();
    });
    requestAnimationFrame(draw);
  };
  if (!particles.length) {
    initCanvasSize();
    draw();
    console.log("启动");
  }
});

// 创建一个类
</script>

<style lang="scss" scoped>
.content {
  background: url("/assets/demo/bg-1.jpg") no-repeat;
  background-size: cover;

  .canvas {
    width: 100%;
  }
}
</style>
