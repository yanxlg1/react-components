"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/popconfirm/style/css");

var _popconfirm = _interopRequireDefault(require("antd/es/popconfirm"));

var _react = _interopRequireWildcard(require("react"));

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

var PopConfirmLoadingButton = function PopConfirmLoadingButton(_a) {
  var popConfirmProps = _a.popConfirmProps,
      buttonProps = _a.buttonProps;

  var _b = (0, _react.useState)(false),
      loading = _b[0],
      setLoading = _b[1];

  var onConfirm = (0, _react.useCallback)(function (e) {
    setLoading(true);
    popConfirmProps === null || popConfirmProps === void 0 ? void 0 : popConfirmProps.onConfirm(e)["finally"](function () {
      setLoading(false);
    });
  }, [popConfirmProps === null || popConfirmProps === void 0 ? void 0 : popConfirmProps.onConfirm]);
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement(_popconfirm["default"], __assign({}, popConfirmProps, {
      onConfirm: onConfirm
    }), _react["default"].createElement(_button["default"], __assign({}, buttonProps, {
      loading: loading
    })));
  }, [popConfirmProps, buttonProps, loading]);
};

var _default = PopConfirmLoadingButton;
exports["default"] = _default;