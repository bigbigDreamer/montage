import { Compiler, DefinePlugin } from 'webpack';
import { PluginOptions } from './pluginOptions';
import { ZPluginOptions } from './helpers';

class CertWebpackPlugin extends DefinePlugin {
    static PluginName = 'CertWebpackPlugin';
    static defaultOptions = {
        host: '127.0.0.1',
    };

    private _definitions: PluginOptions;

    constructor(definitions: PluginOptions) {
        super(<Record<string, any>>definitions);
        // we will use zod to validate options
        ZPluginOptions.parse(definitions);
        this._definitions = definitions;
    }
    apply(compiler: Compiler) {
        // when build work is finished，
        compiler.hooks.done.tap(CertWebpackPlugin.PluginName, (stats) => {
            // console.log('state', stats);
        });
    }
}

export default CertWebpackPlugin;
