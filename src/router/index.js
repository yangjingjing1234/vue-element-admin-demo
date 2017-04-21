import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

const Login = r => require.ensure([], () => r(require('../views/Login.vue')), 'Login')
const NotFound = r => require.ensure([], () => r(require('../views/Login.vue')), 'NotFound')
const Home = r => require.ensure([], () => r(require('../views/Home.vue')), 'Home')
const Main = r => require.ensure([], () => r(require('../views/Main.vue')), 'Main')
const Table = r => require.ensure([], () => r(require('../views/nav1/Table.vue')), 'Table')
const Mobile = r => require.ensure([], () => r(require('../views/nav1/Mobile.vue')), 'Mobile')
const Setting = r => require.ensure([], () => r(require('../views/nav1/setting.vue')), 'Setting')
const Applist = r => require.ensure([], () => r(require('../views/nav1/Applist.vue')), 'Applist')
const IndustryChain = r => require.ensure([], () => r(require('../views/nav1/IndustryChain.vue')), 'IndustryChain')

export default new Router({
  routes: [
  	{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
  	{
        path: '/404',
        component: NotFound,
        name: '',
        meta: { auth: false },
        hidden: true
    },
    {
        path: '/',
        component: Home,
        redirect: '/main',
        name: '借款人配置',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: '版本控制' },
            { path: '/mobile', component: Mobile, name: '获取验证码' },
            { path: '/setting', component: Setting, name: '配置管理' },
            { path: '/applist', component: Applist, name: 'APP版本配置' },
            { path: '/industryChain', component: IndustryChain, name: '产业链配置' },
        ]
    },
    {
       path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/Hello', component: Hello, name: '导航三' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
  ]
})
