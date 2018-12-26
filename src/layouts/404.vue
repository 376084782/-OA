<template>
  <div class="error-404" :style="style">
    您要找的页面不见了
  </div>
</template>
<script>
  export default {
    name: 'Layout404',
    computed: {
      style () {
        return {
          marginTop: '20%',
          fontSize: '22px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#333'
        };
      }
    }
  };
</script>
