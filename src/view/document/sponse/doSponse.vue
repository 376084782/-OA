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
        class="mgTop24 mgLeft185"
      >
        <template slot="step0">
          <div v-if="activeStep==0">
            <div class="bubble-wrap">
              <div class="bubble">
                <el-row>
                  <dynamic-form input-width="280px" label-width="160px" :config="contentTop"></dynamic-form>
                </el-row>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="tip-detail">
              <span class="action success">发起</span>&nbsp;&nbsp;
              <span class="tip-date">20293193</span>
            </p>
            <p class="tip-detail">beizhu</p>
          </div>
        </template>
        <template slot="step1">
          <div v-if="activeStep==1">
            <div class="bubble-wrap">
              <div class="bubble">
                <el-row>
                  <dynamic-form label-width="160px" :config="contentTop"></dynamic-form>
                </el-row>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="tip-detail">
              <span class="action success">同意</span>&nbsp;&nbsp;
              <span class="tip-date">20293193</span>
            </p>
            <p class="tip-detail">beizhu</p>
          </div>
        </template>
        <template slot="step2">
          <div v-if="activeStep==2">
            <div class="bubble-wrap">
              <div class="bubble">
                <el-row>
                  <dynamic-form label-width="160px" :config="contentTop"></dynamic-form>
                </el-row>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="tip-detail">
              <span class="action success">发起</span>&nbsp;&nbsp;
              <span class="tip-date">20293193</span>
            </p>
            <p class="tip-detail">beizhu</p>
          </div>
        </template>
        <template slot="step3">
          <div v-if="activeStep==3">
            <div class="bubble-wrap">
              <div class="bubble">
                <el-row>
                  <dynamic-form label-width="160px" :config="contentTop"></dynamic-form>
                </el-row>
              </div>
            </div>
          </div>
          <template v-else-if="activeStep==4">
            <p class="tip-detail">
              <span class="action">主送单位</span>&nbsp;&nbsp;
              <span class="tip-date">公司公司</span>
            </p>
            <p class="tip-detail">
              <span class="action">主送单位</span>&nbsp;&nbsp;
              <span class="tip-date">公司公司</span>
            </p>
          </template>
        </template>
      </step>
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
      editData: {
        jjcd: 0
      }
    };
  },
  mounted() {
    getDetail().then(({ contentTop }) => {
      this.contentTop = contentTop;
      this.$nextTick(() => {
        this.$refs.step.resetHeight();
      });
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

