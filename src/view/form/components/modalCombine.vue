<template>
  <el-dialog title="选择关联公文" :visible.sync="visible" width="1160px" :before-close="handleClose">
    <modal-combine-search @search="searchHandler"></modal-combine-search>
    <el-table :row-style="rowStyle" :data="list">
      <el-table-column label="文号"></el-table-column>
      <el-table-column label="标题"></el-table-column>
      <el-table-column label="紧急程度"></el-table-column>
      <el-table-column label="状态"></el-table-column>
      <el-table-column label="来文单位"></el-table-column>
      <el-table-column label="发文日期"></el-table-column>
      <el-table-column label="类型"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="selectedIds.indexOf(scope.row.id)>-1"
            type="text"
            @click="toggleSel(scope.row,false)"
          >取消选择</el-button>
          <el-button v-else type="text" @click="toggleSel(scope.row,true)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-button size="small">取消</el-button>
      <el-button size="small" type="primary">确认</el-button>
    </template>
  </el-dialog>
</template>
<script>
import modalCombineSearch from "./modalCombineSearch";
export default {
  components: { modalCombineSearch },
  props: ["visible"],
  computed: {
  },
  methods: {
    rowStyle(scope, index) {
      if (this.selectedIds.indexOf(scope.row.id) > -1) {
        return {
          'background-color':'rgba(75, 159, 253, .24)'
        }
      }
      return {};
    },
    toggleSel(data, flag) {
      let index = this.selectedIds.indexOf(data.id);
      if (flag) {
        if (index == -1) {
          // 如果没有选中过，添加到已选中
          this.selectedIds.push(data.id);
        }
      } else {
        if (index > -1) {
          // 如果已经选中，从选中列表中删除
          this.selectedIds.splice(index, 1);
        }
      }
    },
    searchHandler() {},
    handleClose() {
      this.$emit("update:visible", false);
    }
  },
  data() {
    return {
      selectedIds: [],
      list: [{ id: 1 }]
    };
  }
};
</script>

