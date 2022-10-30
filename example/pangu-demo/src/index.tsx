import PanGu from '@montagejs/pangu';
import { ReactChild, ReactFragment, ReactPortal } from 'react';
import RouterConfig from './config/router.config';
import routePreloadPlugin from '@montagejs/pangu-plugin-route-preload';

const innerPlugin = {
    name: 'MyInner',
    // @ts-ignore
    inner(children) {
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
};

const app = new PanGu({
    routes: RouterConfig,
});

app.use(innerPlugin);
app.use(routePreloadPlugin);

app.start();
