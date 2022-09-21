import { type ExecOutputReturnValue } from 'shelljs';
import Logger from './logger';
/**
 * @licence code from https://github.com/coderaiser/try-catch/blob/master/lib/try-catch.js
 * @param fn
 * @param rest
 */
function tryCatch(fn: (...p: unknown[]) => unknown, ...rest: unknown[]) {
    try {
        return [null, fn(...rest)];
    } catch (e) {
        Logger.fail(e);
        process.exit(1);
        return [e];
    }
}

function tryCatchShellError(res: ExecOutputReturnValue, cb?: () => void) {
    const { code, stderr, stdout } = res || {};
    if (code !== 0) {
        Logger.fail(stderr);
        cb?.();
        process.exit(1);
    } else {
        Logger.success(stdout);
    }
}

export { tryCatch, tryCatchShellError };
