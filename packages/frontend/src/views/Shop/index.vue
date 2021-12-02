<template>
  <v-container
    class="shop-page"
    :header-props="headerProps"
  >
    <div class="shop-page-container">
      <router-view></router-view>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'ShopPage',
  data() {
    return {
      headerProps: {
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
            key: 'user',
            name: '个人中心',
          },
          {
            key: 'logout',
            name: '退出',
          },
        ],
        user: {
          name: 'Windlike',
        },
      },
      menuProps: {
        menus: [
          {
            icon: 'el-icon-document',
            key: 'home',
            path: '/home',
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
              },
              {
                key: 'about',
                name: '关于',
                icon: 'el-icon-document',
              },
            ],
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.shop-page {
  height: 100%;

  &-container {
    width: 1080px;
    margin: auto;
  }
}
</style>
