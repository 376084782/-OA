<template>
  <div class="main">{{$store.getters.showChangeSys}}
    <router-view></router-view>
    <modal-system :visible="$store.getters.showChangeSys" @update:visible="toggle"></modal-system>
  </div>
</template>
<script>
import modalSystem from "view/hp/components/modalSystem";
export default {
  components: {
    modalSystem
  },
  data() {
    return {
    };
  },
  methods:{
    toggle(flag){
      this.$store.dispatch('toggleChangeSys',flag)
    }
  }
};
</script>
