<template>
  <div>
    <el-tabs class="top-sec-tab" @tab-click="handleClick">
      <el-tab-pane label="已分派" name="first"></el-tab-pane>
      <el-tab-pane label="未分派" name="second"></el-tab-pane>
    </el-tabs>
    <el-card class="mgTop24">

    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>

