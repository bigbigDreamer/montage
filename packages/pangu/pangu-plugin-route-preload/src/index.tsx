import { type ReactElement } from 'react';

export const PluginSymbolKey = Symbol('PANGU_PLUGIN_ROUTE_PRELOAD');

import { type RoutePlugin } from '@montagejs/pangu';
import Provider from './provider';
import usePluginProvider from './usePluginProvider';
import { pluginStore } from './store';

const routePreloadPlugin: RoutePlugin = {
    key: PluginSymbolKey,
    inner(children, options, route, LoadableBar): ReactElement {
        if (!pluginStore.has(route!.path)) {
            pluginStore.set(route!.path, LoadableBar);
        }
        return <Provider>{children}</Provider>;
    },
};

export { usePluginProvider };

export default routePreloadPlugin;
