<template>
  <v-container
    :header-props="headerProps"
  >
    <router-view></router-view>
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
            key: 'home',
            name: '首页',
          },
          {
            key: 'about',
            name: '关于',
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
