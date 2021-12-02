import { ActionTree, MutationTree } from 'vuex';
import * as userService from '../services/user';
import { User } from 'shared/types/models/user';
import { RootState } from './index';

interface State {
  user: User | null;
}

const state: State = {
  user: null,
};

const actions: ActionTree<State, RootState> = {
  async fetchUser({ commit }): Promise<User> {
    const { data: user } = await userService.fetchUser();

    commit('setUser', user);

    return user;
  },
  async login(store, params) {
    const { data: token } = await userService.login(params);

    localStorage.setItem('token', token);

    return token;
  },
  async register(store, params) {
    const { data } = await userService.register(params);

    if (data) {
      store.dispatch('login', params);
    }
  }
};

const mutations: MutationTree<State> = {
  SET_USER: (state, user) => {
    state.user = user;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
