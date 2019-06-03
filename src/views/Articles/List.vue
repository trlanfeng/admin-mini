<template>
  <div class="grid-layout">
    <FilterBar class="header">
      <el-form :inline="true" size="small">
        <el-form-item label="文章标题">
          <el-input
            placeholder="请输入关键词"
            v-model="filter.title"
            @blur="getDataList"
            @keyup.native="getDataListDebounce"
            @keyup.native.enter="getDataList"
            :clearable="true"
            @clear="getDataList"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select
            placeholder="请选择"
            v-model="filter.category"
            @change="getDataList"
          >
            <el-option label="全部" value></el-option>
            <el-option
              v-for="item in $store.state.Enum.category"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </FilterBar>
    <div class="action-bar">
      <el-button type="primary" @click="$router.push(`/${moduleName}/add`)">新增</el-button>
    </div>
    <div class="grid">
      <el-table style="height:100%;" :data="dataList" v-loading="isDataLoading">
        <el-table-column fixed type="index" width="50"></el-table-column>
        <el-table-column prop="id" v-if="false"></el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          :show-overflow-tooltip="true"
          min-width="150"
        ></el-table-column>
        <el-table-column prop="lang" label="语言" min-width="100">
          <template v-slot="scope">
            {{scope.row.lang | lang}}
          </template>
        </el-table-column>
        <el-table-column prop="site" label="站点" min-width="100"></el-table-column>
        <el-table-column prop="category" label="分类" min-width="100"></el-table-column>
        <el-table-column prop="publishedAt" label="发布日期" min-width="100"></el-table-column>
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
              @click="$router.push(`/articles/edit/${scope.row.id}`)"
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
import DataList from '@/components/DataList.vue';

export default {
  components: {
    FilterBar,
  },
  extends: DataList,
  data() {
    return {
      filter: {
        title: '',
        category: '',
      },
      moduleName: 'articles',
      moduleTitle: '文章',
    };
  },
};
</script>
<style lang="scss" scoped>
.prices {
  display: flex;
  .price {
    width: 25%;
  }
}
</style>
