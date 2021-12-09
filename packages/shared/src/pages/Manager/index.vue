<template>
  <div class="v-manager">
    <h3 class="v-manager-title">
      {{title}}
    </h3>
    <div v-if="header" class="v-manager-header">
      <slot name="action"></slot>
      <slot name="filter"></slot>
    </div>
    <el-table
      v-loading="loading"
      class="v-manager-table"
      size="small"
      :data="list"
      :total="total"
    >
      <el-table-column
        v-for="col of columns"
        v-bind="col"
        :key="col.prop"
      >
        <template v-slot="scoped">
          <slot name="column" v-bind="scoped">
            {{scoped.row[col.prop]}}
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <slot name="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :pageSize="pageSize"
        background
        @current-change="onPageChange"
      ></el-pagination>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VManager',
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    columns: {
      type: Array,
      default: () => []
    },
    header: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onPageChange(page) {
      this.$emit('page-change', page);
    }
  }
};
</script>

<style lang="scss" scoped>
.v-manager {
  &-title {
    margin-bottom: 20px;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &-table {
    margin-bottom: 10px;
  }
}
</style>
