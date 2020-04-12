import "antd/es/form/style/css";
import _Form from "antd/es/form";
import React from 'react';

var DateItem = function DateItem(_a) {
  var value = _a.value;
  return null;
};

var typeList = ['hide'];
/**
 * 隐藏元素，通常用于保存数据
 * @constructor
 */

var HideItem = function HideItem(_a) {
  var form = _a.form,
      type = _a.type,
      name = _a.name;
  return React.createElement(_Form.Item, {
    noStyle: true,
    name: name
  }, React.createElement(DateItem, null));
};

HideItem.typeList = typeList;
export default HideItem;