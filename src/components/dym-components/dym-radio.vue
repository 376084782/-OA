<template>
  <el-radio-group v-model="val">
    <el-radio
      :disabled="disabled||conf.readOnly"
      v-for="(item , index) in radioDataList"
      :key="index"
      :label="item.value"
    >{{item.name}}</el-radio>
  </el-radio-group>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["conf", "disabled", "value", "autoSelect"],
  data() {
    return {
      val: this.value
    };
  },
  watch: {
    val(val) {
      this.$emit("input", val);
    }
  },
  computed: {
    ...mapGetters(["getDataByFuncName"]),
    radioDataList() {
      let list = [];
      if (this.conf.dataType == 2) {
        list = this.conf.data.array;
      } else if (this.conf.dataType == 3) {
        list = this.getDataByFuncName(this.conf);
      }
      if (this.autoSelect && list.length > 0) {
        this.val = list[0].value;
      }
      return list;
    }
  }
};
</script>

