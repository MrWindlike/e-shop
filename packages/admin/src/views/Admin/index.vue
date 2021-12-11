<template>
  <v-container
    class="home-page"
    :header-props="headerProps"
    :menu-props="menuProps"
    @user-menu-click="onUserMenuClick"
    @title-click="onTitleClick"
  >
    <router-view />
  </v-container>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';

export default {
  data() {
    return {
      menuProps: {
        menus: [
          {
            name: '商品管理',
            path: '/admin/good',
            icon: 'el-icon-box',
          },
          {
            name: '访问日志',
            path: '/admin/log',
            icon: 'el-icon-document',
          },
        ],
        defaultActive: this.$route.path,
      },
    };
  },
  computed: {
    ...mapState('admin', ['admin']),
    headerProps() {
      return {
        title: '商城后台管理系统',
        user: this.admin,
        userMenus: [
          {
            key: 'logout',
            name: '退出',
          },
        ],
      };
    },
  },
  methods: {
    ...mapActions('admin', ['logout']),
    onTitleClick() {
      this.$router.push({ name: 'Good' });
    },
    async onUserMenuClick(key) {
      if (key === 'logout') {
        await this.logout();
        this.$router.push({ name: 'Login' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
