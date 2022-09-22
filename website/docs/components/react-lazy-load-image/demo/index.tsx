import { FC, useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

import './index.less';

const ReactLazyLoadImageDemo: FC = () => {
    const ref = useRef(null);

    return (
        <BrowserOnly>
            {() => {
                const ReactLazyLoadImage = require('@montagejs/react-lazy-load-image').default;
                const { ReactLazyLoadImageProvider } = require('@montagejs/react-lazy-load-image');

                useEffect(() => {
                    console.log('水合完毕');
                }, []);

                return (
                    <ReactLazyLoadImageProvider
                        getPopupContainer={() => document.querySelector('.img-container')}
                    >
                        <div className="img-container" ref={ref}>
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
                        </div>
                    </ReactLazyLoadImageProvider>
                );
            }}
        </BrowserOnly>
    );
};

export default ReactLazyLoadImageDemo;
