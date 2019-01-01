<template>
  <div class="wrap-login">
    <div class="logo-wrap">
      <span class="logo"></span>
      <span>智信经开</span>
    </div>
    <div class="box">
      <p class="title">用户登录</p>
      <p class="title-sub">USER LOGIN</p>
      <el-form :rules="rule" ref="form" :model="loginData">
        <el-form-item prop="loginAccount">
          <el-input v-model="loginData.loginAccount" placeholder="用户名">
            <i slot="prefix" class="anticon icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginData.password" placeholder="密码">
            <i slot="prefix" class="anticon icon-key"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button @click="login" class="btn-submit" type="primary">登录</el-button>
    </div>
  </div>
</template>
<script>
import "assets/css/layout/login.scss";
export default {
  data() {
    return {
      rule: {
        loginAccount: [
          {
            required: true,
            message: "请输入用户名"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入用户密码"
          }
        ]
      },
      loginData: {}
    };
  },
  methods: {
    login() {
      this.$refs.form.validate(flag => {
        if (flag) {
          this.$store
            .dispatch("userLogin", this.loginData)
            .then(e => {
              this.$router.push("/");
            })
            .catch(({ message }) => {
              this.$alert(message, "错误");
            });
        }
      });
    }
  }
};
</script>
