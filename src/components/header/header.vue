<template>
  <header class="app-header">
    <div class="header-menu pull-left">
      <h3 class="title">OA管理系统</h3>
    </div>
    <tur-header-right></tur-header-right>
  </header>
</template>
<script>
  import turHeaderRight from 'components/header/right';

  export default {
    name: 'turHeader',
    components: {
      turHeaderRight
    }
  };
</script>
