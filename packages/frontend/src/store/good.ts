import { ActionTree, MutationTree } from 'vuex';
import { Good } from 'shared/types/models/good';
import { HOST, PORT } from 'shared/src/const/server';
import * as goodService from '@/services/good';

type Cart = (Good & { count: number; })[]
interface State {
  selectedGoods: Good[];
  cart: Cart;
}

const state: State = {
  selectedGoods: [],
  cart: [],
};

const actions: ActionTree<State, null> = {
  async fetchGoods(store, params) {
    const { data: goods } = await goodService.fetchGoods(params);

    goods.list = goods.list.map((good) => ({
      ...good,
      image: `${HOST}:${PORT}/${good.image}`,
    }));

    return goods;
  },
  async fetchGood(store, id: number) {
    const { data: good } = await goodService.fetchGood(id);

    good.image = `${HOST}:${PORT}/${good.image}`;

    return good;
  },
  async checkCart(store) {
    store.commit('RESTORE_CART');

    const { data } = await goodService.checkGoods(store.state.cart.map((good) => good.id));

    const cart = store.state.cart.reduce((acc: Cart, good) => {
      if (data[good.id]) {
        const inventory: number = data[good.id];

        acc.push({
          ...good,
          count: good.count > inventory ? inventory : good.count,
        });
      }

      return acc;
    }, []);

    store.commit('SET_CART', cart);
  },
};

const mutations: MutationTree<State> = {
  SET_SELECTED_GOODS(localState, selectedGoods) {
    localState.selectedGoods = selectedGoods;
  },
  RESTORE_CART(localState) {
    localState.cart = JSON.parse(localStorage.getItem('cart') || '') || [];
  },
  SET_CART(localState, cart) {
    localState.cart = cart;
    localStorage.setItem('cart', JSON.stringify(localState.cart));
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

    localStorage.setItem('cart', JSON.stringify(localState.cart));
  },
  REMOVE_FROM_CART(localState, id) {
    localState.cart = localState.cart.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(localState.cart));
  },
  UPDATE_CART_COUNT(localState, { id, count }) {
    const good = localState.cart.find((item) => item.id === id);

    if (good) {
      good.count = count;
    }
    localStorage.setItem('cart', JSON.stringify(localState.cart));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
