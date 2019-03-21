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
        <!-- <el-dropdown-item command="center">个人中心</el-dropdown-item>
        <el-dropdown-item command="password">修改密码</el-dropdown-item> -->
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <modal-user :show.sync="showModalUser"></modal-user>
    <modal-password :show.sync="showModalPsw"></modal-password>
  </div>
</template>
<script>
// import { mapState } from "vuex";
import modalUser from "components/modal/modalUserCenter.vue";
import modalPassword from "components/modal/modalChangePsw.vue";
export default {
  name: "turUser",
  components: { modalUser, modalPassword },
  data() {
    return {
      showModalPsw: false,
      showModalUser: false,
      name: this.$store.getters.name,
      avatar:
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1114585158,1026985006&fm=27&gp=0.jpg"
    };
  },
  computed: {},
  methods: {
    handleMenu(menu) {
      switch (menu) {
        case "logout":
          this.$store.dispatch("userLogout").then(e => {
            this.$router.push("/login");
          });
          break;
        case "center": {
          this.showModalUser = true;
          break;
        }
        case "password": {
          this.showModalPsw = true;
          break;
        }
      }
    }
  }
};
</script>
