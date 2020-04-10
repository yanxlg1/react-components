import "antd/es/date-picker/style/css";
import _DatePicker from "antd/es/date-picker";
import "antd/es/form/style/css";
import _Form from "antd/es/form";

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

import React, { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { transNullValue } from "../utils";
import formStyles from "../_form.less";
import { startDateToUnix, endDateToUnix } from "../../utils/date";
var typeList = ["datePicker"];

var FormDatePicker = function FormDatePicker(props) {
  var name = props.name,
      placeholder = props.placeholder,
      label = props.label,
      _a = props.className,
      className = _a === void 0 ? formStyles.formItemDefault : _a,
      _b = props.formItemClassName,
      formItemClassName = _b === void 0 ? formStyles.formItem : _b,
      dateBeginWith = props.dateBeginWith,
      dateEndWith = props.dateEndWith,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      rules = props.rules;
  var disabledStartDate = useCallback(function (dateBeginWith) {
    if (!dateBeginWith || dateBeginWith.length === 0) {
      return undefined;
    }

    return function (startTime) {
      var timeMax = undefined; // 取最小值=> endOf('d');

      dateBeginWith.map(function (dependence) {
        var date = dependence === "now" ? dayjs() : form.getFieldValue(dependence);

        if (date) {
          var time = date.startOf("day").valueOf();

          if (timeMax && time < timeMax || timeMax === void 0) {
            timeMax = time;
          }
        }
      });

      if (!startTime || timeMax === void 0) {
        return false;
      }

      return startTime.startOf("day").valueOf() < timeMax;
    };
  }, []);
  var disabledEndDate = useCallback(function (dateEndWith) {
    if (!dateEndWith || dateEndWith.length === 0) {
      return undefined;
    }

    return function (endTime) {
      var timeMax = undefined; // 取最大值=> startOf('d');

      dateEndWith.map(function (dependence) {
        var date = dependence === "now" ? dayjs() : form.getFieldValue(dependence);

        if (date) {
          var time = date.endOf("day").valueOf();

          if (timeMax && time < timeMax || timeMax === void 0) {
            timeMax = time;
          }
        }
      });

      if (!endTime || timeMax === void 0) {
        return false;
      }

      return timeMax < endTime.endOf("day").valueOf();
    };
  }, []);
  var disabledDate = useMemo(function () {
    return dateBeginWith ? disabledStartDate(dateBeginWith) : dateEndWith ? disabledEndDate(dateEndWith) : undefined;
  }, [dateBeginWith, dateEndWith]);
  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return React.createElement(_Form.Item, {
    name: name,
    className: formItemClassName,
    label: React.createElement("span", {
      className: labelClassName
    }, label),
    rules: rules
  }, React.createElement(_DatePicker, __assign({
    className: className,
    placeholder: placeholder,
    disabledDate: disabledDate
  }, eventProps)));
};

FormDatePicker.typeList = typeList;

FormDatePicker.formatter = function (formatter) {
  return formatter ? formatter === "start_date" ? startDateToUnix : formatter === "end_date" ? endDateToUnix : transNullValue : transNullValue;
};

export default FormDatePicker;