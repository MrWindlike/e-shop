<template>
  <div class="v-list">
    <el-card
      v-for="card of list"
      class="v-list-card"
      :key="card.id"
    >
      <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="v-list-card-image"
      >
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time">time</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  Card,
  Button,
} from 'element-ui';

export default {
  name: 'VList',
  components: {
    ElCard: Card,
    ElButton: Button,
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
  }

};
</script>

<style lang="scss" scoped>
.v-list {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;

  &-card {
    width: 240px;

    &:not(:last-of-type) {
      margin-right: 25px;
    }

    &-image {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }
}
</style>
