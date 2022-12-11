import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from 'rollup-plugin-swc';
import { minify } from 'rollup-plugin-esbuild';
import cleaner from 'rollup-plugin-cleaner';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import progress from 'rollup-plugin-progress';

const extensions = ['.ts', '.tsx'];

const external = ['react', 'react/jsx-runtime', 'lodash-es', '@montagejs/can-i-use'];

export default {
    input: './src/index.tsx',
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
        {
            file: './dist/eslint.js',
            sourcemap: false,
            format: 'umd',
            name: 'ReactWalineClient',
        },
    ],
    external,
    plugins: [
        progress({ clearLine: false }),
        // 帮助 rollup 查找 node_modules 里的三方模块
        resolve({ extensions }),
        // 帮助 rollup 查找 commonjs 规范的模块, 常配合 rollup-plugin-node-resolve 一起使用
        commonjs(),
        cleaner({
            targets: ['./es/', './lib/', '.dist'],
        }),
        image(),
        postcss({
            plugins: [simplevars(), nested(), autoprefixer()],
            minimize: true,
            extract: 'style/index.css',
            // 处理.css和.less文件
            extensions: ['.less', '.css'],
            use: [
                [
                    'less',
                    {
                        javascriptEnabled: true,
                    },
                ],
            ],
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
