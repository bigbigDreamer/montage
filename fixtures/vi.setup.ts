import { cleanup } from '@testing-library/react';

window.fetch = vi.fn().mockImplementation(() => new Promise((res) => res));

// hooks are reset before each suite
afterEach(() => {
    cleanup();
});

expect.extend({
    toBeNotNull(received, expected) {
        const { isNot } = this;
        return {
            // 请勿根据 isNot 参数更改你的 "pass" 值，Vitest 为你做了这件事情
            pass: received !== null,
            message: () => `${received} is${isNot ? ' not' : ''} not null`,
        };
    },
});
