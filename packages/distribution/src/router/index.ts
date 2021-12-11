import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: {
      name: 'Order',
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
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin/index.vue'),
    children: [
      {
        path: 'order',
        name: 'Order',
        component: () => import(/* webpackChunkName: "order" */ '../views/Admin/Order/index.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],

  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { requiresAuth } = to.meta || {};
  const admin = await store.dispatch('admin/checkAuth');
  const defaultTo = to.matched.length === 0 ? '/' : undefined;

  if (requiresAuth) {
    if (admin) {
      next(defaultTo);
    } else {
      next({ name: 'Login' });
    }
  } else {
    const isLoginPage = to.name === 'Login';

    if (isLoginPage && admin) {
      next({ name: 'Order' });
    } else {
      next(defaultTo);
    }
  }
});

export default router;
