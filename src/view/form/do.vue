<template>
  <section v-loading="loading">
    <el-card class="mgTop24">
      <h3 style="margin:0 24px 16px;">{{$route.query.title}}</h3>
      <p class="line" style="margin-left:-24px;width:120%;"></p>
      <task-tree
        :process-user="query.processUserDetailId"
        v-if="!fromModal&&query.modelType==201"
        :par-id="query.firstFatherProcessUserId"
      ></task-tree>

      <!-- <h3>发文拟稿</h3> -->
      <dynamic-form
        :query="query"
        ref="editTop"
        :edit-data="editData"
        class="mgTop24"
        :config="contentTop"
        :rules="rulesTop"
        :disabled="!canEditTop"
        :document-code-fixd="documentCodeFixd"
        @showModalCombine="showModalCombine"
      ></dynamic-form>
      <template v-if="stepConfig.length>0">
        <div class="line mgTop40"></div>
        <h4 class="mgTop40 mgLeft75">流程图：</h4>
        <step
          ref="step"
          :style="{height:activeStep==3?'650px':'auto'}"
          :active="activeStep"
          :config="stepConfig"
          :data="stepData"
          class="mgTop24 mgLeft185"
        ></step>
      </template>
      <el-row style="margin-left:172px;">
        <template v-for="(conf,index) in buttonConfig">
          <el-button
            :type="index==0?'primary':''"
            :key="index"
            @click="clickEvents(conf)"
          >{{getBtnName(conf)}}</el-button>
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
    <modal-add @success="successAddSubTask" :id="query.processUserDetailId" :show.sync="showAdd"></modal-add>
    <modal-percent
      :percent="finishPercent"
      @finish="finishHandler"
      :show.sync="visibleModalPercent"
    ></modal-percent>
    <modal-zb @success="initData" :id="query.processUserDetailId" :visible.sync="showModalZB"></modal-zb>
    <modal-refuse @sure="clickRefuse" :show.sync="showModalRefuse"></modal-refuse>
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
  disAgree,
  processRecall,
  showWen,
  finishTask,
  getFlowNum,
  refuse
} from "api/index";
import taskTree from "./components/taskTree.vue";
import FormBtn from "./components/FormBtn";
import ModalJs from "./components/modalJS";
import ModalZb from "./components/modalZB";
import modalRefuse from "./components/modalRefuse";
import modalChangeName from "./components/modalChangeName";
import modalCombine from "./components/modalCombine";
import { setTimeout } from "timers";
import { formatValueContentToList } from "utils/assist";
import ModalAdd from "view/task/center/components/modalAdd.vue";
import ModalPercent from "./components/modalPercent.vue";
import storeForm from "./store";
export default {
  components: {
    ModalAdd,
    ModalPercent,
    ModalJs,
    ModalZb,
    FormBtn,
    modalChangeName,
    modalCombine,
    taskTree,
    modalRefuse
  },
  props: {
    fromModal: {
      type: Boolean,
      default: false
    },
    queryData: {
      type: Object,
      default() {
        return {
          a: 2
        };
      }
    }
  },
  computed: {
    isStep1() {
      return true;
    }
  },
  watch: {
    editData(val) {
      storeForm.commit("updateData", val);
    }
  },
  data() {
    return {
      showModalRefuse: false,
      showModalZB: false,
      documentCodeFixd: "",
      finishPercent: 0,
      visibleModalPercent: false,
      showAdd: false,
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
      editData: {},
      query: {}
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    getBtnName(conf) {
      if (conf.code == "permitCreateSubProcess") {
        if (
          (this.query.modelType >= 200 && this.query.modelType < 300) ||
          this.query.modelType == 101
        ) {
          return "发起任务";
        }
      }
      return conf.showValue;
    },
    finishHandler(data) {
      if (data.percent >= 100) {
        // 调用完成
        agree({
          processUserDetailId: this.query.processUserDetailId,
          valueContent: []
        }).then(e => {
          this.routerBack();
        });
      } else {
        finishTask({
          processUserDetailId: this.query.processUserDetailId,
          detailPercent: data.percent,
          detailContent: data.content
        }).then(e => {
          this.visibleModalPercent = false;
        });
      }
    },
    initData() {
      this.query = this.fromModal ? this.queryData : this.$route.query;
      let query = this.query;
      let flagStart =
        query.permitButton &&
        (query.permitButton == 1 || query.permitButton == 2);
      if (query.processUserId) {
        let data = {
          processUserId: this.query.processUserId,
          processUserDetailId: this.query.processUserDetailId
        };
        if (query.permitButton == 3) {
          data.processUserWatcherId = query.processUserWatcherId;
        }
        this.getFormDetail(data, flagStart);
      }
      if (flagStart) {
        this.createForm({
          modelType: query.modelType || query.permitModelType,
          fatherProcessUserWatchId: this.query.fatherProcessUserWatchId
        });
      }
    },
    successAddSubTask() {
      this.initData();
    },
    showModalCombine() {
      this.visibleModalCombine = true;
    },
    clickEvents(data) {
      // 不需要验证的，提前return
      if (data.code == "permitCreateSubProcess") {
        this.showAdd = true;
        return;
      } else if (data.code == "permitAddLog") {
        this.visibleModalPercent = true;
        return;
      }
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
            case "permitRecall": {
              this.clickRecall();
              return;
            }
            case "permitReceive": {
              this.clickShowWen();
              return;
            }
            case "permitTransfer": {
              this.showModalZB = true;
              break;
            }
            case "permitRefuse": {
              this.showModalRefuse = true;
              break;
            }
          }
        }
      });
    },
    getFormDetail(data, isStart) {
      getProcessDetail(data).then(e => {
        if (!this.query.modelType) {
          this.query.modelType = e.processUser.modelType;
        }
        this.renderTemp(e, isStart);
      });
    },
    createForm(data) {
      this.loading = true;
      getFormTemp(data).then(e => {
        this.renderTemp(e);
      });
    },
    renderTemp(e, isStart) {
      this.canEditTop = true;
      let { processUserDetailResponseList } = e;
      let config = {};
      if (processUserDetailResponseList) {
        config = processUserDetailResponseList[0] || {};
      } else {
        config = e;
      }
      if (e.documentCodeFixd) {
        this.documentCodeFixd = e.documentCodeFixd;
      }
      this.finishPercent = config.processUser.finishPercent;
      if (config.processUser.firstFatherProcessUserId) {
        this.query.firstFatherProcessUserId =
          config.processUser.firstFatherProcessUserId;
      }

      if (config.processUser.valueContent) {
        let valueContent = JSON.parse(config.processUser.valueContent);
        valueContent.forEach(item => {
          let value = item.value;
          if (
            item.type == "workPlan-file" ||
            item.type == "workPlan-calendar" ||
            item.type.indexOf("multi") > -1 ||
            item.type.indexOf("select") > -1
          ) {
            value = JSON.parse(value);
          }
          this.$set(this.editData, item.code, value);
        });
      }
      let confContent = JSON.parse(config.processUser.content);

      console.log(confContent, "confContent");
      this.processOrganizationId = config.processUser.processOrganizationId;
      if (!isStart) {
        this.contentTop = confContent;
      }
      confContent.forEach(item => {
        if (item.required) {
          this.rulesTop[item.code] = [{ required: true }];
        }
        if (
          item.code == "organizationGroup" ||
          item.code == "mobile" ||
          item.code == "user"
        ) {
          console.log(this.editData, "edit");
          if (!this.editData[item.code]) {
            this.$set(item, "autoSelect", true);
          }
        }
        if (item.data.function == "getMissionCode") {
          getFlowNum(201).then(({ modelTypeNumber }) => {
            this.$set(this.editData, item.code, modelTypeNumber);
          });
        }
      });
      this.buttonConfig = config.processButtonInfoList;
      let stepList = config.processUserStepList || [];
      let doinged = false;
      stepList.forEach((item, step) => {
        let stepData = this.stepConfig[step] || {};
        let userList = [];
        item.processUserDetailList &&
          item.processUserDetailList.forEach(userItem => {
            let confUser = {
              name: userItem.name,
              roleName: "测试角色"
            };
            if (userItem.valueContent) {
              let valueCnt = formatValueContentToList(userItem.valueContent);
              confUser["remark"] = valueCnt.message;
            }
            userList.push(Object.assign(userItem, confUser));
            if (item.isDoingStep) {
              this.activeStep = step;
            }
            if (
              item.isDoingStep &&
              userItem.isCurrentUserStep &&
              userItem.isDoingStep
            ) {
              this.canEditTop = userItem.allowUpdate > 0;
              let cnt = [];
              if (userItem.content) {
                cnt = JSON.parse(userItem.content);
              }
              stepData.content = cnt;
            }
          });
        let flagShowStep =
          item.processUserDetailList &&
          item.processUserDetailList.some(userItem => {
            return userItem.isCurrentUserStep && userItem.isDoingStep;
          });
        stepData.userList = userList;
        if (userList[0]) {
          stepData.stepName = userList[0].name;
        }
        stepData.showEdit = item.isDoingStep && flagShowStep;
        if (!isStart) {
          if (!doinged) {
            this.$set(this.stepConfig, step, stepData);
            if (step < stepList.length - 1) {
              this.createConfNext(
                stepList[step + 1].processUserDetailList,
                step,
                stepList
              );
            }
          }
        }
        if (stepData.showEdit && stepData.content) {
          stepData.content.forEach(item => {
            if (this.editData[item.code]) {
              this.$set(this.stepData, item.code, this.editData[item.code]);
            }
          });
        }
        !doinged && (doinged = item.isDoingStep);
      });
      if (config.processUser.finishStatus == 3) {
        this.activeStep = stepList.length;
      }
      this.loading = false;
      storeForm.commit("update", config);
      storeForm.commit("updateData", this.editData);
      // console.log(this.editData);
    },
    createConfNext(listPeople, step, stepList) {
      if (step == this.stepConfig.length) {
        // 已经是最后一步时没有下一步执行人
        return;
      }
      let listNext = [];
      if (!this.stepConfig[step]) {
        this.stepConfig[step] = {};
      }
      if (!this.stepConfig[step].content) {
        this.stepConfig[step].content = [];
      }
      let configServer = listPeople[0];
      let nextUserType = "radio-next-user";
      let nextUserCode = "nextUserId";
      if (
        configServer &&
        (configServer.permitDynamicParallel == 1 ||
          configServer.permitDynamicSerial == 1)
      ) {
        nextUserType = "select-next-user-list";
        nextUserCode = "nextUserList";
      }
      let nextUserConf = {
        name: "下一步执行人",
        type: nextUserType,
        dataType: 2,
        code: nextUserCode,
        fixed: false,
        autoSelect: true,
        data: {
          list: listPeople,
          lastList: stepList[step].processUserDetailList
        }
      };
      let list = [
        nextUserConf,
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
        if (!valOld && item.type.indexOf("multi") > -1) {
          valOld = [];
        }
        if (valOld && typeof valOld == "object") {
          value = JSON.stringify(valOld);
        } else if (value != undefined) {
          value = valOld + "";
        }
        if (value == "undefined" || value == undefined) {
          value = "";
        }
        let dataIndex = indexMap[item.code];
        let resData = {
          fixed: item.fixed,
          code: item.code,
          value: value,
          type: item.type
          // data: item.data
        };
        if (dataIndex != undefined) {
          valueContent[dataIndex] = resData;
        } else {
          valueContent.push(resData);
          indexMap[item.code] = valueContent.length - 1;
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
      if (this.fromModal) {
        this.$emit("success");
        return;
      }
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
    clickRecall() {
      processRecall({
        processUserDetailId: this.query.processUserDetailId
      }).then(e => {
        this.routerBack();
      });
    },
    clickFP() {},
    clickJS() {
      this.showJS = true;
    },
    clickZB() {
      this.showZB = true;
    },
    clickTJ() {
      let valueContent = this.getValueContent();
      let query = this.query;
      let data = {
        processOrganizationId: this.processOrganizationId,
        processDetailRequest: {
          nextDeadTime: this.stepData.nextDeadTime,
          valueContent
        },
        fatherProcessUserDetailId: this.query.fatherProcessUserDetailId
      };
      if (this.stepData.nextUserId && this.stepData.nextUserId[0]) {
        data.processDetailRequest.nextUserId = this.stepData.nextUserId[0].userId;
      }
      if (query.permitModelType == 101) {
        data.fatherProcessUserWatchId = query.processUserWatcherId;
      }
      createFlow(data).then(e => {
        this.$alert("提交成功", "提示");
        this.routerBack();
      });
    },
    /** 对应处理数据方法 */
    clickAgree() {
      let valueContent = this.getValueContent();
      console.log(this.stepData);
      let data = {
        nextDetailUserInfoList:
          this.stepData.nextUserId || this.stepData.nextUserList,
        nextDeadTime: this.stepData.nextDeadTime,
        processUserDetailId: this.query.processUserDetailId,
        valueContent
      };
      console.log("ddddaaaaattt", data);
      agree(data).then(e => {
        this.routerBack();
      });
    },
    clickShowWen() {
      showWen({
        processUserWatcherId: this.query.processUserWatcherId
      }).then(e => {
        this.routerBack();
      });
    },
    clickDisagree() {
      let valueContent = this.getValueContent();
      let data = {
        processUserDetailId: this.query.processUserDetailId,
        valueContent
      };
      disAgree(data).then(e => {
        this.routerBack();
      });
    },
    clickRefuse(valueContent) {
      let data = {
        processUserDetailId: this.query.processUserDetailId,
        valueContent,
        processUserWatcherId: this.query.processUserWatcherId
      };
      refuse(data).then(e => {
        this.routerBack();
      });
    }
  }
};
</script>

