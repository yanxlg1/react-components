export const isEmptyObject = (target: object) => {
    return Object.keys(target).length === 0;
};

export const EmptyObject: { [key: string]: any } = {};
export const EmptyArray: any[] = [];

export function isNumber(value?: string | number) {
    return /^\d+$/.test(String(value));
}
