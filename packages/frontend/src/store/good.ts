import { ActionTree, MutationTree } from 'vuex';
import { Good } from 'shared/types/models/good';
import * as goodService from '@/services/good';

interface State {
  selectedGoods: Good[];
  cart: (Good & { count: number; })[];
}

const state: State = {
  selectedGoods: [],
  cart: [],
};

const actions: ActionTree<State, null> = {
  async fetchGoods(store, params) {
    const { data: goods } = await goodService.fetchGoods(params);

    return goods;
  },
  async fetchGood(store, id: string) {
    const { data: good } = await goodService.fetchGood(id);

    return good;
  },
};

const mutations: MutationTree<State> = {
  SET_SELECTED_GOODS(localState, selectedGoods) {
    localState.selectedGoods = selectedGoods;
  },
  SET_CART(localState, cart) {
    localState.cart = cart;
  },
  ADD_INTO_CART(localState, good) {
    const found = localState.cart.find((item) => item.id === good.id);

    if (found) {
      if (found.count + good.count <= good.inventory) {
        found.count += good.count;
      }
    } else {
      localState.cart = localState.cart.concat(good);
    }
  },
  REMOVE_FROM_CART(localState, id) {
    localState.cart = localState.cart.filter((item) => item.id !== id);
  },
  UPDATE_CART_COUNT(localState, { id, count }) {
    const good = localState.cart.find((item) => item.id === id);

    if (good) {
      good.count = count;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
