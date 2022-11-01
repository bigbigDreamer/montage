import { useContext } from 'react';
import type { LoadableComponent } from 'react-loadable';
import { PluginContext } from './provider';
import type { PluginStore } from './store';

const usePluginProvider = (
    route?: string,
): (LoadableComponent | undefined | Record<string, unknown>) | PluginStore => {
    const store = useContext<PluginStore>(PluginContext);
    return route ? store.get(route) : store;
};

export default usePluginProvider;
