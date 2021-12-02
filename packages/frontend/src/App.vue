<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      list: [{
        name: 'Good',
        image: 'https://picsum.photos/200/300/?random',
      }, {
        name: 'Good',
        image: 'https://picsum.photos/200/300/?random',
      }],
    };
  },
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
