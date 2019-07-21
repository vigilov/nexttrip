import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'overview',
            component: () => import('../components/OverviewPage')
        },
        {
            path: '/route-list/:location',
            name: 'route-list',
            component: () => import('../components/RouteListPage')
        },
        {
            path: '/route',
            name: 'route',
            component: () => import('../components/RoutePage')
        }
    ]
});

export default router;
