import md5 from 'js-md5';
import Ajax from 'utils/axios'

export const getClubList = ({
  loginAccount,
  password
}) => {
  const data = {
    loginAccount,
    password: 2
  }
  return Ajax.request({
    url: '/oa/flow/processUser/create',
    data,
    method: 'post'
  })
}


export const getDetail = () => {
  // return Ajax.request({
  //   url: '/oa/flow/processUserDetail/list',
  //   data,
  //   method: 'post'
  // })
  return new Promise(rsv => {
    rsv({
      contentTop: [{
        readOnly: true,
        type: 'select',
        label: '公文类型',
        meta: {
          selectType: 'gw',
          // 是否开启多选
          multiple: false,
          // 是否开始可搜索
          filterable: false,
        },
        key: 'gwType',
        // 绑定其他属性值控制显示隐藏，主要用于勾选不同意后填写不同意原因
        bindKey: 'jjcd',
        bindKeyVal: '1'
      }, {
        readOnly: true,
        type: 'input',
        label: '文号',
        key: 'wh'
      }, {
        readOnly: true,
        type: 'date',
        label: '日期',
        key: 'date'
      }, {
        readOnly: true,
        type: 'textarea',
        label: '输入区',
        key: 'textarea'
      }, {
        // 单选框
        type: 'radio',
        label: '紧急程度',
        key: 'jjcd',
        readOnly: true,
        meta: {
          list: [{
            key: '0',
            value: '一般'
          }, {
            key: '1',
            value: '紧急'
          }, {
            key: '2',
            value: '重要'
          }]
        }
      }, {
        // 文件上传
        type: 'upload',
        label: '正文',
        key: 'zw',
        readOnly: true,
        meta: {
          type: 'file',
          action: '',
          list: [{
            name: '文件名',
            // 文件地址
            url: ''
          }]
        }
      }, {
        // 图片上传
        type: 'upload',
        label: '图片',
        readOnly: true,
        key: 'tp',
        meta: {
          type: 'image',
          action: ''
        }
      }]
    })
  })
}
