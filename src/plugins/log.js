/* eslint-disable no-param-reassign */
import _Vue from 'vue';

function install(Vue) {
  Vue.prototype.$log = console;
}

_Vue.use(install);
