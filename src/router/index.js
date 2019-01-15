import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index/index'),
      meta: {
        title: '山羊森林'
      }
    },
    {
      path: '/found',
      name: 'found',
      component: () => import('@/views/found/index'),
      meta: {
        title: '发现'
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/cart/index'),
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/views/my/index'),
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/goods/:id',
      name: 'goods',
      component: () => import('@/views/goodsDetail/index'),
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('@/views/payment/index'),
      meta: {
        title: '订单结算'
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/setting/index'),
      meta: {
        title: '个人设置'
      }
    },
    {
      path: '/bindPhone',
      name: 'bindPhone',
      component: () => import('@/views/bindPhone/index'),
      meta: {
        title: '绑定手机'
      }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/order/index'),
      redirect: '/order/all',
      meta: {
        title: '订单'
      },
      children: [
        { path: 'all', 
          name: 'all', 
          component: () => import('@/views/orderList/index'),
          meta: {
            title: '订单',
            type: 'all'
          }
        },
        { path: 'waitFH', 
          name: 'waitFH', 
          component: () => import('@/views/orderList/index'),
          meta: {
            title: '订单',
            type: 'unshipped'
          }
        },
        { path: 'waitSH', 
          name: 'waitSH', 
          component: () => import('@/views/orderList/index'),
          meta: {
            title: '订单',
            type: 'shipped'
          }
        },
        { path: 'waitPJ', 
          name: 'waitPJ', 
          component: () => import('@/views/orderList/index'),
          meta: {
            title: '订单',
            type: 'all'
          }
        },
        { path: 'complete', 
          name: 'complete', 
          component: () => import('@/views/orderList/index'),
          meta: {
            title: '订单',
            type: 'done'
          }
        },
      ]
    },
    {
      path: '/orderDetail/:id',
      name: 'orderDetail',
      component: () => import('@/views/orderDetail/index'),
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/applySecond',
      name: 'applySecond',
      component: () => import('@/views/applySecond/index'),
      meta: {
        title: '团长申请'
      }
    },
    {
      path: '/applyFirst',
      name: 'applyFirst',
      component: () => import('@/views/applyFirst/index'),
      meta: {
        title: '代理商申请'
      }
    },
    {
      path: '/applySupplier',
      name: 'applySupplier',
      component: () => import('@/views/applySupplier/index'),
      meta: {
        title: '供货商申请'
      }
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('@/views/article/index'),
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/videos',
      name: 'video',
      component: () => import('@/views/videos/index'),
      meta: {
        title: '视频'
      }
    },
    {
      path: '/marketing/join',
      name: 'marketingJoin',
      component: () => import('@/views/marketingJoin/index'),
      meta: {
        title: '邀请好友'
      }
    },
    {
      path: '/marketing/confirm',
      name: 'marketingConfirm',
      component: () => import('@/views/marketingConfirm/index'),
      meta: {
        title: '推广邀请'
      }
    },
    {
      path: '/express/:no',
      name: 'express',
      component: () => import('@/views/express/index'),
      meta: {
        title: '物流详情'
      }
    }
  ]
})
