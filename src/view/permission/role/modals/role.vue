<template>
  <el-dialog :title="editTitle" top="5vh" :visible.sync="bShow" :before-close="onClose">
    <el-row>
      <el-form
        :model="form"
        :rules="rules"
        v-loading="bLoading"
        style="max-height: 450px; overflow-y: auto;"
        class="thinScroll"
        label-width="180px"
        ref="paramForm"
      >
        <el-col :span="20">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="分组到" prop="organizationRoleGroupId">
            <el-select v-model="form.organizationRoleGroupId" placeholder="请选择">
              <el-option
                v-for="roleGroup in roleGroupList"
                :key="roleGroup.organizationRoleGroupId"
                :label="roleGroup.name"
                :value="roleGroup.organizationRoleGroupId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="form.description" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-button type="primary" size="small" @click="setAllPermission">全选</el-button>
            <el-tree
              ref="paramFormTree"
              class="mgTop20"
              :data="privilegeList"
              :props="defaultProps"
              show-checkbox
              node-key="resourceId"
              default-expand-all
              :default-checked-keys="defaultChecked"
            ></el-tree>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toDel" type="danger" v-if="form.organizationRoleId">删除</el-button>
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { roleOperate, getPermissionInfo } from "api/permission";
import { organizationRoleDel } from "api";
export default {
  data() {
    return {
      bShow: this.value,
      bLoading: false,
      editTitle: "新增角色",
      roleGroupList: this.data,
      privilegeList: [],
      defaultChecked: [],
      defaultProps: {
        children: "children",
        label: "name",
        disabled(data, node) {
          let flag = false;
          if (node.level == 1) {
          } else {
            flag = data.defaultPermission;
          }
          return flag;
        }
      },
      form: {
        organizationRoleGroupId: "",
        name: "",
        description: ""
      },
      rules: {
        organizationRoleGroupId: [{ required: true, message: "请输入" }],
        name: [{ required: true, message: "请输入" }]
      }
    };
  },
  props: {
    value: Boolean,
    info: String,
    data: Array
  },
  watch: {
    value(val) {
      this.bShow = val;
    },
    bShow(val) {
      this.$emit("input", val);
    },
    data(val) {
      this.roleGroupList = val;
    },
    info: {
      immediate: true,
      handler(val) {
        if (val) {
          let parseInfo = JSON.parse(val);
          Object.assign(this.form, parseInfo);
          this.editTitle = "角色信息编辑";
          this.loadPermission({ roleId: parseInfo.organizationRoleId });
        } else {
          this.editTitle = "新增角色";
        }
      }
    }
  },
  methods: {
    toDel() {
      this.$confirm("是否删除该成员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          organizationRoleDel({
            organizationRoleId: this.form.organizationRoleId
          }).then(e => {
            this.$emit("edit");
            this.onClose();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    loadPermission(params) {
      this.bLoading = true;
      getPermissionInfo(params)
        .then(data => {
          this.privilegeList = data.children.map(tag => {
            if (tag.hasPermission) {
              this.defaultChecked.push(tag.resourceId);
            }
            tag.children.forEach(cate => {
              if (cate.hasPermission) {
                this.defaultChecked.push(cate.resourceId);
              }
            });
            return tag;
          });
          this.setDefaultChecked();
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    setDefaultChecked() {
      let allChecked = this.privilegeList
        .map(tag => {
          return tag.children
            .map(cate => {
              if (cate.defaultPermission) {
                return cate.resourceId;
              }
            })
            .join(",");
        })
        .join(",")
        .split(",")
        .filter(e => {
          return !!e;
        });
      this.$refs.paramFormTree&&this.$refs.paramFormTree.setCheckedKeys(allChecked);
    },
    setAllPermission() {
      let allChecked = this.privilegeList
        .map(tag => {
          return tag.children.map(cate => cate.resourceId).join(",");
        })
        .join(",")
        .split(",");
      this.$refs.paramFormTree.setCheckedKeys(allChecked);
    },
    onClose() {
      this.form = {
        organizationRoleGroupId: "",
        name: "",
        description: ""
      };
      this.$refs.paramForm.resetFields();
      this.$emit("update:info", "");
      this.bShow = false;
    },
    onSave() {
      this.$refs.paramForm.validate(valid => {
        if (valid) {
          let { ...param } = this.form;
          param.resourceIdList = this.$refs.paramFormTree.getCheckedKeys();
          let ajaxType = this.form.organizationRoleId ? "edit" : "add";
          roleOperate(param, ajaxType).then(() => {
            this.$message.success("操作成功");
            if (this.form.organizationRoleId) {
              this.$emit("edit", param);
            } else {
              this.$emit("add");
            }
            this.onClose();
          });
        }
      });
    }
  },
  created() {
    this.loadPermission({});
  }
};
</script>