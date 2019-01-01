<template>
  <el-dialog :title="dialogTitle" top="5vh" :visible.sync="bShow" :before-close="onClose">
    <el-row>
    <el-form :model="form" :rules="rules" v-loading="bLoading"
      label-width="180px" ref="paramForm">
      <el-col :span="20">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
          <el-input v-model="form.parentId" placeholder="父级部门主键，顶级传-1"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" v-loading="confirmLoading"
        @click="onSave">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { departmentOperate } from "api/permission";
export default {
  data () {
    return {
      dialogTitle: '新增部门',
      bShow: this.value,
      bLoading: false,
      confirmLoading: false,
      form: {
        name: '',
        parentId: '',
        iconUrl: '',
        description: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入' }
        ],
        parentId: [
          { required: true, message: '请输入' }
        ]
      },
    };
  },
  props: {
    value: Boolean,
    id: [String, Number]
  },
  watch: {
    value (val) {
      this.bShow = val;
    },
    bShow (val) {
      this.$emit('input', val);
    },
    'id': {
      immediate: true,
      handler (val) {
        this.dialogTitle = val ? "部门编辑" : "新增部门";
      }
    }
  },
  methods: {
    onClose () {
      this.$emit('update:id', '');
      this.bShow = false;
    },
    onSave () {
      this.$refs.paramForm.validate(valid => {
        if (valid) {
          this.confirmLoading = true;
          let {...params} = this.form;
          departmentOperate(params, this.id ? 'edit' : 'add').then(() => {
            this.$message.success('操作成功');
            this.onClose();
          }).finally(() => {this.confirmLoading = false;});
        }
      });
    }
  }
};
</script>
