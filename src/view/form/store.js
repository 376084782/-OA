import Vuex from 'vuex'
let storeForm = new Vuex.Store({
  state: {
    config: {},
    data: {}
  },
  mutations: {
    update(state, data) {
      console.log(data, 'updateConfig');
      state.config = data
    },
    updateData(state, data) {
      console.log(data, 'updateData');
      state.data = data
    }
  }
})

export default storeForm;
