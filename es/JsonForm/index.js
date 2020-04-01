import "antd/es/row/style/css";
import _Row from "antd/es/row";
import "antd/es/col/style/css";
import _Col from "antd/es/col";
import "antd/es/button/style/css";
import _Button from "antd/es/button";
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

import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import FormInput from './items/Input';
import FormSelect from './items/Select';
import FormCheckbox from './items/Checkbox';
import FormDatePicker from './items/DatePicker';
import FormDateRanger from './items/DateRanger';
import FormInputRange from './items/InputRange';
import RcResizeObserver from 'rc-resize-observer';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import FormCheckboxGroup from './items/CheckboxGroup';
import FormRadioGroup from './items/RadioGroup';
import classNames from 'classnames';
import './index.less';
import formStyles from './_form.less';

var JsonForm = function JsonForm(props, ref) {
  var fieldList = props.fieldList,
      children = props.children,
      labelClassName = props.labelClassName,
      _a = props.rowHeight,
      rowHeight = _a === void 0 ? 56 : _a,
      _b = props.defaultCollapse,
      defaultCollapse = _b === void 0 ? true : _b,
      _c = props.enableCollapse,
      enableCollapse = _c === void 0 ? true : _c,
      itemCol = props.itemCol,
      itemRow = props.itemRow,
      _props = __rest(props, ["fieldList", "children", "labelClassName", "rowHeight", "defaultCollapse", "enableCollapse", "itemCol", "itemRow"]);

  var _d = useState(defaultCollapse),
      collapse = _d[0],
      setCollapse = _d[1];

  var _e = useState(false),
      collapseBtnVisible = _e[0],
      setCollapseBtnVisible = _e[1];

  var form = _Form.useForm()[0];

  var wrapRef = useRef(null);
  var btnWrap = useRef(null);

  var _f = useState(defaultCollapse ? rowHeight : undefined),
      formHeight = _f[0],
      setFormHeight = _f[1];

  useImperativeHandle(ref, function () {
    return {
      getFieldsValue: getValues,
      validateFields: function validateFields() {
        return form.validateFields().then(function () {
          return getValues();
        });
      }
    };
  }, []);
  var getValues = useCallback(function () {
    var values = {};
    fieldList.map(function (_a) {
      var type = _a.type,
          name = _a.name,
          formatter = _a.formatter;

      if (FormInput.typeList.includes(type)) {
        values[name] = FormInput.formatter(formatter)(form.getFieldValue(name));
      } else if (FormSelect.typeList.includes(type)) {
        values[name] = FormSelect.formatter(formatter)(form.getFieldValue(name));
      } else if (FormDateRanger.typeList.includes(type)) {
        var name1 = name[0],
            name2 = name[1];
        values[name1] = FormDateRanger.formatter(formatter === null || formatter === void 0 ? void 0 : formatter[0])(form.getFieldValue(name1));
        values[name2] = FormDateRanger.formatter(formatter === null || formatter === void 0 ? void 0 : formatter[1])(form.getFieldValue(name2));
      } else if (FormDatePicker.typeList.includes(type)) {
        values[name] = FormDatePicker.formatter(formatter)(form.getFieldValue(name));
      } else if (FormInputRange.typeList.includes(type)) {
        var name1 = name[0],
            name2 = name[1];
        values[name1] = FormInputRange.formatter()(form.getFieldValue(name1));
        values[name2] = FormInputRange.formatter()(form.getFieldValue(name2));
      } else {
        return form.getFieldValue(name);
      }
    });
    return values;
  }, [fieldList]);
  var onCollapseChange = useCallback(function () {
    // 需要判断当前元素位置
    setCollapse(!collapse);
  }, [collapse]);
  var equalSize = useCallback(function (size, value) {
    return Math.abs(value - size) <= 1;
  }, []);
  var onResize = useCallback(function (_a) {
    var height = _a.height,
        width = _a.width;

    if (enableCollapse) {
      var btnWrapOffsetLeft = btnWrap.current.offsetLeft;

      if (btnWrapOffsetLeft === 0) {
        // 按钮换行了
        if (equalSize(height, rowHeight * 2)) {
          setFormHeight(rowHeight);
          setCollapseBtnVisible(false);
          return;
        }
      }

      if (equalSize(height, rowHeight)) {
        setCollapseBtnVisible(false);
        setFormHeight(height);
        return;
      }

      setFormHeight(height);
      setCollapseBtnVisible(true);
    }
  }, []);
  var collapseBtn = useMemo(function () {
    if (enableCollapse) {
      return React.createElement("div", {
        ref: btnWrap,
        style: {
          display: 'flex',
          flex: collapse ? 1 : 0,
          justifyContent: 'flex-end',
          visibility: collapseBtnVisible ? 'visible' : 'hidden'
        }
      }, React.createElement(_Button, {
        type: "link",
        className: formStyles.formItem,
        style: {
          "float": 'right'
        },
        onClick: onCollapseChange
      }, collapse ? React.createElement(React.Fragment, null, "\u6536\u8D77\u81F3\u4E00\u884C", React.createElement(UpOutlined, null)) : React.createElement(React.Fragment, null, "\u5C55\u5F00", React.createElement(DownOutlined, null))));
    } else {
      return null;
    }
  }, [collapseBtnVisible, collapse]);
  var getColChildren = useCallback(function (children, times) {
    if (times === void 0) {
      times = 1;
    } //TODO 暂时不支持时间关联使用col方式布局


    if (itemCol) {
      return React.createElement(_Col, __assign({}, itemCol), children);
    } else {
      return children;
    }
  }, []);
  var fromItemList = useMemo(function () {
    var fields = fieldList.map(function (_a) {
      var type = _a.type,
          field = __rest(_a, ["type"]);

      if (FormInput.typeList.includes(type)) {
        return getColChildren(React.createElement(FormInput, __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (FormSelect.typeList.includes(type)) {
        return getColChildren(React.createElement(FormSelect, __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (FormCheckbox.typeList.includes(type)) {
        return getColChildren(React.createElement(FormCheckbox, __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (FormDatePicker.typeList.includes(type)) {
        return getColChildren(React.createElement(FormDatePicker, __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (FormDateRanger.typeList.includes(type)) {
        return getColChildren(React.createElement(FormDateRanger, __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (FormCheckboxGroup.typeList.includes(type)) {
        return getColChildren(React.createElement(FormCheckboxGroup, __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (FormRadioGroup.typeList.includes(type)) {
        return getColChildren(React.createElement(FormRadioGroup, __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (FormInputRange.typeList.includes(type)) {
        return React.createElement(FormInputRange, __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        }));
      }

      return null;
    });

    if (itemCol) {
      return React.createElement(_Row, __assign({}, itemRow ? itemRow : {}, {
        className: formStyles.formRow
      }), fields);
    } else {
      return fields;
    }
  }, [fieldList]);
  var formContent = useMemo(function () {
    if (collapse) {
      return React.createElement(React.Fragment, null, fromItemList, children, collapseBtn);
    } else {
      return React.createElement("div", {
        className: classNames(formStyles.flex, formStyles.flex1)
      }, React.createElement("div", {
        className: classNames(formStyles.flex1, formStyles.flexRow),
        style: {
          flexWrap: 'wrap'
        }
      }, fromItemList), children, collapseBtn);
    }
  }, [fieldList, children, collapse, collapseBtnVisible]);
  var formComponent = useMemo(function () {
    return React.createElement(RcResizeObserver, {
      onResize: onResize
    }, React.createElement("div", null, React.createElement(_Form, __assign({
      layout: "inline"
    }, _props, {
      form: form
    }), formContent)));
  }, [fieldList, collapseBtnVisible, collapse, children]);
  return useMemo(function () {
    var style = enableCollapse ? collapse ? {
      overflow: 'hidden',
      height: formHeight
    } : {
      overflow: 'hidden',
      height: rowHeight
    } : {};
    return React.createElement("div", {
      ref: wrapRef,
      style: style
    }, formComponent);
  }, [formHeight, fieldList, collapseBtnVisible, collapse, children]);
};

export default forwardRef(JsonForm);
export * from './utils';