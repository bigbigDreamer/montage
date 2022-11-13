import { useContext } from 'react';
import type { LoadableComponent } from 'react-loadable';
import { PluginContext } from './provider';
import type { PluginStore } from './store';

function usePluginProvider(): PluginStore;
function usePluginProvider(route?: string): LoadableComponent;

function usePluginProvider(
    route?: string,
): (LoadableComponent | undefined | Record<string, unknown>) | PluginStore {
    const store = useContext<PluginStore>(PluginContext);
    return route ? store.get(route) : store;
}

export default usePluginProvider;
