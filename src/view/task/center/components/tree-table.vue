<template>
  <div class="tree-wrap">
    <div class="title-wrap">
      <span>任务名称</span>
      <div class="right">
        <span style="width:100px;">级别</span>
        <span style="width:100px;">执行人</span>
        <span style="width:100px;">发起人</span>
        <span style="width:100px;">状态</span>
        <span style="width:100px;">进度</span>
        <span style="width:200px;">操作</span>
      </div>
    </div>
    <div class="content-wrap">
      <el-tree
        v-if="showTree"
        ref="tree"
        :data="dataSource"
        node-key="id"
        :render-content="renderContent"
        :load="loadNode1"
        lazy
      ></el-tree>
    </div>
  </div>
</template>
<script>
import "components/tree-table.scss";
import { getListAssign, getListChild } from "api/document";
import { getListMySendProcess } from "api";
import {
  formatValueContentToList,
  formatValueContentToListObject
} from "utils/assist";
export default {
  props: ["activeName"],
  data() {
    return {
      dataSource: [],
      showTree: true,
      searchData: {}
    };
  },
  methods: {
    update(data = {}) {
      this.searchData = data;
      this.showTree = false;
      this.$nextTick(() => {
        this.showTree = true;
      });
    },
    renderContent(h, { node, data, store }) {
      let valueContent = formatValueContentToList(data.valueContent);
      let valueObj = formatValueContentToListObject(data.valueContent);
      let urgencyMap = ["", "primary", "warn", "danger"];
      if (data.permitButton == 5) {
        return (
          <span class="custom-tree-node">
            <span class="left">{data.flowTitle}</span>
            <span class="right">
              <span style="width:100px;">
                <span
                  class={urgencyMap[valueObj.urgency.value] + " circle-before "}
                >
                  {valueContent.urgency}
                </span>
              </span>
              <span style="width:100px;">{data.detailName}</span>
              <span style="width:100px;" class="table-cell-grey1">
                {data.name}
              </span>
              <span style="width:100px;">{data.finishStatusDictionary}</span>
              <span style="width:100px;">{data.finishPercent}%</span>
              <span style="width:200px">
                <el-button
                  type="text"
                  on-click={() => {
                    this.addSubTask(data);
                  }}
                >
                  发起任务
                </el-button>
                <i class="grey">|</i>
                <el-button
                  type="text"
                  on-click={() => {
                    this.seeDetail(data);
                  }}
                >
                  查看
                </el-button>
                <i class="grey">|</i>
                {data.permitButton == 5}
                <el-button
                  type="text"
                  on-click={() => {
                    this.doTask(data);
                  }}
                >
                  执行
                </el-button>
              </span>
            </span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <span class="left">{data.flowTitle}</span>
            <span class="right">
              <span style="width:100px;">
                <span
                  class={urgencyMap[valueObj.urgency.value] + " circle-before "}
                >
                  {valueContent.urgency}
                </span>
              </span>
              <span style="width:100px;">{data.detailName}</span>
              <span style="width:100px;" class="table-cell-grey1">
                {data.name}
              </span>
              <span style="width:100px;">{data.finishStatusDictionary}</span>
              <span style="width:100px;">{data.finishPercent}%</span>
              <span style="width:200px">
                <el-button
                  type="text"
                  on-click={() => {
                    this.seeDetail(data);
                  }}
                >
                  查看
                </el-button>
              </span>
            </span>
          </span>
        );
      }
    },
    doTask(data) {
      this.$emit("doTask", data);
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
      this.$emit("addSubTask", data);
    },
    loadNode1(node, resolve) {
      if (node.level === 0) {
        let func = this.activeName == 2 ? getListMySendProcess : getListAssign;
        func({
          modelTypeList: [201],
          pageSearchStatus: this.activeName == -1 ? "1" : "2"
        }).then(({ tableResponse }) => {
          resolve(tableResponse.list);
        });
        return;
      }
      getListChild({
        fatherProcessUserId: node.data.processUserId
      }).then(({ processUserList }) => {
        resolve(processUserList);
      });
    }
  }
};
</script>

