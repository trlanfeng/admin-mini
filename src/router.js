import localForage from 'localforage';
import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/Layout.vue';
import Login from './views/Login.vue';

// ! 引入所有路由
import ArticlesRoutes from './routers/articles';

const siteTitle = 'Admin Mini';
Vue.use(Router);

// ! 合并所有路由
const childrenRoutes = [].concat(
  ArticlesRoutes,
);
const routerConfig = {
  mode: 'history',
  base: process.env.VUE_APP_BASEURL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
      },
    },
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: childrenRoutes,
    },
  ],
};
const router = new Router(routerConfig);

/**
 * 路由前置处理
 */
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || '管理中心'} - ${siteTitle}`;
  window.console.log('to', to);
  window.console.log('from', from);
  // 检查登录状态
  localForage.getItem('token').then((token) => {
    if (token) {
      if (to.name === 'login') {
        localForage.getItem('login_redirect').then((res) => {
          next(res || '/');
        }).catch((err) => {
          console.log('TR: err === login', err);
        });
        return;
      }
      next();
    } else {
      if (to.name !== 'login') {
        localForage.setItem('login_redirect', to.path).then(() => {
          next('/login');
        }).catch((err) => {
          console.log('TR: err !== login', err);
        });
        return;
      }
      next();
    }
  }).catch((err) => {
    console.log('TR: err', err);
  });
});

export default router;
