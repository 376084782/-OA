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
import "./tree-table.scss";
export default {
  data() {
    return {
      dataSource: []
    };
  },
  methods: {
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span class="left">{data.name}</span>
          <span class="right">
            <span style="width:100px;">
              <span class="circle-before warning">特急</span>
            </span>
            <span style="width:100px;">特急</span>
            <span style="width:100px;" class="table-cell-grey1">
              特急
            </span>
            <span style="width:100px;" class="font-blue">
              特急
            </span>
            <span style="width:100px;">特急</span>
            <span style="width:200px">
              <el-button type="text">发起任务</el-button>
              <i class="grey">|</i>
              <el-button type="text">查看</el-button>
              <i class="grey">|</i>
              <el-button type="text">执行</el-button>
            </span>
          </span>
        </span>
      );
    },
    loadNode1(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region" }]);
      }
      setTimeout(() => {
        const data = [
          {
            name: "leaf",
            leaf: true
          },
          {
            name: "zone"
          }
        ];

        resolve(data);
      }, 500);
    }
  }
};
</script>

