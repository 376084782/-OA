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
          <el-form-item label="角色组名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="form.description" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toDel" v-if="this.form.organizationRoleGroupId!=undefined" type="danger">删除</el-button>
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { roleGroupOperate } from "api/permission";
import { organizationRoleGroupDel } from "api";
export default {
  data() {
    return {
      bShow: this.value,
      bLoading: false,
      editTitle: "新增角色组",
      form: {
        name: "",
        description: ""
      },
      rules: {
        name: [{ required: true, message: "请输入" }]
      }
    };
  },
  props: {
    value: Boolean,
    info: String
  },
  watch: {
    value(val) {
      this.bShow = val;
    },
    bShow(val) {
      this.$emit("input", val);
    },
    info: {
      immediate: true,
      async handler(val) {
        if (val) {
          let parseInfo = JSON.parse(val);
          let { name, description, organizationRoleGroupId } = parseInfo;
          this.form.name = name;
          this.form.description = description;
          this.form.organizationRoleGroupId = organizationRoleGroupId;
          this.editTitle = "角色组编辑";
        } else {
          this.editTitle = "新增角色组";
        }
      }
    }
  },
  methods: {
    toDel() {
      this.$confirm("是否删除该成员组?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          organizationRoleGroupDel({
            organizationRoleGroupId: this.form.organizationRoleGroupId
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
    onClose() {
      this.form = {
        description: "",
        name: ""
      };
      this.$refs.paramForm.resetFields();
      this.$emit("update:info", "");
      this.bShow = false;
    },
    onSave() {
      this.$refs.paramForm.validate(valid => {
        if (valid) {
          let { ...param } = this.form;
          let ajaxType = this.form.organizationRoleGroupId ? "edit" : "add";
          roleGroupOperate(param, ajaxType).then(() => {
            this.$message.success("操作成功");
            this.$emit("edit");
            this.onClose();
          });
        }
      });
    }
  }
};
</script>