<template>
  <div class="container">
    <div class="input">
      <div class="input-title">
        <div>颗粒度</div>
        <el-input style="width: 300px;" v-model="step" readonly>
          <template #prepend>
            <el-icon class="pointer" size="24" @click="stepMin">
              <i-ep-Remove />
            </el-icon>
          </template>
          <template #append>
            <el-icon class="pointer" size="24" @click="stepMax">
              <i-ep-CirclePlus />
            </el-icon>
          </template>
        </el-input>
      </div>
      <br />
      <div>金额</div>
      <el-input-number :step="step" :min="0" style="width: 240px" v-model="number"></el-input-number>
    </div>
    <div class="view">
      <TText type="warning">你现在有</TText>
      <span>{{ formatMoney }}</span>
      <br />
      <TText type="success">假如一度电是1块钱，你</TText>
      <br />
      <TText type="warning">{{ bigStringMoney }}</TText>
      <br />
      <TText>能购买</TText>
      <br />
      <TText type="danger">{{ bigStringKWh }}</TText>
      <br />
      <TText>的电</TText>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const step = ref(100);
const stepMin = () => {
  step.value = Math.max(+(step.value * 0.1).toFixed(3), 0.001);
};
const stepMax = () => {
  step.value = Math.min(step.value * 10, 1000000000000000);
};
const number = ref(19940413.73);
const bigStringMoney = computed(() => {
  return numberToBigChineseString(number.value);
});
const bigStringKWh = computed(() => {
  return numberToBigChineseString(number.value, {
    isMoney: false,
    def: "数字超限",
    suffix: "千瓦时",
  });
});
const formatMoney = computed(() => {
  return number.value.toLocaleString("zh", {
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
    style: "currency",
    currency: "CNY",
  });
});

interface configData {
  chars: string[];
  bigUnits: string[];
  units: string[];
  smallUnits: string[];
  suffixIntMoney: string;
  suffixIntMoneySuffix: string;
  point: string;
  zero: string;
}
interface configDefault {
  isMoney?: boolean;
  def?: string;
  suffix?: string;
}
const configData: configData = {
  chars: ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"],
  bigUnits: ["", "万", "亿", "兆"],
  units: ["", "拾", "佰", "仟"],
  smallUnits: ["角", "分", "厘"],
  suffixIntMoney: "元",
  suffixIntMoneySuffix: "整",
  point: "点",
  zero: "零",
};
const configDefault: configDefault = {
  isMoney: true,
  def: "--",
  suffix: "",
};
/**
 * 判断是否是整数
 * @param num 数字
 */
const isDecimal = (num: number): boolean => {
  return Number.isInteger(num);
};
/**
 * 判断是否是一个安全的数字
 * @param num 数字
 */
const isSafeNumber = (num: number): boolean => {
  if (isDecimal(num)) {
    return Number.isSafeInteger(num);
  } else {
    return Number.isFinite(num);
  }
};
/**
 * 将四位以内的数字转换成中文。
 *
 * @param {string} numStr - 四位以内的数字字符串
 * @returns {string} 转换后的中文字符串
 */
const convertDigitsToChinese = (numStr: string): string => {
  let resultStr = "";
  for (let i = 0; i < numStr.length; i++) {
    const digit = +numStr[i];
    const c = configData.chars[digit];
    const u = configData.units[numStr.length - 1 - i];
    if (digit === 0) {
      // 如果当前数字为 0，则只在最后一位添加零的占位符
      if (resultStr[resultStr.length - 1] !== configData.zero) {
        resultStr += c;
      }
    } else {
      // 否则将当前数字转换成对应的中文，然后添加单位
      resultStr += c + u;
    }
  }
  // 如果最后一位是零，则去掉这个零的占位符
  if (resultStr[resultStr.length - 1] === configData.zero) {
    resultStr = resultStr.slice(0, -1);
  }
  // 返回转换后的中文字符串
  return resultStr;
};

/**
 * 将数字转换成大写的中文字符串。
 *
 * @param {number} num - 数字
 * @param {object} [obj={}] - 配置对象，可选
 * @param {boolean} [obj.isMoney=true] - 是否转换成货币格式，可选，默认为 true
 * @param {string} [obj.suffix=''] - 后缀，可选，默认为空字符串
 * @param {string} [obj.def=''] - 默认字符串，可选，默认为空字符串
 * @returns {string} 转换后的中文字符串
 */
const numberToBigChineseString = (
  num: number,
  obj: configDefault = {}
): string => {
  // 合并默认配置和传入的配置
  const configDef = { ...configDefault, ...obj };
  // 如果 num 不是安全的数字，则返回默认字符串
  if (!isSafeNumber(num)) return `${configDef.def}`;
  // 将数字转换为字符串，分离出整数部分和小数部分
  const str = num.toString();
  const [intStr, decimalStr] = str.split(".");
  // 将整数部分分割成每 4 位一个数组，然后遍历数组进行转换
  const intStrArr = intStr
    .replace(/(?=(\d{4})+$)/g, ",")
    .split(",")
    .filter(Boolean);
  let result = intStrArr.reduce((pre, cur, index) => {
    // 将当前的 4 位数字转换成中文
    const c = convertDigitsToChinese(cur);
    // 将转换后的中文和对应的单位拼接起来
    return (
      pre + c + (c ? configData.bigUnits[intStrArr.length - 1 - index] : "")
    );
  }, "");
  // 如果需要转换成货币格式，则添加整数部分的后缀
  if (result) {
    result += configDef.isMoney ? configData.suffixIntMoney : "";
  } else {
    // 如果整数部分为空，则根据需求添加零的占位符或者整数部分的后缀
    result = configDef.isMoney ? `` : `${configData.zero}`;
  }
  // 如果有小数部分，进行转换
  if (decimalStr) {
    result = configData.smallUnits.reduce((pre, cur, index) => {
      // 将小数部分的每一位转换成中文，并拼接上对应的单位
      const value = +decimalStr[index];
      return (
        pre +
        (Number.isNaN(value)
          ? ""
          : value
            ? `${configData.chars[value]}${configDef.isMoney ? cur : ""}`
            : configDef.isMoney
              ? ""
              : configData.zero)
      );
    }, result + (configDef.isMoney ? `` : configData.point));
  } else {
    // 如果没有小数部分，则根据需求添加整数部分的后缀或者空字符串
    result += result
      ? configDef.isMoney
        ? configData.suffixIntMoneySuffix
        : ``
      : ``;
  }
  // 添加后缀，如果不需要后缀，则添加空字符串
  result += configDef.isMoney ? "" : configDef.suffix;
  // 如果最终的结果为空，则返回零
  return result || configData.zero;
};
</script>

<style lang="scss" scoped>
.container {
  span {
    line-height: 32px;
    margin-right: 12px;
  }

  .input,
  .view {
    margin-top: 20px;
  }

  .input-title {
    align-items: center;
  }
}
</style>
