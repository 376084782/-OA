<template>
  <section>
    <el-card class="mgTop24">
      <!-- <h3>发文拟稿</h3> -->
      <dynamic-form :edit-data="editData" class="mgTop24" :config="contentTop"></dynamic-form>
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
import {
  getFormTemp,
  createFlow,
  getPeopleListByOrg,
  getPeopleListByRole
} from "api/index";
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
      editData: {}
    };
  },
  mounted() {
    this.createForm();
  },
  methods: {
    createForm() {
      let typeMap = {
        schedualApply: 400
      };
      getFormTemp({
        type: typeMap[this.$route.params.type]
      }).then(e => {
        let { processOrganizationList } = e;
        let config = processOrganizationList[0] || {};
        let stepList = config.processOrganizationDetailList;
        stepList.forEach((item, step) => {
          let confContent = JSON.parse(item.content);
          this.stepConfig.push({
            stepName: item.title
          });
          if (step == 0) {
            this.contentTop = confContent;
            let listPeople = config.nextProcessUserDetailList;
            this.createConfNext(listPeople);
          }
        });
      });
    },
    createConfNext(listPeople) {
      let listNext = [];
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
      this.$set(this.stepConfig[0], "content", list);
      this.$set(this.stepConfig[0], "showEdit", true);
      let organizationRoleIdList = [];
      let organizationGroupIdList = [];
      listPeople.forEach(item => {
        if (item.persionType == 3) {
          organizationRoleIdList.push(item.businessId);
        } else if (item.persionType == 2) {
          organizationGroupIdList.push(item.businessId);
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
          // e = [
          //   [{ key: 1, value: 2 }, { key: 2, value: 3 }],
          //   [{ key: 2, value: 9 }]
          // ];
          e.forEach((item, index) => {
            if (index == 0) {
              // 设置第一步执行人
              this.stepConfig[0].content[0].meta.list = item;
            } else {
              this.stepConfig[0].content.splice(this.stepConfig[0].content.length - 1, 0, {
                name: "",
                type: "radio",
                code: "next" + index,
                meta: {
                  list: item
                }
              });
            }
          });
          console.log(this.stepConfig)
        });
      });
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
        console.log(item);
        valueContent.push({
          code: item.key,
          value: this.editData[item.key],
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

