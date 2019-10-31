<template>
  <el-menu class="menu" :default-active="currentRoute" :router="true">
    <el-menu-item
      v-for="(item,index) in menu"
      :index="item.route.substr(1)"
      :key="index"
      :route="item.route"
    >{{item.title}}</el-menu-item>
    <el-menu-item @click="logout">注销</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          title: '文章管理',
          route: '/articles',
        },
        {
          title: '分类管理',
          route: '/categories',
        },
        {
          title: '标签管理',
          route: '/tags',
        },
        {
          title: '系列管理',
          route: '/series',
        },
      ],
    };
  },
  computed: {
    currentRoute() {
      return this.$route.path.split('/')[1] || '';
    },
  },
  methods: {
    async logout() {
      try {
        const result = await this.$confirm(
          '是否注销？',
          '提示',
          {
            type: 'warning',
          },
        );
        if (result) {
          this.$storage.removeItem('token');
          this.$router.push('/login');
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.menu {
  border-right: none;
}
</style>
