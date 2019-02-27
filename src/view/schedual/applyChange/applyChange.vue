<template>
  <section>
    <el-tabs style="margin-top: -16px;" class="top-sec-tab" v-model="activeName">
      <el-tab-pane label="我发起的" name="10"></el-tab-pane>
      <el-tab-pane label="待办任务" name="1"></el-tab-pane>
      <el-tab-pane label="已办任务" name="2"></el-tab-pane>
    </el-tabs>
    <el-card class="mgTop24">
      <list-search @search="onSearch" :status="activeName"></list-search>
      <el-row class="bottom-row mgTop20" v-if="activeName=='10'">
        <el-button type="primary" size="small" @click="showFormDo()">申请调班</el-button>
      </el-row>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource">
          <el-table-column width="100px" type="index" label="序号"></el-table-column>
          <el-table-column prop="title" label="标题" min-width="200px"></el-table-column>
          <el-table-column min-width="180px" prop="createTime" label="排班时间"></el-table-column>
          <el-table-column prop="name" label="发起申请人"></el-table-column>
          <el-table-column prop="organizationGroupName" label="发起部门"></el-table-column>
          <el-table-column prop="modelTypeDictionary" label="排班当前状态"></el-table-column>
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
import { getListMySendProcess } from "api/index";
import { getListAssign } from "api/document";
import { dateFormater } from "utils/assist.js";
export default {
  components: { listSearch },
  data() {
    return {
      activeName: "10",
      dataSource: [],
      dataMap: {
        10: [],
        1: [],
        2: []
      },
      searchParams: {
        modelTypeList: [410]
      },
      bLoading: false
    };
  },
  watch: {
    activeName(val) {
      let modelTypeList = this.searchParams.modelTypeList;
      this.searchParams = {
        pageSearchStatus: this.activeName,
        modelTypeList
      };
      this.loadData();
    }
  },
  mounted() {
    this.activeName = this.$route.query.activeNav || "10";
    this.$store.dispatch("updateBreadCurmbList", [
      {
        name: "排班管理",
        url: this.$route.path
      },
      {
        name: "调班申请",
        url: this.$route.path
      }
    ]);
  },
  methods: {
    updateTable() {
      this.dataSource = this.dataMap[this.activeName];
    },
    // 请求数据函数
    loadData() {
      this.bLoading = true;
      let pr;
      if (this.activeName == "10") {
        // 我发起的
        pr = this.updateListMine();
      } else {
        pr = this.updateList();
      }
      pr.then(e => {
        this.updateTable();
      });
    },
    updateListMine() {
      return getListMySendProcess(this.searchParams)
        .then(({ tableResponse }) => {
          this.dataMap[10] = tableResponse.list;
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    updateList() {
      let status = this.activeName;
      this.searchParams.pageSearchStatus = status;
      return getListAssign(this.searchParams)
        .then(({ tableResponse }) => {
          this.dataMap[status] = tableResponse.list;
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    showFormDetail(data) {
      let routeData = {
        name: "发起公文",
        url: "/document/seeSchedualChange/do",
        query: {
          processUserId: data.processUserId,
          processUserDetailId: data.detailId,
          title: "查看调班"
        }
      };
      this.$store.dispatch("addBreadCurmbList", routeData);
      this.$router.push({
        path: routeData.url,
        query: routeData.query
      });
    },
    showFormDo() {
      let routeData = {
        name: "发起",
        url: "/document/schedualApply/do",
        query: {
          modelType: 410,
          permitButton: 1,
          title: "申请调班"
        }
      };
      this.$store.dispatch("addBreadCurmbList", routeData);
      this.$router.push({
        path: routeData.url,
        query: routeData.query
      });
    },
    // 搜索
    onSearch(params) {
      this.searchParams = {
        modelTypeList: [410]
      };
      Object.assign(this.searchParams, params);
      this.loadData();
    }
  },
  created() {
    this.onSearch();
  }
};
</script>

