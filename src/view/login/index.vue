<template>
  <div class="wrapper">
    <div class="login-panel">
      <p class="title">用户登录</p>
      <p class="subtitle">User login</p>
      <el-form :rules="rules" ref="ruleForm" :model="form">
        <el-form-item prop="username">
          <el-input prefix-icon="anticon icon-user" class="input" v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" prefix-icon="anticon icon-lock" class="input" v-model="form.pwd" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
      <div class="btn-login" @click="submitForm('ruleForm')">登录</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import "assets/css/login.scss";
  export default {
    data() {
      return {
        form: {
          username: "",
          pwd: ""
        },
        rules: {
          username: [{
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }],
          pwd: [{
              required: true,
              message: "请输入密码",
              trigger: "blur"
            },
            {
              min: 5,
              message: "长度至少5位",
              trigger: "blur"
            }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // }
    }
  };
</script>