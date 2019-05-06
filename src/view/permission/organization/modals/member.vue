<template>
  <el-dialog :title="dialogTitle" top="5vh" :visible.sync="bShow" :before-close="onClose">
    <el-row class="thinScroll" style="max-height: 450px; overflow: auto;padding:10px;">
      <el-form
        :model="form"
        :rules="rules"
        v-loading="bLoading"
        label-width="120px"
        ref="paramForm"
        :disabled="type == 'watch'"
      >
        <el-row>
          <el-form-item v-if="type != 'watch'" label="所属部门" prop="newOrganizationGroupId">
            <el-select v-model="form.newOrganizationGroupId">
              <el-option
                v-for="(item,idx) in listGroupDep"
                :key="idx"
                :value="item.organizationGroupId"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="organizationRoleIdList">
            <el-select
              v-model="form.organizationRoleIdList"
              multiple
              placeholder="请选择角色"
              style="width: 100%;"
            >
              <el-option
                v-for="role in organizationRoleList"
                :key="role.organizationRoleId"
                :label="role.name"
                :value="role.organizationRoleId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="sexDictionary">
              <el-radio-group v-model="form.sexDictionary">
                <el-radio label="男" border>男</el-radio>
                <el-radio label="女" border>女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否党员" prop="partyMember">
              <el-radio-group v-model="form.partyMember">
                <el-radio :label="0" border>是</el-radio>
                <el-radio :label="1" border>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出生年月日" prop="birthday">
              <el-date-picker
                v-model="form.birthday"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="职务" prop="position">
              <el-select v-model="form.position" placeholder="请选择职务">
                <el-option
                  v-for="position in positionList"
                  :key="position.value"
                  :label="position.name"
                  :value="position.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分管领导" prop="manageUserId">
              <el-input disabled v-model="leaderName"></el-input>
            </el-form-item>
            <el-form-item label="工龄" prop="workAge">
              <el-input type="tel" v-model="form.workAge" placeholder="请输入工龄"></el-input>
            </el-form-item>
            <el-form-item label="座机" prop="telphone">
              <el-input v-model="form.telphone" placeholder="请输入座机"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="婚否" prop="marry">
              <el-radio-group v-model="form.marry">
                <el-radio :label="0" border>未婚</el-radio>
                <el-radio :label="1" border>已婚</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="党派名称" prop="partyName">
              <el-input v-model="form.partyName" placeholder="请输入党派名称"></el-input>
            </el-form-item>
            <el-form-item label="学历" prop="education">
              <el-input v-model="form.education" placeholder="请输入学历"></el-input>
            </el-form-item>
            <!-- <el-form-item label="岗位名称" prop="parentId">
            <el-input v-model="form.parentId" placeholder="请输入岗位名称"></el-input>
            </el-form-item>-->
            <el-form-item label="级别" prop="level">
              <el-input v-model="form.level" placeholder="请输入级别"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="form.email" placeholder="电子邮箱"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="description">
              <el-input v-model="form.description" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="24">
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>
      </el-form>

      <h4>分管单位：</h4>
      <p class="line mgTop10"></p>
      <el-form
        ref="form2"
        size="small"
        class="mgTop24"
        inline
        label-width="120px"
        :disabled="type == 'watch'"
      >
        <el-form-item label="机构全称">
          <el-select
            v-model="manageOrganizationGroupIdList"
            placeholder="请选择"
            filterable
            :remote-method="remoteMethod"
            remote
            multiple
            value-key="organizationGroupId"
          >
            <el-option v-for="(item,idx) in listJG" :key="idx" :label="item.name" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <h4>分管科室：</h4>
      <p class="line mgTop10"></p>
      <el-form
        ref="form3"
        class="mgTop24"
        size="small"
        label-width="120px"
        :disabled="type == 'watch'"
      >
        <el-form-item label="机构全称">
          <el-select
            v-model="manageOrganizationGroupIdList2"
            placeholder="请选择"
            filterable
            :remote-method="remoteMethod2"
            remote
            multiple
            value-key="organizationGroupId"
          >
            <el-option v-for="(item,idx) in listJG2" :key="idx" :label="item.name" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-row>
    <div slot="footer" class="dialog-footer" v-if="type != 'watch'">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" v-loading="confirmLoading" @click="onSave">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  membersOperate,
  getMemberInfo,
  getRoleList,
  getManageList,
  getChangeDepList,
  noManageUser
} from "api/permission";
export default {
  data() {
    return {
      listGroupDep: [],
      leaderName: "",
      manageOrganizationGroupIdList: [],
      manageOrganizationGroupIdList2: [],
      dialogTitle: "新增人员",
      bShow: this.value,
      bLoading: false,
      confirmLoading: false,
      organizationRoleList: [
        // { organizationRoleId: 1, name: '角色1' }
      ],
      positionList: [
        { value: 1, name: "正职" },
        { value: 2, name: "副职" },
        // { value: 3, name: "书记" },
        { value: 4, name: "其他" }
      ],
      manageUserList: [],
      form: {
        organizationRoleId: "",
        sexDictionary: "男",
        position: "",
        manageUserId: "",
        userName: "",
        name: "",
        birthday: "",
        mobile: "",
        marry: 0,
        partyMember: 0,
        partyName: "",
        education: "",
        idCard: "",
        workAge: "",
        telphone: "",
        email: "",
        level: "",
        sex: "",
        description: ""
      },
      rules: {
        email: [{ pattern: this.reg.email }],
        workAge: [{ pattern: this.reg.number }],
        telphone: [{ pattern: this.reg.number }],
        name: [{ required: true, message: "请输入" }],
        idCard: [
          {
            pattern: this.reg.idcard
          }
        ],
        mobile: [
          { required: true, message: "请输入" },
          { pattern: this.reg.mobile }
        ]
        // organizationRoleId: [
        //   { required: true, message: '请选择' }
        // ]
      },
      listJG: [],
      listJG2: []
    };
  },
  props: {
    value: Boolean,
    id: [String, Number],
    userId: [String, Number],
    type: String,
    orgType: [Number, String],
    leaderId: [Number, String]
  },
  watch: {
    value(val) {
      if (val) {
        this.getManageList();
      }
      this.bShow = val;
    },
    bShow(val) {
      this.$emit("input", val);
    },
    leaderId(val) {
      this.getLeaderName();
    },
    userId: {
      immediate: true,
      handler(val) {
        this.dialogTitle = val ? "人员编辑" : "新增人员";
        if (val) {
          this.getDepList();
          getMemberInfo({ organizationGroupId: this.id, userId: val }).then(
            data => {
              Object.assign(this.form, data.user);
              this.form.newOrganizationGroupId = this.form.organizationGroupId;
              this.form.organizationRoleIdList =
                this.form.organizationRoleIdList || [];
              this.form.organizationRoleId =
                data.organizationRoleList[0] &&
                data.organizationRoleList[0].organizationRoleId;
              let listManageList = [];
              let listManageList2 = [];
              data.user.manageOrganizationGroupList.forEach(item => {
                if (item.type == 1) {
                  listManageList.push(item);
                } else if (item.type == 2) {
                  listManageList2.push(item);
                }
              });
              this.manageOrganizationGroupIdList = listManageList;
              this.manageOrganizationGroupIdList2 = listManageList2;
              this.listJG = listManageList;
              this.listJG2 = listManageList2;
            }
          );
        }
      }
    }
  },
  mounted() {
    this.getRoleList();
    this.getLeaderName();
  },
  methods: {
    getDepList() {
      getChangeDepList({}).then(({ organizationGroupList }) => {
        this.listGroupDep = organizationGroupList;
      });
    },
    getLeaderName() {
      if (this.leaderId && this.leaderId != 0) {
        getMemberInfo({
          organizationGroupId: this.id,
          userId: this.leaderId
        }).then(e => {
          this.leaderName = e.user.name;
          console.log(this.leaderName, "leaderName");
        });
      }
    },
    remoteMethod(keyword) {
      noManageUser({
        organizationGroupId: this.id,
        keyWord: keyword,
        type: 1
      }).then(({ organizationGroupList }) => {
        let list = [];
        organizationGroupList.forEach(item => {
          list.push({
            name: item.name,
            organizationGroupId: item.organizationGroupId
          });
        });
        this.listJG = list;
      });
    },
    remoteMethod2(keyword) {
      noManageUser({
        organizationGroupId: this.id,
        keyWord: keyword,
        type: 2
      }).then(({ organizationGroupList }) => {
        let list = [];
        organizationGroupList.forEach(item => {
          list.push({
            name: item.name,
            organizationGroupId: item.organizationGroupId
          });
        });
        this.listJG2 = list;
      });
    },
    getRoleList() {
      getRoleList().then(e => {
        this.organizationRoleList = e.organizationRoleList;
      });
    },
    getManageList() {
      getManageList({
        organizationGroupId: this.id
      }).then(({ userList }) => {
        this.manageUserList = [];
        userList.forEach(item => {
          this.manageUserList.push({
            key: item.name,
            value: item.userId
          });
        });
      });
    },
    onClose() {
      this.form = {
        organizationRoleId: "",
        sexDictionary: "男",
        position: "",
        manageUserId: "",
        userName: "",
        name: "",
        birthday: "",
        mobile: "",
        marry: 0,
        partyMember: 0,
        partyName: "",
        education: "",
        idCard: "",
        workAge: "",
        telphone: "",
        email: "",
        level: "",
        sex: "",
        description: "",
        organizationRoleIdList: []
      };
      this.$refs.paramForm.resetFields();
      this.$emit("update:userId", "");
      this.$emit("update:type", "");
      this.bShow = false;
    },
    onSave() {
      this.$refs.paramForm.validate(valid => {
        if (valid) {
          this.confirmLoading = true;
          let { ...params } = this.form;
          let selList = this.manageOrganizationGroupIdList.concat(
            this.manageOrganizationGroupIdList2
          );
          params.manageOrganizationGroupIdList = [];
          selList.forEach(item => {
            params.manageOrganizationGroupIdList.push(item.organizationGroupId);
          });
          let finalParams = {
            organizationRoleIdList: params.organizationRoleIdList,
            organizationGroupId: this.id,
            organizationGroupMemberList: [
              {
                manageUserId: params.manageUserId,
                organizationGroupId: this.id,
                position: params.position
              }
            ],
            user: params
          };
          membersOperate(finalParams, this.userId ? "edit" : "add")
            .then(() => {
              this.$message.success("操作成功");
              this.$emit("success");
              this.onClose();
            })
            .finally(() => {
              this.confirmLoading = false;
            });
        } else {
          this.$alert("验证失败！请检查您的输入信息！");
        }
      });
    }
  }
};
</script>
