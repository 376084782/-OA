// 列表模板 
// 如下的样子
// 图片 + 标题
//       内容
//       时间
<template>
  <ul class="lists-mobile">
    <li class="lists-mobile-item" v-for="(data, index) in datas" :key="index">
      <div class="avatar">
        <img :src="data.image">
      </div>
      <div class="content">
        <h4 class="title">{{data.title}}</h4>
        <p class="time">{{data.time}}</p>
      </div>
    </li>
  </ul>
</template>
<script>
  // import 'assets/css/lists-mobile';

  export default {
    name: 'turListsMobile',
    props: {
      datas: Array
    }
  };
</script>
