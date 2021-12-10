import {
  Order,
  CreatedOrderParams,
} from 'shared/types/models/order';
import { List } from 'shared/types/response';
import { ActionTree, MutationTree } from 'vuex';
import * as orderService from '@/services/order';

const actions: ActionTree<null, null> = {
  async fetchOrders({ commit }, params) {
    const { data } = await orderService.fetchOrders(params);

    return data;
  },
  async createOrder(store, order: CreatedOrderParams) {
    const { data } = await orderService.createOrder(order);

    return data;
  },
};

export default {
  namespaced: true,
  actions,
};
