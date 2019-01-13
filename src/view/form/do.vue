<template>
  <section v-loading="loading">
    <el-card class="mgTop24">
      <!-- <h3>发文拟稿</h3> -->
      <dynamic-form
        ref="editTop"
        :edit-data="editData"
        class="mgTop24"
        :config="contentTop"
        :disabled="canEditTop"
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
export default {
  components: { ModalJs, ModalZb, FormBtn },
  computed: {
    isStep1() {
      return true;
    }
  },
  data() {
    return {
      canEditTop: false,
      loading: true,
      showJS: false,
      showZB: false,
      activeStep: 0,
      id: 1,
      nextPeople: 0,
      radio2: 0,
      contentTop: [],
      stepConfig: [],
      stepData: {},
      buttonConfig: [],
      editData: {}
    };
  },
  mounted() {
    console.log(this.$route, "route");
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
    clickEvents(data) {
      switch (data.code) {
        case "saveEdit": {
          console.log("提交修改");
          this.clickTJ();
          break;
        }
        case "permitAgree": {
          this.clickAgree();
          break;
        }
        case "2": {
          this.clickDisagree();
          break;
        }
        case "permitSubmit": {
          this.clickTJ();
          break;
        }
      }
      // console.log('data',data)
    },
    getFormDetail(data) {
      getProcessDetail(data).then(e => {
        this.renderTemp(e);
      });
    },
    createForm() {
      let typeMap = {
        schedualApply: 400,
        seeSchedualApply: 400
      };
      this.loading = true;
      getFormTemp({
        type: typeMap[this.$route.params.type]
      }).then(e => {
        this.renderTemp(e);
      });
    },
    renderTemp(e) {
      console.log("renderTemp", e);
      let { processUserDetailResponseList } = e;
      let config = {};
      if (processUserDetailResponseList) {
        config = processUserDetailResponseList[0] || {};
      } else {
        config = e;
      }
      let confContent = JSON.parse(config.processUser.content);
      this.contentTop = confContent;
      if (config.processUser.valueContent) {
        let valueContent = JSON.parse(config.processUser.valueContent);
        this.editData = {};
        valueContent.forEach(item => {
          console.log("item", item);
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
            console.log("userItem", userItem);
            userList.push({
              name: userItem.businessName,
              roleName: "测试角色"
            });
            if (item.isDoingStep && userItem.isCurrentUserStep) {
              let cnt = [];
              if (userItem.content) {
                cnt = JSON.parse(userItem.content);
              }
              stepData.content = cnt;
            }
          });
        // let selfHasAccess=item.processUserDetailList.some(item=>{
        //   return item.isCurrentUserStep
        // })
        stepData.userList = userList;
        stepData.stepName = item.stepName;
        stepData.showEdit = item.isDoingStep;
        this.$set(this.stepConfig, item.step - 1, stepData);
        console.log(step, stepList, 222);
        if (step < stepList.length - 1) {
          this.createConfNext(item.processUserDetailList, step);
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
          type: "radio",
          code: "next",
          meta: {
            list: listNext
          }
        },
        {
          name: "下一步办结时限",
          type: "date"
        }
      ];
      this.$set(
        this.stepConfig[step],
        "content",
        this.stepConfig[step].content.concat(list)
      );
      let indexNextPeople = this.stepConfig[step].content.length - 1;
      let organizationRoleIdList = [];
      let organizationGroupIdList = [];
      listPeople.forEach(item => {
        if (item.persionType == 3) {
          organizationRoleIdList.push(item.businessId);
        } else if (item.persionType == 2) {
          organizationGroupIdList.push(item.businessId);
        } else {
          this.stepConfig[step].content[0] = {
            name: "下一步执行人",
            type: "radio",
            code: "next",
            meta: {
              list: [
                {
                  key: item.businessId,
                  value: item.businessName
                }
              ]
            }
          };
          this.$set(this.stepData, "next", item.businessId);
        }
      });
      return new Promise((rsv, rej) => {
        let prArr = [];
        let resMap = {};
        if (organizationGroupIdList.length > 0) {
          prArr.push(getPeopleListByOrg({ organizationGroupIdList }));
          resMap.resGroup = prArr.length - 1;
        }
        if (organizationRoleIdList.length > 0) {
          prArr.push(getPeopleListByRole({ organizationRoleIdList }));
          resMap.resRole = prArr.length - 1;
        }
        Promise.all(prArr).then(e => {
          e.forEach((item, index) => {
            let list = this.formatUserList(item.userList);
            if (index == 0) {
              // 设置第一步执行人
              this.stepConfig[step].content[0].meta.list = list;
            } else {
              this.stepConfig[step].content.splice(
                this.stepConfig[step].content.length - 1,
                0,
                {
                  name: "",
                  type: "radio",
                  code: "next" + index,
                  meta: {
                    list: list
                  }
                }
              );
            }
          });
        });
      });
    },
    formatUserList(list) {
      let res = [];
      list.forEach(item => {
        res.push({
          key: item.userId,
          value: item.userName
        });
      });
      return res;
    },
    /** 点击按钮部分 */
    clickFP() {},
    clickJS() {
      this.showJS = true;
    },
    clickZB() {
      this.showZB = true;
    },
    getValueContent() {
      let valueContent = [];
      this.contentTop.forEach(item => {
        let value = "";
        let valOld = this.editData[item.code];
        if (valOld && typeof valOld == "object") {
          value = JSON.stringify(valOld);
        } else {
          value = valOld + "";
        }
        valueContent.push({
          code: item.code,
          value: value,
          type: item.type,
          fixed: item.fixed
        });
      });
      this.stepConfig.forEach(conf => {
        if (conf.content) {
          conf.content.forEach(item => {
            let value = "";
            if (typeof this.stepData[item.code] == "object") {
              value = JSON.stringify(this.stepData[item.code]);
            } else {
              value += "";
            }
            valueContent.push({
              code: item.code,
              value: value,
              type: item.type,
              fixed: item.fixed
            });
          });
        }
      });
      return valueContent;
    },
    clickTJ() {
      let valueContent = this.getValueContent();
      createFlow({
        processOrganizationId: 1,
        processDetailRequest: {
          nextUserId: 0,
          nextDeadTime: "",
          valueContent
        }
      })
        .then(e => {
          this.$alert("提交成功", "提示");
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
        console.log("同意成功");
      });
    },
    clickDisagree() {
      let valueContent = this.getValueContent();
      let data = {
        processUserDetailId: this.$route.query.processUserDetailId,
        valueContent
      };
      disAgree(data).then(e => {
        console.log("同意成功");
      });
    }
  }
};
</script>

