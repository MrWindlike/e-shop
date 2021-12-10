<template>
  <header class="v-header">
    <h1
      @click="onTitleClick"
      class="v-header-title"
    >
      {{title}}
    </h1>
    <div class="v-header-user-box">
      <el-popover
        v-if="notificationList"
        style="max-height: 300px; overflow: auto;"
      >
        <template #reference>
          <el-badge
            class="v-header-notification-icon"
          >
            <el-button type="text">
              <el-icon name="bell"/>
            </el-button>
          </el-badge>
        </template>
        <div
          class="v-header-notification-list"
          v-infinite-scroll="loadNotifications"
        >
          <div
            v-for="notification in notificationList.list"
            :key="notification.id"
            class="v-header-notification-item"
          >
            <el-icon class="v-header-notification-content-icon" name="chat-line-round"></el-icon>
            <span class="v-header-notification-content">
              <div class="v-header-notification-text" :title="notification.content">{{ notification.content }}</div>
              <div class="v-header-notification-time">{{ notification.createdTime }}</div>
            </span>
          </div>
        </div>
      </el-popover>
      <el-dropdown
        v-if="user"
        @command="onCommand"
      >
        <span class="v-header-user">
          {{user.account}} <el-icon name="arrow-down"></el-icon>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="menu of userMenus"
            :key="menu.key"
            :icon="menu.icon"
            :command="menu.key"
          >{{menu.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <ul
        v-else
        class="v-header-menus"
      >
        <li
          v-for="menu of menus"
          :key="menu.key"
          class="v-header-menu-item"
          @click="onMenuClick(menu)"
        >
          <el-button type="text">{{menu.name}}</el-button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
  Badge
} from 'element-ui';

export default {
  name: 'VHeader',
  components: {
    ElButton: Button,
    ElDropdown: Dropdown,
    ElDropdownMenu: DropdownMenu,
    ElDropdownItem: DropdownItem,
    ElIcon: Icon,
    ElBadge: Badge
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    user: {
      type: Object,
      default: () => null,
    },
    menus: {
      type: Array,
      default: () => [],
    },
    userMenus: {
      type: Array,
      default: () => [],
    },
    notificationList: {
      type: Object,
      default: () => null,
    },
    notificationCount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onTitleClick() {
      this.$emit('title-click');
    },
    onMenuClick(menu) {
      this.$emit('menu-click', menu);
    },
    onCommand(command) {
      this.$emit('user-menu-click', command);
    },
    loadNotifications() {
      this.$emit('load-notifications');
    }
  }
};
</script>

<style lang="scss" scoped>
.v-header {
  height: 100%;
  background-color: #fff;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  &-title {
    cursor: pointer;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  &-notification-icon {
    margin-right: 20px;
  }

  &-notification-list {
    width: 360px;
    max-height: 300px;
    overflow-y: auto;
  }

  &-notification-item {
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    height: 40px;
  }

  &-notification-content {
    display: block;
    flex: 1;
  }

  &-notification-content-icon {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    font-size: 24px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background: #66b1ff;
  }

  &-notification-text {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 5px;
  }

  &-notification-time {
    font-size: 12px;
    color: #999;
  }

  &-user {
    cursor: pointer;
    font-size: 16px;
  }

  &-menus {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &-menu-item {
    list-style: none;
    margin-left: 20px;
  }
}
</style>
