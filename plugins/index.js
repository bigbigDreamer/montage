// rollup-plugin-my-example.js

import fse from 'fs-extra';

export default function myExample() {
    return {
        name: 'my-example', // this name will show up in warnings and errors
        closeBundle() {
            console.log('bundle finished');
            fse.outputFile('./es/style/index.js', "import './index.css'");
            fse.outputFile('./lib/style/index.js', "import './index.css'");
            return Promise.resolve();
        },
    };
}
