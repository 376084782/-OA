<template>
  <el-dialog :title="dialogTitle" top="5vh" :visible.sync="bShow" :before-close="onClose">
    <el-row class="thinScroll" style="max-height: 450px; overflow: auto;padding:10px;">
    <el-form :model="form" :rules="rules" v-loading="bLoading"
      label-width="120px" ref="paramForm">
      <el-col :span="24" class="mgBottom10"><strong>基本信息</strong></el-col>
      <el-col :span="12">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入上级部门"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="description">
          <el-radio-group v-model="form.radio">
            <el-radio :label="1" border>男</el-radio>
            <el-radio :label="2" border>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="值班排班" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="工作电话" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="家庭电话" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="直接上级" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="手机号码" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24" class="mgBottom10"><strong>档案信息</strong></el-col>
      <el-col :span="12">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入上级部门"></el-input>
        </el-form-item>
        <el-form-item label="国籍" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="婚姻" prop="description">
          <el-radio-group v-model="form.radio">
            <el-radio :label="1" border>已婚</el-radio>
            <el-radio :label="2" border>未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="毕业学校" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="入职日期" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="在职状态" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="转正日期" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="iconUrl">
          <el-input v-model="form.iconUrl" placeholder="请输入"></el-input>
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
      dialogTitle: '新增人员',
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
        this.dialogTitle = val ? "人员编辑" : "新增人员";
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
