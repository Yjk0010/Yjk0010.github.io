<template>
  <div class="festivalCountdown"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
const props = withDefaults(defineProps<{}>(), {});
const thisYear = new Date().getFullYear();
onMounted(() => {
  fetch(
    `https://www.mxnzp.com/api/holiday/list/year/${thisYear}/festival?app_id=xjrlpumueaxukyov&app_secret=Q2FoMFNub0FndmtJUGRUUElIWTRLQT09`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((res) => {
      const { code, data } = res || {};
    });
});
</script>

<style lang="scss" scoped>
.festivalCountdown {
  display: flex;
}
</style>
