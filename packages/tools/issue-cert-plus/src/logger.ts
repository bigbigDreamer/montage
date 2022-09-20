import consola from 'consola';

class Logger {
    success(info: unknown) {
        consola.success.call(this, info);
    }

    fail(err: unknown) {
        consola.error.call(this, err);
    }

    info(info: unknown) {
        consola.info(info);
    }
}

export default new Logger();
