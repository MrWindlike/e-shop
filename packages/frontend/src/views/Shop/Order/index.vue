<template>
  <div class="order-page">
    <el-table
      class="order-page-table"
      :data="data.list"
      :total="data.total"
    >
      <el-table-column type="expand">
        <template v-slot="{row}">
          <el-table
            size="mini"
            :data="row.orderInfos"
            border
            stripe
          >
            <el-table-column
              label="商品名"
            >
              <template v-slot="scoped">
                {{ scoped.row.good.name }}
              </template>
            </el-table-column>
            <el-table-column
              label="价格"
            >
              <template v-slot="scoped">
                ￥{{ scoped.row.good.price }}
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              prop="count"
            />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        label="订单号"
        prop="id"
      />
      <el-table-column
        label="总金额"
        prop="price"
      >
        <template v-slot="{row}">
          ￥{{ calcTotal(row) }}
        </template>
      </el-table-column>
      <el-table-column
        label="地址"
        prop="address"
      >
        <template v-slot="{row}">
          {{ row.address.address }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="data.total"
      @current-change="onPageChange"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import useList from 'shared/src/hooks/list';

const { useActions } = createNamespacedHelpers('order');

export default {
  setup() {
    const {
      fetchOrders,
    } = useActions(['fetchOrders']);
    const {
      data,
      loading,
      fetch,
      onPageChange,
    } = useList({
      defaultData: {
        list: [],
        total: 0,
      },
      action: fetchOrders,
      tackLatest: true,
    });

    return {
      data,
      loading,
      fetch,
      onPageChange,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    calcTotal(order) {
      return order.orderInfos.reduce((total, item) => total + item.good.price * item.count, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.order-page {
  &-table {
    margin-bottom: 20px;
  }

  /deep/ .el-table__expanded-cell {
    padding: 0 ;
  }
}
</style>
