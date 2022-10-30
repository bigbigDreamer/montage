import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from 'rollup-plugin-swc';
import { minify } from 'rollup-plugin-esbuild';
import cleaner from 'rollup-plugin-cleaner';
import progress from 'rollup-plugin-progress';

const extensions = ['.js', '.ts'];

const external = ['mkcert'];

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
            name: 'CanIUse',
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
        // swc 提供 jsx runtime
        swc({
            exclude: ['.*\\.js$', '.*\\.map$'],
            jsc: {
                loose: true,
                externalHelpers: true,
                parser: {
                    syntax: 'typescript',
                    tsx: true,
                },
                target: 'es2015',
            },
        }),
        // esbuild 压缩代码
        minify(),
    ],
};
