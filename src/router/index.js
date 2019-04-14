import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import First from '@/components/First'
import AuthorityManager from '@/components/AuthorityManager'
import CaseManager from '@/components/CaseManager'
import CaseEditor from '@/components/CaseEditor'
import OrderManager from '@/components/OrderManager'
import ServiceManager from '@/components/ServiceManager'
import ServiceEditor from '@/components/ServiceEditor'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/home',
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
    }]
})