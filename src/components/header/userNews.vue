<template>
  <el-popover
    placement="bottom-end"
    width="336"
    trigger="click">
    <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading">
      <el-tab-pane label="通知" name="inform">
        <lists-mobile :datas="informDatas"></lists-mobile>
      </el-tab-pane>
      <el-tab-pane label="消息" name="news">
        <lists-mobile :datas="informDatas"></lists-mobile>
      </el-tab-pane>
      <el-tab-pane label="待办" name="todos">
        <lists-mobile :datas="informDatas"></lists-mobile>
      </el-tab-pane>
    </el-tabs>
    <span class="menu-item" slot="reference">
      <span>
        <el-badge :value="news">
          <i class="anticon icon-bell" ></i>
        </el-badge>
      </span>
    </span>
  </el-popover>
</template>
<script>
  import ListsMobile from 'components/listsMobile';

  export default {
    name: 'turUserNews',
    components: {
      ListsMobile
    },
    data () {
      return {
        loading: true,
        activeName: 'inform',
        news: '',
        informDatas: [
          // {
          //   image: 'http://yapi.imeete.com/api/user/avatar?uid=20',
          //   title: '你收到了14份新周报',
          //   time: '1天前'
          // }
        ]
      };
    },
    methods: {
      handleClick (el) {
        console.log(el);
      }
    },
    mounted () {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  };
</script>
