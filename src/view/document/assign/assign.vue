<template>
  <div>
    <el-card class="mgTop24">
      <list-search @search="onSearch"></list-search>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource" style="min-height: 400px">
          <el-table-column prop="flowCode" label="文号"></el-table-column>
          <el-table-column prop="flowTitle" label="标题"></el-table-column>
          <el-table-column prop="numid" label="紧急程度">
            <template slot-scope="scope">{{scope.row.valueContent['urgency']}}</template>
          </el-table-column>
          <el-table-column prop="finishStatusDictionary" label="状态"></el-table-column>
          <el-table-column prop="usercnt" label="发文单位" width="230px">
            <template slot-scope="scope">{{scope.row.valueContent['sendGroup']}}</template>
          </el-table-column>
          <el-table-column prop="recharge" label="限办日期" width="180px">
            <template slot-scope="scope">{{scope.row.valueContent['documentSendDate']}}</template>
          </el-table-column>
          <el-table-column prop="recharge" label="类型">
            <template slot-scope="scope">{{scope.row.valueContent['type']}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="showFormDetail(scope.row)" type="text">{{scope.row.buttonContent}}</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          :total="oPagination.total"
          :currentPage="oPagination.pageNo"
          :size="oPagination.pageSize"
          @onPageChange="onPageChange"
        ></pagination>
      </section>
    </el-card>
    <modal-detail :visible.sync="showDetail"></modal-detail>
  </div>
</template>
<script>
import listSearch from "./components/search";
import modalDetail from "./components/modalDetail";
import { getListAssign } from "api/document";
import { formatValueContentToList } from "utils/assist";
export default {
  components: { listSearch, modalDetail },
  data() {
    return {
      showDetail: false,
      bLoading: false,
      dataSource: [],
      listDone: [{}, {}, {}],
      listNotDone: [],
      oPagination: {
        pageNo: 1,
        pageSize: 20
      },
      searchParams: {
        modelTypeList: [100, 101]
      }
    };
  },
  watch: {},
  mounted() {
    this.$store.dispatch("updateBreadCurmbList", [
      {
        name: "公文管理",
        url: this.$route.path
      },
      {
        name: "公文办理",
        url: this.$route.path
      }
    ]);
    this.onSearch();
  },
  methods: {
    onPageChange(page) {},
    getJJCD(data) {
      // let valueContent = JSON.parse(data.valueContent);
      // let dataUrgency = valueContent.filter(item => {
      //   return item.code == "urgency";
      // })[0];
      // if (dataUrgency.value.indexOf("{") == -1) {
      //   return 0;
      // }
      // let valueConf = JSON.parse(dataUrgency.value);
      // let value = valueConf.name;
      return 0;
    },
    loadData() {
      this.bLoading = true;
      this.searchParams.dateFormat = "%Y-%m-%d";
      getListAssign(this.searchParams)
        .then(({ tableResponse }) => {
          tableResponse.list.forEach(item => {
            item.valueContent = formatValueContentToList(item.valueContent);
          });
          this.dataSource = tableResponse.list;
          this.oPagination.total = tableResponse.count;
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    onSearch(params) {
      Object.assign(this.searchParams, params, { pageNo: 1 });
      this.loadData();
    },
    showReceiveDetail(data) {
      this.showDetail = true;
    },
    showFormDetail(data) {
      this.$router.push({
        path: "/document/seeAssign/do",
        query: {
          processUserId: data.processUserId,
          processUserDetailId: data.detailId
        }
      });
    }
  }
};
</script>

