import { createContext, type FC } from 'react';
import { pluginStore } from './store';
import type { LoadableComponent } from 'react-loadable';
import type { PanGuRouteObject } from '@montagejs/pangu';
import type { PluginStore } from './store';

export const PluginContext = createContext<PluginStore>(pluginStore);

export type PluginProviderProps = {
    LoadableBar?: LoadableComponent | Record<string, unknown>;
    route?: PanGuRouteObject;
};

const PluginProvider: FC<PluginProviderProps> = ({ children }) => {
    return <PluginContext.Provider value={pluginStore}>{children}</PluginContext.Provider>;
};

export default PluginProvider;
