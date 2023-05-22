<template>
  <div class="pic-viewer">
    <Line position="center" :title="title"></Line>
    <img class="pic-viewer-img" @click="boxShow" :src="picSrc" :alt="picAlt" />
    <div class="pic-viewer-title">{{ picAlt }}</div>
    <div
      class="pic-viewer-box"
      @click="handleShowBox"
      @mousewheel="handleBoxWheel"
      ref="viewerBox"
      v-show="isBoxShow"
    >
      <div class="pic-viewer-box-info">
        鼠标滚轮可缩放 <br />
        选中图片可拖拽 <br />
        点击非图片区域(键盘Esc)关闭
      </div>
      <img
        class="pic-viewer-box-img"
        ref="image"
        :style="{
          transform: `scale(${scale})`,
          left: `${left}px`,
          top: `${top}px`,
        }"
        @click.stop
        @mousewheel="handleWheel"
        @mousedown="startDrag"
        :src="picSrc"
        :alt="picAlt"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Line from "../Line/Line.vue";
// 因为vite打包图片URL获取问题 调用该组件的图片地址应使用不被打包的public/assets/文件下的不经过打包编译文件
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from "vue";
withDefaults(
  defineProps<{
    title: string;
    picSrc: string;
    picAlt: string;
  }>(),
  {
    title: "",
    picSrc: "",
    picAlt: "",
  }
);
const isBoxShow = ref(false);
const scale = ref(1);
const left = ref(0);
const top = ref(0);
const image = ref<HTMLImageElement | null>(null);
const viewerBox = ref<HTMLDivElement | null>(null);

let multiple = 0;

const handleShowBox = () => {
  isBoxShow.value = !isBoxShow.value;
};
const boxShow = () => {
  // 获取当前 scale 倍率
  isBoxShow.value = true;
  scale.value = 1;
  nextTick(() => {
    const { width: viewerBoxWidth, height: viewerBoxHeight } =
      viewerBox.value?.getBoundingClientRect() || {
        width: 0,
        height: 0,
      };
    const { width: imageWidth, height: imageHeight } =
      image.value?.getBoundingClientRect() || {
        width: 0,
        height: 0,
      };
    const scaleWithValue = (viewerBoxWidth * 0.8) / imageWidth;
    const scaleHeightValue = (viewerBoxHeight * 0.8) / imageHeight;
    multiple = +Math.min(scaleWithValue, scaleHeightValue).toFixed(2);
    scale.value = multiple;

    // 居中显示
    left.value = (viewerBoxWidth - imageWidth) / 2;
    top.value = (viewerBoxHeight - imageHeight) / 2;
  });
};
const handleScale = (wheel: number) => {
  if (wheel > 0) {
    scale.value = Math.max(0.2, scale.value - multiple / 5);
  } else {
    scale.value = Math.min(5, scale.value + multiple / 5);
  }
};
const handleBoxWheel = (e: WheelEvent) => {
  e.preventDefault();
  handleScale(e.deltaY);
};
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
  const isDragging = ref(false);
  const startPosition = { x: 0, y: 0 };
  const startOffset = { x: 0, y: 0 };
  let lastTimestamp = 0;

  const dragging = (event: MouseEvent) => {
    if (!isDragging.value) return;
    window.requestAnimationFrame((timestamp) => {
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
