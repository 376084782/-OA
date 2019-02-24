<template>
  <div>
    <el-form-item :prop="conf.code" label="选择时间">
      <el-date-picker
        :disabled="disabled"
        :style="{width:inputWidth}"
        v-model="date"
        @change="changeImportDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form-item>
    <el-form-item :prop="conf.code" label class="analyse-entry">
      <span v-for="(type , index) in conf.data.params||[]" :key="index">
        <span>{{getAnalyseName(type)}}</span>
        <el-upload
          :action="`${baseUrl}/oa/flow/workPlanExcel/file/analysis`"
          :headers="analyseHeader"
          name="excelFile"
          :data="conf"
          :http-request="rewriteUpload"
          :file-list="fileList"
          :show-file-list="false"
        >
          <el-button @click="beforeImport(type)" type="text">导入</el-button>
        </el-upload>
      </span>
    </el-form-item>
  </div>
</template>
<script>
import { baseUrl } from "utils/axios.js";
import { dateFormater } from "utils/assist";
import { analyseExcel, uploadSchedualFile } from "api/index";
export default {
  props: ["conf", "disabled", "value", "autoSelect", "inputWidth"],
  data() {
    return {
      list: [],
      date: "",
      baseUrl,
      fileList: [],
      analyseHeader: { type: 0, startDate: "", endDate: "" }
    };
  },
  watch: {
    list(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    changeImportDate(val) {
      this.analyseHeader.startDate = dateFormater(val[0], "yyyy-MM-dd");
      this.analyseHeader.endDate = dateFormater(val[1], "yyyy-MM-dd");
    },
    rewriteUpload(e) {
      let conf = e.data;
      if (!this.analyseHeader.startDate || !this.analyseHeader.endDate) {
        // 没选择时间
        this.$alert("清先选择时间", "错误");
        return;
      }
      if (this.disabled) {
        this.$alert("暂无修改权限", "错误");
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
          // 做个去重
          workPlanDateList.forEach(item => {
            let flagHas = this.list.some(iitem => {
              return (
                iitem.date == item.date &&
                iitem.userId == item.userId &&
                iitem.type == item.type
              );
            });
            if (!flagHas) {
              this.list.push(item);
            }
          });
          this.$emit("import", this.list);
        })
        .catch(({ message }) => {
          this.$alert(message, "错误");
        });
    },
    getAnalyseName(type) {
      let map = {
        1: "夜班：导入Excel排班",
        2: "节假日：导入Excel排班",
        3: "领导值班：导入Excel排班"
      };
      return map[type];
    },
    beforeImport(type, e) {
      this.analyseHeader.type = type;
    }
  }
};
</script>

