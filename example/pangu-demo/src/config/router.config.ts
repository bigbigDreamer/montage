import { defineRouterConfig } from '@montagejs/pangu';
import Main from '../pages/main';
import About from '../pages/about';
import InnerMain from '../pages/inner-main';

export default defineRouterConfig([
    {
        path: '/',
        component: Main,
        children: [
            {
                path: 'inner',
                component: InnerMain,
            },
        ],
    },
    {
        path: '/about',
        component: About,
    },
]);
