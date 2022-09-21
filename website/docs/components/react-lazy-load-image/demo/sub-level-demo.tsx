import { FC, useRef } from 'react';
import ReactLazyLoadImage, { ReactLazyLoadImageProvider } from '@montagejs/react-lazy-load-image';

import './index.less';

const ReactLazyLoadImageDemo: FC = () => {
    const ref = useRef(null);

    return (
        <ReactLazyLoadImageProvider
            preload
            disabledLoading
            getPopupContainer={() => document.querySelector('.img-container-sub-level')}
        >
            <div className="img-container-sub-level" ref={ref}>
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
};

export default ReactLazyLoadImageDemo;
