const state = {
  showChangeSys: true
};

const getters = {
  showChangeSys: state => state.showChangeSys
};

const actions = {
  toggleChangeSys({
    state
  }, flag) {
    if (flag == undefined) {
      state.showChangeSys = !state.showChangeSys;
    } else {
      state.showChangeSys = flag;
    }
  }
};

export default {
  state,
  getters,
  actions
};
