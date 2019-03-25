<template>
  <el-dialog :visible="show" @update:visible="toggle" width="1020px" title="发起任务">
    <common-form @success="successHandler" :from-modal="true" :query-data="queryData" v-if="show"></common-form>
  </el-dialog>
</template>
<script>
import commonForm from "view/form/do-inner.vue";
export default {
  components: { commonForm },
  props: ["show", "id", "fatherProcessUserId"],
  data() {
    return {
      queryData: {
        permitButton: 1,
        modelType: 201,
        fatherProcessUserId: this.fatherProcessUserId,
        fatherProcessUserDetailId: this.id
      }
    };
  },
  watch: {
    show(flag) {
      if (flag) {
        this.queryData.fatherProcessUserDetailId = this.id;
        this.queryData.fatherProcessUserId = this.fatherProcessUserId;
      }
    }
  },
  methods: {
    successHandler() {
      this.toggle(false);
      this.$emit("success");
    },
    toggle(flag) {
      this.$emit("update:show", flag);
    }
  }
};
</script>

