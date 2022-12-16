import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import vSelect from 'vue-select';

import App from './App.vue';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
