<template>
  <section>
    <el-tabs class="top-sec-tab" v-model="activeName">
      <el-tab-pane label="我发起的" name="10"></el-tab-pane>
      <el-tab-pane label="待办任务" name="1"></el-tab-pane>
      <el-tab-pane label="已办任务" name="2"></el-tab-pane>
    </el-tabs>
    <el-card class="mgTop24">
      <list-search @search="onSearch" :status="activeName"></list-search>
      <el-row class="bottom-row mgTop24">
        <el-button type="primary" size="small" @click="showFormDo()">申请调班</el-button>
      </el-row>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource" style="min-height: 400px">
          <el-table-column prop="processUserId" label="序号"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="createTime" label="排班时间"></el-table-column>
          <el-table-column prop="name" label="发起申请人"></el-table-column>
          <el-table-column prop="organizationGroupName" label="发起部门"></el-table-column>
          <el-table-column prop="modelTypeDictionary" label="排班当前状态"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <template v-if="scope.row.modelTypeDictionary==1">
                <el-button @click="showFormDetail(scope.row)" type="text">办理</el-button>
              </template>
              <template v-else>
                <el-button @click="showFormDetail(scope.row)" type="text">查看</el-button>
              </template>
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
import {getListAssign} from 'api/document'
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
      this.$router.push({
        path: "/document/seeSchedualChange/do",
        query: {
          processUserId: data.processUserId,
          processUserDetailId: data.detailId
        }
      });
    },
    showFormDo() {
      this.$router.push({
        path: "/document/schedualApply/do",
        query: {
          modelType: 410,
          permitButton: 1
        }
      });
    },
    // 搜索
    onSearch(params) {
      Object.assign(this.searchParams, params);
      this.loadData();
    }
  },
  created() {
    this.onSearch();
  }
};
</script>

