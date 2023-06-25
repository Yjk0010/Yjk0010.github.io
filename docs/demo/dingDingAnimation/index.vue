<template>
  <div class="container" ref="containerScroll">
    <div class="header">header</div>
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
          ></div>
        </div>
      </div>
    </div>
    <div class="footer">footer</div>
  </div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import { ref, onMounted } from "vue";
const waves = ref<HTMLElement>();
const separation = 150;
const amountX = 50;
const amountY = 50;
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

const wavesInit = () => {
  if (!waves.value) return;
  container = document.createElement("div");
  waves.value.appendChild(container);
  camera = new THREE.PerspectiveCamera(80, wavesWidth / wavesHeight, 1, 6000);
  camera.position.z = 1200;
  scene = new THREE.Scene();
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
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));
  const material: any = new THREE.ShaderMaterial({
    uniforms: {
      //设置球的颜色
      color: { value: new THREE.Color("rgb(109,215,208)") },
    },
    //控制球的大小
    vertexShader:
      "attribute float scale; void main() {vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );gl_PointSize = scale * ( 150.0 / - mvPosition.z );gl_Position = projectionMatrix * mvPosition;}",
    fragmentShader:
      "uniform vec3 color;void main() {if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;gl_FragColor = vec4( color, 1.0 );}",
  });
  // 更改类型推断
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
  wavesRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  wavesRenderer.setPixelRatio(window.devicePixelRatio);
  wavesRenderer.setSize(wavesWidth, wavesHeight);
  container.appendChild(wavesRenderer.domElement);
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
function wavesRender() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
  const positions = particles.geometry.attributes.position.array;
  const scales = particles.geometry.attributes.scale.array;
  let i = 0,
    j = 0;
  for (let ix = 0; ix < amountX; ix++) {
    for (let iy = 0; iy < amountY; iy++) {
      positions[i + 1] =
        Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
      scales[j] =
        (Math.sin((ix + count) * 0.3) + 1) * 20 +
        (Math.sin((iy + count) * 0.5) + 1) * 20;
      i += 3;
      j++;
    }
  }
  particles.geometry.attributes.position.needsUpdate = true;
  particles.geometry.attributes.scale.needsUpdate = true;
  wavesRenderer.render(scene, camera);
  count += 0.1;
}
onMounted(() => {
  if (waves.value) {
    const { width, height } = waves.value.getBoundingClientRect();
    wavesWidth = width;
    wavesHeight = height;
    wavesInit();
    wavesAnimate();
  }
});
const animationMap = new Map();
const itemsRef = ref<HTMLElement[]>([]);
function setItemsRef(el: any) {
  if (el) {
    itemsRef.value.push(el);
  }
}
const orderList = [0, 1, 2, 3, 2, 1, 0, 0, 1, 2, 3, 2, 1, 0];
const content = ref<HTMLElement>();
const list = ref<HTMLElement>();
const containerScroll = ref<HTMLElement>();

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
function updateAnimationMap() {
  animationMap.clear();
  if (!content.value || !list.value) return;
  if (itemsRef.value.length === 0) {
    return;
  }
  const playGroundRect = content.value.getBoundingClientRect();
  const scrollY = window.scrollY;
  const playGroundTop = playGroundRect.top + scrollY;
  const playGroundBottom = playGroundRect.bottom + scrollY - window.innerHeight;

  const listRect = list.value.getBoundingClientRect();
  for (let i = 0; i < itemsRef.value.length; i++) {
    const item = itemsRef.value[i];
    const scrollStart = playGroundTop + Number(item.dataset.order) * 600;
    const scrollEnd = playGroundBottom;
    const itemWidth = item.clientWidth;
    const itemHeight = item.clientHeight;
    const itemLeft = item.offsetLeft;
    const itemTop = item.offsetTop;
    const opacityAnimation = createAnimation(scrollStart, scrollEnd, 0, 1);
    const scaleAnimation = createAnimation(scrollStart, scrollEnd, 0.5, 1);
    const translateXAnimation = createAnimation(
      scrollStart,
      scrollEnd,
      listRect.width / 2 - itemLeft - itemWidth / 2,
      0
    );
    const translateYAnimation = createAnimation(
      scrollStart,
      scrollEnd,
      listRect.height / 2 - itemTop - itemHeight / 2,
      0
    );
    const animations = {
      opacity: function (scrollY: number) {
        return opacityAnimation(scrollY);
      },
      transform: function (scrollY: number) {
        const scaled = scaleAnimation(scrollY);
        const x = translateXAnimation(scrollY);
        const y = translateYAnimation(scrollY);
        return `translate(${x}px, ${y}px) scale(${scaled})`;
      },
    };
    animationMap.set(item, animations);
  }
}
function updateStyles() {
  const scrollY = containerScroll.value?.scrollTop;
  for (const [item, animations] of animationMap) {
    for (const prop in animations) {
      item.style[prop] = animations[prop](scrollY);
    }
  }
}
onMounted(() => {
  updateStyles();
  containerScroll.value?.addEventListener("scroll", updateStyles);
  updateAnimationMap();
  window.addEventListener("resize", () => {
    updateAnimationMap();
    updateStyles();
  });
});
</script>

<style lang="scss" scoped>
.container {
  height: 400px;
  overflow-y: auto;
  .header,
  .footer {
    position: relative;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4em;
  }
  .content {
    position: relative;
    height: 4000px;
    .waves {
      position: absolute;
      bottom: -100px;
      width: 100%;
      height: 400px;
    }
    .animation-container {
      position: sticky;
      height: 400px;
      top: 0;
      .list {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        aspect-ratio: 2/1;
        border-radius: 10px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(2, 1fr);
        place-items: center;
      }
      .list-item {
        width: 60%;
        aspect-ratio: 1/1;
        background: #fff;
        border-radius: 10px;
        &:nth-child(3n + 1) {
          background: linear-gradient(#3e90f7, #246bf6);
        }
        &:nth-child(3n + 2) {
          background: linear-gradient(#53b655, #469c50);
        }
        &:nth-child(3n + 3) {
          background: linear-gradient(#f3a93c, #f4ad3d);
        }
      }
    }
  }
  .header {
    background-color: rgb(206, 144, 144);
  }
  .content {
    background-color: rgb(29, 26, 32);
  }
  .footer {
    background-color: rgb(91, 155, 125);
  }
}
</style>
