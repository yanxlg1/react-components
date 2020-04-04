import React from "react";
import { FormProps } from "antd/lib/form/Form";
import { InputProps } from "./items/Input";
import { SelectProps } from "./items/Select";
import { CheckboxProps } from "./items/Checkbox";
import { DatePickerProps } from "./items/DatePicker";
import { DateRangerProps } from "./items/DateRanger";
import { InputRangeProps } from "./items/InputRange";
import { Store, ValidateFields } from "rc-field-form/lib/interface";
import { FormInstance } from "antd/es/form";
import { ColProps } from "antd/lib/grid/col";
import { RowProps } from "antd/lib/grid/row";
import { CheckboxGroupProps } from "./items/CheckboxGroup";
import { RadioGroupProps } from "./items/RadioGroup";
import "./index.less";
import { LayoutProps } from "./layout";
import FormItem from "./FormItem";
export declare interface CustomFormProps {
    labelClassName?: string;
}
export declare type FormField<T = string> = (Omit<InputProps<T>, "form"> | Omit<SelectProps<T>, "form"> | Omit<CheckboxProps<T>, "form"> | Omit<DatePickerProps<T>, "form"> | Omit<DateRangerProps<T>, "form"> | Omit<CheckboxGroupProps<T>, "form"> | Omit<RadioGroupProps<T>, "form"> | Omit<InputRangeProps<T>, "form"> | Omit<LayoutProps<T>, "form">) & {
    form?: FormInstance;
};
declare interface JsonFormProps<T = any> extends FormProps, CustomFormProps {
    fieldList: Array<FormField<T>>;
    rowHeight?: number;
    defaultCollapse?: boolean;
    enableCollapse?: boolean;
    itemCol?: ColProps;
    itemRow?: RowProps;
}
export declare type FormItemName<T = string> = T;
export declare interface CustomFormProps {
    labelClassName?: string;
}
export interface JsonFormRef {
    getFieldsValue: () => Store;
    validateFields: ValidateFields;
    setFieldsValue: (value: Store) => void;
}
export declare const getColChildren: (children: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>, itemCol?: ColProps, times?: number) => JSX.Element;
export declare const getFormItems: (fieldList: FormField<string>[], form: FormInstance, labelClassName?: string, itemCol?: ColProps, itemRow?: RowProps) => JSX.Element | JSX.Element[];
interface JsonFormComponent<P> extends React.FC<P> {
    FormItem: typeof FormItem;
}
declare const JsonFormComponent: JsonFormComponent<JsonFormProps> & {
    FormItem: typeof FormItem;
};
export default JsonFormComponent;
export * from "./utils";
