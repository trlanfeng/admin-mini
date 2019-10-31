/* eslint-disable no-param-reassign */
import Axios from 'axios';
import _Vue from 'vue';
import localForage from 'localforage';

function install(Vue) {
  Axios.defaults.baseURL = process.env.VUE_APP_APIURL;
  // 请求拦截器，给请求加上token
  Axios.interceptors.request.use(
    async (config) => {
      const conf = config;
      const token = await localForage.getItem('token');
      if (token) {
        conf.headers.Authorization = `Bearer ${token}`;
      }
      return conf;
    },
    error => Promise.reject(error),
  );
  // 响应拦截器，简化返回的错误信息
  // Axios.interceptors.response.use(
  //   (response) => {
  //     // code == 0 或 rel == true 表示接口请求数据成功
  //     if (response.status !== 200) {
  //       return Promise.reject(response);
  //     }
  //     return response;
  //   },
  //   error => Promise.reject(error.response),
  // );
  /**
   * 用于处理http请求发生的异常
   */
  Vue.prototype.$httpErrorHandle = function $httpErrorHandle(vm, error) {
    window.console.error(error);
    if (error === 'cancel') return;
    try {
      if (error.response.status === 401) {
        localForage.setItem('login_redirect', vm.$route.fullPath);
        vm.$router.push('/login');
        vm.$message.warning('请重新登录');
      } else {
        vm.$message.warning(
          error.response.data.msg || error.response.data.message || '发生错误，请向管理员报告问题。',
        );
      }
    } catch (e) {
      vm.$message.warning('发生错误，请向管理员报告问题。');
    }
  };
  Vue.prototype.$http = Axios;
}

_Vue.use(install);
