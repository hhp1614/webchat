import Vue from 'vue'
import Router from 'vue-router'
import Start from '../components/Start.vue'
import Index from '../components/Index.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'Start',
            component: Start
        },
        {
            path: '/',
            name: 'Index',
            component: Index,
        }
    ]
});

/**
 * 路由拦截
 */
router.beforeEach((to, from, next) => {
    if (to.path === '/' && !sessionStorage.getItem('user')) {
        next('/login');
    } else {
        next();
    }
});

export default router
