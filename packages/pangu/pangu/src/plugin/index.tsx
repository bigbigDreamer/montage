/**
 * @desc 插件系统，插件系统做的事
 *   1. 注册插件
 *   2. 区分插件类别，inner 还是 outer
 */
import { ReactElement, ReactNode } from 'react';

export type RoutePlugin = {
    name?: string;
    inner?(children: ReactNode, options?: unknown, route?: any): ReactElement;
    outer?(children: ReactNode, options?: unknown): ReactElement;
};

export type PluginType = 'inner' | 'outer';

export enum PluginTypes {
    INNER = 'inner',
    OUTER = 'outer',
}

class PluginsEngine {
    private readonly plugins: { instance: RoutePlugin; options?: unknown }[];
    constructor() {
        this.plugins = [];
    }

    set(plugin: RoutePlugin, options?: unknown) {
        this.plugins.push({ instance: plugin, options });
    }

    get() {
        return this.plugins;
    }

    compose(props: { children: ReactNode | ReactElement; type: PluginType }): ReactElement;
    compose(props: {
        children: ReactNode | ReactElement;
        type: PluginType;
        route: any;
    }): ReactElement;
    compose(props: {
        children: ReactNode | ReactElement;
        type: PluginType;
        route?: any;
    }): ReactElement {
        const { type, children, route } = props;
        let finalChildren = children;
        this.plugins.forEach((routePlugin) => {
            const { instance, options } = routePlugin;
            const wrapperFn = instance[type];
            if (type === PluginTypes.INNER) {
                finalChildren = wrapperFn?.(finalChildren, options, route) as ReactElement;
            } else if (type === PluginTypes.OUTER) {
                finalChildren = wrapperFn?.(finalChildren, options) as ReactElement;
            }
        });

        return finalChildren as ReactElement;
    }
}

export default new PluginsEngine();
