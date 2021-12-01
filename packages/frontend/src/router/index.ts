import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/index.vue'),
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/Shop/index.vue'),
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: () => import(/* webpackChunkName: "goods" */ '../views/Shop/Goods/index.vue'),
      },
      {
        path: 'good/:id',
        name: 'GoodsDetail',
        component: () => import(/* webpackChunkName: "good" */ '../views/Shop/Good/index.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
