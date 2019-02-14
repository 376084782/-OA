<template>
  <el-dialog title="新增文号" :visible.sync="visible" width="680px" :before-close="handleClose">
    <el-form label-width="100px" style="width:500px;margin:0 auto;" :data="data" :rules="rules">
      <el-form-item label="收发类型">
        <el-radio-group v-model="data.processCodeGroupId">
          <el-radio
            v-for="(item,idx) in selList"
            :key="idx"
            :label="item.processCodeGroupId"
          >{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="公文类型：">
        <el-input v-model="data.code"></el-input>
      </el-form-item>
      <el-form-item label="编号定义：">
        <el-input v-model="data.codeValue"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" size="small" @click="submit">保存</el-button>
      <el-button size="small" @click="$emit('update:visible',false)">取消</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { getSFType, updateProcessCode, createProcessCode,detailProcessCode } from "api/document";
export default {
  props: {
    visible: {
      type: Boolean
    },
    id: [String, Number]
  },
  data() {
    return {
      selList: [],
      rules: {},
      bLoading: false,
      data: {
        processCodeGroupId: 1
      }
    };
  },
  watch: {
    visible(flag) {
      if (flag) {
        this.getDetail()
      } else {
        this.data = {};
      }
    }
  },
  mounted() {
    this.getSelList();
  },
  methods: {
    getDetail() {
      detailProcessCode({
        processCodeId: this.id
      }).then(e => {
        this.data=e.processCode;
      });
    },
    submit() {
      let func = this.id ? updateProcessCode : createProcessCode;
      Object.assign(this.data, {
        processCodeId: this.id
      });
      func({ processCode: this.data }).then(e => {
        this.$emit("update:visible", false);
        this.$emit("success");
      });
    },
    getSelList() {
      getSFType({
        processGroupCodeList: ["document-send-code", "ducument-receive-code"]
      }).then(e => {
        this.selList = e.processCodeGroupList;
        this.data.processCodeGroupId = this.selList[0].processCodeGroupId;
      });
    },
    handleClose() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

