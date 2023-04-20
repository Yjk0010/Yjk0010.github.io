<script setup lang="ts">
import jkLine from "/components/Line/index.vue";
import slotTsx from "./index.tsx";
</script>

<template>
  <jkLine
    style="margin-top: 20px"
    title="这就是title"
    lineStyle="dashed"
    :lineWidth="20"
  ></jkLine>
  <jkLine
    style="margin-top: 20px"
    title="这就是title"
    :position="'center'"
    lineStyle="dotted"
    color="rgb(206,46,17)"
  ></jkLine>
  <jkLine
    style="margin-top: 20px"
    title="这就是title"
    :position="'right'"
  ></jkLine>
  <jkLine
    style="margin-top: 20px"
    :title="['这就是title']"
    :position="['left', 'center']"
  ></jkLine>
  <jkLine
    style="margin-top: 20px"
    :title="['这就是title', '这就是title2', '这就是title3']"
    :position="['right', 'center', 'left']"
  ></jkLine>
  <slotTsx>
    123456
    <template #msg>
      <p>Named slot for TSX.</p>
    </template>
  </slotTsx>
</template>
