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
            type: ''
          }
        },
        { path: 'waitFH', 
          name: 'waitFH', 
          component: () => import('@/views/orderList/index'),
          meta: {
            title: '订单',
            type: 1
          }
        },
        { path: 'waitSH', 
          name: 'waitSH', 
          component: () => import('@/views/orderList/index'),
          meta: {
            title: '订单',
            type: 2
          }
        },
        { path: 'waitPJ', 
          name: 'waitPJ', 
          component: () => import('@/views/orderList/index'),
          meta: {
            title: '订单',
            type: 3
          }
        },
        { path: 'complete', 
          name: 'complete', 
          component: () => import('@/views/orderList/index'),
          meta: {
            title: '订单',
            type: 4
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
    }
  ]
})
