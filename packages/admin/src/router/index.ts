import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: {
      name: 'Good',
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
        path: 'good',
        name: 'Good',
        component: () => import(/* webpackChunkName: "good" */ '../views/Admin/Good/index.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "log" */ '../views/Admin/Log/index.vue'),
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

  if (requiresAuth) {
    if (admin) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else {
    const isLoginPage = to.name === 'Login';

    if (isLoginPage && admin) {
      next({ name: 'Good' });
    } else {
      next();
    }
  }
});

export default router;
