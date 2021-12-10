import {
  CreatedOrderParams,
} from 'shared/types/models/order';
import { ActionTree } from 'vuex';
import * as orderService from '@/services/order';
import router from '../router/index';

const actions: ActionTree<null, null> = {
  async fetchOrders({ commit }, params) {
    const { data } = await orderService.fetchOrders(params);

    return data;
  },
  async createOrder(store, order: CreatedOrderParams) {
    try {
      const { data } = await orderService.createOrder(order);

      return data;
    } catch ({ response }) {
      if ((response as any).data?.code === -2) {
        router.push({ name: 'Goods' });
      }

      return null;
    }
  },
};

export default {
  namespaced: true,
  actions,
};
