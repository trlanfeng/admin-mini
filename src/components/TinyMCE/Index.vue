<template>
  <div>
    <input id="tinymce_uploader" type="file" v-show="false">
    <TinyMCEComponent
      v-model="content"
      :init="config"
      @onChange="$emit('change',content)"
    ></TinyMCEComponent>
  </div>
</template>

<script>
import './langs/zh_CN';
import TinyMCEComponent from '@tinymce/tinymce-vue';

export default {
  name: 'TinyMCE',
  components: {
    TinyMCEComponent,
  },
  model: {
    prop: 'contentOut',
    event: 'change',
  },
  props: ['contentOut'],
  watch: {
    contentOut(newVal) {
      this.content = newVal;
    },
  },
  data() {
    return {
      content: '',
      upload_callback: null,
      img_url: '',
    };
  },
  computed: {
    config() {
      const config = {
        uploader: null,
        plugins: 'image',
        language: 'zh_CN',
      };
      config.file_picker_callback = (callback, value, meta) => {
        if (meta.filetype === 'image') {
          this.$qiniuUpload(callback);
        }
      };
      return config;
    },
  },
  methods: {},
  mounted() {},
};
</script>
