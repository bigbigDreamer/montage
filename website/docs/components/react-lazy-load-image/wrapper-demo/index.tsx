import CommonSsrWrapper from '@site/src/components/common-ssr-wrapper';
import { FC } from 'react';
import Demo from '../demo/index';

const WrapperDemo: FC = () => {
    return (
        <CommonSsrWrapper>
            <Demo />
        </CommonSsrWrapper>
    );
};

export default WrapperDemo;
