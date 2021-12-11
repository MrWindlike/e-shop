<template>
  <v-manager
    title="访问日志"
    :header="false"
    :columns="columns"
    :list="data.list"
    :total="data.total"
    :loading="loading"
    :page="page"
    @page-change="onPageChange"
  >
    <template v-slot:column="{column, row}">
      <span v-if="column.property === 'good'">{{ row.good.name }}</span>
      <span v-else-if="column.property === 'user'">{{ row.user ? row.user.account : '未登录' }}</span>
      <span v-else>{{ row[column.property] }}</span>
    </template>
  </v-manager>
</template>

<script>
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { readonly } from '@vue/composition-api';
import useList from 'shared/src/hooks/list';

const { useActions } = createNamespacedHelpers('log');
const COLUMNS = [
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'good',
    label: '商品名称',
  },
  {
    prop: 'user',
    label: '用户',
  },
];

export default {
  name: 'LogPage',
  setup() {
    const {
      fetchLogs,
    } = useActions([
      'fetchLogs',
    ]);
    const {
      data,
      page,
      loading,
      fetch,
      onPageChange,
    } = useList({
      defaultData: {
        list: [],
        total: 0,
      },
      action: fetchLogs,
    });

    return {
      // state
      data,
      page,
      loading,
      columns: readonly(COLUMNS),
      // methods
      fetch,
      onPageChange,
    };
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>

</style>
