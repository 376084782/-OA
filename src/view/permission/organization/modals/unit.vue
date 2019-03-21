<template>
  <el-dialog :title="dialogTitle" top="5vh" :visible.sync="bShow" :before-close="onClose">
    <el-row style="max-height: 450px; overflow: auto;" class="thinScroll">
      <el-form
        :model="form"
        :rules="rules"
        v-loading="bLoading"
        label-width="180px"
        ref="paramForm"
        size="small"
        :disabled="type=='see'"
      >
        <el-col :span="20">
          <el-form-item label="机构全称" prop="name">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="机构简称" prop="shortName">
            <el-input v-model="form.shortName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="社会统一信用代码" prop="companyCode">
            <el-input v-model="form.companyCode" placeholder="请输入"></el-input>
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
            <el-input disabled v-model="leaderName"></el-input>
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
                v-for="item in $store.getters.businessCategory"
                :key="item.value"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行" prop="bank">
            <el-input v-model="form.bank" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="对公银行账户" prop="bankPublicAccount">
            <el-input v-model="form.bankPublicAccount" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="职责描述（经营范围）" prop="description">
            <el-input v-model="form.description" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" v-if="type!='see'" v-loading="confirmLoading" @click="onSave">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  organizationOperate,
  getOrganizationInfo,
  getMemberInfo,
  getOrganizationLeaders
} from "api/permission";
export default {
  data() {
    var checkDocumentCode = (rule, value, callback) => {
      if (
        this.form.documentCode.pre ||
        this.form.documentCode.next ||
        this.form.documentCode.cur
      ) {
        callback();
      }
      return callback(new Error(""));
    };
    return {
      leaderName: "",
      dialogTitle: "添加子单位",
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
        bankPublicAccount: "",
        companyCode: ""
      },
      rules: {
        name: [{ required: true, message: "请输入" }],
        shortName: [{ required: true, message: "请输入" }],
        companyCode: [{ required: true, message: "请输入" }],
        documentCode: [
          {
            required: true,
            validator: checkDocumentCode
          }
        ],
        corporationIdCard: [
          {
            pattern: this.reg.idcard
          }
        ],
        corporation: [{ required: true }]
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
    bShow(val) {
      this.$emit("input", val);
    },
    leaderId(val) {
      this.getLeaderName();
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
          params.type = 1;
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
    let map = {
      add: "新增子单位",
      edit: "单位编辑",
      see: "单位详情"
    };
    this.dialogTitle = map[this.type];
    if (this.type != "add") {
      this.bLoading = true;
      getOrganizationInfo({ organizationGroupId: this.id })
        .then(data => {
          Object.assign(this.form, data.organizationGroup);
          let map = {
            add: "新增子单位",
            edit: `单位编辑(ID:${this.form.organizationId})`,
            see: `单位详情(ID:${this.form.organizationId})`
          };
          this.dialogTitle = map[this.type];
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
