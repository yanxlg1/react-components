import "antd/es/button/style/css";
import _Button from "antd/es/button";
import "antd/es/popconfirm/style/css";
import _Popconfirm from "antd/es/popconfirm";

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

import React, { useCallback, useMemo, useState } from 'react';

var PopConfirmLoadingButton = function PopConfirmLoadingButton(_a) {
  var popConfirmProps = _a.popConfirmProps,
      buttonProps = _a.buttonProps;

  var _b = useState(false),
      loading = _b[0],
      setLoading = _b[1];

  var onConfirm = useCallback(function (e) {
    setLoading(true);
    popConfirmProps === null || popConfirmProps === void 0 ? void 0 : popConfirmProps.onConfirm(e)["finally"](function () {
      setLoading(false);
    });
  }, [popConfirmProps === null || popConfirmProps === void 0 ? void 0 : popConfirmProps.onConfirm]);
  return useMemo(function () {
    return React.createElement(_Popconfirm, __assign({}, popConfirmProps, {
      onConfirm: onConfirm
    }), React.createElement(_Button, __assign({}, buttonProps, {
      loading: loading
    })));
  }, [popConfirmProps, buttonProps, loading]);
};

export default PopConfirmLoadingButton;