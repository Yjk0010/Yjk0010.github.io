<template>
  <PicViewer title="import.meta.glob 引入" :src="importMetaGlob[`./assets/scenery-5.jpg`]"></PicViewer>
</template>

<script lang="ts" setup>
import PicViewer from "./index.vue";
// import.meta.glob 引入
const importMetaGlob: Record<string, string> = import.meta.glob(
  ["./assets/scenery-5.jpg"],
  {
    eager: true,
    import: "default",
  }
);
</script>
