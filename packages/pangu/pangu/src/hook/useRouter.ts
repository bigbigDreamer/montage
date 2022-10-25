/**
 * @desc 定位：对于 navigate 进行一层封装，便于参数传递
 */
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { omit } from 'lodash-es';
import { queryParse, querySerialize } from '../helper/query';

import type { NavigateOptions } from 'react-router-dom';

export type RouterOperateOptions = {
    arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma' | undefined;
    customFormat?(path: string, query?: Record<string, unknown>): string;
} & NavigateOptions;

export type UseRouterHookReturnProps = {
    redirect(path: string, query?: Record<string, unknown>, options?: RouterOperateOptions): void;
    replace(path: string, query?: Record<string, unknown>, options?: RouterOperateOptions): void;
};

const useRouter = (): UseRouterHookReturnProps => {
    const navigate = useNavigate();

    const pathFormat = useCallback(
        (path: string, query?: Record<string, unknown>, options?: RouterOperateOptions) => {
            const [originUrl, _query] = path?.split('?');
            let queryArgsStr;
            let _path;
            if (options?.arrayFormat) {
                // todo something, 考虑 URL 数组的情况
                // 例如：name=张三&name=李四，应该格式化为：{ name: ['张三', '李四'] }
            } else {
                queryArgsStr = querySerialize({
                    ...queryParse(_query),
                    ...(query || {}),
                });
            }
            if (typeof options?.customFormat === 'function') {
                _path = options.customFormat(path, query);
            } else {
                _path = `${originUrl}${queryArgsStr}`;
            }

            return _path;
        },
        [],
    );

    const redirect = useCallback(
        (path: string, query?: Record<string, unknown>, options?: RouterOperateOptions) => {
            if (!path) {
                return;
            }

            const _path = pathFormat(path);
            return navigate(_path, {
                ...omit(options, ['arrayFormat', 'customFormat']),
                replace: false, // 强制 false，不允许外部设置
            });
        },
        [navigate, pathFormat],
    );

    const replace = useCallback(
        (path: string, query?: Record<string, unknown>, options?: RouterOperateOptions) => {
            if (!path) {
                return;
            }

            const _path = pathFormat(path);
            return navigate(_path, {
                ...omit(options, ['arrayFormat', 'customFormat']),
                replace: true, // 强制 false，不允许外部设置
            });
        },
        [navigate, pathFormat],
    );

    return {
        redirect,
        replace,
    };
};

export default useRouter;
