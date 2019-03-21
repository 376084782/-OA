<template>
  <el-dialog
    title="转办公文"
    :visible="visible"
    @update:visible="toggle"
    width="680px"
    :before-close="handleClose"
  >
    <el-form style="margin:0 80px;" label-width="90px">
      <el-form-item label="转办人：">
        <el-select value-key="userId" v-model="user" style="width:390px;" placeholder="请选择" filterable>
          <el-option v-for="(item,index) in list" :key="index" :label="item.name" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="submit" type="primary">转办</el-button>
      <el-button>取消</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { getPeopleList } from "api/permission";
import { zhuanban } from "api/index";
export default {
  props: {
    visible: {
      type: Boolean
    },
    id: {
      type: [Number,String]
    }
  },
  data() {
    return {
      list: [],
      user: ""
    };
  },
  mounted() {
    this.getPeopleList();
  },
  methods: {
    submit() {
      zhuanban({
        processUserDetailId: this.id,
        transferUserInfo: {
          persionType: 1,
          businessId: this.user.userId,
          businessName: this.user.name,
          userId: this.user.userId,
          name: this.user.name
        }
      }).then(e=>{
        this.toggle(false);
        this.$emit('success')
      })
    },
    getPeopleList() {
      getPeopleList({
        needSelf: false,
        pageNo: 1,
        pageSize: 10000
      }).then(({ tableResponse }) => {
        this.list = tableResponse.list;
      });
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
    toggle(flag) {
      this.$emit("update:visible", flag);
    }
  }
};
</script>

