import Vue from 'vue'
import Router from 'vue-router'
const _import = require ('./_import_'+process.env.NODE_ENV);

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          name: 'home',
          redirect:'/index'

      },
      {
          path:'/index',
          name:'index',
          component: _import('index/index'),
          meta:{
              showTab:true,
              title:'首页'
          }
      },
      {
          path:'/user',
          name:'user',
          component: _import('user/index'),
          meta:{
              showTab:true,
              title:'个人中心'
          }
      },
      {
          path:'/self',
          name:'self',
          component: _import('user/self'),
          meta:{
              title:'修改资料'
          }
      },
      {
          path:'/selfName',
          name:'selfName',
          component: _import('user/NameDetail'),
          meta:{
              title:'修改昵称'
          }
      },
      {
          path:'/service',
          name:'service',
          component: _import('service/index'),
          meta:{
              title:'客服服务'
          }
      },
      {
          path:'/generalize',
          name:'generalize',
          component: _import('generalize/index'),
          meta:{
              title:'推广'
          }
      },
      {
          path: '/address/:id',
          name: 'address',
          component: _import('address/index'),
          meta:{
              title:'地址列表'
          }
      },
      {
          path: '/orderResetAddress/:code',
          name: 'orderResetAddress',
          component: _import('address/orderResetAddress'),
          meta:{
              title:'订单修改地址'
          }
      },
      {
          path:'/addAddress',
          name: 'addAddress',
          component: _import('address/add'),
          meta:{
              title:'添加地址'
          }
      },
      {
          path:'/editAddress/:id',
          name: 'editAddress',
          component: _import('address/edit'),
          meta:{
              title:'编辑地址'
          }
      },
      {
          path:'/order/:id',
          name: 'order',
          component: _import('order/index'),
          meta:{
              title:'订单列表'
          }
      },
      {
          path:'/orderDetail/:id',
          name:'orderDetail',
          component: _import('order/detail'),
          meta:{
              title:'订单详情'
          }
      },
      {
          path:'/express/:id/:num/:code',
          name:'express',
          component: _import('order/express'),
          meta:{
              title:'物流详情'
          }
      },
      {
          path:'/settlement',
          name:'settlement',
          component: _import('settlement/index'),
          meta:{
              title:'提交订单'
          }
      },
      {
          path:'/aftersale',
          name:'aftersale',
          component: _import('afterSale/index'),
          meta:{
              title:'售后服务'
          }
      },
      {
          path:'/aftersaletype/:num',
          name:'aftersaletype',
          component: _import('afterSale/type'),
          meta:{
              title:'售后服务类型'
          }
      },
      {
          path:'/exchange/:num',
          name:'exchange',
          component: _import('afterSale/exchange'),
          meta:{
              title:'换货申请'
          }
      },
      {
          path:'/afterExpress/:num',
          name:'afterExpress',
          component: _import('afterSale/express'),
          meta:{
              title:'填写物流单号'
          }
      },
      {
          path:'/return/:num',
          name:'return',
          component: _import('afterSale/return'),
          meta:{
              title:'退货申请'
          }
      },
      {
          path:'/afterDetail/:id',
          name:'afterDetail',
          component: _import('afterSale/detail'),
          meta:{
              title:'售后详情'
          }
      },
      {
          path:'/check/:id',
          name:'check',
          component: _import('check/index'),
          meta:{
              title:'我的收益'
          }
      },
      {
          path:'/checkDetail',
          name:'checkDetail',
          component: _import('check/detail'),
          meta:{
              title:'支/收详情'
          }
      },
      {
          path:'/bank',
          name:'bank',
          component: _import('bank/index'),
          meta:{
              title:'银行卡列表'
          }
      },
      {
          path:'/bankAdd',
          name:'bankAdd',
          component: _import('bank/add'),
          meta:{
              title:'添加银行卡'
          }
      },
      {
          path:'/bankExtract/:id',
          name:'bankExtract',
          component: _import('bank/extract'),
          meta:{
              title:'银行卡提现'
          }
      },
      {
          path:'/author',
          name:'author',
          component: _import('user/author'),
          meta:{
              title:'用户授权'
          }
      },
      {
          path:'/sale',
          name:'sale',
          component: _import('sale/index'),
          meta:{
              title:'销售列表'
          }
      },
      {
          path:'/saleDetail/:id',
          name:'saleDetail',
          component: _import('sale/detail'),
          meta:{
              title:'销售订单详情'
          }
      },
      {
          path:'*',
          redirect:'/index',
      },
  ]
})
