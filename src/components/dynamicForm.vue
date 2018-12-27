<template>
  <el-form :label-width="labelWidth" :model="editData">
    <el-form-item
      :label="conf.label"
      v-for="(conf,index) in config"
      :key="index"
      v-if="conf.bindKeyVal.indexOf(editData[conf.bindKey])>-1"
    >
      <template v-if="conf.type=='select'">
        <el-select
          :disabled="conf.readOnly"
          :multiple="conf.meta.multiple"
          :filterable="conf.meta.filterable"
          v-model="editData[conf.key]"
          :style="{width:inputWidth}"
        >
          <el-option
            v-for="item in selectData[conf.meta.selectType]"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
      </template>
      <template v-else-if="conf.type=='input'">
        <el-input
          :disabled="conf.readOnly"
          :style="{width:inputWidth}"
          v-model="editData[conf.key]"
        ></el-input>
      </template>
      <template v-else-if="conf.type=='textarea'">
        <el-input
          :disabled="conf.readOnly"
          type="textarea"
          :style="{width:inputWidth}"
          v-model="editData[conf.key]"
        ></el-input>
      </template>
      <template v-else-if="conf.type=='date'">
        <el-date-picker
          :disabled="conf.readOnly"
          :style="{width:inputWidth}"
          v-model="editData[conf.key]"
        ></el-date-picker>
      </template>
      <template v-else-if="conf.type=='radio'">
        <el-radio-group v-model="editData[conf.key]">
          <el-radio
            :disabled="conf.readOnly"
            v-for="(item , index) in conf.meta.list"
            :key="index"
            :label="+item.key"
          >{{item.value}}</el-radio>
        </el-radio-group>
      </template>
      <template v-else-if="conf.type=='upload'">
        <template v-if="conf.meta.type=='image'">
          <el-upload :disabled="conf.readOnly" :action="conf.meta.action" list-type="picture-card">
            <i class="el-icon-plus"></i>
            <p class="picture-card-tip">上传照片</p>
          </el-upload>
        </template>
        <template v-else>
          <el-upload :disabled="conf.readOnly" :action="conf.meta.action">
            <el-button size="small">
              <i class="anticon icon-upload"></i> 上传文件
            </el-button>
          </el-upload>
        </template>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    config: {
      type: Array
    },
    labelWidth: {
      type: String,
      default: "170px"
    },
    inputWidth: {
      type: String,
      default: "660px"
    }
  },
  data() {
    return {
      editData: {},
      selectData: {
        gw: [
          {
            key: 1,
            value: "选项一"
          },
          {
            key: 2,
            value: "选项二"
          }
        ]
      }
    };
  }
};
</script>
