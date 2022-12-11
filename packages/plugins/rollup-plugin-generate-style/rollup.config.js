import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from 'rollup-plugin-swc';
import { minify } from 'rollup-plugin-esbuild';
import cleaner from 'rollup-plugin-cleaner';

const extensions = ['ts'];

const external = ['fs-extra', 'rollup'];

export default {
    input: './src/index.ts',
    output: [
        {
            file: './lib/eslint.js',
            sourcemap: true,
            format: 'cjs',
            esModule: false,
        },
        {
            file: './es/eslint.js',
            sourcemap: true,
            format: 'esm',
        },
    ],
    external,
    plugins: [
        // 帮助 rollup 查找 node_modules 里的三方模块
        resolve({ extensions }),
        // 帮助 rollup 查找 commonjs 规范的模块, 常配合 rollup-plugin-node-resolve 一起使用
        commonjs(),
        cleaner({
            targets: ['./es/', './lib/'],
        }),
        // swc 提供 jsx runtime
        swc({
            exclude: ['.*\\.js$', '.*\\.map$'],
            // 暂时关闭 corJs
            // env: {
            //     coreJs: '3.21.1',
            //     mode: 'usage',
            // },
            jsc: {
                loose: true,
                externalHelpers: true,
                parser: {
                    syntax: 'typescript',
                    tsx: true,
                },
                transform: {
                    react: {
                        runtime: 'automatic',
                        useBuiltins: true,
                        development: false,
                    },
                },
                target: 'es2016',
            },
        }),
        // esbuild 压缩代码
        minify(),
    ],
};
