<template>
  <div class="atTimeGuardYear">
    <div class="buttons">
      <el-popover :visible="restartShow" placement="top" :width="280" trigger="click">
        <p>要重新开始魔术?</p>
        <div style="text-align: right">
          <el-button size="small" @click="restartShow = false">取消</el-button>
          <el-button size="small" type="primary" @click="restart">确定</el-button>
        </div>
        <template #reference>
          <el-button type="warning" @click="restartShow = true" :disabled="hasDoIt">
            重新开始
          </el-button>
        </template>
      </el-popover>
    </div>
    <div class="buttons">
      <el-button type="primary" @click="handlePrev" :disabled="!ctx.hasPrev || hasDoIt">
        上一步
      </el-button>
      <el-button type="primary" @click="handleNext" :disabled="!ctx.hasNext || hasDoIt">
        下一步
      </el-button>
    </div>
    <div class="operation">
      <div style="text-align: center" v-html="operationDescriptor?.title"></div>
      <div v-html="operationDescriptor?.getDesc"></div>

      <template v-if="operationDescriptor?.type !== 'none'">
        <template v-if="operationDescriptor?.type === 'radio'">
          <el-radio-group v-model="operationValue" v-if="!operationDescriptor.isDoIt">
            <el-radio-button v-for="item in operationDescriptor.payload.options" :label="item.value"
              :key="item.label">{{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </template>

        <template v-else-if="operationDescriptor?.type === 'number'">
          <template v-if="!operationDescriptor.isDoIt">
            <el-input-number :max="operationDescriptor?.payload.max" :min="operationDescriptor?.payload.min"
              v-model="operationValue">
            </el-input-number>
          </template>
        </template>
        <el-button v-if="!operationDescriptor?.isDoIt" type="success" :disabled="!hasDoIt" @click="doIt">
          Just Do It!
        </el-button>
      </template>
    </div>
    <h1 class="title">
      {{ ctx.currentIndex + 1 }} / {{ ctx.stages.length }}
      {{ ctx.currentStage.name }}
    </h1>
    <div class="desk">
      <CardDesk v-bind="ctx.desk"></CardDesk>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "atTimeGuardYear",
});
import CardDesk from "./CardDesk.vue";
import { reactive, ref, computed } from "vue";
import { InteractiveDescriptor, StageContext } from "./stages";
// 创建执行环境
let ctx = reactive(new StageContext(500));
const isLoading = ref(false);
// 中间操作值
const operationValue = ref(0);
// 操作默认状态
const operationDescriptor = ref<InteractiveDescriptor>({
  type: "none",
  title: "",
  payload: null,
  getOperation: () => void 0,
  isDoIt: false,
});
// 用于接收 Generator 的返回值
const opt = ref();
// 重新开始的弹窗
const restartShow = ref(false);
// 执型方法
const play = async () => {
  restartShow.value = false;
  if (isLoading.value) return;
  operationDescriptor.value = ctx.getInteractiveDescriptor();
  if (operationDescriptor.value.type === "none") {
    // 无交互操作
    isLoading.value = true;
    opt.value = operationDescriptor.value.getOperation();
    await ctx.play(opt.value);
    isLoading.value = false;
  } else {
    // 有交互操作
    if (operationDescriptor.value.isDoIt) {
      // 已经交互过
      await ctx.play();
    } else {
      // 未交互
      isLoading.value = true;
      opt.value = operationDescriptor.value.getOperation();
      operationValue.value = operationDescriptor.value.payload.defaultValue;
      // Generator 状态值
      opt.value.next();
    }
  }
};
play();
// 执行交互操作
const doIt = async () => {
  await ctx.play(opt.value.next(operationValue.value).value);
  isLoading.value = false;
};
// 下一步
const handleNext = async () => {
  ctx.next();
  play();
};
// 上一步
const handlePrev = () => {
  ctx.undo();
  ctx.prev();
  operationDescriptor.value = ctx.getInteractiveDescriptor();
  opt.value = operationDescriptor.value.getOperation();
};
// 重新开始
const restart = () => {
  ctx = reactive(new StageContext(500));
  play();
};
// 是否可以交互
const hasDoIt = computed(() => {
  return (
    isLoading.value ||
    (ctx.hasGetInteractiveDescriptor()
      ? false
      : !operationDescriptor.value.isDoIt)
  );
});
</script>

<style lang="scss" scoped>
.atTimeGuardYear {
  .buttons {
    display: flex;
    justify-content: space-around;
    margin-bottom: 16px;
  }

  .title {
    text-align: center;
    margin-top: 30px;
  }

  .desk {
    width: 100%;
    height: 200px;
    margin: 0 auto;
    /* background: lightblue; */
    margin-top: 50px;
  }

  .operation {
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &>* {
      margin-top: 10px;
    }
  }
}
</style>
