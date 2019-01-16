const breadcurmb = {
  state: {
    list: [],
  },
  mutations: {},
  actions: {
    updateBreadCurmbList({
      state
    }, list) {
      state.list = list;
    },
    addBreadCurmbList({
      state
    }, list) {
      state.list = state.list.concat(list);
    },
    clearBreadCurmbList({
      state
    }, list) {
      state.list = [];
    }
  },
  getters: {}
};
export default breadcurmb;