import { defineConfig } from 'dumi';

export default defineConfig({
    title: 'montage',
    favicon: 'https://cdn.jsdelivr.net/gh/bigbigDreamer/pic-bed@main/uPic/SYcWVv.jpg',
    logo: 'https://cdn.jsdelivr.net/gh/bigbigDreamer/pic-bed@main/uPic/SYcWVv.jpg',
    outputPath: 'docs-dist',
    mode: 'site',
    publicPath: './',
    history: {
        type: 'hash',
    },
    resolve: {
        includes: ['docs'],
        previewLangs: [],
    },
    navs: [
        null, // null 值代表保留约定式生成的导航，只做增量配置
    ],
    // 必须引入，否则 antd 的样式不生效
    extraBabelPlugins: [
        [
            'babel-plugin-import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            },
        ],
    ],
    extraBabelIncludes: [
        // 支持 npm 包
        // '@waline/client',
    ],
    nodeModulesTransform: {
        type: 'none',
    },
    // 开启 webpack 5
    webpack5: {},
});
