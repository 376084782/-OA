<template>
  <section>
    <el-tabs style="margin-top: -16px;" class="top-sec-tab" v-model="activeName">
      <el-tab-pane label="待办任务" name="-1"></el-tab-pane>
      <el-tab-pane label="已办任务" name="1"></el-tab-pane>
      <el-tab-pane label="我发起的" name="2"></el-tab-pane>
    </el-tabs>
    <el-card class="mgTop24">
      <list-search @search="onSearch"></list-search>
      <el-button @click="createTask" class="mgTop20" type="primary" size="small">发起任务</el-button>
      <section class="mgTop24" style="overflow:scroll;">
        <el-table v-loading="bLoading" :data="dataSource">
          <el-table-column type="index" label="序号" width="100px"></el-table-column>
          <el-table-column prop="flowCode" label="级别" min-width="100px">
            <template slot-scope="scope">{{scope.row.valueContent['urgency']}}</template>
          </el-table-column>
          <el-table-column prop="name" label="发起人" min-width="200px"></el-table-column>
          <el-table-column prop="finishStatusDictionary" label="状态" min-width="200px"></el-table-column>
          <el-table-column prop="flowCode" label="进度" min-width="200px">
            <template slot-scope="scope">{{scope.row.finishPercent}}%</template>
          </el-table-column>
          <el-table-column prop="flowCode" label="操作" min-width="200px">
            <template slot-scope="scope">
              <template v-if="scope.row.permitButton==5">
                <el-button type="text" @click="addSubTask(scope.row)">添加子任务</el-button>
                <i class="grey">|</i>
              </template>
              <el-button type="text" @click="seeDetail(scope.row)">查看</el-button>
              <template v-if="scope.row.permitButton==5">
                <i class="grey">|</i>
                <el-button type="text" @click="doTask(scope.row)">执行</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>
    <modal-add
      @success="onSearch"
      :father-process-user-id="selectFatherProcessUserId"
      :id="selectedProcessUserDetailId"
      :show.sync="showAdd"
    ></modal-add>
    <modal-percent @finish="finishHandler" :show.sync="visibleModalPercent"></modal-percent>
  </section>
</template>
<script>
import modalPercent from "../../form/components/modalPercent.vue";
import modalAdd from "./components/modalAdd.vue";
import listSearch from "./components/search";
import { getClubList } from "api/index";
import treeTable from "./components/tree-table.vue";
import { finishTask, agree } from "api/index";
import { getListAssign, getListChild } from "api/document";
import { formatValueContentToList } from "utils/assist";
import { getListMySendProcess } from "api";
export default {
  components: { listSearch, treeTable, modalAdd, modalPercent },
  data() {
    return {
      showTree: true,
      visibleModalPercent: false,
      selectFatherProcessUserId: 0,
      selectedProcessUserDetailId: 0,
      showAdd: false,
      expandList: [],
      activeName: "1",
      bLoading: false,
      searchParams: {},
      dataSource: [],
      listDone: [{}, {}, {}],
      listNotDone: [{}],
      oPagination: {},
      lastSel: {},
    };
  },
  watch: {
    activeName(val) {
      this.getData();
    }
  },
  mounted() {
    this.activeName = this.$route.query.activeNav || "-1";
    this.$store.dispatch("updateBreadCurmbList", [
      {
        name: "任务管理",
        url: this.$route.path
      },
      {
        name: "任务中心",
        url: this.$route.path
      }
    ]);
  },
  methods: {
    finishHandler(data) {
      if (data.percent >= 100) {
        // 调用完成
        agree({
          processUserDetailId: this.lastSel.detailId,
          valueContent: []
        }).then(e => {
          this.visibleModalPercent = false;
          this.showTree = false;
          this.$nextTick(() => {
            this.showTree = true;
          });
        });
      } else {
        finishTask({
          processUserDetailId: this.lastSel.detailId,
          detailPercent: data.percent,
          detailContent: data.content
        }).then(e => {
          this.visibleModalPercent = false;
          this.showTree = false;
          this.$nextTick(() => {
            this.showTree = true;
          });
        });
      }
    },
    doTask(data) {
      this.lastSel = data;
      this.visibleModalPercent = true;
    },
    seeDetail(data) {
      let routeData = {
        name: "详情",
        url: "/document/seeSponse/do",
        query: {
          processUserId: data.processUserId,
          processUserDetailId: data.detailId,
          processUserWatcherId: data.processUserWatcherId,
          permitButton: data.permitButton,
          permitModelType: data.permitModelType,
          title: "查看任务"
        }
      };
      this.$store.dispatch("addBreadCurmbList", routeData);
      this.$router.push({
        path: routeData.url,
        query: routeData.query
      });
    },
    addSubTask(data) {
      this.selectedProcessUserDetailId = data.detailId;
      this.selectFatherProcessUserId = data.processUserId;
      this.showAdd = true;
    },
    createTask() {
      let routeData = {
        name: "发起",
        url: "/document/sponse/do",
        query: {
          modelType: 201,
          permitButton: 1,
          title: "发起任务"
        }
      };
      this.$store.dispatch("addBreadCurmbList", routeData);
      this.$router.push({
        path: routeData.url,
        query: routeData.query
      });
    },
    showFormDetail(data) {
      let routeData = {
        name: "发起公文",
        url: `/document/seeTaskDone${this.activeName == "1" ? "1" : ""}/do`,
        query: {
          data,
          title: "查看任务"
        }
      };
      this.$store.dispatch("addBreadCurmbList", routeData);
      this.$router.push({
        path: routeData.url,
        query: routeData.query
      });

      this.$router.push({});
    },
    // 搜索
    onSearch(params) {
      this.searchParams = {};
      Object.assign(this.searchParams, params, { pageIndex: 1 });
      this.getData();
    },
    getData() {
      let func = this.activeName == 2 ? getListMySendProcess : getListAssign;
      this.searchParams.modelTypeList = [201];
      this.searchParams.pageSearchStatus = this.activeName == -1 ? "1" : "2";
      func(this.searchParams).then(({ tableResponse }) => {
        this.dataSource = tableResponse.list;
        this.dataSource.forEach(item => {
          item.valueContent = formatValueContentToList(item.valueContent);
        });
      });
    }
  },
  created() {
    this.onSearch();
  }
};
</script>

