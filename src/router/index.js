import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import auditList from '@/views/auditList/index'
import deliveryList from '@/views/deliveryList/index'

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
      path: '/goodsDetail/:id',
      name: 'goodsDetail',
      component: () => import('@/views/goodsDetail/index'),
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/:type/payment',
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
            title: '全部订单',
            type: 'all'
          }
        },
        { path: 'waitFH', 
          name: 'waitFH', 
          component: () => import('@/views/orderList/index'),
          meta: {
            title: '待发货',
            type: 'unshipped'
          }
        },
        { path: 'waitSH', 
          name: 'waitSH', 
          component: () => import('@/views/orderList/index'),
          meta: {
            title: '待收货',
            type: 'shipped'
          }
        },
        { path: 'complete', 
          name: 'complete', 
          component: () => import('@/views/orderList/index'),
          meta: {
            title: '已完成',
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
    },
    {
      path: '/audit',
      name: 'audit',
      component: () => import('@/views/audit/index'),
      meta: {
        title: '审核'
      },
      redirect: '/audit/wait',
      children: [
        {
          path: 'wait',
          name: 'wait',
          component: auditList,
          meta: {
            title: '待审核'
          }
        },
        {
          path: 'already',
          name: 'already',
          component: auditList,
          meta: {
            title: '已审核'
          }
        }
      ]
    },
    {
      path: '/auditDetail/:id',
      name: 'auditDetail',
      component: () => import('@/views/auditDetail/index'),
      meta: {
        title: '审核详情'
      }
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: () => import('@/views/delivery/index'),
      redirect: '/delivery/index',
      children: [
        {
          path: 'index',
          name: 'index',
          component: deliveryList,
          meta: {
            title: '发货列表',
            type: 'all'
          }
        },
        {
          path: 'wait',
          name: 'wait',
          component: deliveryList,
          meta: {
            title: '待发货',
            type: 'unshipped'
          }
        },
        {
          path: 'already',
          name: 'already',
          component: deliveryList,
          meta: {
            title: '待收货',
            type: 'shipped'
          }
        },
        {
          path: 'complete',
          name: 'complete',
          component: deliveryList,
          meta: {
            title: '已完成',
            type: 'done'
          }
        }
      ]
     },
     {
       path: '/deliveryDetail/:no',
       name: 'deliveryDetail',
       component: () => import('@/views/deliveryDetail/index'),
       meta: {
         title: '订单详情'
       }
     }
  ]
})
