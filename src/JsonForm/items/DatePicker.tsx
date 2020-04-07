import { DatePicker, Form } from "antd";
import React, { useCallback, useMemo } from "react";
import { CustomFormProps, FormItemName } from "../index";
import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { FormInstance, Rule } from "antd/es/form";
import moment, { Moment } from "moment";
import { transNullValue, transEndDate, transStartDate } from "../utils";
import formStyles from "../_form.less";
import { PickerProps } from "antd/es/date-picker/generatePicker";

export type DatePickerFormatter = "start_date" | "end_date";

export type DatePickerType = "datePicker";
const typeList = ["datePicker"];

export type DatePickerProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        name: FormItemName<T>;
        form: FormInstance;
        type: DatePickerType;
        placeholder?: string;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        dateBeginWith?: Array<FormItemName<T> | "now">;
        dateEndWith?: Array<FormItemName<T> | "now">;
        formatter?: DatePickerFormatter;
        rules?: Rule[];
    } & Omit<PickerProps<Moment>, "onChange">;

const FormDatePicker = (props: DatePickerProps) => {
    const {
        name,
        placeholder,
        label,
        className = formStyles.formItemDefault,
        formItemClassName,
        dateBeginWith,
        dateEndWith,
        onChange,
        labelClassName,
        form,
        rules,
    } = props;

    const disabledStartDate = useCallback((dateBeginWith?: string[]) => {
        if (!dateBeginWith || dateBeginWith.length === 0) {
            return undefined;
        }
        return (startTime: Moment | null) => {
            let timeMax: number | undefined = undefined;
            // 取最小值=> endOf('d');
            dateBeginWith.map(dependence => {
                const date = dependence === "now" ? moment() : form.getFieldValue(dependence);
                if (date) {
                    const time = date.startOf("day").valueOf();
                    if ((timeMax && time < timeMax) || timeMax === void 0) {
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

    const disabledEndDate = useCallback((dateEndWith?: string[]) => {
        if (!dateEndWith || dateEndWith.length === 0) {
            return undefined;
        }
        return (endTime: Moment | null) => {
            let timeMax: number | undefined = undefined;
            // 取最大值=> startOf('d');
            dateEndWith.map(dependence => {
                const date = dependence === "now" ? moment() : form.getFieldValue(dependence);
                if (date) {
                    const time = date.endOf("day").valueOf();
                    if ((timeMax && time < timeMax) || timeMax === void 0) {
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

    const disabledDate = useMemo(() => {
        return dateBeginWith
            ? disabledStartDate(dateBeginWith)
            : dateEndWith
            ? disabledEndDate(dateEndWith)
            : undefined;
    }, [dateBeginWith, dateEndWith]);

    const eventProps = useMemo(() => {
        return onChange
            ? {
                  onChange: () => {
                      onChange(name as FormItemName, form);
                  },
              }
            : {};
    }, []);

    return (
        <Form.Item
            name={name}
            className={formItemClassName}
            label={<span className={labelClassName}>{label}</span>}
            rules={rules}
        >
            <DatePicker
                className={className}
                placeholder={placeholder}
                disabledDate={disabledDate}
                {...eventProps}
            />
        </Form.Item>
    );
};

FormDatePicker.typeList = typeList;

FormDatePicker.formatter = (formatter?: DatePickerFormatter) => {
    return formatter
        ? formatter === "start_date"
            ? transStartDate
            : formatter === "end_date"
            ? transEndDate
            : transNullValue
        : transNullValue;
};

export default FormDatePicker;
