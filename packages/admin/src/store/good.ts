import { ActionTree } from 'vuex';
import * as goodService from '@/services/good';

const actions: ActionTree<null, null> = {
  async fetchGoods(store, params) {
    const { cancelToken, ...rest } = params;
    const { data: goods } = await goodService.fetchGoods(rest, { cancelToken });

    return goods;
  },
  async fetchGood(store, id: string) {
    const { data: good } = await goodService.fetchGood(id);

    return good;
  },
  async createGood(store, params) {
    const { data: good } = await goodService.createGood(params);

    return good;
  },
  async updateGood(store, params) {
    const { id, ...rest } = params;
    const { data: good } = await goodService.updateGood(id, rest);

    return good;
  },
  async deleteGood(store, id: string) {
    await goodService.deleteGood(id);
  },
};

export default {
  namespaced: true,
  actions,
};
