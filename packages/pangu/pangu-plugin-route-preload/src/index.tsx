import { type ReactElement } from 'react';

export const PluginSymbolKey = Symbol('PANGU_PLUGIN_ROUTE_PRELOAD');

import { type RoutePlugin } from '@montagejs/pangu';
import Provider from './provider';
import usePluginProvider from './usePluginProvider';

const routePreloadPlugin: RoutePlugin = {
    key: PluginSymbolKey,
    inner(children, options, route, LoadableBar): ReactElement {
        return (
            <Provider route={route} LoadableBar={LoadableBar}>
                {children}
            </Provider>
        );
    },
};

export { usePluginProvider };

export default routePreloadPlugin;
