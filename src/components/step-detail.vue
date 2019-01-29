<template>
  <div>
    <template v-if="step!=1">
      <p v-for="(item,index) in dataCnt" :key="index" class="mgTop10">
        {{item.name}}&nbsp;&nbsp;
        <span class="sub">{{dataValue[item.code]}}</span>
      </p>
    </template>
    <template v-else>
    </template>
  </div>
</template>
<script>
import { formatValueContentToList } from "utils/assist";
export default {
  props: {
    step: {
      type: Number,
      default: 1
    },
    content: {
      type: String,
      default: "[]"
    },
    value: {
      type: String,
      default: "[]"
    }
  },
  mounted() {
    if (this.content) {
      this.dataCnt = JSON.parse(this.content);
    }
    if (this.value) {
      this.dataValue = formatValueContentToList(this.value);
    }
  },
  data() {
    return {
      dataValue: [],
      dataCnt: []
    };
  }
};
</script>

