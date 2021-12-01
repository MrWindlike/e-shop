<template>
  <header class="v-header">
    <h1 class="v-header-title">
      {{title}}
    </h1>
    <el-dropdown
      v-if="user"
      @command="onCommand"
    >
      <span class="el-dropdown-link">
        {{user.name}}
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="menu of userMenus"
          :key="menu.key"
          :icon="menu.icon"
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
  </header>
</template>

<script>
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui';

export default {
  name: 'VHeader',
  components: {
    ElButton: Button,
    ElDropdown: Dropdown,
    ElDropdownMenu: DropdownMenu,
    ElDropdownItem: DropdownItem
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
  },
  methods: {
    onMenuClick(menu) {
      this.$emit('menu-click', menu);
    },
    onCommand(command) {
      this.$emit('command', command);
    },
  }
};
</script>

<style lang="scss" scoped>
.v-header {
  height: 64px;
  background-color: #fff;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: #666 0px 1px 3px;

  &-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  &-user {
    display: flex;
    align-items: center;
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
