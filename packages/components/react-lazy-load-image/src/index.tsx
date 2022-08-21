import type { FC, ImgHTMLAttributes } from 'react';
import { useContext, useCallback } from 'react';

import { customDataSet } from './helpers';
import ReactLazyLoadImageProvider, { ReactLazyLoadImageContext } from './provider';
import type { ReactLazyLoadImageContextProps } from './provider';

export type ReactLazyLoadImageProps = {
    // 默认监听视口的容器
} & ImgHTMLAttributes<HTMLImageElement>;

const customImgProps = (value: string) => ({
    [`data-${customDataSet.toLowerCase()}`]: value,
});

const ReactLazyLoadImage: FC<ReactLazyLoadImageProps> = ({
    src,
    alt,
    loading = 'lazy',
    ...props
}) => {
    const methodValue = useContext<ReactLazyLoadImageContextProps>(ReactLazyLoadImageContext);

    const measureRef = useCallback((node) => {
        if (node !== null) {
            methodValue?.registerImageInstance?.(node);
        }
    }, []);

    return (
        <img
            ref={measureRef}
            alt={alt}
            loading={methodValue.disabledLoading ? undefined : loading}
            {...props}
            {...customImgProps(src as string)}
        />
    );
};

export default ReactLazyLoadImage;

export { ReactLazyLoadImageProvider };
