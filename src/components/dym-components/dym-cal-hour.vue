<template>
  <el-input v-model="hour" disabled></el-input>
</template>
<script>
import { timeFormater } from "utils/assist";
export default {
  props: {
    form: Object,
    startKey: String,
    endKey: String
  },
  computed: {
    hour() {
      if (!this.form.detailStartTime || !this.form.detailDeadTime) {
        return "";
      }
      let start = new Date(this.form.detailStartTime);
      let end = new Date(this.form.detailDeadTime);
      return timeFormater((end.getTime() - start.getTime()) / 1000, "d天") + 1;
    }
  },
  watch: {
    form(val) {}
  },
  data() {
    return {};
  }
};
</script>

