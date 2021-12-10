const routes = {
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
    {
      path: 'pay',
      name: 'Pay',
      component: () => import(/* webpackChunkName: "pay" */ '../views/Shop/Pay/index.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'order',
      name: 'Order',
      component: () => import(/* webpackChunkName: "order" */ '../views/Shop/Order/index.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
};

export default routes;
