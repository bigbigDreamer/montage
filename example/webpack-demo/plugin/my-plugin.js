const mkcert = require('@montagejs/issue-cert');
class MyPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('Https-WebPack-Plugin', async (stats) => {
            // console.log(stats, 'stats');
            const res = await mkcert.run();
        });
    }
}

module.exports = MyPlugin;
