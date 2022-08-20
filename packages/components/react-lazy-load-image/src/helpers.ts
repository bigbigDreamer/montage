import { canIUseHtmlTagProperty } from '@montagejs/can-i-use';

class ImagePreloadEngine {
    static PRELOAD_LOADING_IMG_URL =
        'https://cdn.jsdelivr.net/gh/bigbigDreamer/pic-bed@main/uPic/icons8-dots-loading.gif';

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

export const customDataSet = 'DO_NOT_USE_OR_YOU_WILL_GET_FIRED';

export const canLoading = canIUseHtmlTagProperty<HTMLImageElement>({ tag: 'img', prop: 'loading' });

export { ImagePreloadEngine };
