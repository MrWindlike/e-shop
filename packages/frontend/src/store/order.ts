import {
  Order,
  CreatedOrderParams,
} from 'shared/types/models/order';
import { List } from 'shared/types/response';
import { ActionTree, MutationTree } from 'vuex';
import * as orderService from '@/services/order';

interface State {
  orderList: List<Order>;
}

const state: State = {
  orderList: {
    list: [],
    total: 0,
  },
};

const actions: ActionTree<State, null> = {
  async fetchOrders({ commit }, params) {
    const { data } = await orderService.fetchOrders(params);

    commit('SET_ORDER_LIST', data);

    return data;
  },
  async createOrder(store, order: CreatedOrderParams) {
    const { data } = await orderService.createOrder(order);

    return data;
  },
};

const mutations: MutationTree<State> = {
  SET_ORDER_LIST(localState, data) {
    localState.orderList = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
