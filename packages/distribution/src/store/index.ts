import Vue from 'vue';
import Vuex from 'vuex';
import admin from './admin';
import notification from './notification';
import order from './order';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin,
    notification,
    order,
  },
});
