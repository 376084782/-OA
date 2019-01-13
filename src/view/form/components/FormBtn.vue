<template>
  <div>
    <template v-if="conf.code=='permitSubmit'">
      
    </template>
    <el-button type="primary" @click="clickBtn">{{conf.showValue}}</el-button>
  </div>
</template>
<script>
export default {
  props: ["conf"],
  methods: {
    clickBtn() {
      if (this.conf.code == "permitSubmit") {
        this.$emit("clickTJ");
      }
    }
  }
};
</script>

