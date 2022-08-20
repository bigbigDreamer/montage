# @montagejs/can-i-use

As the package name suggests, this package is mainly to detect if I can use something, in a different browser environment.

## Usage

```bash
$ npm i @montagejs/can-i-use --save
```

```ts
import { canIUseHtmlTagProperty, canIUseCss } from "@montagejs/can-i-use";

const hadLoadingInImg = canIUseHtmlTagProperty({ tag: "img", prop: "loading" });

// short write
const hadDispalyInDiv = canIUseCss("display: none");

// or 
// const hadDispalyInDiv = canIUseCss({ property: "display", value: "none" });
```
