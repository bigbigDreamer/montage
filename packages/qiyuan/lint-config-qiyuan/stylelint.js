module.exports = {
    plugins: ['stylelint-prettier'],
    extends: [
        'stylelint-config-standard',
        'stylelint-config-prettier',
        'stylelint-config-recommended-less',
    ],
    customSyntax: 'postcss-less',
    rules: {
        'prettier/prettier': true,
    },
};
