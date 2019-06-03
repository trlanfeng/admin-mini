<template>
  <div class="add-dialog">
    <el-form :model="form" :rules="rules" label-width="80px" ref="form">
      <el-row>
        <el-col :span="6">
          <el-form-item prop="site" label="站点">
            <el-select v-model="form.site">
              <el-option
                v-for="item in $store.state.Enum.site"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="lang" label="语言">
            <el-select v-model="form.lang">
              <el-option
                v-for="item in $store.state.Enum.lang"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="category" label="分类">
            <el-select v-model="form.category">
              <el-option
                v-for="item in $store.state.Enum.lang"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="publishedAt" label="发布日期">
            <el-date-picker
              v-model="form.publishedAt"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="title" label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item prop="description" label="内容">
        <TinyMCE v-model="form.description"></TinyMCE>
      </el-form-item>
      <el-form-item prop="cover" label="封面图片">
        <el-upload
          :action="$qiniuConfig.action"
          :show-file-list="false"
          :data="{token:uploadToken}"
          :before-upload="beforeUpload"
          :on-success="coverUploaded"
        >
          <img v-if="form.cover" :src="form.cover.url" class="avatar">
          <el-button v-else size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import TinyMCE from '@/components/TinyMCE/Index.vue';
import Provinces from 'china-division/dist/provinces.json';

export default {
  components: {
    TinyMCE,
  },
  data() {
    return {
      moduleName: 'articles',
      moduleTitle: '文章',
      isEditMode: false,
      product_id: 0,
      form: {
        site: '',
        lang: '',
        category: '',
        title: '',
        description: '',
        cover: '',
        publishedAt: '',
      },
      uploadToken: '',
      rules: {
        title: {
          required: true,
          type: 'string',
          message: '请输入标题',
          trigger: 'change',
        },
      },
    };
  },
  methods: {
    coverUploaded(res) {
      this.form.cover = res;
    },
    async beforeUpload() {
      this.uploadToken = await this.$qiniuToken();
    },
    async submitForm() {
      try {
        const result = await this.$refs.form.validate();
        if (!result) return;
        if (this.isEditMode) {
          await this.$http.put(
            `/api/${this.moduleName}/${this.product_id}`,
            this.form,
          );
          this.$message.success('更新成功');
        } else {
          await this.$http.post(`/api/${this.moduleName}/`, this.form);
          this.$message.success('新增成功');
        }
        this.$router.push({ name: 'products' });
      } catch (e) {
        this.$httpErrorHandle(this, e);
      }
    },
    async GetData(productId) {
      try {
        const res = await this.$http.get(
          `/api/${this.moduleName}/${productId}`,
        );
        this.form = res.data;
        this.fileList = res.data.images;
        this.provinces = this.provinces.map((item) => {
          const province = item;
          if (
            this.isEditMode
            && this.form.prices.findIndex(item2 => item2.province === item.code)
              > -1
          ) {
            province.active = false;
          }
          return province;
        });
      } catch (e) {
        this.$httpErrorHandle(this, e);
      }
    },
  },
  mounted() {
    this.product_id = this.$route.params.id;
    this.isEditMode = !!this.product_id;
    this.provinces = Provinces.map((item) => {
      const province = item;
      province.active = true;
      return province;
    });
    if (this.isEditMode) {
      this.GetData(this.product_id);
    }
  },
};
</script>
<style lang="scss" scoped>
.mr10 {
  margin-right: 10px;
}
.mb10 {
  margin-bottom: 10px;
}
.area_price {
  line-height: normal;
}
</style>
