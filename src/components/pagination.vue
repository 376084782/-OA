<template>
  <div class="pagination">
    <span class="pull-left tip">
      总数{{total}}条 每页{{size}}条 当前页数
      <span class="font-blue">{{currentPage}}</span>
      /{{Math.ceil(total/size)}}
    </span>
    <el-pagination
      background
      class="pull-right mgTop10 mgBottom10"
      @current-change="onPageChange"
      :current-page.sync="currentPage"
      :page-size="size"
      layout="prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import "assets/css/layout/pagination.scss";
export default {
  props: ["total", "currentPage", "size"],
  methods: {
    onPageChange() {
      this.$emit("onPageChange", this.currentPage);
    }
  }
};
</script>

