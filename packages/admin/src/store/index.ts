import Vue from 'vue';
import Vuex from 'vuex';
import admin from './admin';
import good from './good';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin,
    good,
  },
});
