<template>
  <v-login
    title="Shop"
    :type="type"
    @switch="onSwitch"
    @login="onLogin"
    @register="onRegister"
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
      user: (state) => state.user.user,
    }),
  },
  methods: {
    ...mapActions('user', [
      'login',
      'register',
    ]),
    onSwitch() {
      const to = this.type === 'login' ? 'Register' : 'Login';

      this.$router.push({ name: to });
    },
    async onLogin(params) {
      const token = await this.login({
        account: params.account,
        password: params.password,
      });

      if (token) {
        this.$router.back();
      }
    },
    async onRegister(params) {
      const token = await this.register({
        account: params.account,
        password: params.password,
      });

      if (token) {
        this.$router.back();
      }
    },
  },
  created() {
    if (this.user) {
      this.$router.replace({ name: 'Goods' });
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
