import { useLayoutEffect, createContext, useMemo, useCallback, useRef } from 'react';
import type { FC, Ref, RefObject } from 'react';
import { canIUseHtmlTagProperty } from '@montagejs/can-i-use';
import { customDataSet, ImagePreloadEngine, canLoading } from './helpers';

type BaseContainer = HTMLElement | Ref<HTMLElement> | typeof window | RefObject<HTMLElement>;

type ReactLazyLoadImageProviderProps = {
    // 默认监听视口的容器
    getPopupContainer?(): BaseContainer;
    // need open preload image
    preload?: boolean | { src: string };
    // 禁用原生 loading，因为浏览器有时候表现形式不符合预期，并非是传统意义上的 懒加载
    disabledLoading?: boolean;
};

const initialPopupFn = () => document.documentElement;

export type ReactLazyLoadImageContextProps = {
    registerImageInstance?(node: HTMLImageElement): void;
    // need open preload image
    preload?: boolean | { src: string };
    // 禁用原生 loading，因为浏览器有时候表现形式不符合预期，并非是传统意义上的 懒加载
    disabledLoading?: boolean;
};

export const ReactLazyLoadImageContext = createContext<ReactLazyLoadImageContextProps>({});

const ReactLazyLoadImageProvider: FC<ReactLazyLoadImageProviderProps> = ({
    children,
    getPopupContainer = initialPopupFn,
    disabledLoading = !canLoading,
    preload = false,
}) => {
    const imageNodesRef = useRef<Set<HTMLImageElement>>(new Set());
    const imageNodeHadLoadedRef = useRef<WeakSet<HTMLImageElement>>(
        new WeakSet<HTMLImageElement>(),
    );

    useLayoutEffect(() => {
        if (!disabledLoading) {
            for (const instance of imageNodesRef.current) {
                if (preload) {
                    const imgProxy = new ImagePreloadEngine({
                        target: instance as HTMLImageElement,
                        preloadUrl: (preload as { src: string })?.src,
                    });
                    imgProxy.interceptAndSetUrl(
                        instance.dataset[customDataSet.toLowerCase()] as string,
                    );
                } else {
                    instance.src = instance.dataset[customDataSet.toLowerCase()] as string;
                }
            }
            return;
        }

        if (
            !canIUseHtmlTagProperty({
                tag: 'img',
                prop: 'getBoundingClientRect',
            })
        ) {
            return;
        }

        const containerObj = typeof getPopupContainer === 'function' ? getPopupContainer() : null;

        const eventObj =
            (containerObj as RefObject<HTMLElement>)?.current || (containerObj as HTMLElement);
        const scrollObj =
            (containerObj as RefObject<HTMLElement>)?.current ||
            ((containerObj as HTMLElement) === document.documentElement
                ? window
                : (containerObj as HTMLElement));

        const scrollCb = () => {
            for (const instance of imageNodesRef.current) {
                if (imageNodeHadLoadedRef.current.has(instance)) {
                    console.log('已经标记过了，跳出');
                    continue;
                }

                if (instance?.getBoundingClientRect().top <= eventObj?.clientHeight) {
                    imageNodeHadLoadedRef.current.add(instance);
                    if (preload) {
                        const imgProxy = new ImagePreloadEngine({
                            target: instance as HTMLImageElement,
                            preloadUrl: (preload as { src: string })?.src,
                        });
                        imgProxy.interceptAndSetUrl(
                            instance.dataset[customDataSet.toLowerCase()] as string,
                        );
                    } else {
                        instance.src = instance.dataset[customDataSet.toLowerCase()] as string;
                    }
                }
            }
        };

        // For SPA App，we should consider router change for app can't touch dom loaded and resize and scroll event
        scrollCb();

        scrollObj?.addEventListener?.('scroll', () => {
            scrollCb();
        });

        window.addEventListener('DOMContentLoaded', scrollCb);
        window.addEventListener('resize', scrollCb);

        return () => {
            scrollObj?.removeEventListener?.('scroll', scrollCb);
            window.removeEventListener('DOMContentLoaded', scrollCb);
            window.removeEventListener('resize', scrollCb);
        };
    }, []);

    const registerImageInstance = useCallback((node) => {
        if (!imageNodesRef.current.has(node)) {
            imageNodesRef.current.add(node);
        }
    }, []);

    const contextValue = useMemo<ReactLazyLoadImageContextProps>(
        () => ({
            registerImageInstance,
            disabledLoading,
            preload,
        }),
        [registerImageInstance, disabledLoading, preload],
    );

    return (
        <ReactLazyLoadImageContext.Provider value={contextValue}>
            {children}
        </ReactLazyLoadImageContext.Provider>
    );
};

export default ReactLazyLoadImageProvider;
