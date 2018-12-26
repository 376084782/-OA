<template>
  <el-select v-model="selectedScope" @change="changeScope">
    <el-option
      v-for="item in scopes"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
  import { mapState } from 'vuex';
  import { objectToArray } from 'utils/convert';
  import { setCookie } from 'utils/cookie';

  export default {
    name: 'turScopeSelect',
    computed: {
      ...mapState('login', {
        scopes: state => {
          let type = typeof state.userInfo.current_scope.id;
          return objectToArray(state.userInfo.scopes, type);
        },
        selectedScope: state => {
          return state.userInfo.current_scope.id;
        }
      })
    },
    methods: {
      changeScope (value) {
        // 切换作用域需要清空gameKey
        window.gameKey = '';
        localStorage.removeItem('gameKey');
        // 更改cookie
        setCookie('box_scope_key', value, 356);
        this.$message({
          message: '作用域切换成功',
          type: 'success'
        });
        setTimeout(() => {
          this.$router.push('/');
          location.reload();
        }, 1000);
      }
    }
  };
</script>
