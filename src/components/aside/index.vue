<template>
  <div class="sider-nav">
    <div class="logo">
      <span class="menu-item">
        <div>
          <i class="anticon icon-dropbox"></i>
          <span>智信经开</span>
        </div>
      </span>
    </div>
    <el-menu
      class="sider-menu"
      :unique-opened="true"
      :default-active="$route.path"
      :router="true"
      :collapse-transition="true"
      background-color="#020C16"
      active-text-color="#fff"
    >
      <el-submenu v-for="(item ,key) in menuList" :key="key" :index="item.path">
        <template slot="title">
          <i :class="`anticon icon-${item.icon}`"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item
          v-for="(item ,index) in item.subMenu||[]"
          :key="index"
          :index="item.path||''"
        >{{item.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "turAside",
  computed: {
    ...mapGetters(["menuList"])
  }
};
</script>
