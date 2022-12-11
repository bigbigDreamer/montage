module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2022: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:react/recommended'],
    overrides: [
        // 处理 JS 文件
        {
            files: ['**/*.{js,jsx}'], // 只处理 js 和 jsx 文件
            parser: '@babel/eslint-parser', // 使用 babel 来解析 js 文件
            parserOptions: {
                sourceType: 'module', // 支持 import/export
                allowImportExportEverywhere: false,
                ecmaFeatures: {
                    globalReturn: false,
                    jsx: true,
                },
            },
        },
        // 处理 TS 文件
        {
            files: ['**/*.{ts,tsx}'], // 只处理 ts 和 js 文件
            parser: '@typescript-eslint/parser', // 能看懂 TypeScript
            parserOptions: {
                project: ['./tsconfig.json'], // 告诉 eslint：tsconfig 在哪
                ecmaFeatures: {
                    globalReturn: false,
                },
            },
            extends: [
                // typescript-eslint 的推荐规则，只是这些最佳规则都是针对 TS 的
                'plugin:@typescript-eslint/recommended',
                // tsconfig.json 里 Type Checking 的推荐规则
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
        },
    ],
};
