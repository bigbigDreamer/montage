import fse from 'fs-extra';
import { homedir } from 'os';
import { writeFileSync, readFileSync } from 'jsonfile';
import difference from 'lodash/difference';
import { tryCatch } from './helper';
import Logger from './logger';

export type CertFsConfig = {
    sourceDir?: /* abs path */ string;
};

class CertFs {
    /* User Home DIr */
    static USER_HOME_DIR = homedir();
    /* cert dir */
    static CERT_DIR = '.certPlusHome';
    /* cache file */
    static CACHE_DOMAIN_LIST_FILE = '.cert.json';
    /* ca key file */
    static CA_KEY_FILE = 'key.pem';
    /* ca cert file */
    static CA_CERT_FILE = 'cert.pem';
    /* ca key file path */
    static CA_KEY_FILE_PATH =
        CertFs.USER_HOME_DIR + '/' + CertFs.CERT_DIR + '/' + CertFs.CA_KEY_FILE;
    /* ca cert file path */
    static CA_CERT_FILE_PATH =
        CertFs.USER_HOME_DIR + '/' + CertFs.CERT_DIR + '/' + CertFs.CA_CERT_FILE;
    static CA_CACHE_FILE_PATH =
        CertFs.USER_HOME_DIR + '/' + CertFs.CERT_DIR + '/' + CertFs.CACHE_DOMAIN_LIST_FILE;

    static defaultConfig = {
        sourceDir: CertFs.USER_HOME_DIR + '/' + CertFs.CERT_DIR,
    };
    #config: CertFsConfig;

    constructor(props?: CertFsConfig) {
        this.#config = Object.assign({}, CertFs.defaultConfig, props);
    }

    ensureFileExist(path: string) {
        try {
            const stats = fse.statSync(path);

            return stats.isFile();
        } catch (e) {
            return false;
        }
    }

    /**
     * @desc create cert home dir
     */
    mkHomeDir() {
        tryCatch(() => {
            fse.ensureDirSync(<string>this.#config.sourceDir);
        });
    }

    /**
     * @desc write record of history gen domain
     * @param data
     */
    writeCache(data: string | string[]) {
        tryCatch(() => {
            writeFileSync(`${CertFs.CA_CACHE_FILE_PATH}`, Array.isArray(data) ? data : [data]);
        });
    }

    /**
     * @desc write record of history gen domain
     */
    readCache(): string[] {
        const [, data] = tryCatch(() => {
            return readFileSync(`${CertFs.CA_CACHE_FILE_PATH}`);
        });
        return <string[]>data;
    }

    /**
     * @desc ensure cache is exist
     */
    ensureCache() {
        return this.ensureFileExist(CertFs.CA_CACHE_FILE_PATH);
    }

    /**
     * @desc diff cache then ensure if you need regenerate
     */
    diffCacheAndCheckIfNeedReGen(target: string | string[]) {
        const _target = Array.isArray(target) ? target : [target];
        const _cacheData = this.readCache();

        console.log();

        return difference(_target, _cacheData).length > 0;
    }

    /**
     * @desc dangerous operate
     *     when produce error，sys should roll back all files
     */
    rollback() {
        tryCatch(() => {
            fse.removeSync(<string>this.#config.sourceDir);
        });
    }

    /**
     * @desc override ca pem file，when need regenerate
     * @param cb
     */
    overridePem(cb?: () => void) {
        tryCatch(() => {
            const KEYIsFile = this.ensureFileExist(CertFs.CA_KEY_FILE_PATH);
            const CERTIsFile = this.ensureFileExist(CertFs.CA_CERT_FILE_PATH);
            KEYIsFile && fse.removeSync(CertFs.CA_KEY_FILE_PATH);
            CERTIsFile && fse.removeSync(CertFs.CA_CERT_FILE_PATH);
            cb?.();
        });
    }
}

export default CertFs;
