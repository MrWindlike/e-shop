<template>
  <v-container
    class="home-page"
    :header-props="headerProps"
    :menu-props="menuProps"
    @user-menu-click="onUserMenuClick"
    @title-click="onTitleClick"
    @load-notifications="onLoadNotifications"
  >
    <router-view />
  </v-container>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';

const PAGE_SIZE = 10;

export default {
  data() {
    return {
      menuProps: {
        menus: [
          {
            name: '订单管理',
            path: '/admin/order',
            icon: 'el-icon-box',
          },
        ],
        defaultActive: this.$route.path,
      },
      notificationList: {
        list: [],
        total: 0,
      },
      page: 1,
    };
  },
  computed: {
    ...mapState('admin', ['admin']),
    headerProps() {
      return {
        title: '物流后台管理系统',
        user: this.admin,
        userMenus: [
          {
            key: 'logout',
            name: '退出',
          },
        ],
        notificationList: this.notificationList,
      };
    },
  },
  methods: {
    ...mapActions('admin', ['logout']),
    ...mapActions('notification', ['fetchNotifications']),
    onTitleClick() {
      this.$router.push({ name: 'Good' });
    },
    async onUserMenuClick(key) {
      if (key === 'logout') {
        await this.logout();
        this.$router.push({ name: 'Login' });
      }
    },
    async onLoadNotifications() {
      if (this.page * PAGE_SIZE <= this.notificationList.total) {
        this.page += 1;
        const notificationList = await this.fetchNotifications({ page: this.page });
        this.notificationList.list = this.notificationList.list.concat(notificationList.list);
      }
    },
  },
  async created() {
    this.notificationList = await this.fetchNotifications({ page: this.page });
  },
};
</script>

<style lang="scss" scoped>

</style>
