<!--公共列表模板-->
<template>
  <div></div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'ListTemplate',
  data() {
    return {
      pageIndex: 1,
      pageNum: 1,
      pageSize: 20,
      dataRecords: 0,
      dataList: [],
      isDataLoading: false,
      filter: {},
      moduleName: '',
      moduleTitle: '',
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataListDebounce: _.debounce(function getDataListDebounce() {
      this.getDataList();
    }, 500),
    async getDataList() {
      if (this.isDataLoading) return;
      this.isDataLoading = true;
      try {
        const res = await this.$http.get(`/api/${this.moduleName}`, {
          params: this.combineParams(),
        });
        this.dataList = res.data.list || [];
        this.dataRecords = Number(res.data.total) || 0;
        this.pageNum = Math.ceil(this.dataRecords / this.limit);
        // console.log(res);
      } catch (e) {
        this.$httpErrorHandle(this, e);
      }
      this.isDataLoading = false;
    },
    combineParams() {
      return Object.assign(this.filter, {
        page: this.pageIndex,
        limit: this.pageSize,
      });
    },
    detailData(id) {
      this.$router.push(`/${this.moduleName}/${id}`);
    },
    editDate(id) {
      this.$router.push(`/${this.moduleName}/edit/${id}`);
    },
    async deleteData(id) {
      try {
        const result = await this.$confirm(
          `是否确认删除该${this.$moduleTitle}？`,
          '提示',
          {
            type: 'warning',
          },
        );
        if (result) {
          await this.$http.delete(`/api/${this.moduleName}/${id}`);
          this.getDataList();
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
