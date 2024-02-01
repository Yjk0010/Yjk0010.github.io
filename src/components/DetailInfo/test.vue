<template>
  <el-badge :value="+isShow">
    <el-button type="default" @click="handleIsShow">{{
      isShow ? "show is show" : "show is hide"
    }}</el-button>
  </el-badge>
  <DetailInfo :info="info" labelWidth="180px" :col="col" :infoConfig="infoConfig">
    <template #slotName="{ value, item, info }">
      <span>{{ value }}</span>
    </template>
  </DetailInfo>
</template>

<script setup lang="ts">
import DetailInfo from "./index.vue";
import { ref, reactive } from "vue";
import type { infoConfigItem } from "docs/types";
const col = ref(2);
const isShow = ref(true);
const info = reactive({
  colon: "是否展示引号",
  labelWidth: "展示的title宽度",
  col: "全局在行中显示的列数 默认为3",
  infoConfig: "数组 内部是每个item的参数",
  info: "展示的内容对象",
  key: "当前读取的属性",
  label: "展示的title",
  type: "现在有两种类型 一种是 line 一种是 item",
  show: "控制展示 一种是 boolean 一种是函数",
  customRender: "自定义渲染函数 参数返回为 (当前值,传入的item,传入的info) ",
  labelCustomRender:
    "label自定义渲染函数 参数返回为 (当前值,传入的item,传入的info) ",
  slotName: "插槽名字 可以通过slot渲染",
  wrap: "结果是否可以换行 默认不换行",
  ellipsis: "是否对value 进行title提示",
  position: "type为line的时候label的显示位置 默认为左边",
  itemCol: "当前属性的在行中显示的列数 默认为 全局 col",
});
const infoConfig: Array<infoConfigItem> = [
  {
    label: "props介绍",
    key: "props",
    type: "line",
    position: "center",
  },
  {
    label: "info",
    key: "info",
  },
  {
    label: "col",
    key: "col",
    col: 1,
  },
  {
    label: "labelWidth",
    key: "labelWidth",
  },
  {
    label: "colon",
    key: "colon",
  },
  {
    label: "infoConfig",
    key: "infoConfig",
    col: 1,
  },
  {
    label: "infoConfig介绍",
    key: "infoConfig介绍",
    type: "line",
    position: "center",
  },
  {
    label: "key",
    key: "key",
  },
  {
    label: "label",
    key: "label",
  },
  {
    label: "type",
    key: "type",
    col: 1,
  },
  {
    label: "show",
    key: "show",
    show: (value: any, item: infoConfigItem, info: any) => {
      return isShow.value;
    },
    col: 1,
  },
  {
    label: "customRender",
    key: "customRender",
    customRender: (value: any, item: infoConfigItem, info: any) => {
      return info[item[`key`]];
    },
    col: 1,
  },
  {
    label: "labelCustomRender",
    key: "labelCustomRender",
    labelCustomRender: (
      label: string,
      value: any,
      item: infoConfigItem,
      info: any
    ) => {
      return label;
    },
    ellipsis: true,
    col: 1,
  },
  {
    label: "slotName",
    key: "slotName",
    ellipsis: true,
    slotName: "slotName",
    col: 1,
  },
  {
    label: "wrap",
    key: "wrap",
    wrap: true,
  },
  {
    label: "ellipsis",
    key: "ellipsis",
    ellipsis: true,
  },
  {
    label: "position",
    key: "position",
    ellipsis: true,
    col: 1,
  },
  {
    label: "col",
    key: "itemCol",
    col: 1,
  },
];
const handleIsShow = () => {
  isShow.value = !isShow.value;
};
</script>
