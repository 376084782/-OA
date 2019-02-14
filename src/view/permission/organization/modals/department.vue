<template>
  <el-dialog :title="dialogTitle" top="5vh" :visible.sync="bShow" :before-close="onClose">
    <el-row style="max-height: 450px; overflow: auto;" class="thinScroll">
      <el-form
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
          <el-form-item label="发文机构代号" prop="documentCode">
            <div style="display: flex; align-items: center; text-align: center;">
              <div>
                <label>上行文</label>
                <el-input v-model="form.documentCode.pre" placeholder="请输入"></el-input>
              </div>
              <div>
                <label>平行文</label>
                <el-input v-model="form.documentCode.cur" placeholder="请输入"></el-input>
              </div>
              <div>
                <label>下行文</label>
                <el-input v-model="form.documentCode.next" placeholder="请输入"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="上级分管领导" prop="manageUserId">
            <el-select v-model="form.manageUserId" placeholder="请选择">
              <el-option
                v-for="manager in managerList"
                :key="manager.userId"
                :label="manager.name"
                :value="manager.userId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法人（负责人）" prop="corporation">
            <el-input v-model="form.corporation" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="法人身份证号码" prop="corporationIdCard">
            <el-input v-model="form.corporationIdCard" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="法人联系方式" prop="corporationMobile">
            <el-input v-model="form.corporationMobile" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="机构地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="注册资金（万元）" prop="regeisterMoney">
            <el-input v-model="form.regeisterMoney" placeholder="请输入"></el-input>
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
                v-for="category in categoryList"
                :key="category.value"
                :label="category.name"
                :value="category.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位职责描述（经营范围）" prop="description">
            <el-input v-model="form.description" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="开户银行" prop="bank">
            <el-input v-model="form.bank" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="银行对公账号" prop="bankPublicAccount">
            <el-input v-model="form.bankPublicAccount" placeholder="请输入"></el-input>
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
  getOrganizationLeaders
} from "api/permission";
export default {
  data() {
    return {
      dialogTitle: "添加子部门",
      bShow: this.value,
      bLoading: false,
      confirmLoading: false,
      managerList: [],
      categoryList: [],
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
        // manageUserId: [
        //   { required: true, message: '请输入' }
        // ]
      }
    };
  },
  props: {
    value: Boolean,
    id: [String, Number],
    type: String
  },
  watch: {
    value(val) {
      this.bShow = val;
    },
    bShow(val) {
      this.$emit("input", val);
    }
  },
  methods: {
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
          organizationOperate({ organizationGroup: params }, this.type)
            .then(() => {
              this.$message.success("操作成功");
              this.$emit("success");
              this.onClose();
            })
            .catch(error => {
              this.$message.error(error.message);
            })
            .finally(() => {
              this.confirmLoading = false;
            });
        }
      });
    }
  },
  created() {
    this.dialogTitle = this.type == "add" ? "新增子部门" : "部门编辑";
    if (this.type == "edit") {
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
