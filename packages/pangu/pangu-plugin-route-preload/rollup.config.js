import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from 'rollup-plugin-swc';
import { minify } from 'rollup-plugin-esbuild';
import cleaner from 'rollup-plugin-cleaner';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const external = ['react', 'react/jsx-runtime', '@types/*'];

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
                target: 'es2015',
            },
        }),
        // esbuild 压缩代码
        minify(),
    ],
};
