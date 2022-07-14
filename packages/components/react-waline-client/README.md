# @montagejs/react-waline-client

A react client component developed for the waline commenting system.

## Usage

```bash
$ npm i @montagejs/react-waline-client --save
```

```tsx
import Waline, { CRefProps } from '@montagejs/react-waline-client';
import { FC, useRef } from 'react';

const WalineDemo: FC = () => {
    const ref = useRef<CRefProps>(null);

    return <Waline ref={ref} serverURL="your waline server url" />;
};

export default WalineDemo;

```

## Note

You can also go to [document address](montage.bigdreamer.cc) to view more information (including API information and demo address)

## Keywords

[waline](https://www.npmjs.com/search?q=keywords:waline)  [react](https://www.npmjs.com/search?q=keywords:react) 
