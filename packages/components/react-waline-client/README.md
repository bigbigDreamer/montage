# @montagejs/react-waline-client

A react client component developed for the waline commenting system.

## Usage

```bash
$ npm i @montagejs/react-waline-client --save
```

> **`!!!important`** Considering the size of the package, starting from `1.0.0` version, users are required to control where and how the styles are imported, and the package no longer contains styles, but pure `js` code.

```tsx
import Waline, { CRefProps } from '@montagejs/react-waline-client';
import { FC, useRef } from 'react';

import '@montagejs/react-waline-client/dist/style/index.css';

const WalineDemo: FC = () => {
    const ref = useRef<CRefProps>(null);

    return <Waline ref={ref} serverURL="your waline server url" />;
};

export default WalineDemo;

```

## Note

You can also go to [document address](https://montage.bigdreamer.cc) to view more information (including API information and demo address)

## Keywords

[waline](https://www.npmjs.com/search?q=keywords:waline)  [react](https://www.npmjs.com/search?q=keywords:react) 
