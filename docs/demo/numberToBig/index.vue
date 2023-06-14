<template>
  <el-input-number style="width: 240px" v-model="number"> </el-input-number>
  <div>
    {{ bigString }}
  </div>
  <div>
    {{ bigString2 }}
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const number = ref(0);
const bigString = computed(() => {
  return toChineseNumber(number.value);
});
const bigString2 = computed(() => {
  return toChineseNumber2(number.value);
});
function toChineseNumber(num: number) {
  // 1234 1234
  const strs = num
    .toString()
    .replace(/(?=(\d{4})+$)/g, ",")
    .split(",")
    .filter(Boolean);
  const chars = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const units = ["", "十", "百", "千"];
  const bigUnits = ["", "万", "亿"];
  function _transform(numStr: string) {
    let result = "";
    for (let i = 0; i < numStr.length; i++) {
      const digit = +numStr[i];
      const c = chars[digit];
      const u = units[numStr.length - 1 - i];
      if (digit === 0) {
        if (result[result.length - 1] !== chars[0]) {
          result += c;
        }
      } else {
        result += c + u;
      }
    }
    if (result[result.length - 1] === chars[0]) {
      result = result.slice(0, -1);
    }
    return result;
  }
  let result = "";
  for (let i = 0; i < strs.length; i++) {
    const part = strs[i];
    const c = _transform(part);
    const u = c ? bigUnits[strs.length - 1 - i] : "";
    result += c + u;
  }
  return result;
}
function toChineseNumber2(num: number) {
  // 1234 1234
  const strs = num
    .toString()
    .replace(/(?=(\d{4})+$)/g, ",")
    .split(",")
    .filter(Boolean);
  const chars = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const units = ["", "十", "百", "千"];
  const bigUnits = ["", "万", "亿"];
  function _transform(numStr: string) {
    let result = "";
    for (let i = 0; i < numStr.length; i++) {
      const digit = +numStr[i];
      const c = chars[digit];
      const u = units[numStr.length - 1 - i];
      if (digit === 0) {
        if (result[result.length - 1] !== chars[0]) {
          result += c;
        }
      } else {
        result += c + u;
      }
    }
    if (result[result.length - 1] === chars[0]) {
      result = result.slice(0, -1);
    }
    return result;
  }
  let result = "";
  for (let i = 0; i < strs.length; i++) {
    const part = strs[i];
    const c = _transform(part);
    const u = c ? bigUnits[strs.length - 1 - i] : "";
    result += c + u;
  }
  return result;
}
</script>

<style lang="scss" scoped></style>
