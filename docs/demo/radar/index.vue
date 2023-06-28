<template>
  <div class="demo">
    <div class="controls">
      <div class="btn-box">
        <el-button @click="add">新增</el-button>
        <el-button @click="remove">删除</el-button>
      </div>
      <div class="item" v-for="score in scores" :key="score[0]">
        <span>{{ score[0] }}：</span>
        <input type="range" min="0" :max="maxScore" v-model="score[1]" />
        <span>{{ score[1] }}</span>
      </div>
    </div>
    <PolygonScore
      :size="size"
      :maxScore="maxScore"
      :scores="scores"
    ></PolygonScore>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import PolygonScore from "./PolygonScore.vue";
import { PolygonScores } from "./PolygonScoreTypes";
const size = ref(300);
const maxScore = ref(100);
const scores = reactive<PolygonScores>([]);
for (let i = 0; i < 5; i++) {
  scores.push([`数据${i + 1}`, Math.floor(Math.random() * maxScore.value)]);
}
function add() {
  scores.push([
    `数据${scores.length + 1}`,
    Math.floor(Math.random() * maxScore.value),
  ]);
}
function remove() {
  scores.pop();
}
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
}
.controls {
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 10px;
  width: 300px;
}
.controls input {
  width: 200px;
}
.btn-box {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
