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
import ServicePrimaryManager from '@/components/ServicePrimaryManager'
import ServicePrimaryEditor from '@/components/ServicePrimaryEditor'
import ServiceEditor from '@/components/ServiceEditor'
import FeedbackEditor from '@/components/FeedbackEditor'
import LayoutManager from '@/components/LayoutManager'
import LayoutEditor from '@/components/LayoutEditor'
import PriceParamsManager from '@/components/PriceParamsManager'
import PriceParamsEditor from '@/components/PriceParamsEditor'
import CarouselFigureManager from '@/components/CarouselFigureManager'
import CarouselFigureEditor from '@/components/CarouselFigureEditor'
import HouseDealManager from '@/components/HouseDealManager'
import HouseDealEditor from '@/components/HouseDealEditor'

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
            }, {
                path: '/service-primary-manager',
                name: 'ServicePrimaryManager',
                component: ServicePrimaryManager
            }, {
                path: '/service-primary-editor',
                name: 'ServicePrimaryEditor',
                component: ServicePrimaryEditor
            }, {
                path: '/layout-manager',
                name: 'LayoutManager',
                component: LayoutManager
            }, {
                path: '/layout-editor',
                name: 'LayoutEditor',
                component: LayoutEditor
            }, {
                path: '/price-params-manager',
                name: 'PriceParamsManager',
                component: PriceParamsManager
            }, {
                path: '/price-params-editor',
                name: 'PriceParamsEditor',
                component: PriceParamsEditor
            }, {
                path: '/carousel-figure-manager',
                name: 'CarouselFigureManager',
                component: CarouselFigureManager
            }, {
                path: '/carousel-figure-editor',
                name: 'CarouselFigureEditor',
                component: CarouselFigureEditor
            }, {
                path: '/house-deal-manager',
                name: 'HouseDealManager',
                component: HouseDealManager
            }, {
                path: '/house-deal-editor',
                name: 'HouseDealEditor',
                component: HouseDealEditor
            }]
        }
    ]
})

router.beforeEach((to, from, next) => {

    document.title = '菲洋管家后台管理系统';

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