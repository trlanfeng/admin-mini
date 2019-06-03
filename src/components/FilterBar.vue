<template>
  <div class="filter-bar" id="filter-bar">
    <div class="filter">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.filter-bar {
  display: flex;
  .filter {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    & /deep/ .el-form--inline {
      .el-form-item {
        margin-right: 30px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
