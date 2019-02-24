<template>
  <section class="wrap-header" style="margin-left:0;margin-right:0;">
    <div class="card" style="flex-grow:1;" v-for="(item, index) in data" :key="index">
      <div class="pull-left">
        <h5>{{item.title}}</h5>
        <h2 style="margin-top:-8px;">{{item.num}}</h2>
      </div>
      <div class="pull-right">
        <div class="icon" :style="{'background-color': item.color}">
          <i :class="item.icon"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "assets/css/hp/index.scss";
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>
