import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const resolve = dir => path.resolve(__dirname, dir);

export default {
    mode: 'development',
    entry: resolve("src/main.js"),
    // entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                loader: 'babel-loader',
                include: [
                    resolve("./src")
                ],
                options: {
                    presets: [
                        ['@babel/preset-react', {
                          runtime: "automatic",
                         }
                      ]
                    ],
                },
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
    devServer: {
        hot: true,
        open: true
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
        })
    ]
};
