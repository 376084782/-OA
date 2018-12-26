export function getSharePartner (number) {
  if (number === 0) {
    return '全部';
  } else if (number === 1) {
    return '当日新用户';
  } else {
    return `${changeChinese(number)}内新用户`;
  }
}

function changeChinese (number) {
  let str = number + '';
  let length = str.split('').length;
  let array = [
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
  ];
  if (number === 10) {
    return '十';
  }
  if (length === 1) {
    return array[number];
  } else if (length === 2) {
    if (str[0] === '1' && +str[1] < 10) {
      return `十${array[number]}`;
    } else {
      return `${array[str[0]]}十${array[str[1]]}`;
    }
  }
  return number;
}

export function objectToArray (object, type) {
  let array = [];
  if (type === 'string') {
    for (let i in object) {
      array.push({
        id: i + '',
        name: object[i]
      });
    }
  } else {
    for (let i in object) {
      array.push({
        id: +i,
        name: object[i]
      });
    }
  }
  return array;
}
// 数据处理，针对分享趋势图的组合式
export function mergeArray (data, name) {
  let array = [];
  if (data instanceof Array) {
    array = data[0].list;
    const length = data.length;
    const subLength = array.length;
    for (let j = 0; j < subLength; j++) {
      for (let i = 0; i < length; i++) {
        let curData = data[i].list[j];
        array[j][name[i]] = curData.value;
      }
    }
  } else {
    array = data.list;
    const length = array.length;
    for (let i = 0; i < length; i++) {
      array[i][name] = array[i].value;
    }
  }
  return array;
}
