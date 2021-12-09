<template>
  <el-dialog
    width="400"
    :title="good ? '编辑商品' : '添加商品'"
    :visible.sync="value"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
    >
      <el-form-item
        label="商品名称"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="商品描述"
        prop="description"
      >
        <el-input
          v-model="form.description"
          type="textarea"
        />
      </el-form-item>
      <el-form-item
        label="商品价格"
        prop="price"
      >
        <el-input-number
          v-model="form.price"
          :precision="2"
          :min="0"
        />
      </el-form-item>
      <el-form-item
        label="库存"
        prop="inventory"
      >
        <el-input-number
          v-model="form.inventory"
          :precision="0"
          :min="0"
        />
      </el-form-item>
      <el-form-item
        label="商品图片"
        prop="image"
      >
        <el-upload
          class="avatar-uploader"
          list-type="picture-card"
          action="/"
          accept="image/*"
          :limit="1"
          :file-list="form.image"
          :before-upload="beforeUpload"
          :on-change="onUploadChange"
          :http-request="onUploadHttpRequest"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onCancel">
        取 消
      </el-button>
      <el-button
        type="primary"
        :loading="submitting"
        @click="onConfirm"
      >
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import goodSchema from 'shared/src/schemas/good';
import { transformSchemaToRules } from 'shared/src/utils/schema';
import { HOST, PORT } from 'shared/src/const/server';

const BASE_FORM = {
  name: '',
  description: '',
  price: 0,
  inventory: 0,
  image: [],
};

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    good: {
      type: Object,
      default: () => null,
    },
    submitting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        ...BASE_FORM,
      },
      rules: transformSchemaToRules(goodSchema),
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
      if (value && this.good) {
        this.form = {
          ...this.good,
          image: [{
            name: this.good.image,
            url: `${HOST}:${PORT}/${this.good.image}`,
          }],
        };
      } else if (!value) {
        this.reset();
      }
    },
  },
  methods: {
    reset() {
      this.$refs.form.resetFields();
    },
    onUploadChange(file, fileList) {
      this.form.image = fileList;
    },
    beforeUpload(file) {
      const isImage = file.type.includes('image');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error('只能上传图片!');
        return false;
      }

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false;
      }

      return true;
    },
    onCancel() {
      this.value = false;
    },
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.form);
        }
      });
    },
    onUploadHttpRequest() {
      // 修改默认上传行为, 不做任何操作, 提交的时候再进行上传
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
