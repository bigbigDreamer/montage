import { defineRouterConfig } from '@montagejs/pangu';
import Main from '../pages/main';
import About from '../pages/about';

export default defineRouterConfig([
    {
        path: '/',
        component: Main,
    },
    {
        path: '/about',
        component: About,
    },
]);
