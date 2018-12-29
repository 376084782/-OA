<template>
  <section>
    <el-tabs class="top-sec-tab" v-model="activeName">
      <el-tab-pane label="待办任务" name="-1"></el-tab-pane>
      <el-tab-pane label="已办任务" name="1"></el-tab-pane>
    </el-tabs>
    <el-card class="mgTop24">
      <list-search @search="onSearch"></list-search>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource" style="min-height: 400px">
          <el-table-column prop label="任务名称"></el-table-column>
          <el-table-column prop="region" label="发起人"></el-table-column>
          <el-table-column prop="usercnt" label="级别"></el-table-column>
          <el-table-column prop="consume" label="标签"></el-table-column>
          <el-table-column prop="recharge" label="状态"></el-table-column>
          <el-table-column prop="recharge" label="开始时间"></el-table-column>
          <el-table-column prop="recharge" label="结束时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="showFormDetail(scope.row)" type="text">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>
  </section>
</template>
<script>
import listSearch from "./components/search";

import { getClubList } from "api/index";
export default {
  components: { listSearch },
  data() {
    return {
      activeName: "1",
      bLoading: false,
      searchParams: {},
      dataSource: [{}],
      listDone: [{}, {}, {}],
      listNotDone: [{}],
      oPagination: {}
    };
  },
  watch: {
    activeName(val) {
      this.dataSource = val == "1" ? this.listDone : this.listNotDone;
    }
  },
  mounted() {
    this.activeName = this.$route.query.activeNav || "-1";
  },
  methods: {
    showFormDetail(data) {
      this.$router.push({
        path: `/document/seeTaskDone${this.activeName == "1" ? "1" : ""}/do`,
        query: {
          data
        }
      });
    },
    // 请求数据函数
    loadData() {
      this.bLoading = true;
      console.log("in");
      getClubList({})
        .then(data => {
          // this.dataSource = data.list;
          // this.oPagination = data.page;
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    // 搜索
    onSearch(params) {
      Object.assign(this.searchParams, params, { page: 1 });
      this.loadData();
    }
  },
  created() {
    this.onSearch();
  }
};
</script>

