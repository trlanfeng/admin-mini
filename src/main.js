import Vue from 'vue';
import router from './router';
import store from './store';
import './plugins/element';
// import './plugins/veevalidate';
import './plugins/filters';
import './plugins/log';
import './plugins/localforage';
import './plugins/axios';
import './plugins/regex';
import './plugins/qiniu';

import App from './App.vue';

// import './mock/mock';

import './assets/scss/grid-layout.scss';
import './assets/scss/common.scss';

// Vue.use(axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
