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
          <el-input
            :disabled="disabled||conf.readOnly"
            :style="{width:inputWidth}"
            v-model="editData[conf.code]"
          ></el-input>
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
          <el-upload :disabled="disabled||conf.readOnly" action="22">
            <el-button size="small">
              <i class="anticon icon-upload"></i> 上传文件
            </el-button>
          </el-upload>
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
          <el-button @click="showCombine">关联公文</el-button>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import { getToken, dateFormater } from "utils/assist";
import { funcMap } from "./dynamicFuncDefine";
import { mapGetters } from "vuex";
import dymSelect from "./dym-components/dym-select";
import dymRadio from "./dym-components/dym-radio";
import dymCombine from "./dym-components/dym-combine";
import dymRadioNextUser from "./dym-components/dym-radio-next-user";
import dymWorkPlanImport from "./dym-components/dym-work-plan-import";
import dymWorkPlanCalender from "./dym-components/dym-work-plan-calender";
export default {
  components: {
    dymSelect,
    dymRadio,
    dymRadioNextUser,
    dymWorkPlanImport,
    dymWorkPlanCalender,
    dymCombine
  },
  props: {
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
    editData(val) {
      // console.log(val);
    }
  },
  methods: {
    workPlanImportHandler(list) {
      this.$set(this.editData, "workPlanDateInfoList", list);
    },
    showCombine() {
      this.$emit("showModalCombine");
    }
  }
};
</script>
