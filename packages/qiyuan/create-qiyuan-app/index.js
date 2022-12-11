#!/usr/bin/env node
'use strict';
const check = require('check-node-version');
const { logger } = require('just-task');
const currentNodeVersion = process.versions.node;

check({ node: '>=14' }, (error, result) => {
    if (error) {
        logger.error(
            'You are running Node ' +
                currentNodeVersion +
                '.\n' +
                'Create QiYuan App requires Node 14 or higher. \n' +
                'Please update your version of Node.',
        );
        process.exit(1);
        return;
    }

    if (result.isSatisfied) {
        const { init } = require('./create-qiyuan-app');
        init();
        return;
    }

    logger.error('Some package version(s) failed!');

    for (const packageName of Object.keys(result.versions)) {
        if (!result.versions[packageName].isSatisfied) {
            logger.error(`Missing ${packageName}.`);
        }
    }
});
