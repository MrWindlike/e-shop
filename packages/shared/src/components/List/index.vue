<template>
  <div class="v-list">
    <template v-if="list.length">
      <el-card
        v-for="card of list"
        class="v-list-card"
        shadow="hover"
        :key="card.id"
        @click.native="onCardClick(card)"
      >
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="v-list-card-image"
        >
        <div class="v-list-card-info">
          <span class="v-list-card-name">{{card.name}}</span>
          <span class="v-list-card-price">￥{{card.price}}</span>
        </div>
      </el-card>
    </template>
    <el-empty
      v-else
      description="暂无数据"
      class="v-list-empty"
    ></el-empty>
  </div>
</template>

<script>
import {
  Card,
  Empty
} from 'element-ui';

export default {
  name: 'VList',
  components: {
    ElCard: Card,
    ElEmpty: Empty
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
  },
  methods: {
    onCardClick(card) {
      this.$emit('card-click', card);
    }
  }

};
</script>

<style lang="scss" scoped>
.v-list {
  display: flex;
  flex-wrap: wrap;

  &-card {
    width: 240px;
    cursor: pointer;

    &:not(:last-of-type) {
      margin-right: 25px;
    }

    &-image {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }

    &-info {
      margin-top: 10px;
    }

    &-name {
      font-size: 16px;
      color: #333;
      margin-right: 10px;
    }

    &-price {
      font-size: 14px;
      color: #F40;
    }
  }

  &-empty {
    width: 100%;
  }
}
</style>
