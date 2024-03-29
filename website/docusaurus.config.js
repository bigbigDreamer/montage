// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Montage',
    tagline: 'Montage is cool，用蒙太奇的艺术手法，创造值得令人揣摩的事物～',
    url: 'https://montage.bigdreamer.cc',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'https://cdn.jsdelivr.net/gh/bigbigDreamer/pic-bed@main/uPic/SYcWVv.jpg',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'Scholar(不换)', // Usually your GitHub org/user name.
    projectName: 'montage', // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },
    plugins: ['@docusaurus/theme-live-codeblock', 'docusaurus-plugin-less'],
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'Montage',
                logo: {
                    alt: 'My Site Logo',
                    src: 'https://cdn.jsdelivr.net/gh/bigbigDreamer/pic-bed@main/uPic/SYcWVv.jpg',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro/components',
                        position: 'left',
                        label: 'Components',
                    },
                    {
                        type: 'doc',
                        docId: 'intro/pangu',
                        position: 'left',
                        label: 'PanGu',
                    },
                    {
                        type: 'doc',
                        docId: 'intro/plugins',
                        position: 'left',
                        label: 'Plugins',
                    },
                    {
                        href: 'https://github.com/bigbigDreamer/montage',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                copyright: `Copyright © ${new Date().getFullYear()}, Creation By 不换.`,
            },
            prism: {
                theme: require('prism-react-renderer/themes/vsLight'),
            },
            liveCodeBlock: {
                /**
                 * 实时效果显示的位置，在编辑器上方还是下方。
                 * 可为："top" | "bottom"
                 */
                playgroundPosition: 'bottom',
            },
        }),
};

module.exports = config;
