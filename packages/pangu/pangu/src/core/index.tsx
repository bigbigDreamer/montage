import ReactDOM from 'react-dom';
import { type DOMElement } from 'react';
import Plugins, { type RoutePlugin } from '../plugin';
import Router, { type PanGuRouteObject, type RouterModeType, RouterMode } from '../router';

type PanGuConstructorStruts = {
    container?: HTMLElement;
    routes: PanGuRouteObject[];
    mode?: RouterModeType;
};

class PanGu {
    private container?: HTMLElement;

    static defaultProps = {
        container: document.getElementById('root') as HTMLElement,
        mode: RouterMode.HISTORY,
    };
    #routerInstance: Router;
    private mode?: RouterModeType;

    constructor(p: PanGuConstructorStruts = { routes: [] }) {
        Object.assign(this, PanGu.defaultProps, p);
        this.#routerInstance = new Router({ routes: p.routes, mode: this.mode as RouterModeType });
    }

    start() {
        const App = this.#routerInstance.init() as DOMElement<any, Element>;
        ReactDOM.render(App, this!.container as HTMLElement);
    }

    use(plugin: RoutePlugin) {
        Plugins.set(plugin);
    }
}

export default PanGu;
