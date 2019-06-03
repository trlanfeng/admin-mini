/* eslint-disable no-param-reassign */
import Axios from 'axios';
import _Vue from 'vue';

function install(Vue) {
  // Axios.defaults.baseURL = 'http://127.0.0.1:3060';
  // Axios.defaults.headers.post['Content-Type'] = 'application/json';
  // 请求拦截器，给请求加上token
  Axios.interceptors.request.use(
    (config) => {
      const conf = config;
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        conf.headers.Authorization = `Bearer ${accessToken}`;
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
      if (error.status === 401) {
        localStorage.setItem('login_redirect', vm.$route.fullPath);
        vm.$router.push('/login');
        vm.$message.warning('请重新登录');
      } else {
        vm.$message.warning(
          error.data.msg || error.data.message || '发生错误，请向管理员报告问题。',
        );
      }
    } catch (e) {
      window.console.warn('已捕获未知问题：', error);
      vm.$message.warning('发生错误，请向管理员报告问题。');
    }
  };
  Vue.prototype.$http = Axios;
}

_Vue.use(install);
