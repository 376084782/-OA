<template>
  <section v-loading="loading">
    <el-card class="mgTop24">
      <!-- <h3>发文拟稿</h3> -->
      <dynamic-form ref="editTop" :edit-data="editData" class="mgTop24" :config="contentTop"></dynamic-form>
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
        <form-btn v-for="(conf,index) in buttonConfig" :key="index" :conf="conf" @clickTJ="clickTJ"></form-btn>
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
  getPeopleListByRole
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
    this.createForm();
  },
  methods: {
    createForm() {
      let typeMap = {
        schedualApply: 400,
        seeSchedualApply:400
      };
      this.loading = true;
      getFormTemp({
        type: typeMap[this.$route.params.type]
      }).then(e => {
        let { processUserDetailResponseList } = e;
        let config = processUserDetailResponseList[0] || {};
        let confContent = JSON.parse(config.processUser.content);
        this.contentTop = confContent;
        if (config.valueContent) {
          let valueContent = JSON.parse(config.valueContent);
          Object.assign(this.editData, valueContent);
        }
        this.buttonConfig = config.processButtonInfoList;
        let stepList = config.processUserStepList;
        stepList.forEach((item, step) => {
          let stepData = this.stepConfig[item.step - 1] || {};
          this.$set(this.stepConfig, item.step - 1, stepData);
          let userList = [];
          item.processUserDetailList.forEach(userItem => {
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
          stepData.userList = userList;
          stepData.stepName = item.stepName;
          stepData.showEdit = item.isDoingStep;
          this.$set(this.stepConfig, item.step - 1, stepData);
          this.createConfNext(item.processUserDetailList, step);
        });
        this.loading = false;
      });
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
    clickTJ() {
      let valueContent = [];
      this.contentTop.forEach(item => {
        valueContent.push({
          code: item.code,
          value: this.editData[item.code],
          type: item.type,
          fixed: item.fixed
        });
      });
      this.stepConfig[0].content.forEach(item => {
        valueContent.push({
          code: item.code,
          value: this.editData[item.code],
          type: item.type,
          fixed: item.fixed
        });
      });
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
    }
    /** 对应处理数据方法 */
  }
};
</script>

