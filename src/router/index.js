import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import AuthorityManager from '@/components/AuthorityManager'
import CaseManager from '@/components/CaseManager'
import CaseEditor from '@/components/CaseEditor'
import OrderManager from '@/components/OrderManager'
import OrderEditor from '@/components/OrderEditor'
import ServiceManager from '@/components/ServiceManager'
import ServiceEditor from '@/components/ServiceEditor'

Vue.use(Router)


var router = new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login,
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            children: [{
                path: '/case-manager',
                name: 'CaseManager',
                component: CaseManager
            }, {
                path: '/service-manager',
                name: 'ServiceManager',
                component: ServiceManager
            }, {
                path: '/order-manager',
                name: 'OrderManager',
                component: OrderManager
            }, {
                path: '/order-editor',
                name: 'OrderEditor',
                component: OrderEditor
            }, {
                path: '/authority-manager',
                name: 'AuthorityManager',
                component: AuthorityManager
            }, {
                path: '/case-editor',
                name: 'CaseEditor',
                component: CaseEditor
            }, {
                path: '/service-editor',
                name: 'ServiceEditor',
                component: ServiceEditor
            }, ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log('before each');
    console.log('to = ', to);
    console.log('from=', from);
    console.log('next=', next);


    next();
});
export default router;
// vueRouter.beforeEach(function(to, from, next) {
//             console.log("to", to);
//             console.log("from", from);
//             console.log("next", next);
// const nextRoute = ['account', 'order', 'course'];
// const auth = store.state.auth;
// //跳转至上述3个页面
// if (nextRoute.indexOf(to.name) >= 0) {
//     //未登录
//     if (!store.state.auth.IsLogin) {
//         vueRouter.push({ name: 'login' })
//     }
// }
// //已登录的情况再去登录页，跳转至首页
// if (to.name === 'login') {
//     if (auth.IsLogin) {
//         vueRouter.push({ name: 'home' });
//     }
// }
// next();
//