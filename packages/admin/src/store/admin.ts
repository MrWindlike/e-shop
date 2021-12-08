import { ActionTree, MutationTree } from 'vuex';
import { User } from 'shared/types/models/user';
import { setToken, getToken, clearToken } from '@/utils/http';
import * as adminService from '../services/admin';

interface State {
  admin: User | null;
}

const state: State = {
  admin: null,
};

const actions: ActionTree<State, null> = {
  async login(store, params) {
    const { data: { token, type } } = await adminService.login(params);

    setToken(`${type} ${token}`);
    this.dispatch('fetchAdmin');

    return token;
  },
  async logout(store, params) {
    await adminService.logout();

    clearToken();
    store.commit('SET_ADMIN', null);
  },
  async fetchAdmin({ commit }): Promise<User> {
    const { data: admin } = await adminService.fetchAdmin();

    commit('SET_ADMIN', admin);

    return admin;
  },
  async checkAuth({ dispatch, state: localState }) {
    try {
      if (localState.admin) {
        return localState.admin;
      }

      if (getToken()) {
        const admin = await dispatch('fetchAdmin');

        return admin;
      }

      return null;
    } catch {
      return null;
    }
  },
};

const mutations: MutationTree<State> = {
  SET_ADMIN: (localState, admin) => {
    localState.admin = admin;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
