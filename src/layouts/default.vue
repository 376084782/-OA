<template>
  <div class="app">
    <!-- 侧边栏 -->
    <tur-side></tur-side>
    <!-- 插槽，里面是具体内容 -->
    <div class="app-content">
      <!-- 头部用户栏 -->
      <tur-header></tur-header>
      <!-- 路由页面 -->
      <div class="app-inner-content">
        <router-view name="paths"></router-view>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import turSide from 'components/aside/index';
  import turHeader from 'components/header/header';
  export default {
    name: 'LayoutDefault',
    components: { turSide, turHeader }
  };
</script>
