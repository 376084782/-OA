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
      let start = new Date(this.form.detailStartTime);
      let end = new Date(this.form.detailDeadTime);
      return timeFormater(
        (end.getTime() - start.getTime()) / 1000,
        "d天 hh:mm:ss"
      );
    }
  },
  watch: {
    form(val) {
      console.log(222, val);
    }
  },
  data() {
    return {};
  }
};
</script>

