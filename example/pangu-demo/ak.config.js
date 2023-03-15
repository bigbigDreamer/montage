const path = require('path');

module.exports = {
    // config: https://github.com/myNameIsDu/aktiv
    server: {
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        devMiddleware: {
            index: true,
            writeToDisk: true,
        },
    },
};
