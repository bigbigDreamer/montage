import { BrowserRouter, Navigate, Route, Routes, type RouteObject } from 'react-router-dom';
import Plugins from '../plugin';
import type { ComponentType, FC, ReactElement } from 'react';
import Loadable, { type LoadingComponentProps } from 'react-loadable';
import { Title, Loading } from '../helper';

export type DynamicImportComponentType = () => Promise<ComponentType | { default: ComponentType }>

export type PanGuRouteObject = {
    lazy?: boolean;
    redirect?: string;
    component?: ComponentType | DynamicImportComponentType;
    title?: string;
    path: string;
    children?: PanGuRouteObject[];
    loading?: ComponentType<LoadingComponentProps>;
} & RouteObject;

type RouterProps = {
    routes: PanGuRouteObject[];
};

class Router {
    readonly #routes: any[];

    constructor(p: RouterProps = { routes: [] }) {
        this.#routes = p.routes;
    }

    /**
     * @desc 增强 route 的能力
     */
    enhanceRoute(routes: undefined | (PanGuRouteObject[] & RouteObject[])) {
        if (!routes) {
            return [];
        }

        return routes.map((route, index) => {
            const { title, component, redirect, path, children, lazy, loading } = route;

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
            const AliasC = lazy ? Loadable({
                loader: component as DynamicImportComponentType,
                loading: loading || Loading
            }) as FC<unknown> : component as FC<unknown>;

            const WrapperComponent = title ? (
                <Title title={title}>
                    <AliasC />
                </Title>
                ) : (
                <AliasC />
            ) ;

            /**
             * @desc wrapper component with inner plugin
             */
            let wrapComponent = Plugins.compose({ type: 'inner', children: WrapperComponent, route });

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
