<template>
  <v-manager
    class="order-page"
    title="订单管理"
    :columns="columns"
    :list="data.list"
    :total="data.total"
    :page="page"
    expandable
    @page-change="onPageChange"
  >
    <template #column="{ column, row }">
      <template v-if="column.property === 'user'">
        {{ row.user.account }}
      </template>
      <template v-else-if="column.property === 'address'">
        {{ row.address.address }}
      </template>
      <template v-else-if="column.property === 'total'">
        ￥{{ calcTotal(row) }}
      </template>
    </template>
    <template #expand="{row}">
      <el-table
        size="mini"
        :data="row.orderInfos"
        border
        stripe
      >
        <el-table-column
          label="商品名称"
        >
          <template v-slot="{row}">
            {{ row.good.name }}
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
        >
          <template v-slot="{row}">
            {{ row.count }}
          </template>
        </el-table-column>
        <el-table-column
          label="价格"
        >
          <template v-slot="{row}">
            ￥{{ row.price }}
          </template>
        </el-table-column>
      </el-table>
    </template>
  </v-manager>
</template>

<script>
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import useList from 'shared/src/hooks/list';

const { useActions } = createNamespacedHelpers('order');
const COLUMNS = [
  {
    prop: 'id',
    label: '订单号',
  },
  {
    prop: 'user',
    label: '用户',
  },
  {
    prop: 'address',
    label: '地址',
    showOverflowTooltip: true,
  },
  {
    prop: 'total',
    label: '总价',
  },
];

export default {
  setup() {
    const {
      fetchOrders,
    } = useActions(['fetchOrders']);
    const {
      data,
      loading,
      page,
      fetch,
      onPageChange,
    } = useList({
      defaultData: {
        list: [],
        total: 0,
      },
      action: fetchOrders,
      formatParams: (params) => ({
        page: params.page,
        perPage: params.pageSize,
        filter: params.filter,
      }),
    });

    return {
      // state
      data,
      loading,
      page,
      columns: COLUMNS,
      // methods
      fetch,
      onPageChange,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    calcTotal(order) {
      return order.orderInfos.reduce((acc, info) => (
        acc + (info.price * info.count)
      ), 0).toFixed(2) * 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.order-page {
  /deep/ .el-table__expanded-cell {
    padding: 0;
  }
}
</style>
