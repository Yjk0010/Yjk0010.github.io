<template>
  <div class="container" ref="containerScroll">
    <div class="header" ref="header">请在这里滚动鼠标滚轮</div>
    <div class="content" ref="content">
      <div class="animation-container">
        <div class="waves" ref="waves"></div>
        <div class="list" ref="list">
          <div
            :data-order="orderList[index]"
            v-for="(item, index) in 14"
            :key="index"
            :ref="setItemsRef"
            class="list-item"
          >
            {{ textList[index] }}
          </div>
        </div>
        <!-- 散点 -->
        <div class="scatter-point" ref="scatterPoint">
          <div
            class="point"
            v-for="(_, index) in 18"
            :key="index"
            :ref="setPointsRef"
            :style="getPointStyle(index)"
          ></div>
        </div>
        <div class="logo" ref="logo">
          <img src="/logo.png" alt="" />
          <p class="logo-text">JinKe Blog</p>
        </div>
      </div>
    </div>
    <div class="footer">滚完了</div>
  </div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import { ref, onMounted } from "vue";
// 粒子位置数据
import { pointStyleList, optionMinMax, textList, orderList } from "./config.ts";
// 水波效果
const waves = ref<HTMLElement>();
// 间距
const separation = 150;
// 横向数量
const amountX = 50;
// 纵向数量
const amountY = 50;
// three容器
let container: HTMLElement;
let camera: any;
let scene: any;
let wavesRenderer: any;
let particles: any;
let count = 0;
let mouseX = 0;
let mouseY = -280;
let wavesWidth = 0;
let wavesHeight = 0;
/**
 * 初始化波浪动画。
 * - 创建一个容器并将其附加到波浪元素。
 * - 设置相机和场景。
 * - 创建粒子并将其添加到场景中。
 * - 初始化渲染器并将其附加到容器。
 */
const wavesInit = () => {
  if (!waves.value) return;
  // 创建一个用于动画的容器
  container = document.createElement("div");
  waves.value.appendChild(container);
  // 设置相机
  camera = new THREE.PerspectiveCamera(80, wavesWidth / wavesHeight, 1, 6000);
  camera.position.z = 1200;
  // 创建场景
  scene = new THREE.Scene();
  // 设置粒子位置和比例
  const numParticles = amountX * amountY;
  const positions = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);
  let i = 0;
  let j = 0;
  for (let ix = 0; ix < amountX; ix++) {
    for (let iy = 0; iy < amountY; iy++) {
      positions[i] = ix * separation - (amountX * separation) / 2; // x
      positions[i + 1] = 0; // y
      positions[i + 2] = iy * separation - (amountY * separation) / 2; // z
      scales[j] = 1;
      i += 3;
      j++;
    }
  }
  // 创建粒子几何图形。
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));
  // 设置材质。
  const material: any = new THREE.ShaderMaterial({
    uniforms: {
      // 设置粒子颜色。
      color: { value: new THREE.Color("rgb(109,215,208)") },
    },
    // 设置粒子大小和位置。
    vertexShader:
      "attribute float scale; void main() {vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );gl_PointSize = scale * ( 150.0 / - mvPosition.z );gl_Position = projectionMatrix * mvPosition;}",
    // 设置粒子颜色。
    fragmentShader:
      "uniform vec3 color;void main() {if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;gl_FragColor = vec4( color, 1.0 );}",
  });
  // 创建粒子并将其添加到场景中。
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
  // 设置渲染器并将其附加到容器。
  wavesRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  wavesRenderer.setPixelRatio(window.devicePixelRatio);
  wavesRenderer.setSize(wavesWidth, wavesHeight);
  container.appendChild(wavesRenderer.domElement);
  // 在容器上禁用触摸操作。
  container.style.touchAction = "none";
  // container.addEventListener("pointermove", onPointerMove);
};
function onPointerMove(event: PointerEvent) {
  if (event.isPrimary === false) return;
  mouseX = event.clientX - window.innerWidth / 2;
  mouseY = event.clientY - window.innerHeight / 2;
}
function wavesAnimate() {
  requestAnimationFrame(wavesAnimate);
  wavesRender();
}
/**
 * 渲染波浪动画。
 * - 计算粒子的大小和位置。
 * - 更新粒子的几何图形。
 * - 渲染场景。
 */
const wavesRender = () => {
  // 如果波浪元素不存在，则什么也不做。
  if (!waves.value) return;
  // 调整视角
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
  // 计算粒子的大小和位置。
  let i = 0;
  let j = 0;
  const positions = particles.geometry.attributes.position.array;
  const scales = particles.geometry.attributes.scale.array;
  for (let ix = 0; ix < amountX; ix++) {
    for (let iy = 0; iy < amountY; iy++) {
      positions[i + 1] =
        Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
      scales[j] =
        (Math.sin((ix + count) * 0.3) + 1) * 8 +
        (Math.sin((iy + count) * 0.5) + 1) * 8;
      i += 3;
      j++;
    }
  }
  // 更新粒子的几何图形。
  particles.geometry.attributes.position.needsUpdate = true;
  particles.geometry.attributes.scale.needsUpdate = true;
  // 渲染场景。
  wavesRenderer.render(scene, camera);
  // 更新计数器。
  count += 0.1;
};

onMounted(() => {
  if (waves.value) {
    const { width, height } = waves.value.getBoundingClientRect();
    wavesWidth = width;
    wavesHeight = height;
    wavesInit();
    wavesAnimate();
  }
});
const animationListMap = new Map();
let animationPoint: Function = () => {};
type AnimationLogo = {
  transform: Function;
  opacity: Function;
};
let animationLogo: AnimationLogo;
const itemsRef = ref<HTMLElement[]>([]);
function setItemsRef(el: any) {
  if (el) {
    itemsRef.value.push(el);
  }
}
const pointsRef = ref<HTMLElement[]>([]);
function setPointsRef(el: any) {
  if (el) {
    pointsRef.value.push(el);
  }
}
const content = ref<HTMLElement>();
const list = ref<HTMLElement>();
const containerScroll = ref<HTMLElement>();
const header = ref<HTMLElement>();
const logo = ref<HTMLElement>();
/**
 * 生成随机颜色
 */
const randomHexColor = () => {
  return Array.from({ length: 6 }).reduce((prev) => {
    return prev + Math.floor(Math.random() * 16).toString(16);
  }, "#");
};
/**
 * 生成随机位置
 */
const randomOption = () => {
  const left =
    Math.floor(
      Math.random() * (optionMinMax.leftMax - optionMinMax.leftMin + 1)
    ) + optionMinMax.leftMin;
  const top =
    Math.floor(
      Math.random() * (optionMinMax.topMax - optionMinMax.topMin + 1)
    ) + optionMinMax.topMin;
  return {
    left,
    top,
  };
};
/**
 * 随机位置控制方法 不允许落在中间位置
 */
const positionControl = () => {
  let { left, top } = randomOption();
  while (
    left >= optionMinMax.centerLeftMin &&
    left <= optionMinMax.centerLeftMax &&
    top >= optionMinMax.centerTopMin &&
    top <= optionMinMax.centerTopMax
  ) {
    const { left: newLeft, top: newTop } = randomOption();
    left = newLeft;
    top = newTop;
  }
  return {
    left,
    top,
  };
};
const getPointStyle = (index: number) => {
  // 随机生成的粒子位置 很丑 所以最后使用自定义数据渲染了
  // const widthNumber = 20 + Math.floor(Math.random() * 40);
  // const width = `${widthNumber}px`;
  // const { left, top } = positionControl();
  // const background = `linear-gradient(135deg, ${randomHexColor()}, ${randomHexColor()})`;
  // const borderRadius = `${widthNumber * 0.2}px`;
  // return {
  //   left: `${left}px`,
  //   top: `${top}px`,
  //   width,
  //   borderRadius,
  //   background,
  // };

  const { left, top, width, background } = pointStyleList[index];
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    background,
  };
};
/**
 * 根据传入值进行动态创建线性函数
 * @param xStart x起始值
 * @param xEnd x结束值
 * @param yStart y起始值
 * @param yEnd y结束值
 */
function createAnimation(
  xStart: number,
  xEnd: number,
  yStart: number,
  yEnd: number
) {
  return function (x: number) {
    if (x <= xStart) {
      return yStart;
    }
    if (x >= xEnd) {
      return yEnd;
    }
    return yStart + ((x - xStart) / (xEnd - xStart)) * (yEnd - yStart);
  };
}
/**
 * 获取list动画
 * @param scrollStart 滚动开始位置
 * @param scrollEnd 结束位置
 * @param listWidth 当前list宽度
 * @param listHeight 当前list高度
 * @param dom 单个item-dom
 */
const getListAnimation = (
  scrollStart: number,
  scrollEnd: number,
  listWidth: number,
  listHeight: number,
  dom: HTMLElement
) => {
  scrollStart += +(dom.dataset?.order || 0) * 400;
  const opacityAnimation = createAnimation(scrollStart, scrollEnd, 0, 1);
  const opacity = (scroll: number) => {
    return opacityAnimation(scroll);
  };
  const scaleAnimation = createAnimation(scrollStart, scrollEnd, 0.5, 1);
  const xOffset = listWidth / 2 - dom.offsetLeft - dom.clientWidth / 2;
  const yOffset = listHeight / 2 - dom.offsetTop - dom.clientHeight / 2;
  const xAnimation = createAnimation(scrollStart, scrollEnd, xOffset, 0);
  const yAnimation = createAnimation(scrollStart, scrollEnd, yOffset, 0);
  const transform = (scroll: number) => {
    return `translate(${xAnimation(scroll)}px,${yAnimation(
      scroll
    )}px) scale(${scaleAnimation(scroll)})`;
  };
  return {
    opacity,
    transform,
  };
};
const getPointAnimation = (scrollStart: number, scrollEnd: number) => {
  animationPoint = pointAnimation(scrollStart, scrollEnd);
};
const getLogoAnimation = (scrollStart: number, scrollEnd: number) => {
  animationLogo = logoAnimation(scrollStart, scrollEnd);
};
/**
 * 更新动画方法
 */
function updateAnimationMap() {
  if (!content.value || !list.value || !header.value) return;
  const contentRect = content.value.getBoundingClientRect();
  const scrollY = containerScroll.value?.scrollTop || 0;
  const scrollStart = contentRect.top + scrollY;
  const { height: headerHeight } = header.value?.getBoundingClientRect();
  const scrollEnd = contentRect.bottom + scrollY - headerHeight;
  // 从content位置开始 到content底部结束
  listAnimationMap(scrollStart, scrollEnd);
  // 从头开始 到content上移一个都头部度结束
  getPointAnimation(scrollStart - headerHeight, scrollEnd - headerHeight);
  // 从content开始 到content上移一个头部位置结束
  getLogoAnimation(scrollStart, scrollEnd - headerHeight);
}
function listAnimationMap(scrollStart: number, scrollEnd: number) {
  animationListMap.clear();
  if (!list.value) return;
  const { width: listWidth, height: listHeight } =
    list.value.getBoundingClientRect();
  for (let i = 0; i < itemsRef.value.length; i++) {
    const dom = itemsRef.value[i];
    animationListMap.set(
      dom,
      getListAnimation(scrollStart, scrollEnd, listWidth, listHeight, dom)
    );
  }
}
function pointAnimation(scrollStart: number, scrollEnd: number) {
  const translate3dZ = createAnimation(scrollStart, scrollEnd, 0, 500);
  const transform = (scroll: number) => {
    return `translate3d(-50%,-50%,${translate3dZ(scroll)}px)`;
  };
  return transform;
}
function logoAnimation(scrollStart: number, scrollEnd: number) {
  const translateY = createAnimation(scrollStart, scrollEnd, 50, 700);
  const scale = createAnimation(scrollStart, scrollEnd, 1, 5);
  const transform = (scroll: number) => {
    return `translate(-50%,${-translateY(scroll)}%) scale(${scale(scroll)})`;
  };
  // 为了提前看到全貌 结束为止减少2500滚动位置
  const opacity = createAnimation(scrollStart, scrollEnd - 2500, 0.4, 1);
  return { transform, opacity };
}
// 节流处理
let lastTimestamp = 0;
function updateStyles() {
  // 获取当前滚动位置
  const scrollY = containerScroll.value?.scrollTop;
  // 节流处理
  requestAnimationFrame((timestamp) => {
    // chrome 浏览器在滚动的时候都是大于16毫秒的 别的浏览器不清楚这个处理暂时保留
    if (timestamp - lastTimestamp < 16) return;
    lastTimestamp = timestamp;
    // 循环设置当前滚动路径上面的list的动画
    for (const [dom, animations] of animationListMap) {
      for (const cssProp in animations) {
        dom.style[cssProp] = animations[cssProp](scrollY);
      }
    }
    // 设置点动画
    if (pointsRef.value) {
      pointsRef.value.forEach((el) => {
        el.style.transform = animationPoint(scrollY);
      });
    }
    // 设置logo动画
    if (logo.value) {
      logo.value.style.transform = animationLogo.transform(scrollY);
      logo.value.style.opacity = animationLogo.opacity(scrollY);
    }
  });
}
onMounted(() => {
  updateAnimationMap();
  // 监听滚动
  containerScroll.value?.addEventListener("scroll", updateStyles);
  // 监听页面大小变化
  window.addEventListener("resize", () => {
    updateAnimationMap();
    updateStyles();
  });
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
