<template>
  <v-list
    :list="list"
  >

  </v-list>
</template>

<script>
export default {
  name: 'GoodsPage',
  data() {
    return {
      list: [
        {
          name: 'Good',
          price: 11.11,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
