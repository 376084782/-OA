<template>
  <el-form :label-width="labelWidth" :model="editData">
    <template v-for="(conf,index) in config">
      <template v-if="getVisible(conf)&&conf.type=='assignExcelAnalyse'">
        <el-form-item :label="conf.label" :key="index">
          <el-date-picker
            :style="{width:inputWidth}"
            v-model="editData.date"
            :disabled="conf.readOnly"
            @change="changeImportDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label :key="index+10000" class="analyse-entry">
          <span v-for="(type , index) in conf.meta.showType" :key="index">
            {{getAnalyseName(type)}}
            <el-upload
              action="http://rap2api.taobao.org/app/mock/46476/post/oa/flow/workPlanExcel/file/analysis"
              :headers="analyseHeader"
              name="excelFile"
              :on-success="afterImport"
              :on-error="importErr"
              :before-upload="beforeImport(type)"
              :file-list="fileList"
              :show-file-list="false"
            >
              <el-button type="text">导入</el-button>
            </el-upload>
          </span>
        </el-form-item>
      </template>
      <el-form-item :label="conf.label" :key="index" v-else-if="getVisible(conf)">
        <template v-if="conf.type=='select'">
          <el-select
            :disabled="conf.readOnly"
            :multiple="conf.meta.multiple"
            :filterable="conf.meta.filterable"
            v-model="editData[conf.key]"
            :style="{width:inputWidth}"
          >
            <el-option
              v-for="item in selectData[conf.meta.selectType]"
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
            v-model="editData[conf.key]"
          ></el-input>
        </template>
        <template v-else-if="conf.type=='textarea'">
          <el-input
            :disabled="conf.readOnly"
            type="textarea"
            :style="{width:inputWidth}"
            v-model="editData[conf.key]"
          ></el-input>
        </template>
        <template v-else-if="conf.type=='date'">
          <el-date-picker
            :disabled="conf.readOnly"
            :style="{width:inputWidth}"
            v-model="editData[conf.key]"
          ></el-date-picker>
        </template>
        <template v-else-if="conf.type=='radio'">
          <el-radio-group v-model="editData[conf.key]">
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
        <template v-else-if="conf.type=='fullcalendar'">
          <fullcalendar :list="editData.eventList"></fullcalendar>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import fullcalendar from "components/fullcalendar.vue";
import { analyseExcel } from "api/index";
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
    }
  },
  watch: {
    config(val) {}
  },
  data() {
    return {
      fileList: [],
      analyseHeader: { type: 0, startDate: "", endDate: "" },
      editData: {},
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
    changeImportDate(val) {
      this.analyseHeader.startDate = val[0];
      this.analyseHeader.endDate = val[1];
    },
    importErr(err, file, fileList) {
      this.$alert(decodeURIComponent(err.message), "错误");
    },
    afterImport(response, file, fileList) {
      let { workPlanDateList } = response;
      let list = [];
      workPlanDateList.forEach(item => {
        list.push({
          start: item.date,
          title: `${item.name} ${item.typeDictionary}`
        });
      });
      this.$set(this.editData, "eventList", list);
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
