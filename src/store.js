/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import CommonConfig from '@/stores/CommonConfig';
import Enum from '@/stores/Enum';

Vue.use(Vuex);

function get(key) {
  return sessionStorage.getItem(key) || '';
}

function save(key, data) {
  return sessionStorage.setItem(key, data);
}

export default new Vuex.Store({
  state: {
    userInfo: get('userInfo'),
    CommonConfig,
    Enum,
  },
  mutations: {
    setUserInfo(state, userInfo) {
      // state.userInfo = Object.assign({}, state.userInfo, userInfo);
      state.userInfo = { ...state.userInfo, ...userInfo };
      save('userInfo', state.userInfo);
    },
  },
  actions: {},
});
