<template>
  <div class="header">
    <div class="logo" @click="$router.push('/')">{{siteName}}</div>
    <!-- <div class="user">用户：{{userInfo.name}}</div> -->
    <div class="control">
      <el-button @click="logout">注销</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      siteName: 'DCS',
    };
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
.header {
  width: 100%;
  display: flex;
  .logo {
    flex: 1;
    cursor: pointer;
  }
  .user {
    padding-right: 20px;
    font-size: 14px;
  }
  .control {
  }
}
</style>
