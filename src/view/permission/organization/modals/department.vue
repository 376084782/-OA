<template>
  <el-dialog :title="dialogTitle" top="5vh" :visible.sync="bShow" :before-close="onClose">
    <el-row style="max-height: 450px; overflow: auto;" class="thinScroll">
      <el-form
        size="small"
        :model="form"
        :rules="rules"
        v-loading="bLoading"
        label-width="180px"
        ref="paramForm"
      >
        <el-col :span="20">
          <el-form-item label="机构全称" prop="name">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="机构简称" prop="shortName">
            <el-input v-model="form.shortName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="上级分管领导" prop="manageUserId">
            <el-input disabled v-model="leaderName"></el-input>
          </el-form-item>
          <el-form-item label="机构地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="成立日期" prop="regeisterDate">
            <el-date-picker
              v-model="form.regeisterDate"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="行业分类" prop="businessCategory">
            <el-select v-model="form.businessCategory" placeholder="请选择">
              <el-option
                v-for="item in $store.getters.businessCategory"
                :key="item.value"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职责描述（经营范围）" prop="description">
            <el-input v-model="form.description" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" v-loading="confirmLoading" @click="onSave">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  organizationOperate,
  getOrganizationInfo,
  getOrganizationLeaders,
  getMemberInfo
} from "api/permission";
export default {
  data() {
    return {
      leaderName: "",
      dialogTitle: "添加子科室",
      bShow: this.value,
      bLoading: false,
      confirmLoading: false,
      managerList: [],
      form: {
        name: "",
        shortName: "",
        documentCode: {
          pre: "",
          cur: "",
          next: ""
        },
        parentId: "",
        description: "",
        manageUserId: "",
        corporation: "",
        corporationIdCard: "",
        corporationMobile: "",
        address: "",
        regeisterMoney: "",
        regeisterDate: "",
        businessCategory: "",
        bank: "",
        bankPublicAccount: ""
      },
      rules: {
        name: [{ required: true, message: "请输入" }],
        shortName: [{ required: true, message: "请输入" }]
      }
    };
  },
  props: {
    value: Boolean,
    id: [String, Number],
    type: String,
    leaderId: [Number, String]
  },
  watch: {
    value(val) {
      this.bShow = val;
    },
    leaderId(val) {
      this.getLeaderName();
    },
    bShow(val) {
      this.$emit("input", val);
    }
  },
  mounted() {
    this.getLeaderName();
  },
  methods: {
    getLeaderName() {
      console.log("22322dssadad", this.leaderId);
      if (this.leaderId && this.leaderId != 0) {
        getMemberInfo({
          organizationGroupId: this.id,
          userId: this.leaderId
        }).then(e => {
          this.leaderName = e.user.name;
        });
      }
    },
    onClose() {
      this.form = {
        name: "",
        shortName: "",
        documentCode: {
          pre: "",
          cur: "",
          next: ""
        },
        parentId: "",
        description: "",
        manageUserId: "",
        corporation: "",
        corporationIdCard: "",
        corporationMobile: "",
        address: "",
        regeisterMoney: "",
        regeisterDate: "",
        businessCategory: "",
        bank: "",
        bankPublicAccount: ""
      };
      this.$refs.paramForm.resetFields();
      this.$emit("update:type", "add");
      this.confirmLoading = false;
      this.bShow = false;
    },
    onSave() {
      this.$refs.paramForm.validate(valid => {
        if (valid) {
          this.confirmLoading = true;
          let { ...params } = this.form;
          params["documentCode"] = `${params.documentCode.pre}-${
            params.documentCode.cur
          }-${params.documentCode.next}`;
          if (this.type == "add") {
            params.parentId = this.id;
          }
          params.type = 2;
          organizationOperate({ organizationGroup: params }, this.type)
            .then(() => {
              this.$message.success("操作成功");
              this.$emit("success");
              this.onClose();
            })
            .finally(() => {
              this.confirmLoading = false;
            });
        } else {
          this.$alert("请检查输入！");
        }
      });
    }
  },
  created() {
    this.dialogTitle = this.type == "add" ? "新增子科室" : "科室编辑";
    if (this.type != "add") {
      this.bLoading = true;
      getOrganizationInfo({ organizationGroupId: this.id })
        .then(data => {
          Object.assign(this.form, data.organizationGroup);
          let docList = data.organizationGroup.documentCode.split("-");
          this.form.documentCode = {
            pre: docList[0],
            cur: docList[1],
            next: docList[2]
          };
        })
        .finally(() => {
          this.bLoading = false;
        });
    }
    getOrganizationLeaders({ organizationGroupId: this.id }).then(data => {
      this.managerList = data.userList;
    });
  }
};
</script>
