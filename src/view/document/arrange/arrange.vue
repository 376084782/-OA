<template>
  <section>
    <el-card class="mgTop24">
      <list-search @search="onSearch"></list-search>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource" style="min-height: 400px">
          <el-table-column prop label="文号"></el-table-column>
          <el-table-column prop="region" label="标题"></el-table-column>
          <el-table-column prop="numid" label="紧急程度"></el-table-column>
          <el-table-column prop="recharge" label="状态"></el-table-column>
          <el-table-column prop="usercnt" label="来文单位"></el-table-column>
          <el-table-column prop="recharge" label="办结日期"></el-table-column>
          <el-table-column prop="consume" label="类型"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="showReceiveDetail(scope.row)" type="text">归档</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>
    <modal-detail :visible.sync="showDetail"></modal-detail>
  </section>
</template>
<script>
import listSearch from "./components/search";
import modalDetail from "./components/modalDetail";

import { getClubList } from "api/index";
export default {
  components: { listSearch, modalDetail },
  data() {
    return {
      showDetail: false,
      bLoading: false,
      searchParams: {},
      dataSource: [{}],
      oPagination: {}
    };
  },
  mounted() {
    this.$store.dispatch("updateBreadCurmbList", [
      {
        name: "公文管理",
        url: this.$route.path
      },
      {
        name: "公文归档",
        url: this.$route.path
      }
    ]);
  },
  methods: {
    showReceiveDetail(data) {
      this.showDetail = true;
    },
    showFormDetail(data) {
      this.$router.push({
        path: "/document/seeSponse/do",
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

