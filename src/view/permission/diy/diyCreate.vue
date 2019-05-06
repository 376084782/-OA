<template>
  <el-card class="mgTop20">
    <div class="diy-step">
      <div class="circle" :class="getIconClass(1)">
        <i class="el-icon-check" v-if="1<step"></i>
        <template v-else>1</template>
      </div>
      <span class="text">基本设置</span>
      <div class="line" :class="getLineColor(1)"></div>
      <div class="circle" :class="getIconClass(2)">
        <i class="el-icon-check" v-if="2<step"></i>
        <template v-else>2</template>
      </div>
      <span class="text">表格设计</span>
      <div class="line" :class="getLineColor(2)"></div>
      <div class="circle" :class="getIconClass(3)">
        <i class="el-icon-check" v-if="3<step"></i>
        <template v-else>3</template>
      </div>
      <span class="text">审批意见</span>
    </div>
    <page1 :data.sync="data1" v-show="step==1" @next="step++"></page1>
    <page2 :data.sync="data1" v-show="step==2"></page2>
    <page3 :data.sync="data1" v-show="step==3"></page3>
  </el-card>
</template>
<script>
import page1 from "./step/page1.vue";
import page2 from "./step/page2.vue";
import page3 from "./step/page3.vue";
export default {
  components: { page1, page2, page3 },
  data() {
    return {
      step: 2,
      data1: {},
      data2: {},
      data3: {}
    };
  },
  methods: {
    getLineColor(step) {
      return step < this.step ? "blue" : "";
    },
    getIconClass(step) {
      if (step == this.step) {
        return "current";
      } else if (step < this.step) {
        return "done";
      } else {
        return "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.diy-step {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 720px;
  .line {
    &.blue {
      border-color: #5d9ff8;
      background-color: #5d9ff8;
    }
  }
  .text {
    white-space: nowrap;
    margin: 0 8px;
  }
  .circle {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 1000px;
    line-height: 32px;
    text-align: center;
    border: 1px solid black;
    border-color: #d9d9d9;
    background-color: white;
    color: #d9d9d9;
    &.current {
      border-color: #5d9ff8;
      background-color: #5d9ff8;
      color: white;
    }
    &.done {
      border-color: #5d9ff8;
      background-color: white;
      color: #5d9ff8;
    }
  }
  .line {
    margin: 0 8px;
  }
}
</style>


