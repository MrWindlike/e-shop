<template>
  <v-manager
    class="good-page"
    title="商品管理"
    :list="goodList.list"
    :total="goodList.total"
    :columns="columns"
  >
    <template v-slot:action>
      <div>
        <el-button
          type="primary"
          size="small"
          @click="onAddClick"
        >
          新增商品
        </el-button>
      </div>
    </template>
    <template v-slot:filter>
      <div>
        <el-input
          v-model="search"
          class="good-page-search"
          placeholder="请输入商品名称"
          prefix-icon="el-icon-search"
          size="small"
        />
      </div>
    </template>
    <template v-slot:column="{column, row}">
      <template v-if="column.label === '操作'">
        <el-button
          type="text"
          style="margin-right: 10px;"
          @click="onEditClick(row)"
        >
          编辑
        </el-button>
        <el-popconfirm
          title="确认删除该商品？"
          @confirm="onDelete(row.id)"
        >
          <template v-slot:reference>
            <el-button type="text">
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </template>
    <good-dialog
      :visible.sync="goodDialogVisible"
      @confirm="onConfirm"
    />
  </v-manager>
</template>

<script>
import {
  mapActions,
} from 'vuex';
import GoodDialog from './components/GoodDialog.vue';

export default {
  name: 'GoodPage',
  components: {
    GoodDialog,
  },
  data() {
    return {
      goodDialogVisible: true,
      editedGood: null,
      goodList: {
        list: [],
        total: 0,
      },
      search: '',
      columns: [
        {
          label: '商品名称',
          prop: 'name',
        },
        {
          label: '价格',
          prop: 'price',
        },
        {
          label: '库存',
          prop: 'inventory',
        },
        {
          label: '操作',
        },
      ],
      submitting: false,
    };
  },
  methods: {
    ...mapActions('good', [
      'fetchGoods',
      'createGood',
      'updateGood',
      'deleteGood',
    ]),
    onAddClick() {
      this.goodDialogVisible = true;
    },
    onEditClick(row) {
      this.editedGood = row;
      this.goodDialogVisible = true;
    },
    onDelete(id) {
      this.deleteGood(id);
    },
    async onConfirm(form) {
      try {
        const api = this.editedGood ? this.updateGood : this.createGood;

        this.submitting = true;

        await api({
          ...form,
          id: this.editedGood ? this.editedGood.id : null,
          image: form.image[0].raw,
        });
      } finally {
        this.submitting = false;
      }
    },
  },
  async created() {
    this.goodList = await this.fetchGoods({
      name: this.search,
    });
  },
};
</script>

<style lang="scss" scoped>
.good-page {
  &-search {
    width: 200px;
  }
}
</style>
