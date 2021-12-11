import { Pagination } from 'shared/types/request';
import {
  ActionTree,
} from 'vuex';
import * as orderService from '@/services/order';

const actions: ActionTree<null, null> = {
  async fetchOrders({ commit }, params: Pagination) {
    const { data } = await orderService.fetchOrders(params);

    return data;
  },
};

export default {
  namespaced: true,
  actions,
};
