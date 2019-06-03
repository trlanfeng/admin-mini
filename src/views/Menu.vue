<template>
  <el-menu class="menu" :router="true">
    <el-menu-item index="1" route="/articles">文章管理</el-menu-item>
  </el-menu>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.menu {
  border-right: none;
}
</style>
