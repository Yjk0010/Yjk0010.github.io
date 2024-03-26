<template>
  <div ref="scrollContainer" class="scroll-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const scrollContainer = ref<HTMLElement>();
const images: string[] = [
  "/assets/demo/scenery-1.jpg",
  "/assets/demo/scenery-2.jpg",
  "/assets/demo/scenery-3.jpg",
  "/assets/demo/scenery-4.jpg",
  "/assets/demo/scenery-5.jpg",
  "/assets/demo/scenery-6.jpg",
  "/assets/demo/scenery-7.jpg",
  "/assets/demo/scenery-8.jpg",
];
let currentIndex: number = 0;
const createImg = (index: number) => {
  const imgUrl = images[index];
  const item = document.createElement("div");
  item.classList.add("item");
  item.innerHTML = `<img src="${imgUrl}" />`;
  scrollContainer.value?.appendChild(item);
  return item;
};
const resetElements = () => {
  if (!scrollContainer.value) return;
  scrollContainer.value.innerHTML = "";
  const prevIndex = currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex + 1 > images.length - 1 ? 0 : currentIndex + 1;
  createImg(prevIndex).classList.add("prev");
  createImg(currentIndex).classList.add("current");
  createImg(nextIndex).classList.add("next");
};
onMounted(() => {
  resetElements();
  let isAnimation = false;
  scrollContainer.value?.addEventListener("wheel", (event: WheelEvent) => {
    console.log(event);

    event.preventDefault();
    if (!event.deltaY) return;
    if (isAnimation) return;
    isAnimation = true;
    if (event.deltaY > 0) {
      scrollContainer.value?.classList.add("scroll-down");
      currentIndex =
        currentIndex + 1 > images.length - 1 ? 0 : currentIndex + 1;
    } else {
      scrollContainer.value?.classList.add("scroll-up");
      currentIndex =
        currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
    }
  });
  scrollContainer.value?.addEventListener("transitionend", () => {
    isAnimation = false;
    scrollContainer.value?.classList.remove("scroll-down");
    scrollContainer.value?.classList.remove("scroll-up");
    resetElements();
  });
});
</script>

<style lang="scss" scoped>
.scroll-container {
  --width: 400px;
  --height: 700px;

  @media (max-width: 768px) {
    --width: 250px;
    --height: 500px;
  }

  width: var(--width);
  height: var(--height);
  position: relative;
  overflow: hidden;
  cursor: n-resize;

  ::v-deep(.item) {
    position: absolute;
    width: var(--width);
    height: var(--height);
    overflow: hidden;
    transition: 1s ease-in-out;

    img {
      position: absolute;
      width: var(--width);
      height: var(--height);
      transition: 1s ease-in-out;
    }

    &.prev,
    &.next {
      z-index: 1;
      height: 0;
    }

    &.next {
      bottom: 0;

      img {
        bottom: 0;
        transform: translateY(10%);
      }
    }

    &.prev {
      img {
        transform: translateY(-10%);
      }
    }
  }
}

.scroll-up {
  ::v-deep(.item) {
    &.prev {
      height: 700px;

      img {
        transform: translateY(0);
      }
    }

    &.current {
      img {
        transform: translateY(10%);
      }
    }
  }
}

.scroll-down {
  ::v-deep(.item) {
    &.next {
      height: 700px;

      img {
        transform: translateY(0);
      }
    }

    &.current {
      img {
        transform: translateY(-10%);
      }
    }
  }
}
</style>
