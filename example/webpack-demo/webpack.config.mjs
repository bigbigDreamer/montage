import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MyPlugin from "./plugin/my-plugin.js";
import WebpackPluginCert from "@montagejs/cert-webpack-plugin";
import Mkcert from '@montagejs/issue-cert-plus';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const resolve = dir => path.resolve(__dirname, dir);

export default () => {
     async function getConfig() {
         const info = new Mkcert({ domainList: 'www.example.com' }).mkcert();
         console.log(info, "info")
         return {
             mode: 'development',
             entry: resolve("src/main.js"),
             cache: {
                 type: 'filesystem'
             },
             output: {
                 path: path.resolve(__dirname, 'dist'),
                 filename: '[name].[contenthash].bundle.js',
                 clean: true
             },
             resolve: {
                 extensions: ['.js', '.jsx', '.ts', '.tsx'],
             },
             module: {
                 rules: [
                     {
                         test: /\.(jsx|js)$/,
                         use: [
                             {
                                 loader: resolve('./loader/check-css-loader.js')
                             },
                             { loader: 'babel-loader', options: {
                                     sourceType: 'unambiguous',
                                     exclude: /@babel\/runtime/,
                                     presets: [
                                         ['@babel/preset-react', {
                                             runtime: "automatic",
                                         }
                                         ],
                                         ['@babel/preset-env', {
                                             exclude: ['transform-typeof-symbol']
                                         }
                                         ],
                                     ],
                                 }, }],
                         include: [
                             resolve("./src")
                         ],
                     },
                     {
                         test: /\.css$/,
                         // include: [
                         //     resolve("./src")
                         // ],
                         use: ["style-loader", "css-loader"],
                     }
                 ],
             },
             optimization: {
                 runtimeChunk: 'single',
                 moduleIds: 'deterministic',
                 splitChunks: {
                     chunks: 'all',
                     cacheGroups: {
                         vendors:{ // node_modules里的代码
                             test: /[\\/]node_modules[\\/]/,
                             chunks: "all",
                             // name: 'vendors', 一定不要定义固定的name
                             priority: 10, // 优先级
                             enforce: true
                         }
                     }
                 }
             },
             devServer: {
                 hot: true,
                 open: true,
                 server: {
                     type: 'https',
                     options: {
                         ...info,
                     },
                 }
             },
             plugins: [
                 new HtmlWebpackPlugin({
                     templateContent: `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="utf-8">
                    <title>Webpack App</title>
                  </head>
                  <body>
                    <div id="app" />
                  </body>
                </html>
            `
                 }),
                 new MyPlugin(),
                 new WebpackPluginCert({
                     host: 'host'
                 })
             ],
             devtool: 'eval-cheap-module-source-map',
         }
    }

    return getConfig();
}
