import ReactDOM from 'react-dom';
import { type DOMElement } from "react";
import Plugins, { type RoutePlugin } from "../plugin";
import Router from "../router";

type PanGuConstructorStruts = {
    container?: HTMLElement;
    routes: any[];
};

class PanGu {
    private container?: HTMLElement;

    static defaultProps = {
        container: document.getElementById('root') as HTMLElement,
    };
    #routerInstance: Router;

    constructor(p: PanGuConstructorStruts = { routes: [] }) {
        Object.assign(this, PanGu.defaultProps, p);
        this.#routerInstance = new Router({ routes: p.routes });
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
