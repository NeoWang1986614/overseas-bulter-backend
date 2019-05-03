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
import FeedbackEditor from '@/components/FeedbackEditor'

import { getCookie } from '../../common/cookie.js'

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
            }, {
                path: '/feedback-editor',
                name: 'FeedbackEditor',
                component: FeedbackEditor
            }, ]
        }
    ]
})

router.beforeEach((to, from, next) => {

    document.title = '海外管家后台管理系统';

    if (to.fullPath == '/') {
        next();
        return;
    }

    var isLoginSuccess = getCookie('isLoginSuccess')
    console.log('isLoginSuccess from cookie', isLoginSuccess);
    if (isLoginSuccess && 'success' == isLoginSuccess) {
        next();
    } else {
        router.push({ path: '/' });
    }

});
export default router;