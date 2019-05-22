
import Vue from 'vue'

import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import Main from '../pages/Main.vue'
import Table from '../pages/nav1/Table.vue'
import Form from '../pages/nav1/Form.vue'
import user from '../pages/nav1/user.vue'
import Index from '../pages/index/index.vue'
import Page4 from '../pages/nav2/Page4.vue'
import Page5 from '../pages/nav2/Page5.vue'
import Page6 from '../pages/nav3/Page6.vue'
import echarts from '../pages/charts/echarts.vue'
import PageDecoration from '../pages/page/pageDecoration.vue'
import PreviewPage from '../pages/page/previewPage.vue'
import Susbscription from '../pages/system/susbscription/index.vue'
import Smallprogram from '../pages/system/smallprogram/index.vue'
import Payment from '../pages/system/payment/index.vue'
import Accountdetail from '../pages/system/accountdetail/index.vue'
import Storedetail from '../pages/store/storedetail/index.vue'
import Storeintroduce from '../pages/store/storeintroduce/index.vue'
import Allservice from '../pages/service/allservice/index.vue'
import Classifyservice from '../pages/service/classifyservice/index.vue'
import Appointment from '../pages/appointment/index.vue'
import Order from '../pages/order/index.vue'
import Swiper from "../pages/page/swiper/index.vue"
import Colleagues from '../pages/colleagues/colleagues/index.vue'
import Scheduling from '../pages/colleagues/scheduling/index.vue'
import NormalMember from '../pages/memberCenter/normalMember/index.vue'
import WechatMember from '../pages/memberCenter/wechatMember/index.vue'
import MemberList from '../pages/memberCenter/wechatMember/memberList/index.vue'
import CreatMember from '../pages/memberCenter/wechatMember/CreatMember/index.vue'
import MemberDetail from '../pages/memberCenter/wechatMember/cardDetail/index.vue'
import Membership from '../pages/memberCenter/membership/index.vue'
import AppointmentAdd from "../pages/appointment/add/index.vue"
import AppointmentDetail from "../pages/appointment/detail/index.vue"
import AppointmentList from "../pages/appointment/list/index.vue"

import CouponDetail from "../pages/marketing/coupon/detail/index.vue"
import CouponList from "../pages/marketing/coupon/list/index.vue"

import OrderDetail from "../pages/order/detail/index.vue"
import OrderList from "../pages/order/list/index.vue"
import Coupon from '../pages/marketing/coupon/index.vue'
import StoreInformation from '../pages/marketing/storeInformation/index.vue'
import ClassicCase from '../pages/marketing/classicCase/index.vue'
import store  from '../vuex/store'
// import axios from 'axios'
Vue.use(VueRouter)
NProgress.configure({ showSpinner: false });
const routes = [
    {
      path: '/login',
      name:'login',
      component: Login,
      hidden: true//不显示在导航中
    },
    //{ path: '/main', component: Main },
    {
      path: '/',
      component: Home,
      name: '首页',
    //   leaf:false,
      leaf:true,
      showIcon:true,
      iconCls: '首页',//图标样式class
      children: [
        { path: '/', component: Index, name: '首页' },
      ]
    },
    {
        path: '/',
        component: Home,
        name: '页面装修',
        leaf:false,
        showIcon:true,
        iconCls: '页面装修',//图标样式class
        children: [
            { path: '/pageDecoration', component: PageDecoration, name: '模板选择' },
            // { path: '/previewPage', component: PreviewPage, name: '页面装修' },
            { path: '/swiper', component: Swiper, name: '轮播图管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '门店管理',
        leaf:false,
        showIcon:true,
        iconCls: '门店管理',//图标样式class
        children: [
            { path: '/storedetail', component: Storedetail, name: '门店详情' },
            { path: '/storeintroduce', component: Storeintroduce, name: '门店介绍' },
        ]
      },
      {
        path: '/',
        component: Home,
        name: '服务管理',
        leaf:false,
        showIcon:true,
        iconCls: '服务管理',//图标样式class
        children: [
            { path: '/allservice', component: Allservice, name: '全部服务' },
            { path: '/classifyservice', component: Classifyservice, name: '分类管理' },
        ]
      },
      {
        path: '/',
        component: Home,
        name: '预约管理',
        leaf:true,
        showIcon:true,
        iconCls: '预约管理 (1)',//图标样式class
        children: [
            { 
            path: '/appointment', component: Appointment, name: '预约管理',
            leaf:false,
            children: [
                { path: '/appointment', component: AppointmentList, name: '预约列表' },
                { path: '/appointment/add', component: AppointmentAdd, name: '新增预约' },
                { path: '/appointment/detail', component: AppointmentDetail, name: '预约详情' }
               
            ]
        }, 
        ]
      },
      {
        path: '/',
        component: Home,
        name: '订单管理',
        leaf:true,
        showIcon:true,
        iconCls: '订单管理',//图标样式class
        children: [
            { path: '/order', component: Order, name: '订单管理',
            leaf:false,
            children: [
                { path: '/order', component: OrderList, name: '订单列表' },
              
                { path: '/order/detail', component: OrderDetail, name: '订单详情' }
               
            ] 
        
            },

         
        ]
      },
      {
        path: '/',
        component: Home,
        name: '我的同事',
        leaf:false,
        showIcon:true,
        iconCls: '我的同事',//图标样式class
        children: [
            { path: '/colleagues', component: Colleagues, name: '我的同事' },
            { path: '/scheduling', component: Scheduling , name: '排班管理' },
        ]
      },
      {
        path: '/',
        component: Home,
        name: '会员中心',
        leaf:false,
        showIcon:true,
        iconCls: '会员中心',//图标样式class
        children: [
            { path: '/normalMember', component: NormalMember, name: '普通会员卡' },
            { path: '/wechatMember', component: WechatMember , name: '微信会员卡',
            leaf:false,
            children:[
                { path: '/wechatMember', component: MemberList, name: '会员卡列表' },
                { path: '/wechatMember/creat', component: CreatMember, name: '创建会员卡' },
                { path: '/wechatMember/detail', component: MemberDetail, name: '会员卡详情' }
            ]
            },
            { path: '/membership', component: Membership , name: '会员管理' },
        ]
      },

      {
        path: '/',
        component: Home,
        name: '营销中心',
        leaf:false,
        showIcon:true,
        iconCls: '营销中心',//图标样式class
        children: [
            { path: '/coupon', component: Coupon, name: '优惠券',
            leaf:false,
            children: [
                { path: '/coupon', component: CouponList, name: '优惠券列表' },
              
                { path: '/coupon/detail', component: CouponDetail, name: '优惠券详情' }
               
            ] 
             },
            { path: '/storeInformation', component: StoreInformation , name: '门店资讯' },
            { path: '/classicCase', component: ClassicCase , name: '经典案例' },
        ]
      },




    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Home',
    //     leaf:true,
        
    //     iconCls: 'el-icon-menu',
    //        children: [
    //             { path: '/user', component: user, name: '富文本' },
    //             { path: '/table', component: Table, name: '用户列表' }
    //         ]
    //   },
    //   {
    //     path: '/form',
    //     component: Form,
    //     name: 'form',
    //     leaf:true,
    //     iconCls: 'el-icon-menu',//图标样式class
    //     children: [
    //         { path: '/form', component: user, name: '阿斯达所大所' },
    //       ]
    //   },
      {
        path: '/',
        component: Home,
        name: '系统设置',
        leaf:false,
        showIcon:true,
        iconCls: '系统设置',//图标样式class
        children: [
            { path: '/susbscription', component: Susbscription, name: '公众号设置' },
            { path: '/smallprogram', component: Smallprogram, name: '小程序设置' },
            { path: '/payment', component: Payment, name: '支付设置' },
            { path: '/accountdetail', component: Accountdetail, name: '账号详情' }
        ]
      }



  ]

 const router=new VueRouter({
    routes
  })
  router.beforeEach((to, from, next) => {
   // 判断是否登录然后跳转到 login 页面
    NProgress.start();
    


    // next();
    // return 
    store.commit("LOGINSTATE");
    var id=store.state.loginState
    if(id&&to.name!='login'){
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
    }else{
        next()
    }
  
  })
  
  router.afterEach(transition => {
     
    NProgress.done();
  });
  export default router