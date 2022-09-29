import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Plugins from '../plugin';
import { ReactElement } from 'react';

type RouterProps = {
    routes: any[];
};

class Router {
    readonly #routes: any[];

    constructor(p: RouterProps = { routes: [] }) {
        this.#routes = p.routes;
    }

    /**
     * @desc 增强 route 的能力
     */
    enhanceRoute(routes: any[]) {
        if (!routes) {
            return [];
        }

        return routes.map((route, index) => {
            const { title, component, redirect, path, children } = route;

            if (redirect) {
                return <Route key={path} path={path} element={<Navigate to={path} />} />;
            }

            if (!component) {
                throw Error("Route config property 'component' can't be empty!");
            }

            if (children && !Array.isArray(children)) {
                throw Error("Route config property 'children' must be array!");
            }

            /**
             * @desc Map component to render wrapper
             */
            const Children = component;

            /**
             * @desc wrapper component with inner plugin
             */
            let wrapComponent = Plugins.compose({ type: 'inner', children: <Children/>, route });

            if (children && children.length === 0) {
                return <Route element={wrapComponent} path={path} key={path} />;
            }

            return (
                <Route element={wrapComponent} path={path} key={path}>
                    {this.enhanceRoute(children)}
                </Route>
            );
        });
    }

    private createRoutesFromConfig() {
        return this.enhanceRoute(this.#routes);
    }

    private createBrowserRouter() {

        const Inner = () => (
            <BrowserRouter>
                <Routes>
                    {
                        this.createRoutesFromConfig()
                    }
                </Routes>
            </BrowserRouter>
        )

        return <Inner/>
    }

    /**
     * @desc init router all config
     */
    init(): ReactElement {
        const browserRouter = this.createBrowserRouter();
        return Plugins.compose({ type: 'outer', children: browserRouter });
    }
}

export default Router;
