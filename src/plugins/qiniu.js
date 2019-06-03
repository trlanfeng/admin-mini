/* eslint-disable no-param-reassign */
import _Vue from 'vue';
import axios from 'axios';

const config = {
  action: 'https://upload.qiniup.com/',
  domain: 'http://trlanfeng.6655.la/',
};

function getQiniuImageUrl(key) {
  return config.domain + key;
}

async function getQiniuToken() {
  try {
    const res = await axios.get('/api/files/token?category=products');
    // window.console.log('upload_token:', res.data.token);
    return res.data.token;
  } catch (e) {
    // window.console.log(e);
    return '';
  }
}

function axiosUpload(callback) {
  const uploader = document.getElementById('tinymce_uploader');
  uploader.onchange = async () => {
    const file = uploader.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('token', await getQiniuToken());
    axios
      .post(config.action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        callback(res.data.url);
      })
      .catch((err) => {
        window.console.log(err);
      });
  };
  uploader.click();
}

function install(Vue) {
  Vue.prototype.$qiniuConfig = config;
  Vue.prototype.$qiniuUpload = axiosUpload;
  Vue.prototype.$qiniuToken = getQiniuToken;
  Vue.prototype.$qiniuImageUrl = getQiniuImageUrl;
}

_Vue.use(install);
