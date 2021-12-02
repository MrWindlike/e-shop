import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';

Vue.use(Vuex);

export interface RootState {

}

export default new Vuex.Store({
  modules: {
    user,
  }
});
