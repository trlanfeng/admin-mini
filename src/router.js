import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/Layout.vue';
import Login from './views/Login.vue';

import Articles from './views/Articles/List.vue';
import ArticlesAdd from './views/Articles/Add.vue';

Vue.use(Router);

const siteTitle = 'Admin Mini';

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
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
      redirect: '/articles',
      children: [
        {
          path: 'articles',
          name: 'products',
          component: Articles,
          meta: {
            title: '文章管理',
          },
        },
        {
          path: 'articles/add',
          component: ArticlesAdd,
          meta: {
            title: '增加文章',
          },
        },
        {
          path: 'articles/edit/:id',
          component: ArticlesAdd,
          meta: {
            title: '编辑文章',
          },
        },

      ],
    },
  ],
});

/**
 * 路由前置处理
 */
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || '管理中心'} - ${siteTitle}`;
  // window.console.log('to', to);
  // window.console.log('from', from);
  // 检查登录状态
  if (!localStorage.getItem('accessToken') || +new Date() > localStorage.getItem('expiredAt')) {
    if (to.name !== 'login') {
      localStorage.setItem('login_redirect', to.path);
      next('/login');
    }
  } else if (to.name === 'login') {
    next(localStorage.getItem('login_redirect') || '/');
  }
  next();
});

export default router;
