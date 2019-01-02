<template>
  <el-form :label-width="labelWidth" :model="editData">
    <template v-for="(conf,index) in config">
      <template v-if="getVisible(conf)&&conf.type=='workPlan-file'">
        <el-form-item label="选择时间" :key="index">
          <el-date-picker
            :style="{width:inputWidth}"
            v-model="editData.date"
            @change="changeImportDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label :key="index+10000" class="analyse-entry">
          <span v-for="(type , index) in conf.data.params||[]" :key="index">
            <span>{{getAnalyseName(type)}}</span>
            <el-upload
              :action="`${baseUrl}/oa/flow/workPlanExcel/file/analysis`"
              :headers="analyseHeader"
              name="excelFile"
              :http-request="rewriteUpload"
              :before-upload="beforeImport(type)"
              :file-list="fileList"
              :show-file-list="false"
            >
              <el-button type="text">导入</el-button>
            </el-upload>
          </span>
        </el-form-item>
      </template>
      <el-form-item :label="conf.name" :key="index" v-else-if="getVisible(conf)">
        <template v-if="conf.type=='select'">
          <el-select
            :disabled="conf.readOnly"
            :multiple="conf.meta.multiple"
            :filterable="conf.meta.filterable"
            v-model="editData[conf.code]"
            :style="{width:inputWidth}"
          >
            <el-option
              v-for="item in getDataByFuncName(conf)"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </template>
        <template v-else-if="conf.type=='one-select'">
          <el-select
            :disabled="conf.readOnly"
            v-model="editData[conf.code]"
            :style="{width:inputWidth}"
          >
            <el-option
              v-for="item in getDataByFuncName(conf)"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </template>
        <template v-else-if="conf.type=='input'">
          <el-input
            :disabled="conf.readOnly"
            :style="{width:inputWidth}"
            v-model="editData[conf.code]"
          ></el-input>
        </template>
        <template v-else-if="conf.type=='textarea'">
          <el-input
            :disabled="conf.readOnly"
            type="textarea"
            :style="{width:inputWidth}"
            v-model="editData[conf.code]"
          ></el-input>
        </template>
        <template v-else-if="conf.type=='date'">
          <el-date-picker
            :disabled="conf.readOnly"
            :style="{width:inputWidth}"
            v-model="editData[conf.code]"
          ></el-date-picker>
        </template>
        <template v-else-if="conf.type=='radio'">
          <el-radio-group v-model="editData[conf.code]">
            <el-radio
              :disabled="conf.readOnly"
              v-for="(item , index) in conf.meta.list"
              :key="index"
              :label="+item.key"
            >{{item.value}}</el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="conf.type=='upload'">
          <template v-if="conf.meta.type=='image'">
            <el-upload
              :disabled="conf.readOnly"
              :action="conf.meta.action"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
              <p class="picture-card-tip">上传照片</p>
            </el-upload>
          </template>
          <template v-else>
            <el-upload :disabled="conf.readOnly" :action="conf.meta.action">
              <el-button size="small">
                <i class="anticon icon-upload"></i> 上传文件
              </el-button>
            </el-upload>
          </template>
        </template>
        <template v-else-if="conf.type=='workPlan-calendar'">
          <fullcalendar :list="eventList"></fullcalendar>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import fullcalendar from "components/fullcalendar.vue";
import { analyseExcel, uploadSchedualFile } from "api/index";
import { baseUrl } from "utils/axios.js";
import { getToken, dateFormater } from "utils/assist";
import { funcMap } from "./dynamicFuncDefine";
export default {
  components: { fullcalendar },
  props: {
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
  computed: {},
  watch: {
    config(val) {}
  },
  data() {
    return {
      eventList: [],
      baseUrl,
      fileList: [],
      analyseHeader: { type: 0, startDate: "", endDate: "" },
      selectData: {
        gw: [
          {
            key: 1,
            value: "选项一"
          },
          {
            key: 2,
            value: "选项二"
          }
        ]
      }
    };
  },
  methods: {
    getDataByFuncName(conf) {
      if (conf && conf.data && conf.data.function) {
        let list = funcMap[conf.data.function]();
        if (
          conf.data.function == "getCurrentUserInfo" ||
          conf.data.function == "getCurrentUserGroupList"
        ) {
          this.$set(this.editData, conf.code, list[0].key);
        }
        return list;
      }
    },
    formatEventList(list1) {
      let list = [];
      list1.forEach(item => {
        list.push({
          start: item.date,
          title: `${item.name} ${item.typeDictionary}`
        });
      });
      return list;
    },
    changeImportDate(val) {
      this.analyseHeader.startDate = dateFormater(val[0], "yyyy-MM-dd");
      this.analyseHeader.endDate = dateFormater(val[1], "yyyy-MM-dd");
    },
    rewriteUpload(e) {
      if (!this.analyseHeader.startDate || !this.analyseHeader.endDate) {
        // 没选择时间
        this.$alert("清先选择时间", "错误");
        return;
      }
      let data = new FormData();
      data.append("excelFile", e.file);
      uploadSchedualFile({
        data,
        headers: {
          "Content-Type": "multipart/form-data",
          startDate: this.analyseHeader.startDate,
          endDate: this.analyseHeader.endDate,
          type: this.analyseHeader.type
        }
      })
        .then(({ workPlanDateList }) => {
          this.eventList = this.eventList.concat(
            this.formatEventList(workPlanDateList)
          );
        })
        .catch(({ message }) => {
          this.$alert(message, "错误");
        });
    },
    beforeImport(type) {
      this.analyseHeader.type = type;
    },
    getAnalyseName(type) {
      let map = {
        1: "夜班：导入Excel排班",
        2: "节假日：导入Excel排班",
        3: "领导值班：导入Excel排班"
      };
      return map[type];
    },
    getVisible(conf) {
      if (conf.bindKeyVal && this.editData[conf.bindKey]) {
        return conf.bindKeyVal.indexOf(this.editData[conf.bindKey]) > -1;
      } else {
        return true;
      }
    }
  }
};
</script>
