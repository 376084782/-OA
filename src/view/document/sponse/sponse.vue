<template>
  <section>
    <el-tabs class="top-sec-tab" v-model="activeName">
      <el-tab-pane label="发文" name="1"></el-tab-pane>
      <el-tab-pane label="收文" name="2"></el-tab-pane>
    </el-tabs>
    <el-card class="mgTop24">
      <list-search @search="onSearch" :search-form="searchParams"></list-search>
      <el-row class="bottom-row mgTop24">
        <el-button v-if="activeName=='1'" type="primary" size="small" @click="createSponse">发起公文</el-button>
        <el-button v-else type="primary" size="small" @click="doShowWen">收文登记</el-button>
      </el-row>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource" style="min-height: 400px">
          <el-table-column prop="flowCode" label="文号"></el-table-column>
          <el-table-column prop="flowTitle" label="标题"></el-table-column>
          <el-table-column prop="numid" label="紧急程度">
            <template slot-scope="scope">{{scope.row.valueContent['urgency']}}</template>
          </el-table-column>
          <el-table-column prop="finishStatusDictionary" label="状态"></el-table-column>
          <el-table-column width="220px" prop="organizationGroupName" label="来文单位">
            <template slot-scope="scope">{{scope.row.valueContent['mainGroupList']}}</template>
          </el-table-column>
          <template v-if="activeName=='2'">
            <el-table-column width="180px" prop="detailFinishTime" label="限办日期">
              <template slot-scope="scope">{{scope.row.valueContent['documentSendDate']}}</template>
            </el-table-column>
          </template>
          <el-table-column prop="finishStatusDictionary" label="类型"></el-table-column>
          <el-table-column label="操作" v-if="activeName=='1'">
            <template slot-scope="scope">
              <el-button @click="showFormDetail(scope.row)" type="text">详情</el-button>
              <i class="grey">|</i>
              <el-button @click="showReceiveDetail(scope.row)" type="text">接收情况</el-button>
            </template>
          </el-table-column>
          <el-table-column v-else label="操作">
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
    <modal-detail :visible.sync="showDetail" :id="selectedProcessId"></modal-detail>
  </section>
</template>
<script>
import listSearch from "./components/search";
import modalDetail from "./components/modalDetail";
import { getListSend, getListGet } from "api/document";
import { formatValueContentToList } from "utils/assist";
export default {
  components: { listSearch, modalDetail },
  data() {
    return {
      selectedProcessId: 0,
      activeName: "1",
      showDetail: false,
      bLoading: false,
      searchParams: {
        modelTypeList: [100, 101]
      },
      dataSource: [],
      oPagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  watch: {
    activeName(val) {
      this.searchParams = {
        modelTypeList: [100, 101]
      };
      this.onSearch();
    }
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
    getJJCD(data) {
      let valueContent = JSON.parse(data.valueContent);
      let dataUrgency = valueContent.filter(item => {
        return item.code == "urgency";
      })[0];
      if (dataUrgency.value.indexOf("{") == -1) {
        return 0;
      }
      let valueConf = JSON.parse(dataUrgency.value);
      let value = valueConf.name;
      return value;
    },
    doShowWen() {},
    createSponse() {
      this.$router.push({
        path: "/document/sponse/do",
        query: {
          modelType: 100,
          permitButton: 1
        }
      });
    },
    showReceiveDetail(data) {
      this.selectedProcessId = data.processUserId;
      this.showDetail = true;
    },
    showFormDetail(data) {
      let routeData = {
        name: "详情",
        url: "/document/seeSponse/do",
        query: {
          processUserId: data.processUserId,
          processUserDetailId: data.detailId,
          processUserWatcherId: data.processUserWatcherId,
          permitButton: data.permitButton,
          permitModelType: data.permitModelType
        }
      };
      this.$store.dispatch("addBreadCurmbList", routeData);
      this.$router.push({
        path: routeData.url,
        query: routeData.query
      });
    },
    // 请求数据函数
    loadData() {
      this.bLoading = true;
      let func = this.activeName == 1 ? getListSend : getListGet;
      this.searchParams.dateFormat = "%Y-%m-%d";
      func(this.searchParams)
        .then(({ tableResponse }) => {
          this.dataSource = tableResponse.list;
          this.dataSource.forEach(item => {
            console.log(item, 222);
            item.valueContent = formatValueContentToList(item.valueContent);
          });
          this.oPagination.pageNo = tableResponse.pageNum;
          this.oPagination.total = tableResponse.count;
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    // 搜索
    onSearch(params) {
      Object.assign(this.searchParams, params, { pageNo: 1 });
      this.loadData();
    },
    // 翻页
    onPageChange(page) {
      Object.assign(this.searchParams, { pageNo: page });
      this.loadData();
    }
  },
  created() {
    this.onSearch();
  }
};
</script>

