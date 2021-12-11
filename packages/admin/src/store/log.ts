import { Pagination } from 'shared/types/request';
import {
  ActionTree,
} from 'vuex';
import * as logService from '@/services/log';

const actions: ActionTree<null, null> = {
  async fetchLogs(store, params: Pagination) {
    const { data } = await logService.fetchLogs(params);

    return data;
  },
};

export default {
  namespaced: true,
  actions,
};
