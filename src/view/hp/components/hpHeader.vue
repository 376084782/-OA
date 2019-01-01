<template>
  <section class="wrap-header">
    <div class="card" v-for="(item, index) in aTitle" :key="index">
      <div class="pull-left">
        <h5>{{item.title}}</h5>
        <h2>{{item.num}}</h2>
      </div>
      <div class="pull-right">
        <div class='icon' :style="{'background-color': item.color}">
          <i :class="item.icon"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import "assets/css/hp/index.scss";
  export default {
    data() {
      return {
        aTitle: [{
            icon: "anticon icon-user",
            title: "待办理",
            num: 32,
            color: "#7F66ED"
          },
          {
            icon: "anticon icon-check-square",
            title: "我审批的",
            num: 158,
            color: "#5C88F6"
          },
          {
            icon: "anticon icon-pushpin",
            title: "我发起的",
            num: 24,
            color: "#77CEA8"
          },
          {
            icon: "anticon icon-heart",
            title: "我关注的",
            num: 32,
            color: "#EBCF51"
          }
        ]
      };
    }
  };
</script>
