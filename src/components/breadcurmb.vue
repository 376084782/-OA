<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcurmbList" :key="index">
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
  computed: {
    breadcurmbList() {
      return this.$store.state.breadcurmb.list;
    }
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
    padding: 20px 24px;
    background: #fff;
    padding-bottom: 24px;
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

