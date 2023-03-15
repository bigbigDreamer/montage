import PanGu, { definePlugin } from '@montagejs/pangu';
import RouterConfig from './config/router.config';
import routePreloadPlugin from '@montagejs/pangu-plugin-route-preload';
import { ReactChild, ReactFragment, ReactPortal } from 'react';

const innerPlugin = definePlugin({
    key: 'innerPlugin',
    inner(children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined) {
        console.log(children, 'children');
        return (
            <div>
                {children}
                <h1>我是 inner 插件</h1>
            </div>
        );
    },
    forRoutes() {
        return ['/about'];
    },
});

const app = new PanGu({
    routes: RouterConfig,
});

// app.use(innerPlugin, {}, { single: true });
// app.use(innerPlugin);
app.use(routePreloadPlugin);

/// sdd4444
app.start();
