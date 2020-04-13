import "antd/es/card/style/css";
import _Card from "antd/es/card";

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

import React from 'react';
import { getFormItems } from './index';
var typeList = ['layout'];

var Layout = function Layout(props) {
  var form = props.form,
      labelClassName = props.labelClassName,
      layoutType = props.layoutType,
      type = props.type,
      fieldList = props.fieldList,
      itemCol = props.itemCol,
      itemRow = props.itemRow,
      _props = __rest(props, ["form", "labelClassName", "layoutType", "type", "fieldList", "itemCol", "itemRow"]);

  switch (layoutType) {
    case 'card':
      return React.createElement(_Card, __assign({}, _props), getFormItems(fieldList, form, labelClassName, itemCol, itemRow));

    default:
      return React.createElement("div", __assign({}, _props), getFormItems(fieldList, form, labelClassName, itemCol, itemRow));
  }
};

Layout.typeList = typeList;
export default Layout;