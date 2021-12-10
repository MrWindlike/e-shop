import './composition';
import Vue from 'vue';
import {
  List,
  Header,
  Container,
} from 'shared/src/components';
import {
  Login,
} from 'shared/src/pages';
import {
  Button,
  Input,
  InputNumber,
  Alert,
  Select,
  Option,
  Icon,
  Table,
  TableColumn,
  Divider,
  Loading,
  Result,
  Dialog,
  Form,
  FormItem,
  MessageBox,
  Message,
  Backtop,
  Popover,
  Popconfirm,
  Badge,
  InfiniteScroll,
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
Vue.use(Option);
Vue.use(Icon);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Divider);
Vue.use(Loading.directive);
Vue.use(Result);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Backtop);
Vue.use(Popover);
Vue.use(Popconfirm);
Vue.use(Badge);
Vue.use(InfiniteScroll);
Vue.use(Pagination);
Vue.component('VPromised', Promised);
Vue.component(List.name, List);
Vue.component(Login.name, Login);
Vue.component(Header.name, Header);
Vue.component(Container.name, Container);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
