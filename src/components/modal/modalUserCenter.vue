<template>
  <el-dialog
    :append-to-body="true"
    title="个人中心"
    width="700px"
    :visible="show"
    @update:visible="toggle"
  >
    <el-row>
      <el-row type="flex" justify="space-between">
        <el-form style="width:400px;" size="small" label-width="120px">
          <el-form-item label="姓名：">
            <el-input v-if="edit"></el-input>
            <span v-else>22</span>
          </el-form-item>
          <el-form-item label="出生年月：">
            <el-input v-if="edit"></el-input>
            <span v-else>22</span>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-if="edit"></el-input>
            <span v-else>22</span>
          </el-form-item>
          <el-form-item label="身份证号码：">
            <el-input v-if="edit"></el-input>
            <span v-else>22</span>
          </el-form-item>
        </el-form>
        <div class="upload-avatar">
          <div class="avatar">
            <img src alt>
          </div>
          <el-button v-if="edit" class="mgTop10 font-blue">选择照片</el-button>
        </div>
      </el-row>
      <p class="line"></p>
      <el-form class="mgTop24" style="width:400px;" size="small" label-width="120px">
        <el-form-item label="科室：">
          <el-input v-if="edit"></el-input>
          <span v-else>22</span>
        </el-form-item>
        <el-form-item label="职务：">
          <el-input v-if="edit"></el-input>
          <span v-else>22</span>
        </el-form-item>
      </el-form>
    </el-row>
    <template slot="footer">
      <el-button size="small" type="primary" v-if="edit">确认</el-button>
      <el-button size="small" type="primary" @click="edit=true" v-else>编辑</el-button>
      <el-button size="small" @click="cancel">取消</el-button>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: ["show"],
  data() {
    return {
      edit:false
    };
  },
  methods: {
    toggle(flag) {
      this.$emit("update:show", flag);
    },
    cancel(){
      if(this.edit){
        this.edit=false
      } else{
        this.toggle(false)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.upload-avatar {
  margin-right: 70px;
  .avatar {
    border-radius: 10px;
    width: 100px;
    height: 100px;
    overflow: hidden;
    position: relative;
    img {
      min-width: 100%;
      min-height: 100%;
      background-color: red;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>


