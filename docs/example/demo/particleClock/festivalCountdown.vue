<template>
  <div class="festivalCountdown">
    <div class="title cor-tip" v-if="nowFestivalText">
      现在正在 <TText type="danger">{{ nowFestivalText }}</TText> 小长假中
    </div>
    <div class="title cor-tip">
      距离下一个小长假 <TText type="danger">{{ festivalText }}</TText> 还有
    </div>
    <div class="show-clock" v-loading="loading">
      <div class="day">
        <flipCard :total="9" :current="diffDayList[0]" countdown></flipCard>
        <flipCard :total="9" :current="diffDayList[1]" countdown></flipCard>
        <flipCard :total="9" :current="diffDayList[2]" countdown></flipCard>
      </div>
      <div class="time-text">天</div>
      <div class="clock">
        <flipCard :total="2" :current="diffTimeList[0]" countdown></flipCard>
        <flipCard :total="9" :current="diffTimeList[1]" countdown></flipCard>
        <div class="time-text">:</div>
        <flipCard :total="5" :current="diffTimeList[2]" countdown></flipCard>
        <flipCard :total="9" :current="diffTimeList[3]" countdown></flipCard>
        <div class="time-text">:</div>
        <flipCard :total="5" :current="diffTimeList[4]" countdown></flipCard>
        <flipCard :total="9" :current="diffTimeList[5]" countdown></flipCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import flipCard from "./flipCard.vue";
import { getFestival } from "docs/api/mxnzp.ts";
import { diffDate } from "docs/utils/index.ts";
import { ref, onMounted, onUnmounted } from "vue";
const festivalText = ref("");
const nowFestivalText = ref("");
const loading = ref(false);
const diffDayList = ref([0, 0, 0]);
const diffTimeList = ref([0, 0, 0, 0, 0, 0]);
let onLineTime = 0;
const getRecentlyFestival = () => {
  loading.value = true;
  const nowDate = new Date();
  getFestival(nowDate.getFullYear())
    .then((data: any) => {
      const festivalList = data
        .reduce((prev: any, month: any) => {
          return [...prev, ...month.days];
        }, [])
        .filter((item: any) => {
          return diffDate(nowDate, new Date(item.date)).days <= 0;
        });
      let endDate;
      if (festivalList.length === 0) {
        endDate = new Date(`${nowDate.getFullYear() + 1}-01-01`);
        festivalText.value = "元旦";
      } else {
        const firstFestival = festivalList[0];
        if (diffDate(nowDate, new Date(firstFestival.date)).days === 0) {
          const nowDes = firstFestival.typeDes;
          nowFestivalText.value = nowDes;
          for (let index = 1; index < festivalList.length; index++) {
            const element = festivalList[index];
            if (element.typeDes !== nowDes) {
              endDate = new Date(element.date);
              festivalText.value = element.typeDes;
              break;
            }
          }
          if (!endDate) {
            endDate = new Date(`${nowDate.getFullYear() + 1}-01-01`);
            festivalText.value = "元旦";
          }
        } else {
          endDate = new Date(firstFestival.date);
          festivalText.value = firstFestival.typeDes;
        }
      }
      const diffDay = Math.abs(diffDate(nowDate, endDate).days) - 1;
      const diffDayStr = diffDay.toString();
      let diffDayStrLength = diffDayStr.length;
      for (let len = 3; len--;) {
        diffDayList.value[len] = +diffDayStr[--diffDayStrLength] || 0;
      }
    })
    .catch(() => {
      onLineTime++;
      if (onLineTime < 4) {
        setTimeout(getRecentlyFestival, 1000);
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
const formatTime = (time: number) => {
  return time
    .toString()
    .padStart(2, "0")
    .split("")
    .map((x) => +x);
};

const getTimeToEndDay = () => {
  const now = new Date();
  const endDay =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59
    ).getTime() + 1000;
  const diffDay = endDay - now.getTime();
  const S = formatTime(Math.floor((diffDay / 1000) % 60));
  const M = formatTime(Math.floor((diffDay / 1000 / 60) % 60));
  const H = formatTime(Math.floor(diffDay / 1000 / 60 / 60));
  diffTimeList.value = [...H, ...M, ...S];
};

let clock: NodeJS.Timeout;
onMounted(() => {
  getRecentlyFestival();
  clearInterval(clock);
  clock = setInterval(() => {
    getTimeToEndDay();
  }, 1000);
});
onUnmounted(() => {
  clearInterval(clock);
});
</script>

<style lang="scss" scoped>
.festivalCountdown {

  .show-clock,
  .day,
  .clock {
    display: flex;
    align-items: center;
    font-size: 32px;
  }
}
</style>
