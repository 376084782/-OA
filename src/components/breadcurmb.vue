<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in paths" :key="index">
        <router-link
          :to="{
          path:item.url,
          query:item.query
        }"
        >{{item.name}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "turBreadcurmb",
  props: {
    paths: Array
  },
  watch: {
    paths(val) {
    }
  }
};
</script>
<style lang="scss">
.breadcrumb {
  margin: -24px -24px 0px;
  .el-breadcrumb {
    padding: 16px 24px;
    background: #fff;
  }
  a {
    color: rgba(0, 0, 0, 0.45);
    font-weight: 400;
  }
  .breadcrumb-name {
    padding: 0 24px 16px;
    background: #fff;
    font-size: 20px;
    font-weight: 700;
  }
}
</style>

