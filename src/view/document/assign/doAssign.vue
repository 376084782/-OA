<template>
  <section>
    <el-card class="mgTop24">
      <el-form label-width="170px">
        <el-form-item label="公文类型：">
          <el-select style="width:660px;"></el-select>
        </el-form-item>
        <el-form-item label="编号：">
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
        <el-form-item label="主送单位:">
          <el-input style="width:660px;"></el-input>
        </el-form-item>
        <el-form-item label="来文单位:">
          <el-input style="width:660px;"></el-input>
        </el-form-item>
        <el-form-item label="发文单位:">
          <el-input style="width:660px;"></el-input>
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
        <el-form-item label="关联公文：">
          <el-select style="width:660px;"></el-select>
        </el-form-item>
        <el-form-item label="拟稿人:">
          <el-input style="width:660px;"></el-input>
        </el-form-item>
        <el-form-item label="拟稿部门:">
          <el-input style="width:660px;"></el-input>
        </el-form-item>
        <el-form-item label="公文发送时限：">
          <el-date-picker style="width:660px;"></el-date-picker>
        </el-form-item>
        <div class="line mgTop40"></div>
      </el-form>
      <h4 class="mgTop40 mgLeft75">公文处理流程图：</h4>
      <step
        :style="{height:activeStep==2?'490px':'auto'}"
        :active="activeStep"
        class="mgTop24 mgLeft185"
        :data="stepConfig"
      >
        <template slot="step0">
          <div v-if="activeStep==0">
            <div class="bubble-wrap">
              <div class="bubble">
                <el-row>
                  <el-form label-width="160px">
                    <el-form-item label="下一步执行人：">
                      <el-radio-group v-model="nextPeople">
                        <el-radio :label="1">一号2</el-radio>
                        <el-radio :label="2">名字二</el-radio>
                        <el-radio :label="3">名字三</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="下一级办结时限：">
                      <el-date-picker style="width:260px;"></el-date-picker>
                    </el-form-item>
                  </el-form>
                </el-row>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="tip-detail">
              <span class="action success">发起</span>&nbsp;&nbsp;
              <span class="tip-date">20293193</span>
            </p>
            <p class="tip-detail">beizhu</p>
          </div>
        </template>
        <template slot="step1">
          <div v-if="activeStep==1">
            <div class="bubble-wrap">
              <div class="bubble">
                <el-row>
                  <el-form label-width="160px">
                    <el-form-item label="意见: ">
                      <el-radio-group v-model="nextPeople">
                        <el-radio :label="1">同意</el-radio>
                        <el-radio :label="2">不同意</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label=" " v-if="nextPeople==2">
                      <el-input type="textarea" placeholder="请写不同意原因"></el-input>
                    </el-form-item>
                    <el-form-item label="下一步任务：">传阅/交办</el-form-item>
                    <el-form-item label="下一步执行人：">
                      <el-radio-group v-model="nextPeople">
                        <el-radio :label="1">一号2</el-radio>
                        <el-radio :label="2">名字二</el-radio>
                        <el-radio :label="3">名字三</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="下一级办结时限：">
                      <el-date-picker style="width:260px;"></el-date-picker>
                    </el-form-item>
                  </el-form>
                </el-row>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="tip-detail">
              <span class="action success">同意</span>&nbsp;&nbsp;
              <span class="tip-date">20293193</span>
            </p>
            <p class="tip-detail">beizhu</p>
          </div>
        </template>
        <template slot="step2">
          <div v-if="activeStep==2">
            <div class="bubble-wrap">
              <div class="bubble">
                <el-row>
                  <el-form label-width="160px">
                    <el-form-item label="意见: ">
                      <el-radio-group v-model="nextPeople">
                        <el-radio :label="1">同意</el-radio>
                        <el-radio :label="2">不同意</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label=" ">
                      <el-select v-model="value5" multiple filterable placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="上传用印照片：">
                      <el-upload list-type="picture-card">
                        <i class="el-icon-plus"></i>
                        <p class="picture-card-tip">上传照片</p>
                      </el-upload>
                    </el-form-item>
                  </el-form>
                </el-row>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="tip-detail">
              <span class="action success">发起</span>&nbsp;&nbsp;
              <span class="tip-date">20293193</span>
            </p>
            <p class="tip-detail">beizhu</p>
          </div>
        </template>
      </step>
      <el-button class="mgLeft185" type="primary">提交</el-button>
    </el-card>
  </section>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      stepConfig: [
        {
          name: "用户名",
          roleName: "科长",
          title: "步骤"
        },
        {
          name: "用户名",
          roleName: "科长",
          title: "步骤"
        },
        {
          name: "用户名",
          roleName: "科长",
          title: "步骤"
        }
      ],
      value5: [],
      activeStep: 3,
      id: 1,
      nextPeople: 0,
      radio2: 0
    };
  }
};
</script>

