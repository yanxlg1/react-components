import { RefObject, useRef, useState, useCallback, useEffect } from "react";
import { JsonFormRef } from "../JsonForm";
import { config } from "../Config";
import { EmptyArray, EmptyObject } from "../utils";
import { PaginationConfig } from "antd/es/pagination";

export interface IResponse<T> {
    code: number;
    message: string;
    data: T;
}

export type IPaginationResponse<T, U = {}> = {
    total: number;
    list: T[];
} & U;

function useList<T, Q, E = {}>({
    queryList,
    formRef,
    extraQuery,
    defaultState,
    autoQuery = true,
    pageNumberKey = config.defaultPageNumberKey,
    pageSizeKey = config.defaultPageSizeKey,
}: {
    queryList: (query: Q) => Promise<IResponse<IPaginationResponse<T, E>>>;
    formRef?: RefObject<JsonFormRef>;
    extraQuery?: { [key: string]: any };
    defaultState?: { pageNumber?: number; pageSize?: number };
    autoQuery?: boolean;
    pageNumberKey?: string;
    pageSizeKey?: string;
}) {
    const [loading, setLoading] = useState(autoQuery);

    const extraQueryRef = useRef<{ [key: string]: any } | undefined>(undefined);
    extraQueryRef.current = extraQuery; // extraQuery支持外部更新，每次覆盖

    const pageNumber = useRef<number>(defaultState?.pageNumber ?? config.defaultPageNumber);
    const pageSize = useRef<number>(defaultState?.pageSize ?? config.defaultPageSize);

    const [dataSource, setDataSource] = useState<T[]>([]);
    const [total, setTotal] = useState(0);
    const [extraData, setExtraData] = useState<E | undefined>(undefined);
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>(EmptyArray);

    const query = useRef<object>({});
    const setQuery = useCallback((nextQuery: object) => {
        query.current = nextQuery;
    }, []);

    const getListData = useCallback(
        ({
            page = pageNumber.current,
            page_count = pageSize.current,
            ...extra
        }: { page?: number; page_count?: number; [key: string]: any } = {}) => {
            return Promise.resolve()
                .then(() => {
                    return formRef ? formRef.current!.validateFields() : undefined;
                })
                .then(formValues => {
                    setLoading(true);
                    const query = {
                        [pageNumberKey]: page,
                        [pageSizeKey]: page_count,
                        ...extra,
                        ...formValues,
                    };
                    setQuery(query);
                    setSelectedRowKeys(EmptyArray);
                    return queryList(query as Q)
                        .then(({ data: { total = 0, list = [], ...extraData } = EmptyObject }) => {
                            pageNumber.current = page;
                            pageSize.current = page_count;
                            setDataSource(list);
                            setTotal(total);
                            setExtraData(extraData as E);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                });
        },
        [],
    );

    const onReload = useCallback(
        () =>
            getListData({
                ...extraQueryRef.current,
            }),
        [],
    );

    const onSearch = useCallback(
        () =>
            getListData({
                page: 1,
                page_count: defaultState?.pageSize ?? config.defaultPageSize,
                ...extraQueryRef.current,
            }),
        [],
    );

    const onChange = useCallback(({ current, pageSize }: PaginationConfig, filters, sorter) => {
        const sorterConfig =
            sorter && sorter.field
                ? {
                      sort_by: sorter.field,
                      sort_order: sorter.order,
                  }
                : {};
        return getListData({
            page: current,
            page_count: pageSize,
            ...sorterConfig,
            ...extraQueryRef.current,
        });
    }, []);

    useEffect(() => {
        autoQuery && onSearch();
    }, []);

    const setPageSize = useCallback((size: number) => {
        pageSize.current = size;
    }, []);

    const setPageNumber = useCallback((current: number) => {
        pageNumber.current = current;
    }, []);

    return {
        get query() {
            return query.current;
        },
        get pageNumber() {
            return pageNumber.current;
        },
        get pageSize() {
            return pageSize.current;
        },
        loading,
        dataSource,
        extraData,
        total,
        setLoading,
        setDataSource,
        selectedRowKeys,
        setTotal,
        onReload,
        onSearch,
        onChange,
        getListData,
        setSelectedRowKeys,
        setPageSize,
        setPageNumber,
    };
}

export default useList;
