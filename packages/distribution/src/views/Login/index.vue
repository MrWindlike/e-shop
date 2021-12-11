<template>
  <v-login
    title="物流管理系统"
    :type="type"
    :can-register="false"
    @login="onLogin"
  />
</template>

<script>
import {
  mapActions,
  mapState,
} from 'vuex';

export default {
  props: {
    type: {
      type: String,
      default: 'login',
    },
  },
  computed: {
    ...mapState({
      admin: (state) => state.admin.admin,
    }),
  },
  methods: {
    ...mapActions('admin', [
      'login',
    ]),
    async onLogin(params) {
      const token = await this.login({
        account: params.account,
        password: params.password,
      });

      if (token) {
        this.$router.replace({ name: 'Order' });
      }
    },
  },
  created() {
    if (this.admin) {
      this.$router.replace({ name: 'Order' });
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
