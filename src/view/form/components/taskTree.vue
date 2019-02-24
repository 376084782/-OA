<template>
  <div style="margin:0 -24px">
    <el-tree
      class="inner-form-tree"
      :render-content="renderContent"
      ref="tree"
      :data="dataSource"
      node-key="id"
      :load="loadNode1"
      lazy
    ></el-tree>
  </div>
</template>
<script>
import "./taskTree.scss";
import { getListAssign, getListChild } from "api/document";
import { formatValueContentToList } from "utils/assist";
export default {
  props: ["parId"],
  data() {
    return {
      dataSource: []
    };
  },
  methods: {
    overTree() {},
    outTree() {},
    renderContent(h, { node, data, store }) {
      let valueContent = formatValueContentToList(data.valueContent);
      return (
        <span class="custom-tree-node">
          <el-tooltip
            class="item"
            effect="light"
            placement="right-start"
            trigger="click"
            visible-arrow={false}
          >
            <span>{data.flowTitle}</span>
            <template slot="content">
              <div class="tootip-cnt">
                <p>
                  <span>执行人：</span>
                  {valueContent.excuteUserList}
                </p>
                <p>
                  <span>状态：</span>
                  {data.finishStatusDictionary}
                </p>
                <p>
                  <span>进度：</span>
                  <el-progress
                    style="margin-top:6px;"
                    text-inside={false}
                    show-text={false}
                    stroke-width={6}
                    percentage={data.finishPercent}
                    status="success"
                  />
                </p>
                <p>
                  <span>开始日期：</span>
                  {valueContent.flowStartTime}
                </p>
                <p>
                  <span>截止日期：</span>
                  {valueContent.flowDeadTime}
                </p>
              </div>
            </template>
          </el-tooltip>
        </span>
      );
    },
    loadNode1(node, resolve) {
      if (!this.parId) {
        return;
      }
      if (node.level === 0) {
        getListChild({
          fatherProcessUserId: this.parId
        }).then(({ processUserList }) => {
          resolve(processUserList);
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

