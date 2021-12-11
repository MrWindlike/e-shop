import { reactive, computed, toRefs, UnwrapRef } from '@vue/composition-api';
import axios, { CancelTokenSource, CancelToken } from 'axios';

interface ListProps<Data, Filter, Params> {
  defaultData?: Data;
  defaultPage?: number;
  defaultSize?: number;
  defaultFilter?: Filter;
  action: (params: Params & { cancelToken?: CancelToken })=> Promise<Data>;
  formatParams?: (params: {page: number, size: number, filter: Filter})=> Params;
  tackLatest?: boolean;
}

function useList<Data, Filter, Params extends object>(props: ListProps<Data, Filter, Params>){
  const {
    defaultData = null,
    defaultPage = 1,
    defaultSize = 10,
    defaultFilter = {},
    action,
    formatParams = ({page, size, filter,})=> ({...filter, page, size,}),
    tackLatest = false,
  } = props;

  const state = reactive({
    data: defaultData,
    page: defaultPage,
    size: defaultSize,
    filter: defaultFilter,
    error: null,
    loading: false,
  });
  const params = computed(()=> formatParams({
    page: state.page,
    size: state.size,
    filter: state.filter as Filter,
  }) as Params);
  let cancelTokenSource: CancelTokenSource | null = null;

  async function fetch() {
    try {
      if (tackLatest && cancelTokenSource) {
        cancelTokenSource.cancel();
      }

      cancelTokenSource = axios.CancelToken.source();
      state.error = null;
      state.loading = true;
      state.data = (await action({
        ...(params.value),
        cancelToken: cancelTokenSource.token,
      })) as UnwrapRef<Data>;
    } catch(error) {
      if (axios.isCancel(error)) {
        return;
      }

      state.error = error;
      throw error;
    } finally {
      state.loading = false;
    }
  }

  async function onPageChange(page: number) {
    state.page = page;
    return await fetch();
  }

  async function onSizeChange(size: number) {
    state.page = 1;
    state.size = size;
    return await fetch();
  }

  async function onFilterChange(filter: Filter) {
    state.page = 1;
    state.filter = filter;
    return await fetch();
  }

  return {
    ...toRefs(state),
    fetch,
    onPageChange,
    onSizeChange,
    onFilterChange,
  };
}

export default useList;
