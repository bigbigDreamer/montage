const traverse = require('@babel/traverse').default;
const { parse } = require('@babel/parser');
const { transformFromAstSync } = require('@babel/core');
const path = require('path');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = function (source) {
    const ast = parse(source, { sourceType: 'module', plugins: ['jsx'] });
    traverse(ast, {
        ImportDeclaration: ({ node }) => {
            if (node.source.value.includes('@montagejs')) {
                node.source.value = node.source.value.replace(
                    /^@montagejs(?=.*)/,
                    resolve('../../../packages/components'),
                );
            }
        },
    });

    return transformFromAstSync(ast).code;
};
