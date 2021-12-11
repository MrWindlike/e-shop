import {
  ActionTree,
  MutationTree,
} from 'vuex';
import { Address } from 'shared/types/models/address';
import * as addressService from '@/services/address';

interface State {
  addresses: Address[];
}

const state = {
  addresses: [],
};

const actions: ActionTree<State, null> = {
  async fetchAddresses(store, params) {
    const { data: { list: addresses } } = await addressService.fetchAddresses(params);

    store.commit('SET_ADDRESSES', addresses);

    return addresses;
  },
  async createAddress(store, params) {
    const { data: address } = await addressService.createAddress(params);

    store.commit('CREATE_ADDRESS', address);

    return address;
  },
  async updateAddress(store, params) {
    const { id, ...rest } = params;

    await addressService.updateAddress(id, rest);

    store.commit('UPDATE_ADDRESS', params);

    return params;
  },
  async deleteAddress(store, id) {
    await addressService.deleteAddress(id);

    store.commit('DELETE_ADDRESS', id);
  },
};

const mutations: MutationTree<State> = {
  SET_ADDRESSES(localState, addresses) {
    localState.addresses = addresses;
  },
  CREATE_ADDRESS(localState, address) {
    localState.addresses.push(address);
  },
  UPDATE_ADDRESS(localState, address) {
    const index = localState.addresses.findIndex((item) => item.id === address.id);

    localState.addresses[index] = { ...localState.addresses[index], ...address };
  },
  DELETE_ADDRESS(localState, id) {
    const index = localState.addresses.findIndex((item) => item.id === id);

    localState.addresses.splice(index, 1);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
