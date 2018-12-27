<template>
  <section>
    <el-card class="mgTop24">
      <h3>发文拟稿</h3>
      <el-form label-width="170px">
        <el-form-item label="公文类型:">
          <el-select style="width:660px;"></el-select>
        </el-form-item>
        <el-form-item label="文号:">
          <el-input style="width:660px;"></el-input>
        </el-form-item>
        <el-form-item label="紧急程度:">
          <el-radio-group v-model="radio2">
            <el-radio :label="1">一般</el-radio>
            <el-radio :label="2">紧急</el-radio>
            <el-radio :label="3">重要</el-radio>
            <el-radio :label="4">要紧</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题:">
          <el-input style="width:660px;"></el-input>
        </el-form-item>
        <el-form-item label="发文单位:">
          <el-select style="width:660px;"></el-select>
        </el-form-item>
        <el-form-item label="正文:">
          <template v-if="id&&id>0">
            <div>
              <span class="file-name">
                <i class="anticon icon-link"></i>&nbsp;&nbsp;文件一&nbsp;&nbsp;
                <el-button type="text">下载</el-button>
              </span>
              <span class="file-name">
                <i class="anticon icon-link"></i>&nbsp;&nbsp;文件一&nbsp;&nbsp;
                <el-button type="text">下载</el-button>
              </span>
              <span class="file-name">
                <i class="anticon icon-link"></i>&nbsp;&nbsp;文件一&nbsp;&nbsp;
                <el-button type="text">下载</el-button>
              </span>
            </div>
          </template>
          <template v-else>
            <el-upload>
              <el-button size="small">
                <i class="anticon icon-upload"></i> 上传文件
              </el-button>
            </el-upload>
          </template>
        </el-form-item>
        <el-form-item label="附件:">
          <el-upload>
            <el-button size="small">
              <i class="anticon icon-upload"></i> 上传文件
            </el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="拟稿人:">
          <el-input style="width:660px;"></el-input>
        </el-form-item>
        <el-form-item label="拟稿部门:">
          <el-input style="width:660px;"></el-input>
        </el-form-item>
        <el-form-item label="关联公文:">
          <el-select style="width:660px;"></el-select>
        </el-form-item>
        <div class="line mgTop40"></div>
      </el-form>
      <h4 class="mgTop40 mgLeft75">公文处理流程图：</h4>
      <step class="mgTop24 mgLeft185">
        <el-row class="mgTop24">
          <el-form label-width="160px">
            <el-form-item label="下一步执行人：">
              <el-radio-group v-model="nextPeople">
                <el-radio :label="1">一号</el-radio>
                <el-radio :label="2">名字二</el-radio>
                <el-radio :label="3">名字三</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="下一级办结时限：">
              <el-date-picker style="width:260px;"></el-date-picker>
            </el-form-item>
          </el-form>
        </el-row>
      </step>
      <el-button class="mgLeft185" type="primary">提交</el-button>
    </el-card>
  </section>
</template>
<script>
export default {
  data() {
    return {
      id: 1,
      nextPeople: 0,
      radio2: 0
    };
  }
};
</script>

