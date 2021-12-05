<template>
  <div class="good-page">
    <v-promised :promise="promise">
      <template v-slot:pending>
        <p>Refreshing</p>
      </template>
      <template v-slot:rejected="error">
        <el-result
          class="good-page-result"
          icon="error"
          title="错误提示"
          :sub-title="error.message"
        >
          <template slot="extra">
            <el-button
              type="primary"
              size="medium"
              @click="back"
            >
              返回
            </el-button>
          </template>
        </el-result>
      </template>
      <template v-slot="good">
        <div class="good-info">
          <img
            class="good-image"
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            :alt="good.name"
          >
          <div class="good-base-info">
            <h3 class="good-info-item">
              {{ good.name }}
            </h3>
            <el-alert
              class="good-info-item"
              type="info"
              :title="good.description"
              :closable="false"
              show-icon
            />
            <div class="good-info-item">
              价格: {{ good.price }}
            </div>
            <div class="good-info-item">
              购买数量:
              <el-input-number
                v-model="count"
                size="small"
                :min="good.inventory ? 1 : 0"
                :max="good.inventory"
                :precision="0"
              /> 件(库存{{ good.inventory }}件)
            </div>
            <div class="good-info-item">
              <el-button
                :disabled="good.inventory === 0"
                @click="addToCart(good)"
              >
                加入购物车
              </el-button>
              <el-button
                :disabled="good.inventory === 0"
                @click="buy(good)"
              >
                购买
              </el-button>
            </div>
          </div>
        </div>
      </template>
    </v-promised>
  </div>
</template>

<script>
import {
  mapActions,
  mapMutations,
} from 'vuex';

export default {
  name: 'GoodPage',
  data() {
    return {
      promise: null,
      count: 0,
    };
  },
  methods: {
    ...mapMutations('good', [
      'SET_SELECTED_GOODS',
      'ADD_INTO_CART',
    ]),
    ...mapActions('good', [
      'fetchGood',
    ]),
    addToCart(good) {
      this.ADD_INTO_CART({
        ...good,
        count: this.count,
      });
    },
    buy(good) {
      this.SET_SELECTED_GOODS([{
        ...good,
        count: this.count,
      }]);
      this.$router.push({
        name: 'Pay',
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
  async created() {
    this.promise = this.fetchGood(this.$route.params.id);
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
      margin-bottom: 25px;
    }
  }

  &-result {
    width: 100%;
  }
}
</style>
