<template>
  <div class="atTimeGuardYear">
    <div class="buttons">
      <el-popover :visible="restartShow" placement="top" :width="280" trigger="click">
        <p>要重新开始魔术?</p>
        <div style="text-align: right;">
          <el-button size="small" text @click="restartShow = false">取消</el-button>
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
    <div class="option">
      <div style="text-align: center;" v-html="optionDescriptor?.title"></div>
      <div>{{ optionDescriptor?.getDesc }}</div>

      <template v-if="optionDescriptor?.type !== 'none'">
        <template v-if="optionDescriptor?.type === 'radio'">
          <el-radio-group v-model="optionValue" v-if="!optionDescriptor.isDoIt">
            <el-radio-button v-for="item in optionDescriptor.payload.options" :label="item.value" :key="item.label">{{
        item.label }}</el-radio-button>
          </el-radio-group>
        </template>

        <template v-else-if="optionDescriptor?.type === 'number'">
          <template v-if="!optionDescriptor.isDoIt">
            <el-input-number :max="optionDescriptor?.payload.max" v-model="optionValue"></el-input-number>
          </template>
        </template>
        <el-button v-if="!optionDescriptor?.isDoIt" type="success" :disabled="!hasDoIt" @click="doIt">Do
          It!</el-button>
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
  name: 'atTimeGuardYear'
})
import CardDesk from './CardDesk.vue';
import { reactive, ref, computed } from 'vue';
import { InteractiveDescriptor, StageContext } from './stages';
let ctx = reactive(new StageContext(500));
const isLoading = ref(false);
const optionValue = ref(0);
const optionDescriptor = ref<InteractiveDescriptor>({
  type: 'none',
  title: '',
  payload: null,
  getOptions: () => void 0,
  isDoIt: false
});
const opt = ref();
const restartShow = ref(false)
const play = async () => {
  console.log(ctx);

  restartShow.value = false;
  if (isLoading.value) return;
  optionDescriptor.value = ctx.getInteractiveDescriptor();
  if (optionDescriptor.value.type === 'none') {
    isLoading.value = true;
    opt.value = optionDescriptor.value.getOptions();
    await ctx.play(opt.value);
    isLoading.value = false;
  } else {
    if (!optionDescriptor.value.isDoIt) {
      isLoading.value = true
    }
    opt.value = optionDescriptor.value.getOptions();
    optionValue.value = optionDescriptor.value.payload.defaultValue
    opt.value.next()
  }
}
play();
const doIt = async () => {
  await ctx.play(opt.value.next(optionValue.value).value)
  isLoading.value = false;
}
const handleNext = async () => {
  ctx.next();
  play();
}

const handlePrev = () => {
  ctx.undo();
  ctx.prev();
  optionDescriptor.value = ctx.getInteractiveDescriptor();
  opt.value = optionDescriptor.value.getOptions();
}

const restart = () => {
  ctx = reactive(new StageContext(500));
  play();
}

const hasDoIt = computed(() => {
  return isLoading.value || (ctx.hasGetInteractiveDescriptor() ? false : !optionDescriptor.value.isDoIt)
})
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
    margin: 50px auto;
  }

  .desk {
    width: 100%;
    height: 200px;
    margin: 0 auto;
    /* background: lightblue; */
    margin-top: 50px;
  }

  .option {
    height: 80px;
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