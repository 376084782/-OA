<template>
  <section>
    <el-card class="mgTop24">
      <list-search @search="onSearch"></list-search>
      <el-row class="bottom-row mgTop24">
        <el-button type="primary" size="small" @click="$router.push('/document/sponse/do')">发起公文</el-button>
      </el-row>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource" style="min-height: 400px">
          <el-table-column prop label="编号"></el-table-column>
          <el-table-column prop="region" label="标题"></el-table-column>
          <el-table-column prop="numid" label="紧急程度"></el-table-column>
          <el-table-column prop="usercnt" label="来文单位"></el-table-column>
          <el-table-column prop="consume" label="类型"></el-table-column>
          <el-table-column prop="recharge" label="状态"></el-table-column>
          <el-table-column prop="recharge" label="限办日期"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="showModalDetail(scope.row)" type="text">详情</el-button>
              <i class="grey">|</i>
              <el-button type="text">接收情况</el-button>
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
import { getClubList } from "api/index";
export default {
  components: { listSearch, modalDetail },
  data() {
    return {
      showDetail: false,
      bLoading: false,
      searchParams: {
        level: "", // 俱乐部等级
        state: "", // 状态
        guildid: "", // 俱乐部ID
        guildname: "", // 俱乐部名称
        numid: "", // 会长ID
        nickname: "", // 会长名称
        phone: "", // 手机号
        dateRange: [] // 创建日期
      },
      dataSource: [{}],
      oPagination: {}
    };
  },
  methods: {
    showModalDetail(data) {
      this.showDetail = true;
    },
    // 请求数据函数
    loadData() {
      this.bLoading = true;
      console.log('in')
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
    },
    // 翻页
    onPageChange(page) {
      Object.assign(this.searchParams, { page: page });
      this.loadData();
    },
  },
  created() {
    this.onSearch();
  }
};
</script>

