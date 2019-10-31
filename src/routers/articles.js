import routesHelper from './helper';

// todo 修改文件夹路径
import List from '../views/Articles/List.vue';
import Add from '../views/Articles/Add.vue';
// todo 修改模块名与模块标题
const moduleName = 'articles';
const moduleTitle = '文章';

export default routesHelper(moduleName, [
  {
    path: '/',
    name: moduleName,
    component: List,
    meta: {
      title: `${moduleTitle}管理`,
    },
  },
  {
    path: '/add',
    component: Add,
    meta: {
      title: `增加${moduleTitle}`,
    },
  },
  {
    path: '/edit/:id',
    component: Add,
    meta: {
      title: `编辑${moduleTitle}`,
    },
  },
]);
