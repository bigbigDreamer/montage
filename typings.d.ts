declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

interface MatcherResult {
    pass: boolean;
    message: () => string;
    // 如果你传了这些参数，它们将自动出现在 diff 信息中，
    // 所以即便断言不通过，你也不必自己输出 diff
    actual?: unknown;
    expected?: unknown;
}

/// <reference types="vitest" />
declare global {
    // 对 vitest expect 断言补充
    interface Assertion {
        toBeNotNull(): MatcherResult;
    }
}
