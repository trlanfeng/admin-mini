import Mock from 'mockjs';

// const { Random } = Mock;

const domain = 's';

Mock.mock(`${domain}/api/products`, 'get', [
  {
    title: '@ctitle',
    channel: '@cword(3,5)',
    'price|100-1000': 100,
  },
]);
