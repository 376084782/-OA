<template>
  <section>
    <el-card class="mgTop24">
      <list-search @search="onSearch"></list-search>
      <el-row class="mgTop20">
        <el-button type="primary" size="small" @click="createTask">发起任务</el-button>
      </el-row>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource">
          <el-table-column prop label="任务名称"></el-table-column>
          <el-table-column prop="region" label="发起人"></el-table-column>
          <el-table-column prop="numid" label="自己工时/总工时" min-width="90px"></el-table-column>
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
      bLoading: false,
      searchParams: {},
      dataSource: [{}],
      oPagination: {}
    };
  },
  methods: {
    createTask() {
      this.$router.push({
        path: "/document/task/do"
      });
    },
    showFormDetail(data) {
      this.$router.push({
        path: "/document/seeTask/do",
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

