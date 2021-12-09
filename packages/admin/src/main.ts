import './composition';
import Vue from 'vue';
import {
  List,
  Header,
  Container,
} from 'shared/src/components';
import {
  Login,
  Manager,
} from 'shared/src/pages';
import {
  Button,
  Input,
  InputNumber,
  Alert,
  Select,
  Icon,
  Table,
  TableColumn,
  Divider,
  Loading,
  Result,
  Dialog,
  Popover,
  Popconfirm,
  Form,
  FormItem,
  Upload,
  Message,
  Pagination,
} from 'element-ui';
import { Promised } from 'vue-promised';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/index';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Alert);
Vue.use(Select);
Vue.use(Icon);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Divider);
Vue.use(Loading);
Vue.use(Result);
Vue.use(Dialog);
Vue.use(Popover);
Vue.use(Popconfirm);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Upload);
Vue.use(Pagination);
Vue.component('VPromised', Promised);
Vue.component(List.name, List);
Vue.component(Login.name, Login);
Vue.component(Header.name, Header);
Vue.component(Container.name, Container);
Vue.component(Manager.name, Manager);

Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
