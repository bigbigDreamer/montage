import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from 'rollup-plugin-swc';
import { minify } from 'rollup-plugin-esbuild';
import cleaner from 'rollup-plugin-cleaner';
import babel from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';
// 使rollup可以使用postCss处理样式文件less、css等
import postcss from 'rollup-plugin-postcss';
// 处理css定义的变量
import simplevars from 'postcss-simple-vars';
// 处理less嵌套样式写法
import nested from 'postcss-nested';
// autoPrefix
import autoprefixer from 'autoprefixer';
import progress from 'rollup-plugin-progress';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const external = ['react', 'react-dom', '@waline/client'];

export default {
    input: './src/index.tsx',
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
    ],
    external,
    plugins: [
        progress({ clearLine: false }),
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
        image(),
        // swc 提供 jsx runtime
        swc({
            exclude: ['.*.js$', '.*.map$', '.*.d.ts$'],
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
        // babel import 实现按需加载
        babel({
            extensions,
            exclude: /node_modules/,
            configFile: './babel.config.js',
        }),
        // esbuild 压缩代码
        minify(),
    ],
};
