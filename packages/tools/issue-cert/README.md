# @montagejs/issue-cert

Add ssl certificate for website link.

## Install

```bash
$ pnpm i @montagejs/issue-cert
```

## Usage

```js
import mkcert from '@montagejs/issue-cert';

export default () => {
     async function getConfig() {
         const { cert, key } = await mkcert.run()
         return {
             mode: 'development',
             devServer: {
                 https: {
                     key,
                     cert,
                     passphrase: 'webpack-dev-server',
                     requestCert: true,
                 },
             },
         }
    }

    return getConfig();
}
```

