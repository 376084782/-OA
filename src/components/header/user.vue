<template>
  <div class="app-user">
    <el-dropdown trigger="click" @command="handleMenu">
      <section class="user-info">
        <img class="user-avatar" :src="avatar">
        <span class="user-name">
          {{name}}
          <i class="el-icon-caret-bottom"></i>
        </span>
      </section>
      <el-dropdown-menu class="user-dropdown-menu" slot="dropdown">
        <el-dropdown-item command="logout">
          <i class="anticon icon-logout mgRight10"></i>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
// import { mapState } from "vuex";

export default {
  name: "turUser",
  data() {
    return {
      name: "用户名",
      avatar:
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1114585158,1026985006&fm=27&gp=0.jpg"
    };
  },
  components: {},
  computed: {},
  methods: {
    handleMenu(menu) {
      switch (menu) {
        case "logout":
          this.$store.dispatch("userLogout").then(e=>{
            this.$router.push('/login')
          })
          break;
      }
    }
  }
};
</script>
