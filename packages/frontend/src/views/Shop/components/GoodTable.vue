<template>
  <el-table
    v-bind="$attrs"
    class="good-table"
    :data="list"
    @selection-change="onSelectionChange"
  >
    <el-table-column
      v-if="readonly === false"
      type="selection"
      min-width="40"
    />
    <el-table-column
      prop="name"
      label="商品名称"
      min-width="100"
    />
    <el-table-column
      prop="price"
      label="单价"
      min-width="100px"
    />
    <el-table-column
      prop="count"
      label="数量"
      min-width="120px"
    >
      <template v-slot="{row}">
        <template v-if="readonly">
          {{ row.count }}
        </template>
        <el-input-number
          v-else
          class="good-table-input"
          size="mini"
          controls-position="right"
          :value="row.count"
          :min="1"
          :max="row.inventory"
          :precision="0"
          @change="onCountChange($event, row)"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="total"
      label="总价"
      width="100px"
    />
    <el-table-column
      v-if="readonly === false"
      width="40px"
    >
      <template v-slot="{row}">
        <el-popconfirm
          title="确定移除该商品吗？"
          @confirm="onDelete(row)"
        >
          <template v-slot:reference>
            <el-button
              type="text"
            >
              <el-icon name="delete" />
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'GoodTable',
  props: {
    goods: {
      type: Array,
      default: () => [],
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    list() {
      return this.goods.map((good) => ({
        ...good,
        total: good.price * good.count,
      }));
    },
  },
  methods: {
    onCountChange(value, row) {
      this.$emit('count-change', value, row);
    },
    onDelete(row) {
      this.$emit('delete', row);
    },
    onSelectionChange(selected) {
      this.$emit('selection-change', selected);
    },
  },
};
</script>

<style lang="scss" scoped>
.good-table {
  &-input {
    width: 80%;
  }
}
</style>
