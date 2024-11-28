<template>
  <div class="pic-viewer">
    <Line v-if="title" position="center" :title="title"></Line>
    <img class="pic-viewer-img" @click="boxShow" :src="imgSrc" :alt="alt || `这张图片害羞了`" />
    <div class="pic-viewer-title">
      {{ alt || title }}
    </div>
    <div class="pic-viewer-box" @click="handleShowBox" @mousewheel="handleBoxWheel" ref="viewerBox" v-show="isBoxShow">
      <div class="pic-viewer-box-info">
        鼠标滚轮可缩放 <br />
        选中图片可拖拽 <br />
        点击非图片区域(键盘Esc)关闭
      </div>
      <img class="pic-viewer-box-img" ref="image" :style="{
        transform: `scale(${scale})`,
        left: `${left}px`,
        top: `${top}px`,
      }" @click.stop @mousewheel="handleWheel" @mousedown="startDrag" :src="imgSrc" :alt="alt" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PicViewer",
});
import Line from "../Line/Line.vue";
import { useData } from "vitepress";
const { isDark } = useData();
// 因为vite打包图片URL获取问题 调用该组件的图片地址应使用不被打包的public/assets/文件下的不经过打包编译文件
import { ref, onMounted, computed, onUnmounted, nextTick, Ref } from "vue";
const props = withDefaults(
  defineProps<{
    title: string;
    src: string;
    darkSrc?: string;
    alt?: string;
  }>(),
  {
    title: "",
    src: "",
    darkSrc: "",
    alt: "",
  }
);
const isBoxShow: Ref<boolean> = ref(false);
const scale: Ref<number> = ref(1);
const left: Ref<number> = ref(0);
const top: Ref<number> = ref(0);
const image: Ref<HTMLImageElement | null> = ref(null);
const viewerBox: Ref<HTMLDivElement | null> = ref(null);

// 缩放倍率
let multiple: number = 0;
// 图片缩放比例
const proportion: number = 0.75;
// 缩放增加步长  取值 0 - 0.2 越大 缩放越快 越小 越慢
const stepSize: number = 0.08;

// 图片地址 切换  亮暗模式时候 切换 亮暗模式下不同的  图片地址
const imgSrc = computed(() => {
  return isDark.value ? props.darkSrc || props.src : props.src;
});

// 点击图片 图片弹出
const handleShowBox = () => {
  isBoxShow.value = !isBoxShow.value;
};
const boxShow = () => {
  // 获取当前 scale 倍率
  isBoxShow.value = true;
  scale.value = 1;
  nextTick(() => {
    // 获取viewerBox 宽高
    const { width: viewerBoxWidth, height: viewerBoxHeight } =
      viewerBox.value?.getBoundingClientRect() || {
        width: 0,
        height: 0,
      };

    // 获取image 宽高
    const { width: imageWidth, height: imageHeight } =
      image.value?.getBoundingClientRect() || {
        width: 0,
        height: 0,
      };

    // 计算默认弹出缩放这样不至于图片太大  太小时  显示内容过于怪异
    const scaleWithValue: number = (viewerBoxWidth * proportion) / imageWidth;
    const scaleHeightValue: number =
      (viewerBoxHeight * proportion) / imageHeight;
    multiple = +Math.min(scaleWithValue, scaleHeightValue).toFixed(2);
    scale.value = multiple;

    // 居中显示
    left.value = (viewerBoxWidth - imageWidth) / 2;
    top.value = (viewerBoxHeight - imageHeight) / 2;
  });
};
const handleScale = (wheel: number) => {
  // 滚轮滚动  放大缩小图片
  if (wheel > 0) {
    scale.value = Math.max(0.2, scale.value - multiple * stepSize);
  } else {
    scale.value = Math.min(5, scale.value + multiple * stepSize);
  }
};
//  滚轮缩放
const handleBoxWheel = (e: WheelEvent) => {
  e.preventDefault();
  handleScale(e.deltaY);
};
//   滚轮缩放
const handleWheel = (e: WheelEvent) => {
  e.preventDefault();
  handleScale(e.deltaY);
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    isBoxShow.value = false;
  }
};
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

const useDragBox = () => {
  const isDragging: Ref<boolean> = ref(false);
  const startPosition: { x: number; y: number } = { x: 0, y: 0 };
  const startOffset: { x: number; y: number } = { x: 0, y: 0 };
  let lastTimestamp: number = 0;

  const dragging = (event: MouseEvent) => {
    if (!isDragging.value) return;
    requestAnimationFrame((timestamp) => {
      if (timestamp - lastTimestamp < 16) return;
      lastTimestamp = timestamp;
      left.value = startOffset.x + event.pageX - startPosition.x;
      top.value = startOffset.y + event.pageY - startPosition.y;
    });
  };

  const stopDrag = () => {
    isDragging.value = false;
  };

  return {
    isDragging,
    startPosition,
    startOffset,
    dragging,
    stopDrag,
  };
};
const { isDragging, startPosition, startOffset, dragging, stopDrag } =
  useDragBox();
onMounted(() => {
  document.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", stopDrag);
});
onUnmounted(() => {
  document.removeEventListener("mousemove", dragging);
  document.removeEventListener("mouseup", stopDrag);
});
const startDrag = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  isDragging.value = true;
  startPosition.x = e.pageX;
  startPosition.y = e.pageY;
  startOffset.x = left.value;
  startOffset.y = top.value;
  console.log(startPosition, startOffset);
};
</script>

<style lang="scss" scoped>
.pic-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-img {
    margin: 8px 0;
    cursor: pointer;
  }

  &-title {
    text-align: center;
    font-size: 0.8rem;
    color: var(--vp-c-text-2);
  }

  &-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
    background-color: rgba(0, 0, 0, 0.5);

    &-img {
      position: absolute;
      cursor: move;
    }

    &-info {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
}
</style>
