<template>
  <v-manager
    class="good-page"
    title="商品管理"
    :loading="loading"
    :list="goodList.list"
    :total="goodList.total"
    :page="page"
    :columns="columns"
    @page-change="onPageChange"
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
          v-model="filter.search"
          class="good-page-search"
          placeholder="请输入商品名称"
          prefix-icon="el-icon-search"
          size="small"
          @change="onSearch"
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
      :submitting="submitting"
      :good="editedGood"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </v-manager>
</template>

<script>
import {
  createNamespacedHelpers,
} from 'vuex-composition-helpers';
import useList from 'shared/src/hooks/list';
import GoodDialog from './components/GoodDialog.vue';

const { useActions } = createNamespacedHelpers('good');

export default {
  name: 'GoodPage',
  components: {
    GoodDialog,
  },
  setup() {
    const {
      fetchGoods,
      createGood,
      updateGood,
      deleteGood,
    } = useActions([
      'fetchGoods',
      'createGood',
      'updateGood',
      'deleteGood',
    ]);
    const {
      data,
      page,
      filter,
      loading,
      fetch,
      onPageChange,
      onSizeChange,
      onFilterChange,
    } = useList({
      defaultData: {
        list: [],
        total: 0,
      },
      defaultFilter: {
        search: '',
      },
      formatParams: ({ page: current, size: perPage, filter: { search: name } }) => ({
        page: current,
        perPage,
        name,
      }),
      action: fetchGoods,
      tackLatest: true,
    });

    return {
      // state
      goodDialogVisible: false,
      editedGood: null,
      goodList: data,
      loading,
      filter,
      page,
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
      // methods
      fetch,
      onPageChange,
      onSizeChange,
      onFilterChange,
      fetchGoods,
      createGood,
      updateGood,
      deleteGood,
    };
  },
  async created() {
    this.fetch();
  },
  methods: {
    onAddClick() {
      this.goodDialogVisible = true;
    },
    onEditClick(row) {
      this.editedGood = row;
      this.goodDialogVisible = true;
    },
    async onDelete(id) {
      await this.deleteGood(id);
      this.fetch();
    },
    onCancel() {
      this.editedGood = null;
      this.goodDialogVisible = false;
    },
    async onConfirm(form) {
      try {
        const api = this.editedGood ? this.updateGood : this.createGood;
        const params = {
          ...form,
        };

        if (form.image[0].raw) {
          params.image = form.image[0].raw;
        } else {
          delete params.image;
        }

        if (this.editedGood) {
          params.id = this.editedGood.id;
        }

        this.submitting = true;

        await api(params);

        this.editedGood = null;
        this.goodDialogVisible = false;
        this.fetch();
      } finally {
        this.submitting = false;
      }
    },
    onSearch(search) {
      this.onFilterChange({ search });
    },
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
