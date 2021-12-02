<template>
  <div class="pay-page">
    <el-select class="pay-page-select">
      <el-option></el-option>
    </el-select>
    <hr class="pay-page-split">
    <el-table
      class="pay-page-table"
      :data="[]"
    >
      <el-table-column
        prop="name"
        label="商品名称"
      />
      <el-table-column
        prop="price"
        label="单价"
      />
      <el-table-column
        prop="count"
        label="数量"
      />
      <el-table-column
        prop="total"
        label="总价"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {

  }
};
</script>

<style lang="scss" scoped>
.pay-page {
  &-select {
    width: 100%;
    margin-bottom: 20px;
  }

  &-split {
    margin-bottom: 20px;
  }
}
</style>
