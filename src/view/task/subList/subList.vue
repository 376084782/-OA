<template>
  <section>
    <el-card class="mgTop24">
      <el-row class="mgTop24">
        <el-button type="primary" size="small" @click="createTask">+子任务</el-button>
      </el-row>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource">
          <el-table-column prop label="执行人"></el-table-column>
          <el-table-column prop="region" label="自己已完成工时"></el-table-column>
          <el-table-column prop="usercnt" label="开始时间"></el-table-column>
          <el-table-column prop="consume" label="结束时间"></el-table-column>
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

import { getClubList } from "api/index";
export default {
  components: { },
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

