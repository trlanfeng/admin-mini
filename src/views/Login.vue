<template>
  <div class="page">
    <div class="login">
      <div class="login__logo">LOGO</div>
      <el-form :model="form" :rules="rules" ref="form" class="login__form" label-width="80px">
        <el-form-item prop="username" label="用户名" required>
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" required>
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-button type="primary" v-loading="isLoading" @click="SubmitLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {
            required: true,
            type: 'string',
            message: '请输入用户名',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            type: 'string',
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    async SubmitLogin() {
      this.isLoading = true;
      try {
        const res = await this.$http.post('/api/auth/login', {
          username: this.form.username,
          password: this.form.password,
        });
        this.$log.log(res);
        this.isLoading = false;
        localStorage.setItem('accessToken', res.data.accessToken);
        await this.GetUserInfo();
        localStorage.setItem('expiredAt', res.data.expiredAt);
        this.$router.push(localStorage.getItem('login_redirect') || '/');
      } catch (e) {
        this.$httpErrorHandle(this, e);
      }
    },
    async GetUserInfo() {
      try {
        const res = await this.$http.get('/api/users/me');
        this.$log.log(res);
      } catch (e) {
        this.$log.log(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;
  background-color: #333;
  padding-top: 20vh;
  box-sizing: border-box;
}
.login {
  width: 500px;
  height: 300px;
  background-color: white;
  border-radius: 5px;
  padding: 0 30px;
  margin: 0 auto;
  .login__logo {
    font-size: 28px;
    justify-content: center;
    height: 100px;
    display: flex;
    align-items: center;
  }
}
</style>
