<template>
  <el-container class="layout">
    <el-header class="header">
      <TopBar></TopBar>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Menu from './Menu.vue';
import TopBar from './TopBar.vue';

export default {
  components: {
    Menu,
    TopBar,
  },
  // mounted() {
  //   // this.GetUserInfo();
  // },
  computed: {
    // userInfo() {
    //   return this.$store.state.userInfo;
    // },
  },
  methods: {
    // async GetUserInfo() {
    //   try {
    //     const res = await this.$http.get('/api/users/me');
    //     this.$store.commit('setUserInfo', res.data);
    //     console.log(res);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    // AddToArr() {
    //   this.$store.commit('setUserInfo');
    // },
  },
};
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  .header {
    background-color: #0078d7;
    color: white;
    display: flex;
    align-items: center;
    font-size: 28px;
    display: flex;
  }
  .aside {
    border-right: 1px solid #e6e6e6;
  }
}
</style>
