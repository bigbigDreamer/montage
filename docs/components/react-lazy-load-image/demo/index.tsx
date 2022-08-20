import { FC } from 'react';
import ReactLazyLoadImage from '@montagejs/react-lazy-load-image';

const ReactLazyLoadImageDemo: FC = () => {
    return (
        <>
            <ReactLazyLoadImage
                src={
                    'https://to-out-use.oss-cn-hangzhou.aliyuncs.com/common/Kapture%202022-08-19%20at%2012.46.04.gif'
                }
                width="100%"
                height="350"
            />
            <ReactLazyLoadImage
                src={
                    'https://to-out-use.oss-cn-hangzhou.aliyuncs.com/common/Kapture%202022-08-19%20at%2012.46.04.gif'
                }
                width="100%"
                height="350"
            />
            <ReactLazyLoadImage
                src={
                    'https://to-out-use.oss-cn-hangzhou.aliyuncs.com/common/Kapture%202022-08-19%20at%2012.46.04.gif'
                }
                width="100%"
                height="350"
            />
            <ReactLazyLoadImage
                src={
                    'https://to-out-use.oss-cn-hangzhou.aliyuncs.com/common/Kapture%202022-08-19%20at%2013.01.30.gif'
                }
                width="100%"
                height="350"
            />
            <ReactLazyLoadImage
                src={
                    'https://to-out-use.oss-cn-hangzhou.aliyuncs.com/common/Kapture%202022-08-19%20at%2012.46.04.gif'
                }
                width="100%"
                height="350"
            />
        </>
    );
};

export default ReactLazyLoadImageDemo;
