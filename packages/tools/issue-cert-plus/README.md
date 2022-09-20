# @montagejs/issue-cert-plus

Use [`mkcert`](https://github.com/FiloSottile/mkcert) to generate `https` certificate, and automatically add system credit, built-in cache system optimization.

## Install

```bash
$ pnpm i @montagejs/issue-cert-plus
```

## Usage

```js
import Mkcert from '@montagejs/issue-cert-plus';

export default () => {
     async function getConfig() {
         const info = new Mkcert({ domainList: 'www.example.com' }).mkcert();
         return {
             mode: 'development',
             devServer: {
                 server: {
                     type: 'https',
                     options: {
                         ...info,
                     },
                 }
             },
         }
    }

    return getConfig();
}
```

## Generate Files

```
.
📦User Home
    ┣ 📂.certPlusHome
    ┣  ┗ 📜.cert.json
    ┣  ┗ 📜key.pem
    ┣  ┗ 📜cert.pem
```

## Demo

![](https://to-out-use.oss-cn-hangzhou.aliyuncs.com/common/jjmelf.png)

### First Usage

![](https://to-out-use.oss-cn-hangzhou.aliyuncs.com/common/5wwcnH.png)

### When Add New Domain

```ts
new Mkcert({ domainList: 'www.example.com' }).mkcert();
```

![](https://to-out-use.oss-cn-hangzhou.aliyuncs.com/common/LH6yk8.png)

### When No New Domain

![](https://to-out-use.oss-cn-hangzhou.aliyuncs.com/common/YXtVcW.png)

## Related third-party libraries

- [consola](https://github.com/unjs/consola)
- [fs-extra](https://github.com/jprichardson/node-fs-extra)
- [jsonfile](https://www.npmjs.com/package/jsonfile)
- [lodash](https://github.com/lodash/lodash)
- [shelljs](https://github.com/shelljs/shelljs)

Now, enjoy it～
