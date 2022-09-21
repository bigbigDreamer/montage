// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Montage',
    tagline: 'Montage is cool，用蒙太奇的艺术手法，创造值得令人揣摩的事物～',
    url: 'https://your-docusaurus-test-site.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
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
        defaultLocale: 'en',
        locales: ['en'],
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
                        docId: 'plugins',
                        position: 'left',
                        label: 'Plugins',
                    },
                    { to: '/blog', label: 'Blog', position: 'left' },
                    {
                        href: 'https://github.com/bigbigDreamer/montage',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Tutorial',
                                to: '/docs/intro',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Stack Overflow',
                                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                            },
                            {
                                label: 'Discord',
                                href: 'https://discordapp.com/invite/docusaurus',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/docusaurus',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                to: 'https://dev.bigdreamer.cc',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/bigbigDreamer',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()}, Creation By 不换.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
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
