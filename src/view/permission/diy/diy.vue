<template>
  <el-card>222</el-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("updateBreadCurmbList", []);
  }
};
</script>

