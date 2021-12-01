import Vue from 'vue';
import {
  List,
  Header,
  Container,
} from 'shared/lib/components';
import {
  Login,
} from 'shared/lib/pages';
import {
  Button,
  InputNumber,
  Alert,
  Select,
} from 'element-ui';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/index';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(InputNumber);
Vue.use(Alert);
Vue.use(Select);
Vue.component(List.name, List);
Vue.component(Login.name, Login);
Vue.component(Header.name, Header);
Vue.component(Container.name, Container);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
