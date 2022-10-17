import ReactDOM from 'react-dom';
import { type DOMElement } from "react";
import Plugins, { type RoutePlugin } from "../plugin";
import Router, { type PanGuRouteObject } from "../router";

type PanGuConstructorStruts = {
    container?: HTMLElement;
    routes: PanGuRouteObject[];
    mode?: 'hash'|'history';
};

class PanGu {
    private container?: HTMLElement;

    static defaultProps = {
        container: document.getElementById('root') as HTMLElement,
        mode: 'history'
    };
    #routerInstance: Router;
    private mode: "hash" | "history" | undefined;

    constructor(p: PanGuConstructorStruts = { routes: [] }) {
        Object.assign(this, PanGu.defaultProps, p);
        this.#routerInstance = new Router({ routes: p.routes, mode: this.mode as "hash" | "history" });
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
