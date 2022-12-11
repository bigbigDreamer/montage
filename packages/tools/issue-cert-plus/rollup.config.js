import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from 'rollup-plugin-swc';
import { minify } from 'rollup-plugin-esbuild';
import cleaner from 'rollup-plugin-cleaner';

const extensions = ['.js', '.ts'];

const external = [
    '@types/consola',
    '@types/fs-extra',
    '@types/jsonfile',
    '@types/lodash',
    '@types/shelljs',
    'consola',
    'fs-extra',
    'jsonfile',
    'lodash/difference',
    'lodash/uniq',
    'lodash/omit',
    'shelljs',
    'os',
];

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
        resolve({ extensions }),
        commonjs(),
        cleaner({
            targets: ['./es/', './lib/', '.dist'],
        }),
        swc({
            exclude: ['.*\\.js$', '.*\\.map$'],
            jsc: {
                loose: true,
                externalHelpers: true,
                parser: {
                    syntax: 'typescript',
                    tsx: false,
                },
                target: 'es2015',
            },
        }),
        // esbuild 压缩代码
        minify(),
    ],
};
