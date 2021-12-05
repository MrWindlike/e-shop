<template>
  <el-dialog
    :title="address ? '修改收货地址' : '新增收货地址'"
    :visible.sync="value"
    @confirm="onConfirm"
    @close="onClose"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
    >
      <el-form-item
        label="收货人"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="手机号"
        prop="phone"
      >
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item
        label="地址"
        prop="address"
      >
        <el-input v-model="form.address" />
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="onClose">取 消</el-button>
      <el-button
        type="primary"
        @click="onConfirm"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import addressSchema from 'shared/src/schemas/address';
import { createSchema } from '@/utils/schema';

export default {
  name: 'AddressDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    address: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        address: '',
      },
      rules: createSchema(addressSchema),
    };
  },
  computed: {
    value: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      },
    },
  },
  watch: {
    visible(value) {
      if (value) {
        this.form = { ...this.address };
      } else {
        this.reset();
      }
    },
  },
  methods: {
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.form);
        }
      });
    },
    onClose() {
      this.$emit('close');
      this.$emit('update:visible', false);
    },
    reset() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
