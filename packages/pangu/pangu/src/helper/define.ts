import type { PanGuRouteObject } from '../router';
import type { RoutePlugin } from '../plugin';
import { ErrorLog } from './error';

export function defineRouterConfig(routes?: PanGuRouteObject[]): PanGuRouteObject[] {
    if (!routes) {
        return [];
    }

    if (!Array.isArray(routes)) {
        throw Error(ErrorLog.DefineRouterConfigArgsShouldBeArray);
    }

    return routes;
}

export function definePlugin(RoutePlugin: RoutePlugin): RoutePlugin {
    return RoutePlugin;
}
