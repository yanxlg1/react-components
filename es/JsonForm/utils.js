export var isNull = function isNull(value) {
  return value === null || value === void 0;
};
export function transNullValue(value) {
  return value === '' || isNull(value) ? undefined : value;
}
export function transJoinStr(value) {
  return value && value.length ? value.join(',') : undefined;
}
export function transNumber(value) {
  var _value = typeof value === 'string' ? value === '' ? undefined : Number(value) : typeof value === 'number' ? value : undefined;

  return _value && isNaN(_value) ? undefined : _value;
}
export function transStrArr(value) {
  if (typeof value === 'string') {
    return value.replace(/(^\s*)|(\s*$)/g, '').split(',').filter(function (str) {
      return str;
    });
  }

  return value;
}
export function transNumberStrArr(value) {
  if (typeof value === 'string') {
    return value.replace(/(^\s*)|(\s*$)/g, '').split(',').filter(function (str) {
      return str && !/[^0-9\,]/g.test(str);
    });
  }

  return value;
}
/**
 * 日期转换成unix
 * @param moment
 */

export function transStartDate(moment) {
  return moment ? moment.clone().hour(0).minute(0).second(0).unix() : moment;
}
export function transEndDate(moment) {
  return moment ? moment.clone().add(1, 'd').hour(0).minute(0).second(0).unix() : moment;
}