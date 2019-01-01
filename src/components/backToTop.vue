<template>
  <div class="back-top" :class="{'back-top-show': backTop}" :style="styles" @click="back">
    <slot>
      <div class="back-top-inner">
        <i class="anticon icon-up pointerIcon"></i>
      </div>
    </slot>
  </div>
</template>
<style lang="scss">
  .back-top {
    position: fixed;
    cursor: pointer;
    display: none;
    z-index: 1000;
  }
  .back-top.back-top-show {
    display: block
  }
  .bolck-date{
    width: 330px;
    height: 330px;
  }
  .back-top-inner {
    background-color: rgba(0,0,0,.6);
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
    transition: all .2s ease-in-out;
    padding: 2px 8px;
    i {
      font-size: 26px;
      color: #fff;
    }
  }
  .back-top-inner:hover {
    background-color: rgba(0,0,0,.7);
    i {
      color: #409eff
    }
  }
</style>

<script>
  import scrollToTop from 'src/utils/assist.js';
  export default {
    props: {
      height: {
        type: Number,
        default: 250
      },
      bottom: {
        type: Number,
        default: 30
      },
      right: {
        type: Number,
        default: 30
      },
      duration: {
        type: Number,
        default: 1000
      }
    },
    data () {
      return {
        backTop: false
      };
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleScroll);
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    },
    computed: {
      styles () {
        return {
          bottom: `${this.bottom}px`,
          right: `${this.right}px`
        };
      }
    },
    methods: {
      handleScroll () {
        this.backTop = window.pageYOffset >= this.height;
      },
      back () {
        const sTop = document.documentElement.scrollTop || document.body.scrollTop;
        scrollToTop(window, sTop, 0, this.duration);
        this.$emit('on-click');
      }
    }
  };
</script>
