<template>
  <div class="dragable">
    <div class="box drag box1">
      <img id="dragImg" src="/demo.jpg" draggable="true">
    </div>
    <div class="box drag box2">
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const dragImg = document.querySelector('#dragImg');
  const box1 = document.querySelector('.drag.box1');
  const box2 = document.querySelector('.drag.box2');

  if (dragImg && box2 && box1) {
    // dragImg 监听dragstart
    dragImg.addEventListener('dragstart', (event) => {
      const dragEvent = event as DragEvent;
      dragEvent.dataTransfer?.setData('text/plain', dragImg.id);
    });
    // 阻止默认行为以允许放置
    box1.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    // 获取拖动的数据并将其放置到所选的放置目标中
    box1.addEventListener('drop', (event) => {
      event.preventDefault();
      const dragEvent = event as DragEvent;
      const data = dragEvent.dataTransfer?.getData('text/plain') as string;
      box1.appendChild(document.getElementById(data) as HTMLElement);
    });
    // 阻止默认行为以允许放置
    box2.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    // 获取拖动的数据并将其放置到所选的放置目标中
    box2.addEventListener('drop', (event) => {
      event.preventDefault();
      const dragEvent = event as DragEvent;
      const data = dragEvent.dataTransfer?.getData('text/plain') as string;
      box2.appendChild(document.getElementById(data) as HTMLElement);
    });

  }
})

</script>

<style lang="scss" scoped>
.dragable {
  display: flex;

  .box {
    width: 180px;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 12px;
  }

  .box1 {
    background-color: var(--jk-color-purple);
  }

  .box2 {
    background-color: var(--jk-color-blue);
  }
}
</style>