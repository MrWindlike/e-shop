<template>
  <el-container class="v-container">
    <el-header>
      <slot name="header">
        <VHeader
          v-bind="headerProps"
        />
      </slot>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <slot name="aside">
          <v-menu
            v-bind="menuProps"
          />
        </slot>
      </el-aside>
      <el-container>
        <el-main>
          <slot></slot>
        </el-main>
        <el-footer>
          <slot name="footer"></slot>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  MenuItem,
} from 'element-ui';
import VHeader from '../Header';

export default {
  name: 'VContainer',
  components: {
    ElContainer: Container,
    ElHeader: Header,
    ElAside: Aside,
    ElMain: Main,
    ElFooter: Footer,
    ElMenu: Menu,
    ElMenuItem: MenuItem,
    VHeader,
  },
  props: {
    headerProps: {
      type: Object,
      default: ()=> ({})
    },
    menuProps: {
      type: Object,
      default: ()=> ({})
    }
  }
};
</script>

<style lang="scss" scoped>
.v-container {
  .el-header {
    padding: 0;
  }
}
</style>
