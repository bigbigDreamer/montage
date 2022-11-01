import {
    BrowserRouter,
    HashRouter,
    Navigate,
    Route,
    Routes,
    type RouteObject,
} from 'react-router-dom';
import Plugins from '../plugin';
import type { ComponentType, FC, ReactElement } from 'react';
import Loadable, { type LoadableComponent, type LoadingComponentProps } from 'react-loadable';
import { Title, Loading, ErrorLog } from '../helper';

import { PluginTypes } from '../plugin';

export type DynamicImportComponentType = () => Promise<ComponentType | { default: ComponentType }>;

export type PanGuRouteObject = {
    lazy?: boolean;
    redirect?: string;
    component?: ComponentType | DynamicImportComponentType;
    title?: string;
    path: string;
    children?: PanGuRouteObject[];
    loading?: ComponentType<LoadingComponentProps>;
    keepAlive?: boolean;
} & RouteObject &
    Record<string, unknown>; // 方便外部扩展

export enum RouterMode {
    HASH = 'hash',
    HISTORY = 'history',
}

export type RouterModeType = RouterMode.HASH | RouterMode.HISTORY;

export type RouterProps = {
    routes: PanGuRouteObject[];
    mode: RouterModeType;
};

class Router {
    readonly #routes: PanGuRouteObject[];
    readonly #mode: RouterModeType;

    constructor(p: RouterProps) {
        this.#routes = p.routes;
        this.#mode = p.mode;
    }

    /**
     * @desc 增强 route 的能力
     */
    enhanceRoute(routes: undefined | (PanGuRouteObject[] & RouteObject[])) {
        if (!routes) {
            return [];
        }

        return routes.map(route => {
            const { title, component, redirect, path, children, lazy, loading } = route;

            if (redirect) {
                return <Route key={path} path={path} element={<Navigate to={path} />} />;
            }

            // !redirect and no component
            if (!component) {
                throw Error(ErrorLog.RouteNoComponent);
            }

            // children but not array type
            if (children && !Array.isArray(children)) {
                throw Error(ErrorLog.ChildrenNotAsArray);
            }

            let LoadableBar: LoadableComponent | Record<string, unknown> = lazy
                ? Loadable({
                      loader: component as DynamicImportComponentType,
                      loading: loading || Loading,
                  })
                : {};

            /**
             * @desc Map component to render wrapper
             */
            const AliasC = lazy
                ? (LoadableBar as unknown as FC<unknown>)
                : (component as FC<unknown>);

            const WrapperComponent = title ? (
                <Title title={title}>
                    <AliasC />
                </Title>
            ) : (
                <AliasC />
            );

            /**
             * @desc wrapper component with inner plugin
             * @todo: 思考：如何减少插件的无用执行次数，能否懒加载，先标识位有，等真正激活路由，渲染路由之前，再执行渲染
             */
            let wrapComponent = Plugins.compose({
                type: PluginTypes.INNER,
                children: WrapperComponent,
                route,
                LoadableBar,
            });

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
        const AppRouter = this.#mode === RouterMode.HASH ? HashRouter : BrowserRouter;

        const Inner = () => (
            <AppRouter>
                <Routes>{this.createRoutesFromConfig()}</Routes>
            </AppRouter>
        );

        return <Inner />;
    }

    /**
     * @desc init router all config
     */
    init(): ReactElement {
        const browserRouter = this.createBrowserRouter();
        return Plugins.compose({ type: PluginTypes.OUTER, children: browserRouter });
    }
}

export default Router;
