import { LoadableComponent } from 'react-loadable';

export type PluginStore = Map<string, LoadableComponent | undefined | Record<string, unknown>>;

export const pluginStore: Map<string, LoadableComponent | undefined | Record<string, unknown>> =
    new Map();
