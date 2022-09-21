import Waline, { CRefProps } from '@montagejs/react-waline-client';
import { FC, useRef } from 'react';

import '@montagejs/react-waline-client/es/style/index.css';

const WalineDemo: FC = () => {
    const ref = useRef<CRefProps>(null);

    return <Waline ref={ref} serverURL="https://waline.bigdreamer.cc" />;
};

export default WalineDemo;
