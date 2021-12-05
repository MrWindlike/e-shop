import { ActionTree, MutationTree } from 'vuex';
import { User } from 'shared/types/models/user';
import { setToken, getToken, clearToken } from '@/utils/http';
import * as userService from '../services/user';

interface State {
  user: User | null;
}

const state: State = {
  user: null,
};

const actions: ActionTree<State, null> = {
  async checkAuth({ dispatch, state: localState }) {
    try {
      if (localState.user) {
        return localState.user;
      }

      if (getToken()) {
        const user = await dispatch('fetchUser');

        return user;
      }

      return null;
    } catch {
      return null;
    }
  },
  async fetchUser({ commit }): Promise<User> {
    const { data: user } = await userService.fetchUser();

    commit('SET_USER', user);

    return user;
  },
  async login(store, params) {
    const { data: { type, token } } = await userService.login(params);

    setToken(`${type} ${token}`);
    this.dispatch('fetchUser');

    return token;
  },
  async logout(store) {
    await userService.logout();

    clearToken();
    store.commit('SET_USER', null);
  },
  async register(store, params) {
    const { data: { type, token } } = await userService.register(params);

    setToken(`${type} ${token}`);
    this.dispatch('fetchUser');

    return token;
  },
};

const mutations: MutationTree<State> = {
  SET_USER: (localState, user) => {
    localState.user = user;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
