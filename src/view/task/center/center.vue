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
        <tree-table
          @doTask="doTask"
          ref="tree"
          :active-name="activeName"
          @addSubTask="addSubTask"
          v-if="showTree"
        ></tree-table>
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
      lastSel: {}
    };
  },
  watch: {
    activeName(val) {
      this.$refs.tree && this.$refs.tree.update();
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
      this.$refs.tree && this.$refs.tree.update(this.searchParams);
    }
  },
  created() {
    this.onSearch();
  }
};
</script>

