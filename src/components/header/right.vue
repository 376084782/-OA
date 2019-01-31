<template>
  <div class="header-menu pull-right">
    <!-- 权限申请 -->
    <span class="menu-item search">
      <el-input size="small" placeholder="请输入关键字">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </span>
    <!-- 邮件 -->
    <span class="menu-item">
      <el-badge is-dot :value="news">
        <i class="anticon icon-mail"></i>
      </el-badge>
    </span>
    <!-- codepen -->
    <span class="menu-item" @click="toggleModalSys">
      <el-badge is-dot :value="news">
        <i class="anticon icon-codepen"></i>
      </el-badge>
    </span>
    <!-- 消息 -->
    <span>
      <tur-user-news></tur-user-news>
    </span>
    <!-- 用户 -->
    <span>
      <tur-user></tur-user>
    </span>
  </div>
</template>
<script>
import turUser from "components/header/user";
import turUserNews from "components/header/userNews";

export default {
  name: "turHeaderRight",
  components: {
    turUser,
    turUserNews
  },
  methods: {
    toggleModalSys() {
      this.$store.dispatch("toggleChangeSys", true);
    }
  },
  data() {
    return {
      news: 0
    };
  }
};
</script>
