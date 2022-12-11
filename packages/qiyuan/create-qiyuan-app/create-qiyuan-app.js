const { logger } = require('just-task');
const { checkNeedUpdate } = require('@montagejs/check-pkg-update');

const init = () => {
    logger.info('Now we will create qiyuan app');
    logger.error('Sorry, U can not create app');
    logger.warn('Care! Today is weekday');
};

module.exports = {
    init,
};
