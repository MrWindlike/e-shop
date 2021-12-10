<template>
  <el-popover
    class="good-cart"
    width="560"
    trigger="click"
  >
    <template v-slot:reference>
      <div
        class="el-backtop"
        :style="{
          right,
          bottom,
        }"
      >
        <el-badge
          :value="cart.length"
        >
          <el-icon
            name="shopping-cart-2"
          />
        </el-badge>
      </div>
    </template>
    <good-table
      size="small"
      :goods="cart"
      @count-change="onCountChange"
      @selection-change="onSelectionChange"
      @delete="onRemove"
    />
    <div class="good-cart-footer">
      <span class="good-cart-footer-total">总金额: ￥{{ total }}</span>
      <el-button
        type="primary"
        size="small"
        @click="pay"
      >
        支付
      </el-button>
    </div>
  </el-popover>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex';
import GoodTable from './GoodTable.vue';

export default {
  name: 'Cart',
  components: {
    GoodTable,
  },
  props: {
    right: {
      type: String,
      default: '40px',
    },
    bottom: {
      type: String,
      default: '40px',
    },
  },
  data() {
    return {
      selected: [],
    };
  },
  computed: {
    ...mapState({
      cart: (state) => state.good.cart,
    }),
    total() {
      return this.selected.reduce((total, good) => total + good.count * good.price, 0);
    },
  },
  methods: {
    ...mapMutations('good', [
      'SET_SELECTED_GOODS',
      'REMOVE_FROM_CART',
      'UPDATE_CART_COUNT',
    ]),
    ...mapActions('good', ['checkCart']),
    onSelectionChange(selected) {
      this.selected = selected;
    },
    onCountChange(count, good) {
      this.UPDATE_CART_COUNT({
        id: good.id,
        count,
      });
    },
    onRemove(good) {
      this.REMOVE_FROM_CART(good.id);
    },
    pay() {
      if (this.selected.length === 0) {
        this.$message.error('请选择商品');
        return;
      }

      this.SET_SELECTED_GOODS(this.selected);
      this.$router.push({
        name: 'Pay',
      });
    },
  },
  created() {
    this.checkCart();
  },
};
</script>

<style lang="scss" scoped>
.good-cart {
  &-footer {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;

    &-total {
      font-size: 12px;
      margin-right: 20px;
      line-height: 32px;
    }
  }
}
</style>
