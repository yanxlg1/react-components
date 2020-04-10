/// <reference types="react" />
import { TableProps } from 'antd/lib/table';
import { useScrollXY } from './hooks';
declare interface IFitTableProps<T> extends TableProps<T> {
    bottom?: number;
    minHeight?: number;
    autoFitY?: boolean;
}
export declare const showTotal: (total: number) => JSX.Element;
export declare const goButton: JSX.Element;
declare function FitTable<T extends object>({ bottom, minHeight, autoFitY, columns, rowSelection, scroll: propsScroll, onChange, pagination, ...props }: IFitTableProps<T>): JSX.Element;
declare namespace FitTable {
    var showTotal: (total: number) => JSX.Element;
    var goButton: JSX.Element;
    var useScrollXY: typeof import("./hooks").useScrollXY;
}
export default FitTable;
export { useScrollXY };
