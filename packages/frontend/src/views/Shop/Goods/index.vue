<template>
  <div class="goods-page">
    <el-input
      v-model="search"
      class="goods-page-search"
      prefix-icon="el-icon-search"
      size="small"
      placeholder="搜索商品"
      @change="onSearch"
    />
    <v-promised
      :promise="promise"
    >
      <template v-slot:pending>
        <div v-loading />
      </template>
      <template v-slot="data">
        <div class="goods-page-container">
          <v-list
            ref="list"
            class="goods-page-list"
            :list="goods"
            :total="data.total"
            @card-click="onCardClick"
          />
        </div>
      </template>
      <template v-slot:rejected>
        <el-result
          icon="error"
          title="错误提示"
          sub-title="获取商品列表失败"
        >
          <template slot="extra">
            <el-button
              type="primary"
              size="medium"
              @click="fetchList"
            >
              重新获取
            </el-button>
          </template>
        </el-result>
      </template>
    </v-promised>
  </div>
</template>

<script>
import {
  mapActions,
} from 'vuex';

export default {
  name: 'GoodsPage',
  data() {
    return {
      promise: null,
      search: '',
      goods: [],
    };
  },
  methods: {
    ...mapActions('good', [
      'fetchGoods',
    ]),
    async fetchList({ page }) {
      this.promise = this.fetchGoods({
        page,
        name: this.search,
      });

      const { list } = await this.promise;

      this.goods = this.goods.concat(list);
    },
    onSearch() {
      this.goods = [];
      this.$refs.list.reset();
      this.fetchList({ page: 1 });
    },
    onCardClick(item) {
      this.$router.push(`/shop/good/${item.id}`);
    },
    load(page) {
      this.fetchList({ page });
    },
  },
  created() {
    this.fetchList({ page: 1 });
  },
};
</script>

<style lang="scss" scoped>
.goods-page {
  &-container {
    display: flex;
    flex-direction: column;
  }

  &-list {
    flex: 1;
  }

  &-search {
    width: 200px;
    margin-bottom: 20px;
  }
}
</style>
