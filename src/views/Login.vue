<template>
  <div class="page">
    <div class="login">
      <div class="login__logo">LOGO</div>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        class="login__form"
        label-width="80px"
      >
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
  mounted() { },
  methods: {
    async SubmitLogin() {
      this.isLoading = true;
      try {
        const res = await this.$http.post('/api/admins/login', {
          username: this.form.username,
          password: this.form.password,
        });
        if (res.data.message) {
          this.isLoading = false;
          this.$message.error(res.data.message);
          return;
        }
        await this.$storage.setItem('token', res.data);
        await this.GetUserInfo();
        const url = await this.$storage.getItem('login_redirect') || '/';
        await this.$storage.removeItem('login_redirect');
        this.$router.push(url);
      } catch (e) {
        this.isLoading = false;
        this.$httpErrorHandle(this, e);
      }
    },
    async GetUserInfo() {
      try {
        const res = await this.$http.get('/api/users/me');
        console.log(res);
      } catch (e) {
        console.log(e);
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
