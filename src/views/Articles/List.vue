<template>
  <div class="grid-layout">
    <FilterBar class="header">
      <el-form :inline="true" size="small">
        <el-form-item label="关键字">
          <el-input
            placeholder="请输入关键字"
            v-model="filter.title"
            @blur="getDataList"
            @keyup.native="getDataListDebounce"
            @keyup.native.enter="getDataList"
            :clearable="true"
            @clear="getDataList"
          ></el-input>
        </el-form-item>
      </el-form>
    </FilterBar>
    <div class="action-bar">
      <el-button type="primary" @click="$router.push(`/${moduleName}/add`)">新增</el-button>
    </div>
    <div class="grid">
      <el-table style="height:100%;" :data="dataList" v-loading="isDataLoading">
        <!-- <el-table-column fixed type="index" width="50"></el-table-column> -->
        <el-table-column fixed prop="id" label="ID" width="50"></el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          :show-overflow-tooltip="true"
          min-width="150"
        ></el-table-column>
        <el-table-column prop="createAt" label="发布日期" min-width="100">
          <template slot-scope="scope">{{scope.row.createAt | datetime}}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="100"
          class-name="controls"
        >
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-view"></el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="$router.push(`/${moduleName}/edit/${scope.row.id}`)"
            ></el-button>
            <el-button
              @click="deleteData(scope.row.id)"
              type="text"
              icon="el-icon-delete"
              class="text-danger"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <div class="col"></div>
      <div class="col text-right">
        <el-pagination
          layout="total, prev, pager, next, jumper"
          :total="dataRecords"
          :page-size.sync="pageSize"
          :current-page.sync="pageIndex"
          v-loading="isDataLoading"
          @current-change="getDataList"
          @size-change="getDataList"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import FilterBar from '@/components/FilterBar.vue';
import ListTemplate from '@/components/ListTemplate.vue';

export default {
  components: {
    FilterBar,
  },
  extends: ListTemplate,
  data() {
    return {
      filter: {
        // todo 过滤器字段
        title: '',
        category: '',
      },
      // todo 修改模块名称和标题
      moduleName: 'articles',
      moduleTitle: '文章',
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
