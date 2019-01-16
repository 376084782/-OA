<template>
  <section>
    <el-tabs class="top-sec-tab" v-model="activeName">
      <el-tab-pane label="发文" name="1"></el-tab-pane>
      <el-tab-pane label="收文" name="2"></el-tab-pane>
    </el-tabs>
    <el-card class="mgTop24">
      <list-search @search="onSearch"></list-search>
      <el-row class="bottom-row mgTop24">
        <el-button v-if="activeName=='1'" type="primary" size="small" @click="createSponse">发起公文</el-button>
        <el-button v-else type="primary" size="small" @click="doShowWen">收文登记</el-button>
      </el-row>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource" style="min-height: 400px">
          <el-table-column prop label="文号"></el-table-column>
          <el-table-column prop="region" label="标题"></el-table-column>
          <el-table-column prop="numid" label="紧急程度"></el-table-column>
          <el-table-column prop="numid" label="状态"></el-table-column>
          <el-table-column prop="usercnt" label="来文单位"></el-table-column>
          <template v-if="activeName=='2'">
            <el-table-column prop="usercnt" label="限办日期"></el-table-column>
          </template>
          <el-table-column prop="consume" label="类型"></el-table-column>
          <el-table-column label="操作" v-if="activeName=='1'">
            <template slot-scope="scope">
              <el-button @click="showFormDetail(scope.row)" type="text">详情</el-button>
              <i class="grey">|</i>
              <el-button @click="showReceiveDetail(scope.row)" type="text">接收情况</el-button>
            </template>
          </el-table-column>
          <el-table-column v-else label="操作">
            <template slot-scope="scope">
              <el-button @click="showFormDetail(scope.row)" type="text">详情</el-button>
              <el-button @click="showReceiveDetail(scope.row)" type="text">签收</el-button>
              <el-button @click="showReceiveDetail(scope.row)" type="text">分派</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="200" :currentPage="1" :size="20" @onPageChange="onPageChange"></pagination>
      </section>
    </el-card>
    <modal-detail :visible.sync="showDetail"></modal-detail>
  </section>
</template>
<script>
import listSearch from "./components/search";
import modalDetail from "./components/modalDetail";
import { getListMySendProcess, getListProcess } from "api/index";
export default {
  components: { listSearch, modalDetail },
  data() {
    return {
      activeName: "1",
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
        name: "公文收发",
        url: this.$route.path
      }
    ]);
  },
  methods: {
    doShowWen() {},
    createSponse() {
      this.$router.push({
        path: "/document/sponse/do",
        query: {
          modelType: 100
        }
      });
    },
    showReceiveDetail(data) {
      this.showDetail = true;
    },
    showFormDetail(data) {
      let routeData = {
        name: "详情",
        url: "/document/seeSponse/do",
        query: {
          data
        }
      };
      this.$store.dispatch("addBreadCurmbList", routeData);
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
      let func = this.activeName == 1 ? getListProcess : getListMySendProcess;
      func(this.searchParams)
        .then(data => {
          this.dataSource = data.list;
          this.oPagination = data.page;
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    // 搜索
    onSearch(params) {
      Object.assign(this.searchParams, params, { page: 1 });
      this.loadData();
    },
    // 翻页
    onPageChange(page) {
      Object.assign(this.searchParams, { page: page });
      this.loadData();
    }
  },
  created() {
    this.onSearch();
  }
};
</script>

