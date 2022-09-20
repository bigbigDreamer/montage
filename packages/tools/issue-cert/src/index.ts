import mkcert from 'mkcert';

class IssueCert {
    constructor() {}

    async run() {
        return await this.createCert();
    }

    async createCA() {
        return await mkcert.createCA({
            organization: 'Shopify Packer',
            countryCode: 'US',
            state: 'Texas',
            locality: 'Austin',
            validityDays: 365,
        });
    }

    async createCert() {
        const { key, cert } = await this.createCA();
        return await mkcert.createCert({
            domains: ['127.0.0.1', 'localhost'],
            validityDays: 365,
            caKey: key,
            caCert: cert,
        });
    }
}

export default new IssueCert();
