<script setup lang="ts">
import Line from "./Line.vue";
import LineTsx from "./index.tsx";
</script>

<template>
  <Line style="margin-top: 20px" title="这就是title" lineStyle="dashed" :lineWidth="5"></Line>
  <Line style="margin-top: 20px" title="这就是title" :position="'center'" lineStyle="dotted" color="rgb(206, 46, 17)"></Line>
  <Line style="margin-top: 20px" title="这就是title" :position="'right'"></Line>
  <Line style="margin-top: 20px" :title="['这就是title']" :position="['left', 'center']"></Line>
  <Line style="margin-top: 20px" :title="['这就是title', '这就是title2', '这就是title3']" :position="['right', 'center', 'left']">
  </Line>
  <LineTsx style="margin-top: 20px" title="这就是title" lineStyle="dashed" :lineWidth="2" :color="`rgb(206, 46, 17)`"
    position="center">
  </LineTsx>
</template>
