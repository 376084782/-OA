const state = {
  businessCategory: [{
      value: "农、林、牧、渔业",
      key: 1
    },
    {
      value: "采矿业",
      key: 2
    },
    {
      value: "电力、燃气及水的生产和供应业",
      key: 3
    },
    {
      value: "建筑业",
      key: 4
    },
    {
      value: "交通运输、仓储和邮政业",
      key: 5
    },
    {
      value: "信息传输、计算机服务和软件业",
      key: 6
    },
    {
      value: "批发和零售业",
      key: 7
    },
    {
      value: "住宿和餐饮业",
      key: 8
    },
    {
      value: "金融业",
      key: 9
    },
    {
      value: "房地产业",
      key: 10
    },
    {
      value: "租赁和商务服务业",
      key: 11
    },
    {
      value: "科学研究、技术服务和地质勘查业",
      key: 12
    },
    {
      value: "水利、环境和公共设施管理业",
      key: 13
    },
    {
      value: "居民服务和其他服务业",
      key: 14
    },
    {
      value: "教育",
      key: 15
    },
    {
      value: "卫生、社会保障和社会福利业",
      key: 16
    },
    {
      value: "文化、体育和娱乐业",
      key: 17
    }
  ],
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
  statusList: state => state.statusList,
  businessCategory: state => state.businessCategory
};

const mutations = {};

export default {
  state,
  getters,
  mutations
};
