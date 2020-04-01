import "antd/es/input/style/css";
import _Input from "antd/es/input";

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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import React, { useCallback, useMemo, useState } from 'react';
import { intFormatter, numberFormatter, positiveIntFormatter } from "./utils";

var RichInput = function RichInput(_a) {
  var richType = _a.richType,
      value = _a.value,
      onChange = _a.onChange,
      props = __rest(_a, ["richType", "value", "onChange"]);

  var _b = useState(''),
      innerValue = _b[0],
      setInnerValue = _b[1];

  var onInnerChange = useCallback(function (e) {
    var _value = e.target.value;

    if (richType) {
      var targetValue = richType === 'number' ? numberFormatter(_value) : richType === 'integer' ? intFormatter(_value) : richType === 'input' ? _value : richType === 'positiveInteger' ? positiveIntFormatter(_value) : _value;
      e.target.value = targetValue;
    }

    if (value === void 0) {
      setInnerValue(_value);
      onChange && onChange(e);
    } else {
      onChange && onChange(e);
    }
  }, [value, onChange, richType]);
  var showValue = value !== void 0 ? value : innerValue;
  return useMemo(function () {
    return React.createElement(_Input, __assign({
      value: showValue,
      allowClear: true
    }, props, {
      onChange: onInnerChange
    }));
  }, [props, showValue, onInnerChange]);
};

export default RichInput;