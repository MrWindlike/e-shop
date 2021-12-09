<template>
  <div
    class="v-list"
  >
    <div
      v-infinite-scroll="load"
      v-if="list.length"
      class="v-list-container"
    >
      <el-card
        v-for="card of list"
        class="v-list-card"
        shadow="hover"
        :key="card.id"
        @click.native="onCardClick(card)"
      >
        <img
          :src="card.image"
          class="v-list-card-image"
        >
        <div class="v-list-card-info">
          <span class="v-list-card-name">{{card.name}}</span>
          <span class="v-list-card-price">￥{{card.price}}</span>
        </div>
      </el-card>
    </div>
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
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    reset() {
      this.page = 1;
    },
    onCardClick(card) {
      this.$emit('card-click', card);
    },
    load() {
      if ((this.page + 1) * this.pageSize <= this.total) {
        this.$emit('load', ++this.page);
      }
    }
  }

};
</script>

<style lang="scss" scoped>
.v-list {
  height: 100%;

  &-container {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
  }

  &-card {
    width: calc(20% - 25px);
    min-width: 240px;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;

    &-image {
      display: block;
      margin: auto;
      width: 200px;
      height: 200px;
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
