import fse from 'fs-extra';
import type { Plugin } from 'rollup';

type PluginOptions = {
    source: {
        originFile: string;
        code: any;
    }[];
};

function generateStyle(options?: PluginOptions): Plugin;

function generateStyle(
    options = {
        source: [
            { originFile: './es/style/index.js', code: "import './index.css'" },
            { originFile: './lib/style/index.js', code: "import './index.css'" },
        ],
    },
): Plugin {
    return {
        name: 'generate-style', // this name will show up in warnings and errors
        closeBundle() {
            try {
                options.source?.forEach(($) => fse.outputFile($.originFile, $.code));
                return Promise.resolve();
            } catch (e) {
                return Promise.reject(e);
            }
        },
    };
}

export default generateStyle;
