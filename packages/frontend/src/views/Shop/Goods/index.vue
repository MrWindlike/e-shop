<template>
  <v-promised
    :promise="promise"
  >
    <template v-slot:pending>
      <div v-loading />
    </template>
    <template v-slot="data">
      <v-list
        :list="data.list"
        :total="data.total"
        @card-click="onCardClick"
      />
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
    };
  },
  methods: {
    ...mapActions('good', [
      'fetchGoods',
    ]),
    fetchList() {
      this.promise = this.fetchGoods();
    },
    onCardClick(item) {
      this.$router.push(`/shop/good/${item.id}`);
    },
  },
  created() {
    this.fetchList();
  },
};
</script>

<style lang="scss" scoped>

</style>
