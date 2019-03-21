<template>
  <div>
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["conf", "disabled", "inputWidth", "value", "multiple", "autoSelect"],
  data() {
    return {
      val: this.value,
      optionsList: null
    };
  },
  watch: {
    val(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    changeHandler(value) {
      if (this.conf.code == "type") {
        let level = 2;
        let val = value.value;
        if (val < 200) {
          level = 1;
        } else if (val < 300) {
          level = 2;
        } else {
          level = 3;
        }
        this.$store.dispatch("getGroupList", level);
      }
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
    this.$bus.$on("changeOptions", (optionsList, key) => {
      if (key == this.conf.code) {
        this.optionsList = optionsList;
      }
    });
  },
  computed: {
    ...mapGetters(["getDataByFuncName"]),
    selectDataList() {
      if (this.optionsList) {
        return this.optionsList;
      }
      let list = [];
      if (this.conf.dataType == 2) {
        list = this.conf.data.array;
      } else if (this.conf.dataType == 3) {
        list = this.getDataByFuncName(this.conf);
      }
      // if (
      //   this.value &&
      //   !list.some(item => {
      //     return item.value == this.value.value;
      //   })
      // ) {
      //   list.push(this.value);
      // }

      if (this.autoSelect && list.length > 0) {
        this.val = list[0];
      }
      return list;
    }
  }
};
</script>

