<template>
  <el-form ref="form" :label-width="labelWidth" :model="editData" :rules="rules">
    <template v-for="(conf,index) in config">
      <template v-if="conf.type=='workPlan-file'">
        <dym-work-plan-import
          @import="workPlanImportHandler"
          :inputWidth="inputWidth"
          :conf="conf"
          :key="index"
          v-model="editData[conf.code]"
        ></dym-work-plan-import>
      </template>
      <el-form-item :label="conf.name" :prop="conf.code" :key="index" v-else>
        <template v-if="conf.type=='one-select'">
          <dym-select
            :auto-select="conf.autoSelect"
            :inputWidth="inputWidth"
            :disabled="disabled"
            :conf="conf"
            v-model="editData[conf.code]"
          ></dym-select>
        </template>
        <template v-else-if="conf.type=='multi-select'">
          <dym-select
            :multiple="true"
            :inputWidth="inputWidth"
            :disabled="disabled"
            :conf="conf"
            v-model="editData[conf.code]"
          ></dym-select>
        </template>
        <template v-else-if="conf.type=='input'">
          <template v-if="conf.data&&conf.data.function=='calculateHour'">
            <dym-cal-hour
              :style="{width:inputWidth}"
              :form="editData"
              :start-key="conf.data.params[0]"
              :end-key="conf.data.params[1]"
            ></dym-cal-hour>
          </template>
          <template v-else>
            <el-input
              :disabled="disabled||conf.readOnly"
              :style="{width:inputWidth}"
              v-model="editData[conf.code]"
            ></el-input>
          </template>
        </template>
        <template v-else-if="conf.type=='textarea'">
          <el-input
            :disabled="disabled||conf.readOnly"
            type="textarea"
            :style="{width:inputWidth}"
            v-model="editData[conf.code]"
          ></el-input>
        </template>
        <template v-else-if="conf.type=='date'">
          <el-date-picker
            :disabled="disabled||conf.readOnly"
            :style="{width:inputWidth}"
            v-model="editData[conf.code]"
            value-format="yyyy-MM-dd hh:mm:ss"
            @change="changeHandler(conf)"
          ></el-date-picker>
        </template>
        <template v-else-if="conf.type=='dateTime'">
          <el-date-picker
            :disabled="disabled||conf.readOnly"
            :style="{width:inputWidth}"
            v-model="editData[conf.code]"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </template>

        <template v-else-if="conf.type=='radio'">
          <dym-radio
            :auto-select="true"
            :conf="conf"
            :disabled="disabled||conf.readOnly"
            v-model="editData[conf.code]"
            :select="editData[conf.code]"
          ></dym-radio>
        </template>
        <template v-else-if="conf.type=='multi-document'">
          <dym-combine
            :conf="conf"
            :disabled="disabled||conf.readOnly"
            v-model="editData[conf.code]"
            :select="editData[conf.code]"
          ></dym-combine>
        </template>
        <template v-else-if="conf.type=='radio-next-user'">
          <dym-radio-next-user
            :auto-select="true"
            :conf="conf"
            :disabled="disabled||conf.readOnly"
            v-model="editData[conf.code]"
          ></dym-radio-next-user>
        </template>
        <template v-else-if="conf.type=='multi-file'">
          <dym-upload-file :disabled="disabled||conf.readOnly" v-model="editData[conf.code]"></dym-upload-file>
        </template>
        <template v-else-if="conf.type=='upload'">
          <template v-if="conf.meta.type=='image'">
            <el-upload
              :disabled="disabled||conf.readOnly"
              :action="conf.meta.action"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
              <p class="picture-card-tip">上传照片</p>
            </el-upload>
          </template>
          <template v-else>
            <el-upload :disabled="disabled||conf.readOnly" :action="conf.meta.action">
              <el-button size="small">
                <i class="anticon icon-upload"></i> 上传文件
              </el-button>
            </el-upload>
          </template>
        </template>
        <template v-else-if="conf.type=='workPlan-calendar'">
          <dym-work-plan-calender v-model="editData[conf.code]"></dym-work-plan-calender>
        </template>
        <template v-else-if="conf.type=='combine'">
          <el-button :disabled="disabled||conf.readOnly" @click="showCombine">关联公文</el-button>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import { getToken, dateFormater } from "utils/assist";
// import { funcMap } from "./dynamicFuncDefine";
import { mapGetters } from "vuex";
import dymSelect from "./dym-components/dym-select";
import dymRadio from "./dym-components/dym-radio";
import dymCombine from "./dym-components/dym-combine";
import dymRadioNextUser from "./dym-components/dym-radio-next-user";
import dymWorkPlanImport from "./dym-components/dym-work-plan-import";
import dymWorkPlanCalender from "./dym-components/dym-work-plan-calender";
import dymUploadFile from "./dym-components/dym-upload-file.vue";
import dymCalHour from "./dym-components/dym-cal-hour.vue";
import moment from "moment";
import { scedualSearch, userGroupList } from "api/index";
export default {
  components: {
    dymSelect,
    dymCalHour,
    dymRadio,
    dymRadioNextUser,
    dymWorkPlanImport,
    dymWorkPlanCalender,
    dymCombine,
    dymUploadFile
  },
  props: {
    documentCodeFixd: String,
    query: {
      type: Object,
      default() {
        return {};
      }
    },
    rules: {
      type: Object,
      default() {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    config: {
      type: Array
    },
    labelWidth: {
      type: String,
      default: "170px"
    },
    inputWidth: {
      type: String,
      default: "660px"
    },
    editData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    editData(val) {}
  },
  mounted() {
    this.$nextTick(() => {
      let query = this.query;
      let flagStart =
        query.permitButton &&
        (query.permitButton == 1 || query.permitButton == 2);
      let { groupList, userInfo } = this.$store.state.login;
      if (flagStart) {
        groupList &&
          groupList[0] &&
          !this.editData["sendGroup"] &&
          this.$set(this.editData, "sendGroup", {
            name: groupList[0].name,
            value: groupList[0].organizationGroupId + ""
          });
      }
      this.$set(
        this.editData,
        "flowStartTime",
        moment().format("YYYY-MM-DD hh:mm:ss")
      );
      this.$set(this.editData, "userMobile", userInfo.mobile);
    });

    let ffGetOppWorkPlan = () => {
      let obj = this.editData["changeUser"];
      if (
        !obj ||
        !obj.value ||
        !this.editData["changeStartDate"] ||
        !this.editData["changeEndDate"]
      ) {
        return;
      }
      scedualSearch({
        startDate: this.editData["changeStartDate"],
        endDate: this.editData["changeEndDate"],
        userId: obj.value
      }).then(({ workPlanDateInfoList }) => {
        let list = [];
        workPlanDateInfoList.forEach(item => {
          let date = item.date;
          let subList = item.workPlanDateDetailInfoList;
          if (subList) {
            subList.forEach(item1 => {
              list.push({
                name: date + " " + item1.typeDictionary,
                value: item1.workPlanId
              });
            });
          }
        });
        this.$bus.$emit("changeOptions", list, "changeWorkPlan");
        // this.$bus.$emit("changeOptions", workPlanDateInfoList, "applyWorkPlan");
      });
    };
    this.$bus.$on("changeSel", data => {
      if (data.conf.code == "type") {
        let groupList = this.$store.state.login.groupList;
        let value = data.value.value;
        let codes = groupList[0].documentCode.split("-");
        let fixed = this.documentCodeFixd;
        let code = "";
        if (value < 200) {
          code = codes[0] + fixed;
        } else if (value < 300) {
          code = codes[1] + fixed;
        } else {
          code = codes[2] + fixed;
        }
        this.$set(this.editData, "flowCode", code);
      } else if (data.conf.code == "changeUser") {
        this.$nextTick(() => {
          if (this.editData["changeUser"]) {
            this.$bus.$emit("updateRadioNext");
            let userId = +this.editData["changeUser"].value;
            userGroupList({
              userId
            }).then(({ organizationGroupList }) => {
              let list = [];
              organizationGroupList.forEach(item => {
                list.push({
                  name: item.name,
                  value: item.organizationGroupId
                });
              });
              this.$bus.$emit("changeOptions", list, "changeGroup");
            });
            ffGetOppWorkPlan();
          }
        });
      }
    });
    this.$bus.$on("changeHandler", (conf, value) => {
      if (conf.code == "applyStartDate" || conf.code == "applyEndDate") {
        if (this.editData["applyStartDate"] && this.editData["applyEndDate"]) {
          let obj = this.editData["user"];
          if (!obj || !obj.value) {
            return;
          }
          scedualSearch({
            startDate: this.editData["applyStartDate"],
            endDate: this.editData["applyEndDate"],
            userId: obj.value
          }).then(({ workPlanDateInfoList }) => {
            let list = [];
            workPlanDateInfoList.forEach(item => {
              let date = item.date;
              let subList = item.workPlanDateDetailInfoList;
              if (subList) {
                subList.forEach(item1 => {
                  list.push({
                    name: date + " " + item1.typeDictionary,
                    value: item1.workPlanId
                  });
                });
              }
            });
            this.$bus.$emit("changeOptions", list, "applyWorkPlan");
          });
        }
      } else if (
        conf.code == "changeStartDate" ||
        conf.code == "changeEndDate"
      ) {
        ffGetOppWorkPlan();
      }
    });
  },
  methods: {
    changeHandler(conf) {
      if (
        conf.code == "applyStartDate" ||
        conf.code == "applyEndDate" ||
        conf.code == "changeStartDate" ||
        conf.code == "changeEndDate"
      ) {
        this.$bus.$emit("changeHandler", conf, this.editData[conf.code]);
      }
    },
    workPlanImportHandler(list) {
      this.$set(this.editData, "workPlanDateInfoList", list);
    },
    showCombine() {
      this.$emit("showModalCombine");
    }
  }
};
</script>
