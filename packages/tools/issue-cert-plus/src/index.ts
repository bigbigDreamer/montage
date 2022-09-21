import omit from 'lodash/omit';
import uniq from "lodash/uniq";
import { which, exec } from 'shelljs';
import Logger from "./logger";
import CertFs, { type CertFsConfig } from './fs';
import { tryCatchShellError } from "./helper";

export type CertPlusConfig = {
    domainList?: string[] | string;
} & CertFsConfig;

class IssueCertPlus {
    static defaultConfig = {
        domainList: ['127.0.0.1', 'localhost', '0.0.0.0', '::1'],
    };
    #fs: CertFs;
    #domainList: string[];
    constructor(props?: CertPlusConfig) {
        this.#fs = new CertFs(omit(props, ['host']));
        this.#domainList = <string[]>uniq([...IssueCertPlus.defaultConfig.domainList, ...(Array.isArray(props?.domainList) ?props!.domainList : [props?.domainList] )])
    }

    /**
     * @desc can I use mkcert command
     */
    canIUseAndTip() {
        const canIUseMkcert = !!which('mkcert');
        if(canIUseMkcert) {
            Logger.success('Congratulations! The program has found the mkcert command on your system');
        } else {
            Logger.fail(`
                Sorry, the program has not found the mkcert command on your computer, please install it according to the official documentation before starting：
                Installation Guide: https://github.com/FiloSottile/mkcert
            `);
            process.exit(1);
        }
    }

    /**
     * @desc install ca root
     */
    installCAInRoot() {
        tryCatchShellError(exec('mkcert --install'));
    }

    /**
     * @desc mkcert https cert
     */
    mkcert() {
        this.canIUseAndTip();
        this.#fs.mkHomeDir();
        this.installCAInRoot();
        const isExistCache = this.#fs.ensureCache();

        if(isExistCache) {
            const res = this.#fs.diffCacheAndCheckIfNeedReGen(this.#domainList)
            if(res) {
                const newDomainList = uniq(
                    [
                        ...this.#fs.readCache(),
                        ...this.#domainList,
                    ]
                );
                Logger.info("It is detected that there is a cache, but it cannot be all hit, so the existing certificate will be deleted and regenerated!")
                this.#fs.overridePem();
                tryCatchShellError(exec(`mkcert -key-file ${CertFs.CA_KEY_FILE_PATH} -cert-file ${CertFs.CA_CERT_FILE_PATH} ${newDomainList.join(' ')}`), this.#fs.rollback);
                this.#fs.writeCache(newDomainList);
            } else {
                Logger.info("The program detects that the target domain name is in the cache and can use the cache directly！")
            }
        } else {
            tryCatchShellError(exec(`mkcert -key-file ${CertFs.CA_KEY_FILE_PATH} -cert-file ${CertFs.CA_CERT_FILE_PATH} ${this.#domainList.join(' ')}`));
            this.#fs.writeCache(this.#domainList);
        }

        return {
            cert: CertFs.CA_CERT_FILE_PATH,
            key: CertFs.CA_KEY_FILE_PATH
        }
    }

}

export default IssueCertPlus;
