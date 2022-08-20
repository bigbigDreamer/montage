import type { FC, ImgHTMLAttributes } from 'react';
import { useRef, useLayoutEffect } from 'react';

import { ImagePreloadEngine, customDataSet, canLoading } from './helpers';

type ReactLazyLoadImageProps = {
    // need open preload image
    preload?: boolean | { src: string };
    // 禁用原生 loading，因为浏览器有时候表现形式不符合预期，并非是传统意义上的 懒加载
    disabledLoading?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>;

type StaticPropsRefProps = {
    src?: ReactLazyLoadImageProps['src'];
    preload?: ReactLazyLoadImageProps['preload'];
    disabledLoading?: ReactLazyLoadImageProps['disabledLoading'];
};

const customImgProps = (value: string) => ({
    [`data-${customDataSet}`]: value,
});

const ReactLazyLoadImage: FC<ReactLazyLoadImageProps> = ({
    src,
    preload = false,
    alt,
    loading = 'lazy',
    disabledLoading = false,
    ...props
}) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const staticPropsRef = useRef<StaticPropsRefProps>({
        src,
        preload,
        disabledLoading,
    });

    staticPropsRef.current = {
        src,
        preload,
        disabledLoading,
    };

    useLayoutEffect(() => {
        if (canLoading && !staticPropsRef.current.disabledLoading) {
            (imgRef.current as HTMLImageElement).src = staticPropsRef.current!.src as string;
        }

        if (!staticPropsRef.current.preload) {
            return;
        }
        const imgProxy = new ImagePreloadEngine({ target: imgRef.current as HTMLImageElement });
        imgProxy.interceptAndSetUrl(staticPropsRef.current.src);
    }, []);

    return (
        <img
            ref={imgRef}
            alt={alt}
            loading={disabledLoading ? undefined : loading}
            {...props}
            {...customImgProps(src as string)}
        />
    );
};

export default ReactLazyLoadImage;
