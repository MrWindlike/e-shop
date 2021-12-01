<template>
  <div class="good-page">
    <div class="good-info">
      <img
        class="good-image"
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        alt=""
      >
      <div class="good-base-info">
        <h3 class="good-info-item">{{good.name}}</h3>
        <el-alert
          class="good-info-item"
          type="info"
          :title="good.description"
          :closable="false"
          show-icon
        />
        <div class="good-info-item">Price: {{good.price}}</div>
        <div class="good-info-item">
          Count: <el-input-number></el-input-number>
        </div>
        <div class="good-info-item">
          <el-button @click="addToCart">Add to cart</el-button>
          <el-button @click="buy">Buy</el-button>
        </div>
      </div>
    </div>
    <p class="good-detail">
      {{good.detail}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'GoodPage',
  data() {
    return {
      good: {
        name: '这是一个商品',
        description: '商品的简单描述',
        price: 11.11,
        detail: '商品的详细描述',
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.good-page {
  display: flex;
  flex-direction: column;
  align-items: center;

  .good-info {
    width: 800px;
    display: flex;
    margin-bottom: 40px;
  }

  .good-image {
    flex: 1;
    margin-right: 20px;
  }

  .good-base-info {
    width: 400px;
  }

  .good-info-item {

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
