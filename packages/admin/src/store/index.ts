import Vue from 'vue';
import Vuex from 'vuex';
import admin from './admin';
import good from './good';
import log from './log';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin,
    good,
    log,
  },
});
