import "antd/es/button/style/css";
import _Button from "antd/es/button";
import "antd/es/col/style/css";
import _Col from "antd/es/col";
import "antd/es/row/style/css";
import _Row from "antd/es/row";
import "antd/es/checkbox/style/css";
import _Checkbox from "antd/es/checkbox";
import "antd/es/modal/style/css";
import _Modal from "antd/es/modal";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useModal from '../hooks/useModal';
import styles from './_index.less';

var ColumnsSetting = function ColumnsSetting(_a) {
  var columns = _a.columns,
      ColumnsSettingRender = _a.columnsSettingRender,
      resetColumnsSetting = _a.resetColumnsSetting,
      onColumnsChange = _a.onColumnsChange;

  var _b = useModal(),
      visible = _b.visible,
      setVisibleProps = _b.setVisibleProps,
      onClose = _b.onClose;

  var cacheColumnsShowList = useRef([]);

  var _c = useState(columns.map(function (column) {
    return column['dataIndex'];
  })),
      columnsShowList = _c[0],
      setColumnsShowList = _c[1]; // 列
  // 重新初始化


  useEffect(function () {
    var keys = columns.map(function (column) {
      return column['dataIndex'];
    });
    cacheColumnsShowList.current = keys;
    setColumnsShowList(keys);
  }, [columns]); // drop修改

  useEffect(function () {
    if (visible) {
      setColumnsShowList(cacheColumnsShowList.current);
    }
  }, [visible]);
  var onChange = useCallback(function (checkedValue) {
    setColumnsShowList(checkedValue);
  }, []);
  var onSave = useCallback(function () {
    cacheColumnsShowList.current = columnsShowList;
    var list = {};
    columnsShowList.map(function (value) {
      list[value] = true;
    });
    onColumnsChange(columns.filter(function (column) {
      return list[column['dataIndex']];
    }));
    onClose();
  }, [columnsShowList, columns]);
  var onCancel = useCallback(function () {
    if (resetColumnsSetting) {
      //重置
      var keys = columns.map(function (column) {
        return column['dataIndex'];
      });
      cacheColumnsShowList.current = keys;
      setColumnsShowList(keys);
      onColumnsChange(columns);
      onClose();
    } else {
      onClose();
    }
  }, []);
  var modal = useMemo(function () {
    return React.createElement(_Modal, {
      title: "\u81EA\u5B9A\u4E49\u5B57\u6BB5\u5C55\u793A",
      cancelText: resetColumnsSetting ? '还原默认' : '不保存',
      okText: "\u4FDD\u5B58",
      onOk: onSave,
      onCancel: onCancel,
      visible: !!visible,
      className: styles.settingModal
    }, ColumnsSettingRender === true ? React.createElement(_Checkbox.Group, {
      onChange: onChange,
      value: columnsShowList
    }, React.createElement(_Row, {
      gutter: [0, 5]
    }, columns.map(function (column) {
      var dataIndex = column['dataIndex'];
      return React.createElement(_Col, {
        span: 4,
        key: dataIndex
      }, React.createElement(_Checkbox, {
        value: dataIndex
      }, column.title));
    }))) : React.createElement(ColumnsSettingRender, {
      value: columnsShowList,
      onChange: onChange
    }));
  }, [visible, columnsShowList]);
  var showModal = useCallback(function () {
    setVisibleProps(true);
  }, []);
  return useMemo(function () {
    return React.createElement(React.Fragment, null, React.createElement(_Button, {
      className: styles.settingBtn,
      size: "small",
      onClick: showModal
    }, "\u81EA\u5B9A\u4E49\u5C55\u793A\u5B57\u6BB5"), modal);
  }, [visible, columnsShowList]);
};

export default ColumnsSetting;