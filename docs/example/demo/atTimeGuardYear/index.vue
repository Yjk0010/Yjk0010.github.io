<template>
  <div class="atTimeGuardYear">
    <div class="buttons">
      <el-button type="warning" @click="restart" :disabled="isLoading">
        重新开始
      </el-button>
    </div>
    <div class="buttons">
      <el-button type="primary" @click="handlePrev" :disabled="!ctx.hasPrev || isLoading">
        上一步
      </el-button>
      <el-button type="primary" @click="handleNext" :disabled="!ctx.hasNext || isLoading">
        下一步
      </el-button>
    </div>
    <div class="option"></div>
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
import type { ElMessageBoxOptions } from "element-plus"
import CardDesk from './CardDesk.vue';
import { h, reactive, ref } from 'vue';
import { InteractiveDescriptor, StageContext } from './stages';
let ctx = reactive(new StageContext(500));
const isLoading = ref(false);
play();
async function play() {
  if (isLoading.value) return;
  isLoading.value = true;
  const desc = ctx.getInteractiveDescriptor();
  if (desc.type === 'none') {
    const opt = desc.getOptions();
    await ctx.play(opt);
  } else {
    const opt = await confirm(desc);
    await ctx.play(opt);
  }
  isLoading.value = false;
}
function handleNext() {
  ctx.next();
  play();
}

function handlePrev() {
  ctx.undo();
  ctx.prev();
}

const optionValue = ref(0);
const payload = reactive({});

async function confirm(desc: InteractiveDescriptor) {
  return new Promise(async (resolve) => {
    const v = ref<number>();
    const options: ElMessageBoxOptions = {
      title: desc.title,
      confirmButtonText: '确定',
      showClose: false,
      center: true,
      closeOnClickModal: false,
    };
    if (desc.type === 'number') {
      v.value = desc.payload.defaultValue;
      options.message = () =>
        h(ElInputNumber, {
          modelValue: v.value,
          min: desc.payload.min,
          max: desc.payload.max,
          step: 1,
          stepStrictly: true,
          valueOnClear: desc.payload.defaultValue,
          'onUpdate:modelValue': (cur) => {
            if (cur === undefined || cur === null) return;
            v.value = cur!;
          },
        });
    } else if (desc.type === 'radio') {
      v.value = desc.payload.defaultValue;
      options.message = () =>
        h(
          ElRadioGroup,
          {
            modelValue: v.value,
            'onUpdate:modelValue': (cur) => {
              v.value = +cur;
            },
          },
          () => desc.payload.options.map((option: any) =>
            h(
              ElRadioButton,
              {
                label: option.value,
                border: true,
              },
              () => option.label
            )
          )
        );
    }
    await ElMessageBox(options);
    resolve(desc.getOptions(v.value));
  });
}

const restart = () => {
  ElMessageBox.confirm('确定重新开始？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true,
  }).then(() => {
    ctx = reactive(new StageContext(500));
    play();
  });
}
</script>

<style lang="scss" scoped>
.atTimeGuardYear {
  .buttons {
    display: flex;
    justify-content: space-around;
    margin-bottom: 16px;
  }

  .title {
    color: #fff;
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
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>