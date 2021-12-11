import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store/index';
import shopRoutes from './shop';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: {
      name: 'Goods',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/index.vue'),
    props: {
      type: 'login',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/index.vue'),
    props: {
      type: 'register',
    },
  },
  shopRoutes,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { requiresAuth } = to.meta || {};
  const user = await store.dispatch('user/checkAuth');
  const defaultTo = to.matched.length === 0 ? '/' : undefined;

  if (requiresAuth) {
    if (user) {
      next(defaultTo);
    } else {
      next({ name: 'Login' });
    }
  } else {
    const isLoginPage = to.name === 'Login' || to.name === 'Register';

    if (isLoginPage && user) {
      next({ name: 'Goods' });
    } else {
      next(defaultTo);
    }
  }
});

export default router;
