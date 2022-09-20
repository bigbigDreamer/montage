declare module 'mkcert' {
    const mkcert: {
        createCA(props: {
            organization: string;
            countryCode: string;
            state: string;
            locality: string;
            validityDays: number;
        }): any;
        createCert(props: any): any;
    };

    export default mkcert;
    export = mkcert;
}
