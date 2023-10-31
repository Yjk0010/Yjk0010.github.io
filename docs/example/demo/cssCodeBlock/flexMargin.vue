<template>
  <div class="flexMargin">
    <div>左右分部</div>
    <div class="container demo1">
      <div class="item" v-for="item in 5" :key="item">{{ item }}</div>
    </div>
    <div>3号居中</div>
    <div class="container demo2">
      <div class="item" v-for="item in 5" :key="item">{{ item }}</div>
    </div>
    <div>34号居中</div>
    <div class="container demo3">
      <div class="item" v-for="item in 5" :key="item">{{ item }}</div>
    </div>
    <div>全离散</div>
    <div class="container demo4">
      <div class="item" v-for="item in 5" :key="item">{{ item }}</div>
    </div>
    <div>换行离散</div>
    <div class="container demo5">
      <div class="item" v-for="item in 13" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flexMargin {
  width: 100%;
  --itemWidth: 50px;
  .container {
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    .item {
      width: var(--itemWidth);
      height: var(--itemWidth);
      background-color: cadetblue;
      line-height: 50px;
      text-align: center;
      &:nth-child(3n + 1) {
        background-color: chocolate;
      }
      &:nth-child(3n + 2) {
        background-color: cadetblue;
      }
      &:nth-child(3n + 3) {
        background-color: blueviolet;
      }
    }
  }
  .demo1 {
    .item:nth-child(4) {
      margin-left: auto;
    }
  }
  .demo2 {
    .item:nth-child(3) {
      margin: auto;
    }
  }
  .demo3 {
    .item:nth-child(3) {
      margin-left: auto;
    }
    .item:nth-child(4) {
      margin-right: auto;
    }
  }
  .demo4 {
    .item {
      margin: auto;
    }
  }
  .demo5 {
    flex-wrap: wrap;
    --n: 5;
    .item {
      margin: 4px calc((100% - var(--n) * var(--itemWidth)) / (var(--n) * 2));
    }
  }
}
</style>
