<template>
  <div class="pay-page">
    <div class="pay-page-address">
      <el-select
        v-model="selectedAddressId"
        class="pay-page-address-select"
        placeholder="请选择地址"
      >
        <el-option
          v-for="address of addresses"
          :key="address.id"
          :label="buildAddress(address)"
          :value="address.id"
        >
          <div class="pay-page-address-option">
            <span class="pay-page-address-option-label">{{ buildAddress(address) }}</span>
            <span class="pay-page-address-option-buttons">
              <el-button type="text">
                <el-icon
                  name="edit"
                  class="pay-page-address-option-icon"
                  @click.native.stop="onEditAddress(address)"
                />
              </el-button>
              <el-button type="text">
                <el-icon
                  name="delete"
                  class="pay-page-address-option-icon"
                  @click.native.stop="onDeleteAddress(address)"
                />
              </el-button>
            </span>
          </div>
        </el-option>
      </el-select>
      <el-button @click="onCreateAddress">
        <el-icon name="plus" />
      </el-button>
    </div>
    <el-divider class="pay-page-split" />
    <good-table
      :goods="selectedGoods"
      readonly
    />
    <div class="pay-page-payment">
      <span>总额: ￥{{ total }}</span>
      <el-button
        type="primary"
        class="pay-page-payment-button"
        @click="pay"
      >
        支付
      </el-button>
    </div>
    <address-dialog
      :visible.sync="addressDialogVisible"
      :address="editedAddress"
      @confirm="onAddressSubmit"
      @close="onAddressDialogClose"
    />
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';
import AddressDialog from './components/Address.vue';
import GoodTable from '../components/GoodTable.vue';

export default {
  name: 'PayPage',
  components: {
    AddressDialog,
    GoodTable,
  },
  data() {
    return {
      selectedAddressId: null,
      editedAddress: null,
      addressDialogVisible: false,
    };
  },
  computed: {
    ...mapState('good', [
      'selectedGoods',
    ]),
    ...mapState('address', [
      'addresses',
    ]),
    list() {
      return this.selectedGoods.map((good) => ({
        ...good,
        total: good.price * good.count,
      }));
    },
    total() {
      return this.list.reduce((total, good) => total + good.total, 0).toFixed(2) * 1;
    },
  },
  methods: {
    ...mapActions('address', [
      'fetchAddresses',
      'createAddress',
      'updateAddress',
      'deleteAddress',
    ]),
    ...mapActions('order', [
      'createOrder',
    ]),
    buildAddress(address) {
      return `${address.name}/${address.phone}/${address.address}`;
    },
    onAddressDialogClose() {
      this.addressDialogVisible = false;
      this.editedAddress = null;
    },
    onCreateAddress() {
      this.addressDialogVisible = true;
    },
    onEditAddress(address) {
      this.editedAddress = address;
      this.addressDialogVisible = true;
    },
    async onDeleteAddress(address) {
      await this.$confirm('确定要删除该地址吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      });

      await this.deleteAddress(address.id);
    },
    async onAddressSubmit(address) {
      const api = this.editedAddress ? this.updateAddress : this.createAddress;

      await api(address);

      this.editedAddress = null;
      this.addressDialogVisible = false;
    },
    async pay() {
      if (this.selectedAddressId === null) {
        await this.$message.error('请选择地址');
        return;
      }

      const order = {
        addressId: this.selectedAddressId,
        goods: this.selectedGoods.map((good) => ({
          id: good.id,
          count: good.count,
          price: good.price,
        })),
      };

      await this.createOrder(order);

      this.$router.push('/');
    },
  },
  created() {
    if (this.selectedGoods.length === 0) {
      this.$router.push({
        name: 'Goods',
      });
    }

    this.fetchAddresses();
  },
};
</script>

<style lang="scss" scoped>
.pay-page {

  &-address {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    &-select {
      flex: 1;
      margin-right: 10px;
    }

    &-option {
      display: flex;
    }

    &-option-label {
      flex: 1;
    }

    &-option-buttons {
      line-height: 34px;
    }
  }

  &-split {
    margin: 40px 0;
  }

  &-payment {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    line-height: 40px;

    &-button {
      margin-left: 20px;
    }
  }
}
</style>
