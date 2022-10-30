import { useContext } from 'react';

import { PluginContext } from './provider';
import type { PluginStore } from './store';

const usePluginProvider = (route?: string) => {
    const store = useContext<PluginStore>(PluginContext);
    return route ? store.get(route) : store;
};

export default usePluginProvider;
