module.exports = {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    proseWrap: 'never',
    arrowParens: 'avoid',
    tabWidth: 4,
    overrides: [
        {
            files: '.prettierrc',
            options: {
                parser: 'json',
            },
        },
    ],
};
