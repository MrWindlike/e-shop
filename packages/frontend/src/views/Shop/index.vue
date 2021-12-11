<template>
  <v-container
    class="shop-page"
    :header-props="headerProps"
    @menu-click="onMenuClick"
    @user-menu-click="onUserMenuClick"
    @title-click="onTitleClick"
  >
    <div class="shop-page-container">
      <router-view />
    </div>
    <good-cart />
  </v-container>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';
import GoodCart from './components/GoodCart.vue';

export default {
  name: 'ShopPage',
  components: {
    GoodCart,
  },
  data() {
    return {
      menuProps: {
        menus: [
          {
            icon: 'el-icon-document',
            key: 'home',
            path: '/shop/goods',
            name: '首页',
          },
          {
            icon: 'el-icon-document',
            key: 'about',
            name: '关于',
            children: [
              {
                key: 'about',
                name: '关于',
                icon: 'el-icon-document',
                path: '/shop/good/1',
              },
              {
                key: 'about',
                name: '关于',
                icon: 'el-icon-document',
                path: '/home',
              },
            ],
          },
        ],
        defaultActive: this.$route.path,
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
    headerProps() {
      return {
        title: 'Shop',
        menus: [
          {
            key: 'login',
            name: '登陆',
          },
          {
            key: 'register',
            name: '注册',
          },
        ],
        userMenus: [
          {
            key: 'order',
            name: '我的订单',
          },
          {
            key: 'logout',
            name: '退出',
          },
        ],
        user: this.user,
      };
    },
  },
  methods: {
    ...mapActions('user', [
      'logout',
    ]),
    onMenuClick({ key }) {
      if (key === 'login') {
        this.$router.push({ name: 'Login' });
      } else if (key === 'register') {
        this.$router.push({ name: 'Register' });
      }
    },
    async onUserMenuClick(key) {
      if (key === 'order') {
        this.$router.push({ name: 'Order' });
      } else if (key === 'logout') {
        await this.logout();
        this.$router.push({ name: 'Login' });
      }
    },
    onTitleClick() {
      this.$router.push({ name: 'Goods' });
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-page {
  height: 100%;

  &-container {
    height: 100%;
    margin: auto;
  }
}
</style>
