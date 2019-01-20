<template>
  <el-dialog title="接收情况" :visible.sync="visible" width="680px" :before-close="handleClose">
    <el-table v-loading="bLoading" :data="data">
      <el-table-column prop label="接收单位/人"></el-table-column>
      <el-table-column prop="region" label="接收情况"></el-table-column>
      <el-table-column prop="numid" label="接收时间"></el-table-column>
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
        console.log("idddd", this.id);
        getDetailListReceive({
          processUserId: this.id
        }).then(e => {
          console.log(2321331, e);
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

