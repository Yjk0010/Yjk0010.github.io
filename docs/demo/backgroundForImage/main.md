# 背景随图片变化

## 展示

> 请鼠标移入当前图片

<div class="container">
  <button @click="handleClick" class="cor-tip">更换图片</button>
  <div class="grid" :style="style">
    <div class="item" v-for="(url, i) in images">
      <img
        crossorigin="anonymous"
        @mouseenter="handleMouseEnter($event, i)"
        @mouseleave="handleMouseLeave"
        :src="url"
        :style="{
          opacity: hoverIndex === -1 ? 1 : i === hoverIndex ? 1 : 0.2,
        }"
      />
    </div>
  </div>
</div>

<script setup>
import ColorThief from "colorthief";
import { ref, computed, reactive } from "vue";
const colorThief = new ColorThief();
const images = reactive([]);
for (let i = 0; i < 4; i++) {
  images.push(`https://picsum.photos/200/200?r=${i}`);
}
const handleMouseEnter = async (event, index) => {
  hoverIndex.value = index;
  // 得到这张图片的调色盘（前三种主要颜色）
  const colors = await colorThief.getPalette(event.target, 3);
  const [c1, c2, c3] = colors.map((c) => `rgb(${c[0]},${c[1]},${c[2]})`);
  color1.value = c1;
  color2.value = c2;
  color3.value = c3;
};
const handleClick = () => {
  images.splice(0);
  for (let i = 4; i > 0; i--) {
    images.push(`https://picsum.photos/200/200?r=${random(0, 100)}`);
  }
};
const handleMouseLeave = () => {
  hoverIndex.value = -1;
  color1.value = "transparent";
  color2.value = "transparent";
  color3.value = "transparent";
};
const hoverIndex = ref(-1);
const color1 = ref("transparent");
const color2 = ref("transparent");
const color3 = ref("transparent");
const style = computed(() => {
  return {
    "--c1": color1.value,
    "--c2": color2.value,
    "--c3": color3.value,
  };
});
// 获取min到max之间的随机数
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
</script>

<style lang="scss" model>
.grid {
  width: 650px;
  margin-top: 20px;
  padding: 70px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 70px;
  background: linear-gradient(
    to bottom,
    var(--c1) 33%,
    var(--c2) 66%,
    var(--c3) 100%
  );
  animation: spread 0.5s ease-in forwards;
  transition-property: --c1, --c2, --c3;
  transition-duration: 0.5s;
  transition-timing-function: ease-in;
  .item {
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
    border-radius: 5px;
    border: 0px solid #fff;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.5s;
    }
    &:hover {
      filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.5));
      border-width: 5px;
      transform: scale(1.1);
    }
  }
}
</style>

::: details 点击展开
<<< docs/demo/backgroundForImage/index.vue
:::

[视频讲解](https://www.douyin.com/user/MS4wLjABAAAAi2oukRVcHpgD-HbVdzsxE7tYykr91YuIKukR_X_Yy08EFWRQhRrECDF6FvbvT8Xa?modal_id=7233692264839630138)
