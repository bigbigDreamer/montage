import Main from '../pages/main';
import About from '../pages/about';
import { PanGuRouteObject } from '@montagejs/pangu';

const RouterConfig: PanGuRouteObject[] = [
    {
        path: '/',
        component: () => import('../pages/main'),
        lazy: true,
    },
    {
        path: '/about',
        component: () => import('../pages/about'),
        lazy: true,
    },
];

export default RouterConfig;
