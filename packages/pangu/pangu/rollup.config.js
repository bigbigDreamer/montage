import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from 'rollup-plugin-swc';
import { minify } from 'rollup-plugin-esbuild';
import cleaner from 'rollup-plugin-cleaner';
// import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
// 处理css定义的变量
import simplevars from 'postcss-simple-vars';
// 处理less嵌套样式写法
import nested from 'postcss-nested';
// autoPrefix
import autoprefixer from 'autoprefixer';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const external = ['react', '@waline/client', 'classnames', 'react/jsx-runtime'];

export default {
    input: './src/index.ts',
    output: [
        {
            file: './lib/index.js',
            sourcemap: true,
            format: 'cjs',
            esModule: false,
        },
        {
            file: './es/index.js',
            sourcemap: true,
            format: 'esm',
        },
        {
            file: './dist/index.js',
            sourcemap: false,
            format: 'umd',
            name: 'ReactWalineClient',
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
            exclude: ['.*.js$', '.*.map$', '.*.d.ts$'],
            // 暂时关闭 corJs
            env: {
                coreJs: '3.21.1',
                mode: 'usage',
            },
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
                target: 'es2015',
            },
        }),
        // esbuild 压缩代码
        minify(),
    ],
};
