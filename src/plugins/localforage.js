/* eslint-disable no-param-reassign */
import _Vue from 'vue';
import localForage from 'localforage';

localForage.config();

function install(Vue) {
  Vue.prototype.$storage = localForage;
}

_Vue.use(install);
