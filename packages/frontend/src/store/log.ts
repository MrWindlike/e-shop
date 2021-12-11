import {
  ActionTree,
} from 'vuex';
import * as logService from '@/services/log';

const actions: ActionTree<null, null> = {
  async createLog(store, params) {
    return logService.createLog(params);
  },
};

export default {
  namespaced: true,
  actions,
};
