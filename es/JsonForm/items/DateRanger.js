var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

import { DatePicker, Form } from 'antd';
import React, { useMemo } from 'react';
import { transNullValue, transEndDate, transStartDate } from '../utils';
import formStyles from '../_form.less';
import classNames from 'classnames';
var typeList = ['dateRanger'];

var FormDateRanger = function FormDateRanger(props) {
  var label = props.label,
      className = props.className,
      _a = props.name,
      name1 = _a[0],
      name2 = _a[1],
      formItemClassName = props.formItemClassName,
      _onChange = props.onChange,
      _b = props.labelClassName,
      labelClassName = _b === void 0 ? '' : _b,
      form = props.form,
      rules = props.rules;
  var event1Props = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name1, form);
      }
    } : {};
  }, []);
  var event2Props = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name2, form);
      }
    } : {};
  }, []);
  return useMemo(function () {
    var itemClassName = classNames(formStyles.formInline, formStyles.inlineBlock, formStyles.marginNone, formStyles.verticalMiddle);
    return React.createElement(Form.Item, {
      label: React.createElement("span", {
        className: labelClassName
      }, label),
      className: "" + formItemClassName
    }, React.createElement(Form.Item, {
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return prevValues[name2] !== currentValues[name2];
      },
      className: itemClassName
    }, function (_a) {
      var getFieldValue = _a.getFieldValue;
      var endTime = getFieldValue(name2);
      return React.createElement(Form.Item, {
        name: name1,
        className: formStyles.marginNone,
        rules: rules === null || rules === void 0 ? void 0 : rules[0]
      }, React.createElement(DatePicker, __assign({
        disabledDate: function disabledDate(currentDate) {
          return currentDate ? endTime ? currentDate.isAfter(endTime) : false : false;
        },
        className: className
      }, event1Props)));
    }), React.createElement("span", {
      className: [formStyles.formColon, formStyles.verticalMiddle].join(' ')
    }, "-"), React.createElement(Form.Item, {
      className: itemClassName,
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return prevValues[name1] !== currentValues[name1];
      }
    }, function (_a) {
      var getFieldValue = _a.getFieldValue;
      var startTime = getFieldValue(name1);
      return React.createElement(Form.Item, {
        name: name2,
        className: formStyles.marginNone,
        rules: rules === null || rules === void 0 ? void 0 : rules[1]
      }, React.createElement(DatePicker, __assign({
        disabledDate: function disabledDate(currentDate) {
          return currentDate ? startTime ? currentDate.isBefore(startTime) : false : false;
        },
        className: className
      }, event2Props)));
    }));
  }, []);
};

FormDateRanger.typeList = typeList;

FormDateRanger.formatter = function (formatter) {
  return formatter ? formatter === 'start_date' ? transStartDate : formatter === 'end_date' ? transEndDate : transNullValue : transNullValue;
};

export default FormDateRanger;