<template>
  <section v-loading="loading">
    <el-card class="mgTop24">
      <!-- <h3>发文拟稿</h3> -->
      <dynamic-form
        ref="editTop"
        :edit-data="editData"
        class="mgTop24"
        :config="contentTop"
        :rules="rulesTop"
        :disabled="!canEditTop"
        @showModalCombine="showModalCombine"
      ></dynamic-form>
      <div class="line mgTop40"></div>
      <h4 class="mgTop40 mgLeft75">公文处理流程图：</h4>
      <step
        ref="step"
        :style="{height:activeStep==3?'650px':'auto'}"
        :active="activeStep"
        :config="stepConfig"
        :data="stepData"
        class="mgTop24 mgLeft185"
      ></step>
      <el-row class="mgLeft185">
        <template v-for="(conf,index) in buttonConfig">
          <el-button type="primary" :key="index" @click="clickEvents(conf)">{{conf.showValue}}</el-button>
        </template>
        <!-- <el-button type="primary" @click="clickFP">分派</el-button>
          <el-button @click="clickJS">拒收</el-button>
        <el-button @click="clickZB">转办</el-button>-->
      </el-row>
    </el-card>
    <modal-js :visible.sync="showJS"></modal-js>
    <modal-zb :visible.sync="showZB"></modal-zb>
    <modal-change-name :visible.sync="showChangeName"></modal-change-name>
    <modal-combine :visible.sync="visibleModalCombine"></modal-combine>
  </section>
</template>
<script>
import {
  getFormTemp,
  createFlow,
  getPeopleListByOrg,
  getPeopleListByRole,
  getProcessDetail,
  agree,
  disAgree
} from "api/index";
import FormBtn from "./components/FormBtn";
import ModalJs from "./components/modalJS";
import ModalZb from "./components/modalZB";
import modalChangeName from "./components/modalChangeName";
import modalCombine from "./components/modalCombine";
import { setTimeout } from "timers";
export default {
  components: { ModalJs, ModalZb, FormBtn, modalChangeName, modalCombine },
  computed: {
    isStep1() {
      return true;
    }
  },
  data() {
    return {
      visibleModalCombine: false,
      showChangeName: false,
      processOrganizationId: 1,
      canEditTop: false,
      loading: true,
      showJS: false,
      showZB: false,
      activeStep: 0,
      id: 1,
      nextPeople: 0,
      radio2: 0,
      contentTop: [],
      rulesTop: {},
      stepConfig: [],
      stepData: {},
      buttonConfig: [],
      editData: {}
    };
  },
  mounted() {
    if (this.$route.query.processUserId) {
      this.getFormDetail({
        processUserId: this.$route.query.processUserId,
        processUserDetailId: this.$route.query.processUserDetailId
      });
    } else {
      this.createForm();
    }
  },
  methods: {
    showModalCombine() {
      this.visibleModalCombine = true;
    },
    clickEvents(data) {
      let flagValiRequired = this.$refs.editTop.$refs.form.validate(vali => {
        if (!vali) {
          this.$alert("必填项尚未填写，请检查输入。");
          return;
        } else {
          switch (data.code) {
            case "saveEdit": {
              this.clickTJ();
              break;
            }
            case "permitAgree": {
              this.clickAgree();
              break;
            }
            case "permitUnAgree": {
              this.clickDisagree();
              break;
            }
            case "permitSubmit": {
              this.clickTJ();
              break;
            }
            case "permitViewLog": {
              break;
            }
          }
        }
      });
    },
    getFormDetail(data) {
      getProcessDetail(data).then(e => {
        this.renderTemp(e);
      });
    },
    createForm() {
      this.loading = true;
      getFormTemp({
        modelType: this.$route.query.modelType,
        fatherProcessUserWatchId: this.$route.query.fatherProcessUserWatchId
      }).then(e => {
        this.renderTemp(e);
      });
    },
    renderTemp(e) {
      this.canEditTop = true;
      let { processUserDetailResponseList } = e;
      let config = {};
      if (processUserDetailResponseList) {
        config = processUserDetailResponseList[0] || {};
      } else {
        config = e;
      }
      let confContent = JSON.parse(config.processUser.content);
      this.processOrganizationId = config.processUser.processOrganizationId;
      this.contentTop = confContent;
      confContent.forEach(item => {
        if (item.required) {
          this.rulesTop[item.code] = [{ required: true }];
        }
        if (
          item.code == "organizationGroup" ||
          item.code == "mobile" ||
          item.code == "user"
        ) {
          this.$set(item, "autoSelect", true);
        }
      });
      if (config.processUser.valueContent) {
        let valueContent = JSON.parse(config.processUser.valueContent);
        valueContent.forEach(item => {
          let value = item.value;
          if (
            item.type == "workPlan-file" ||
            item.type == "workPlan-calendar"
          ) {
            value = JSON.parse(value);
          }
          this.$set(this.editData, item.code, value);
        });
      }
      this.buttonConfig = config.processButtonInfoList;
      let stepList = config.processUserStepList;
      stepList.forEach((item, step) => {
        let stepData = this.stepConfig[item.step - 1] || {};
        this.$set(this.stepConfig, item.step - 1, stepData);
        let userList = [];
        item.processUserDetailList &&
          item.processUserDetailList.forEach(userItem => {
            userList.push({
              name: userItem.businessName,
              roleName: "测试角色"
            });
            if (item.isDoingStep) {
              this.activeStep = step;
            }
            if (item.isDoingStep && userItem.isCurrentUserStep) {
              let cnt = [];
              if (userItem.content) {
                cnt = JSON.parse(userItem.content);
              }
              stepData.content = cnt;
            }
          });
        stepData.userList = userList;
        stepData.stepName = item.stepName;
        stepData.showEdit = item.isDoingStep;
        this.$set(this.stepConfig, item.step - 1, stepData);
        if (step < stepList.length - 1) {
          this.createConfNext(stepList[step + 1].processUserDetailList, step);
        }
      });
      this.loading = false;
    },
    createConfNext(listPeople, step) {
      if (step == this.stepConfig.length) {
        // 已经是最后一步时没有下一步执行人
        return;
      }
      let listNext = [];
      if (!this.stepConfig[step].content) {
        this.stepConfig[step].content = [];
      }
      let list = [
        {
          name: "下一步执行人",
          type: "radio-next-user",
          dataType: 2,
          code: "nextUserId",
          fixed: false,
          autoSelect: true,
          data: {
            list: listPeople
          }
        },
        {
          name: "下一步办结时限",
          type: "date",
          code: "nextDeadTime",
          fixed: false
        }
      ];
      this.$set(
        this.stepConfig[step],
        "content",
        this.stepConfig[step].content.concat(list)
      );
    },
    getValueContent() {
      let valueContent = [];
      let indexMap = {};
      this.contentTop.forEach(item => {
        let value = "";
        let valOld = this.editData[item.code];
        if (valOld && typeof valOld == "object") {
          value = JSON.stringify(valOld);
        } else if (value != undefined) {
          value = valOld + "";
        }
        let dataIndex = indexMap[item.code];
        let resData = {
          fixed: item.fixed,
          code: item.code,
          value: value,
          type: item.type
        };
        if (dataIndex != undefined) {
          valueContent[dataIndex] = resData;
        } else {
          valueContent.push(resData);
        }
      });
      this.stepConfig.forEach(conf => {
        if (conf.content) {
          conf.content.forEach(item => {
            if (item.code != "nextUserId" && item.code != "nextDeadTime") {
              let value = "";
              if (typeof this.stepData[item.code] == "object") {
                value = JSON.stringify(this.stepData[item.code]);
              } else {
                value = this.stepData[item.code] + "";
              }

              let dataIndex = indexMap[item.code];
              let resData = {
                fixed: item.fixed,
                code: item.code,
                value: value,
                type: item.type
              };
              if (dataIndex != undefined) {
                valueContent[dataIndex] = resData;
              } else {
                valueContent.push(resData);
                indexMap[item.code] = valueContent.length - 1;
              }
            }
          });
        }
      });
      return valueContent;
    },
    routerBack() {
      let listBread = this.$store.state.breadcurmb.list;
      let target = listBread[listBread.length - 2];
      listBread.pop();
      if (target) {
        this.$router.push({
          path: target.url,
          query: target.query
        });
      }
    },
    /** 点击按钮部分 */
    clickFP() {},
    clickJS() {
      this.showJS = true;
    },
    clickZB() {
      this.showZB = true;
    },
    clickTJ() {
      let valueContent = this.getValueContent();
      createFlow({
        processOrganizationId: this.processOrganizationId,
        processDetailRequest: {
          nextUserId: this.stepData.nextUserId,
          nextDeadTime: this.stepData.nextDeadTime,
          valueContent
        }
      })
        .then(e => {
          this.$alert("提交成功", "提示");
          this.routerBack();
        })
        .catch(({ message }) => {
          this.$alert(message, "错误");
        });
    },
    /** 对应处理数据方法 */
    clickAgree() {
      let valueContent = this.getValueContent();
      let data = {
        processUserDetailId: this.$route.query.processUserDetailId,
        valueContent
        // nextDetailUserInfoList: [],
        // nextDeadTime: "",
        // excuteUserInfoList: []
      };
      agree(data).then(e => {
        console.log("agree success");
      });
    },
    clickDisagree() {
      let valueContent = this.getValueContent();
      let data = {
        processUserDetailId: this.$route.query.processUserDetailId,
        valueContent
      };
      disAgree(data).then(e => {
        console.log("disAgree success");
      });
    }
  }
};
</script>

