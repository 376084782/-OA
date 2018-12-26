<template>
  <div class="hair-line" :style="style"></div>
</template>
<script>
  export default {
    name: 'turDivider',
    props: {
      offset: Number,
      background: String
    },
    computed: {
      style () {
        return {
          margin: `${this.offset}px 0`,
          background: this.background
        };
      }
    }
  };
</script>
<style lang="scss">
  .hair-line {
    display: block;
    margin: 4px 0;
    height: 1px;
    width: 100%;
    clear: both;
    background: #e8e8e8;
  }
</style>
