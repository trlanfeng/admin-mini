import Vue from 'vue';
import router from './router';
import store from './store';
import './plugins/element';
// import './plugins/veevalidate';
import './plugins/filters';
import './plugins/log';
import './plugins/axios';
import './plugins/regex';
import './plugins/qiniu';

import App from './App.vue';

// import './mock/mock';

import './assets/scss/grid-layout.scss';

// Vue.use(axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
