const state = {
  statusList: [{
    key: 1,
    value: '待办'
  }, {
    key: 2,
    value: '已办'
  }, {
    key: 3,
    value: '待收'
  }, {
    key: 4,
    value: '已收'
  }]
};

const getters = {
  statusList: state => state.statusList
};

const mutations = {};

export default {
  state,
  getters,
  mutations
};
