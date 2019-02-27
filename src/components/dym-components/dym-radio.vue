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
  props: ["conf", "disabled", "value", "autoSelect", "select"],
  data() {
    return {
      val: this.value && this.value.value
    };
  },
  watch: {
    val(val) {
      let conf = this.radioDataList.filter(item => {
        return item.value == val;
      });
      this.$emit("input", conf[0]);
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
        let selConf = {};
        if (typeof this.select == "string" && this.select.indexOf("{") > -1) {
          selConf = JSON.parse(this.select);
        } else {
          selConf = this.select;
        }
        if (typeof selConf == "object") {
          this.val = selConf.value;
        } else{
          this.val = list[0].value;
        }
      }
      return list;
    }
  }
};
</script>

