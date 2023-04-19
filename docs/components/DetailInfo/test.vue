<template>
  <jkDetailInfo
    :info="info"
    labelWidth="180px"
    :col="col"
    :infoConfig="infoConfig"
  ></jkDetailInfo>
</template>

<script setup>
import jkDetailInfo from "/components/detailInfo/index.vue";
import { ref, reactive } from "vue";
const col = ref(2);
const info = reactive({
  zbms: "主备模式",
  sbdz: "设备地址",
  yzzjdz: "预设主机地址",
  ysbjdz: "预设备机地址",
  zbdz: "组播地址",
});
const infoConfig = [
  {
    label: "主备模式",
    key: "zbms",
    row: 1,
  },
  {
    label: "设备地址",
    key: "sbdz",
    row: 1,
  },
  {
    label: "预设主机地址",
    key: "yzzjdz",
  },
  {
    label: "预设备机地址",
    key: "ysbjdz",
  },
  {
    label: "组播地址",
    key: "zbdz",
  },
];
</script>
