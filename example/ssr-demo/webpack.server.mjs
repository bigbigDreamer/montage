import Merge from "webpack-merge";
import path  from "path";
import base from "./webpack.base.mjs";

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const resolve = dir => path.resolve(__dirname, dir);

export default  Merge.merge(base, {
    entry: {
        server: resolve("./src/server-client.js"),
    },
    target: "node",
    output: {
        // 打包后的结果会在 node 环境使用
        // 因此此处将模块化语句转译为 commonjs 形式
        libraryTarget: "commonjs2",
        filename: 'server.js'
    },
    module: {
        rules: [{
            test: /.css$/,
            loader: './loader/removeCssLoader'
        }]
    },
});
