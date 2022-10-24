import { parse, stringify } from 'qs';
import type { IParseOptions, IStringifyOptions } from 'qs';

/**
 * @desc 从 url 上解析对应的 query 参数
 */
export function queryParse(path?: string, options?: IParseOptions) {
    if (!path) {
        return Object.create(null);
    }

    return parse(path, { ignoreQueryPrefix: true, ...(options || {}) });
}

/**
 * 从函数参数中，解析对象出来
 * @param query
 * @param options
 */
export function querySerialize(query?: Record<string, unknown>, options?: IStringifyOptions) {
    if (!query) {
        return '';
    }

    return stringify(query, { addQueryPrefix: true, ...(options || {}) });
}
