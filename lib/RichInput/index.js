"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/input/style/css");

var _input = _interopRequireDefault(require("antd/es/input"));

var _react = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __assign = void 0 && (void 0).__assign || function () {
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

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var RichInput = function RichInput(_a) {
  var richType = _a.richType,
      value = _a.value,
      onChange = _a.onChange,
      props = __rest(_a, ["richType", "value", "onChange"]);

  var _b = (0, _react.useState)(''),
      innerValue = _b[0],
      setInnerValue = _b[1];

  var onInnerChange = (0, _react.useCallback)(function (e) {
    var _value = e.target.value;

    if (richType) {
      var targetValue = richType === 'number' ? (0, _utils.numberFormatter)(_value) : richType === 'integer' ? (0, _utils.intFormatter)(_value) : richType === 'input' ? _value : richType === 'positiveInteger' ? (0, _utils.positiveIntFormatter)(_value) : _value;
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
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement(_input["default"], __assign({
      value: showValue,
      allowClear: true
    }, props, {
      onChange: onInnerChange
    }));
  }, [props, showValue, onInnerChange]);
};

var _default = RichInput;
exports["default"] = _default;