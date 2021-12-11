<template>
  <el-container class="v-container">
    <el-header height="64px">
      <slot name="header">
        <VHeader
          v-bind="headerProps"
          v-on="$listeners"
        />
      </slot>
    </el-header>
    <el-container class="v-container-body">
      <el-aside
        v-if="menuProps"
        width="240px"
      >
        <slot name="aside">
          <v-menu
            v-bind="menuProps"
            v-on="$listeners"
          />
        </slot>
      </el-aside>
      <el-container>
        <el-main class="v-container-main">
          <slot></slot>
        </el-main>
        <el-footer v-if="displayFooter" class="v-container-footer">
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
} from 'element-ui';
import VHeader from '../Header';
import VMenu from '../Menu';

export default {
  name: 'VContainer',
  components: {
    ElContainer: Container,
    ElHeader: Header,
    ElAside: Aside,
    ElMain: Main,
    ElFooter: Footer,
    VHeader,
    VMenu,
  },
  props: {
    headerProps: {
      type: Object,
      default: ()=> ({})
    },
    menuProps: {
      type: Object,
      default: ()=> null
    },
    displayFooter: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.v-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-header {
    position: relative;
    z-index: 5;
    padding: 0;
  }

  &-body {
    height: calc(100% - 64px);
  }

  &-main {
    flex: 1;
    padding: 25px;
    background: #f0f2f5;
  }

  &-footer {
    background: #f0f2f5;
  }
}
</style>
