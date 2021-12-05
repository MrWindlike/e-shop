import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import good from './good';
import address from './address';
import order from './order';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    good,
    address,
    order,
  },
});
