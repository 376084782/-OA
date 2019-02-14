<template>
  <el-dialog :visible="show" @update:visible="toggle" width="1020px" title="添加子任务">
    <common-form @success="successHandler" :from-modal="true" :query-data="queryData" v-if="show"></common-form>
  </el-dialog>
</template>
<script>
import commonForm from "view/form/do-inner.vue";
export default {
  components: { commonForm },
  props: ["show", "id"],
  data() {
    return {
      queryData: {
        permitButton: 1,
        modelType: 201
      }
    };
  },
  watch: {
    show(flag) {
      if (flag) {
        console.log(this.id,'2222id')
        this.queryData.fatherProcessUserDetailId = this.id;
      }
    }
  },
  methods: {
    successHandler(){
      this.toggle(false);
      this.$emit('success')
    },
    toggle(flag) {
      this.$emit("update:show", flag);
    }
  }
};
</script>

