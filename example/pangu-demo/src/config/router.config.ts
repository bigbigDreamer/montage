import { defineRouterConfig } from '@montagejs/pangu';

export default defineRouterConfig([
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
]);
