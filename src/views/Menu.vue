<template>
  <el-menu class="menu" :default-active="currentRoute" :router="true">
    <el-menu-item
      v-for="(item,index) in menu"
      :index="item.route.substr(1)"
      :key="index"
      :route="item.route"
    >{{item.title}}</el-menu-item>
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
      ],
    };
  },
  computed: {
    currentRoute() {
      return this.$route.path.split('/')[1] || '';
    },
  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>
.menu {
  border-right: none;
}
</style>
