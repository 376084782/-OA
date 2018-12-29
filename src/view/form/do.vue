<template>
  <section>
    <el-card class="mgTop24">
      <!-- <h3>发文拟稿</h3> -->
      <dynamic-form class="mgTop24" :config="contentTop"></dynamic-form>
      <div class="line mgTop40"></div>
      <h4 class="mgTop40 mgLeft75">公文处理流程图：</h4>
      <step
        ref="step"
        :style="{height:activeStep==3?'650px':'auto'}"
        :active="activeStep"
        :data="stepConfig"
        class="mgTop24 mgLeft185"
      ></step>
      <el-row class="mgLeft185">
        <el-button type="primary" @click="clickFP">分派</el-button>
        <el-button @click="clickJS">拒收</el-button>
        <el-button @click="clickZB">转办</el-button>
        <el-button type="primary" @click="clickTJ">提交</el-button>
      </el-row>
    </el-card>
    <modal-js :visible.sync="showJS"></modal-js>
    <modal-zb :visible.sync="showZB"></modal-zb>
  </section>
</template>
<script>
import { getDetail } from "api/index";
import ModalJs from "./components/modalJS";
import ModalZb from "./components/modalZB";
export default {
  components: { ModalJs, ModalZb },
  data() {
    return {
      showJS: false,
      showZB: false,
      activeStep: 0,
      id: 1,
      nextPeople: 0,
      radio2: 0,
      contentTop: [],
      contentStep: [],
      stepConfig: [],
      editData: {
        jjcd: 0
      }
    };
  },
  mounted() {
    console.log(this.$route.params.type);
    getDetail({
      type: this.$route.params.type
    }).then(({ contentTop, contentStep, activeStep }) => {
      this.contentTop = contentTop;
      this.stepConfig = contentStep;
      this.activeStep = activeStep;
    });
  },
  methods: {
    clickFP() {},
    clickJS() {
      this.showJS = true;
    },
    clickZB() {
      this.showZB = true;
    },
    clickTJ() {}
  }
};
</script>

