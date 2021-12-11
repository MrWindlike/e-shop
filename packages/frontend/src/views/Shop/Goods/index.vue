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
      <template v-slot:combined="{ isPending, error }">
        <el-result
          v-if="error"
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
        <div
          v-else
          v-loading="isPending"
          class="goods-page-container"
        >
          <v-list
            ref="list"
            class="goods-page-list"
            :list="goods"
            :total="total"
            @card-click="onCardClick"
            @load="load"
          />
        </div>
      </template>
      <template v-slot:rejected />
    </v-promised>
  </div>
</template>

<script>
import {
  mapActions,
} from 'vuex';

const PAGE_SIZE = 20;

export default {
  name: 'GoodsPage',
  data() {
    return {
      promise: null,
      search: '',
      goods: [],
      total: 0,
      page: 1,
    };
  },
  methods: {
    ...mapActions('good', [
      'fetchGoods',
    ]),
    async fetchList({ page }) {
      this.promise = this.fetchGoods({
        page,
        perPage: PAGE_SIZE,
        name: this.search,
      });

      const { list, total } = await this.promise;

      this.goods = this.goods.concat(list);
      this.total = total;
    },
    onSearch() {
      this.goods = [];
      this.page = 1;
      this.fetchList({ page: 1 });
    },
    onCardClick(item) {
      this.$router.push(`/shop/good/${item.id}`);
    },
    load() {
      if (this.page * PAGE_SIZE <= this.total) {
        this.page += 1;
        this.fetchList({
          page: this.page,
        });
      }
    },
  },
  created() {
    this.fetchList({ page: 1 });
  },
};
</script>

<style lang="scss" scoped>
.goods-page {
  height: 100%;

  &-container {
    display: flex;
    flex-direction: column;
    height: calc(100% - 52px);
  }

  &-list {
    height: 100%;
    flex: 1;
  }

  &-search {
    width: 200px;
    margin-bottom: 20px;
  }
}
</style>
