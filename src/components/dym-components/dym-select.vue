<template>
  <el-select
    :disabled="disabled||conf.readOnly"
    v-model="val"
    :style="{width:inputWidth}"
    :multiple="multiple"
    filterable
    @change="changeHandler"
  >
    <el-option v-for="item in selectDataList" :key="item.value" :label="item.name" :value="item"></el-option>
  </el-select>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["conf", "disabled", "inputWidth", "value", "multiple", "autoSelect"],
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
  methods: {
    changeHandler(value) {
      this.$bus.$emit("changeSel", {
        conf: this.conf,
        value
      });
    },
    getInitData() {
      if (this.conf.data && this.conf.data.function) {
        this.$store.dispatch(this.conf.data.function);
      }
    }
  },
  mounted() {
    this.getInitData();
  },
  computed: {
    ...mapGetters(["getDataByFuncName"]),
    selectDataList() {
      let list = [];
      if (this.conf.dataType == 2) {
        list = this.conf.data.array;
      } else if (this.conf.dataType == 3) {
        list = this.getDataByFuncName(this.conf);
      }
      if (
        this.value &&
        !list.some(item => {
          return item.value == this.value.value;
        })
      ) {
        list.push(this.value);
      }

      if (this.autoSelect && list.length > 0) {
        this.val = list[0];
      }
      return list;
    }
  }
};
</script>

