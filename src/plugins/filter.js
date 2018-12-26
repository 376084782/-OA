const filters = {
  /**
   * 功能：为空时默认显示--
   * @param {String} value 值
   */
  noData (value) {
    if (!value && value !== 0) {
      return '--';
    } else {
      return value;
    }
  },
  noDesc (value) {
    if (!value && value !== 0) {
      return '暂无描述';
    } else {
      return value;
    }
  },
  dateTimeFormat (value) {
    let idx = value.indexOf(' ');
    let date = value.substring(0, idx);
    let time = value.substring(idx + 1);
    return `${time}<br/>${date}`;
  }
};

export default (Vue) => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });
};
