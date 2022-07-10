import { defineConfig } from 'dumi';

export default defineConfig({
    title: 'montage',
    favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
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
    webpack5: {}
});
