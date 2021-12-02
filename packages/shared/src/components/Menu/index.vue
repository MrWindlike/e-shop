<script lang="babel">
import {
  Menu,
  MenuItem,
  Submenu
} from 'element-ui';

export default {
  name: 'VMenu',
  components: {
    Menu,
    MenuItem,
    Submenu
  },
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    defaultActive: {
      type: String,
      default: ''
    },
  },
  render() {
    function buildMenus (menus) {
      return menus.map(menu => {
        if (menu.children) {
          return (
            <Submenu title={menu.name}>
              <template slot="title">
                {menu.icon ? <i class={menu.icon}></i> : ''}
                <span>{menu.name}</span>
              </template>
              {buildMenus(menu.children)}
            </Submenu>
          );
        } else {
          return (
            <MenuItem key={menu.path} index={menu.path}>
              {menu.icon ? <i class={menu.icon}></i> : ''}
              <span>{menu.name}</span>
            </MenuItem>
          );
        }
      });
    }

    return (
      <Menu
        class="v-menu"
        mode="vertical"
        defaultActive={this.defaultActive || this.menus[0].path}
        router={true}
        {...{
          props: this.$attrs
        }}
      >
        {buildMenus(this.menus)}
      </Menu>
    );
  }
};

</script>

<style lang="scss" scoped>
.v-menu {
  height: 100%;
}
</style>
