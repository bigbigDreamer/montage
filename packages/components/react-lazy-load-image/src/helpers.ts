import { canIUseHtmlTagProperty } from '@montagejs/can-i-use';
import LoadingImg from './img/loading.gif';

class ImagePreloadEngine {
    static PRELOAD_LOADING_IMG_URL = LoadingImg;
    #imgNode: HTMLImageElement | null;
    readonly #preloadUrl?: string;
    constructor(props: { target: HTMLImageElement; preloadUrl?: string }) {
        this.#imgNode = props.target;
        this.#preloadUrl = props.preloadUrl;
    }

    interceptAndSetUrl(trueUrl?: string) {
        if (!trueUrl) {
            return;
        }
        this.#imgNode!.src = this.#preloadUrl || ImagePreloadEngine.PRELOAD_LOADING_IMG_URL;
        const image = new Image();

        image.onload = () => {
            this.#imgNode!.src = trueUrl;
        };
        image.src = trueUrl;
    }
}

class GlobalEventRegister {
    #centerEventBus: WeakMap<Document | HTMLElement | typeof window, string>;
    constructor() {
        this.#centerEventBus = new WeakMap();
    }

    registerEvent(props: {
        target: Document | HTMLElement | typeof window;
        eventName: string;
        Cb: any;
    }) {
        if (!this.#centerEventBus.get(props.target)) {
            this.#centerEventBus.set(props.target, props.eventName);
            props.target.addEventListener(props.eventName, () => {
                props.Cb();
            });
        }

        return () => props.target.removeEventListener(props.eventName, props.Cb);
    }
}

export const customDataSet = 'DO_NOT_USE_OR_YOU_WILL_GET_FIRED';

export const canLoading = canIUseHtmlTagProperty<HTMLImageElement>({ tag: 'img', prop: 'loading' });

export { ImagePreloadEngine, GlobalEventRegister };
