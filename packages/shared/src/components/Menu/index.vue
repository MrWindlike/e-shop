<script lang="babel">
import {
  Menu,
  MenuItem,
  Submenu
} from 'element-ui';

function buildMenus (menus) {
  return menus.map(menu => {
    if (menu.children) {
      return (
        <Submenu title={menu.title}>
          {buildMenus(menu.children)}
        </Submenu>
      );
    } else {
      return (
        <MenuItem key={menu.path}>
          {menu.title}
        </MenuItem>
      );
    }
  });
}

export default {
  name: 'VMenu',
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    defaultActive: {
      type: String,
      default: ''
    },
    menuProps: {
      type: Object,
      default: () => ({})
    }
  },
  render() {
    return (
      <Menu
        mode="vertical"
        defaultActive={this.defaultActive || this.menus[0].path}
        {...{
          props: this.menuProps
        }}
      >
        {buildMenus(this.menus)}
      </Menu>
    );
  }
};

</script>

<style lang="scss" scoped>

</style>
