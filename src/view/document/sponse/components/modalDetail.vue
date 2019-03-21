<template>
  <el-dialog title="接收情况" :visible.sync="visible" width="680px" :before-close="handleClose">
    <el-table v-loading="bLoading" :data="data">
      <el-table-column prop="businessName" label="接收单位/人"></el-table-column>
      <el-table-column prop="isReadDictionary" label="接收情况"></el-table-column>
      <el-table-column prop="updateTime" label="接收时间"></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import { getDetailListReceive } from "api/document";
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      bLoading: false,
      data: []
    };
  },
  watch: {
    visible(flag) {
      if (flag) {
        getDetailListReceive({
          processUserId: this.id
        }).then(e => {
          this.data = e.processUserWatcherList;
        });
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

