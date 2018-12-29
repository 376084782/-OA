import md5 from "js-md5";
import Ajax from "utils/axios";

export const getClubList = ({
  loginAccount,
  password
}) => {
  const data = {
    loginAccount,
    password: 2
  };
  return Ajax.request({
    url: "/oa/flow/processUser/create",
    data,
    method: "post"
  });
};

// 解析排班excel
export const analyseExcel = ({
  type,
  startDate,
  endDate,
  excelFile
}) => {
  const data = {
    type,
    startDate,
    endDate,
    excelFile
  };
  return Ajax.request({
    url: "/oa/flow/workPlanExcel/file/analysis",
    data: {
      excelFile
    },
    headers: {
      type,
      startDate,
      endDate
    },
    method: "post"
  });
};

// 查询排班

export const scedualSearch = ({
  groupName = '',
  startDate = '',
  endDate = '',
  name = ''
}) => {
  const data = {
    groupName,
    startDate,
    endDate,
    name
  };
  return Ajax.request({
    url: "/oa/flow/workPlan/list",
    data,
    method: "post"
  });
};

export const getDetail = ({
  type
}) => {
  // return Ajax.request({
  //   url: '/oa/flow/processUserDetail/list',
  //   data,
  //   method: 'post'
  // })
  return new Promise(rsv => {
    rsv(getTestDyFormData(type));
  });
};

/**
 * @param contentStep.action
 * 0 发起
 * 1 未操作
 * 2 同意
 * 3 拒绝
 * 4 发送
 * 10 结束
 * @param contentStep.showEdit
 * 是否显示气泡
 */
let testData = {
  schedualApply: {
    activeStep: 1,
    contentStep: [{
      stepName: '申请',
      name: '发起人名',
      roleName: '职员',
      showEdit: false,
      detailList: [{
        title1: '发起',
        title3: '2018.08.27 10:57:30',
        remark: '备注',
      }],
      content: [{
        label: '下一步执行人：',
        type: 'radio',
        key: "nextPeople",
        meta: {
          list: [{
            key: "0",
            value: "李丽"
          }, {
            key: "1",
            value: "曹云霞"
          }]
        }
      }, {
        label: '下一级办结时限：',
        type: 'date',
        key: "nextDate"
      }]
    }, {
      stepName: '审核',
      name: '李小丽',
      roleName: '科长',
      showEdit: true,
      detailList: [{
        className: 'success',
        title1: '同意',
        title2: '(这个人)',
        title3: '2018.08.27 10:57:30',
        remark: '备注',
      }, {
        className: 'danger',
        title1: '同意',
        title2: '(那个人)',
        title3: '2018.08.27 10:57:30',
        remark: '备注',
      }, {
        className: 'text-right',
        title1: '主送单位',
        title3: '杭州文文科技有限公司',
      }, {
        className: 'text-right',
        title1: '传阅人',
        title3: '李小花',
      }, {
        className: 'text-right',
        title3: '2018.08.27 10:57:30',
      }],
      content: [{
        label: '意见：',
        type: 'radio',
        key: "agree",
        meta: {
          list: [{
            key: "0",
            value: "同意"
          }, {
            key: "1",
            value: "不同意"
          }]
        }
      }, {
        label: '',
        type: 'textarea',
        key: "reason"
      }]
    }],
    contentTop: [{
      label: '选择时间：',
      type: 'assignExcelAnalyse',
      key: "assignList",
      meta: {
        showType: ['1', '2']
      }
    }, {
      label: '标题：',
      type: 'input',
      required: true
    }, {
      label: '申请人：',
      type: 'input',
      required: true
    }, {
      label: '申请部门：',
      type: 'input',
      required: true
    }, {
      type: "fullcalendar",
      label: "排班预览",
      key: "assignList"
    }]
  }
}

function getTestDyFormData(type) {
  console.log(testData, type, testData[type])
  return testData[type] || [];
}


// contentTop: [{
//   readOnly: true,
//   type: "select",
//   label: "公文类型",
//   placehoder: "请选择",
//   meta: {
//     selectType: "gw",
//     // 是否开启多选
//     multiple: false,
//     // 是否开始可搜索
//     filterable: false
//   },
//   key: "gwType",
//   // 绑定其他属性值控制显示隐藏，主要用于勾选不同意后填写不同意原因
//   bindKey: "jjcd",
//   bindKeyVal: ["1"]
// },
// {
//   readOnly: true,
//   type: "input",
//   label: "文号",
//   key: "wh"
// },
// {
//   readOnly: true,
//   type: "date",
//   label: "日期",
//   key: "date"
// },
// {
//   readOnly: true,
//   type: "textarea",
//   label: "输入区",
//   key: "textarea"
// },
// {
//   // 单选框
//   type: "radio",
//   label: "紧急程度",
//   key: "jjcd",
//   readOnly: true,
//   meta: {
//     list: [{
//         key: "0",
//         value: "一般"
//       },
//       {
//         key: "1",
//         value: "紧急"
//       },
//       {
//         key: "2",
//         value: "重要"
//       }
//     ]
//   }
// },
// {
//   // 文件上传
//   type: "upload",
//   label: "正文",
//   key: "zw",
//   readOnly: true,
//   meta: {
//     type: "file",
//     action: "",
//     list: [{
//       name: "文件名",
//       // 文件地址
//       url: ""
//     }]
//   }
// },
// {
//   // 图片上传
//   type: "upload",
//   label: "图片",
//   readOnly: true,
//   key: "tp",
//   meta: {
//     type: "image",
//     action: ""
//   }
// },
// {
//   type: "fullcalendar",
//   label: "排班预览",
//   key: "assignList"
// },
// {
//   type: "assignExcelAnalyse",
//   label: "选择时间",
//   key: "assignList",
//   meta: {
//     showType: [1, 2, 3]
//   }
// }
// ]
