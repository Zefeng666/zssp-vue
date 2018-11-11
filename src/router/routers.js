import Main from '@/view/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () =>
      import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        hideInMenu: true,
        title: '首页',
        notCache: true
      },
      component: () =>
        import('@/view/single-page/home')
    }]
  },
  {
    path: '/user_list',
    name: 'user_list',
    meta: {
      icon: 'md-people',
      title: '用户列表',
      notCache: true
    },
    component: Main,
    children: [{
        path: 'user_list_page',
        name: 'user_list_page',
        meta: {
          icon: 'md-person',
          title: '用户列表',
          notCache: true
        },
        component: () =>
          import('@/view/user-list/user-list.vue')
      },
      {
        path: 'user_new_page',
        name: 'user_new_page',
        meta: {
          icon: 'ios-star',
          title: '新升级用户'
        },
        component: () =>
          import('@/view/user-list/user-new.vue')
      }
    ]
  },
  {
    path: '/shipping_application',
    name: 'shipping_application',
    meta: {
      icon: 'ios-cart',
      title: '发货申请',
      notCache: true
    },
    component: Main,
    children: [{
        path: 'shipping_application_page',
        name: 'shipping_application_page',
        meta: {
          icon: 'ios-cart',
          title: '发货申请',
          notCache: true
        },
        component: () =>
          import('@/view/shipping-application/shipping-application.vue')
      },
      {
        path: 'shipping_record_page',
        name: 'shipping_record_page',
        meta: {
          icon: 'ios-list-box',
          title: '发货记录',
          notCache: true
        },
        component: () =>
          import('@/view/shipping-application/shipping-record.vue')
      }
    ]
  },
  {
    path: '/upgrade_order',
    name: 'upgrade_order',
    meta: {
      icon: 'md-document',
      title: '报单中心',
      notCache: true
    },
    component: Main,
    children: [{
        path: 'upgrade_order_page',
        name: 'upgrade_order_page',
        meta: {
          icon: 'md-albums',
          title: '报单审核',
          notCache: true
        },
        component: () =>
          import('@/view/upgrade-order/upgrade-order.vue')
      },
      {
        path: 'upgrade_record_page',
        name: 'upgrade_record_page',
        meta: {
          icon: 'ios-list-box',
          title: '报单记录',
          notCache: true
        },
        component: () =>
          import('@/view/upgrade-order/upgrade-record.vue')
      }
    ]
  },
  {
    path: '/withdrawal_application',
    name: 'withdrawal_application',
    meta: {
      icon: 'logo-yen',
      title: '提现申请',
      notCache: true
    },
    component: Main,
    children: [{
        path: 'withdrawal_application_page',
        name: 'withdrawal_application_page',
        meta: {
          icon: 'md-add',
          title: '提现申请',
          notCache: true
        },
        component: () =>
          import('@/view/withdrawal-application/withdrawal-application.vue')
      },
      {
        path: 'withdrawal_record_page',
        name: 'withdrawal_record_page',
        meta: {
          icon: 'logo-yen',
          title: '提现记录',
          notCache: true
        },
        component: () =>
          import('@/view/withdrawal-application/withdrawal-record.vue')
      }
    ]
  },
  {
    path: '/idcard_review',
    name: 'idcard_review',
    meta: {
      icon: 'ios-card',
      title: '身份证审核',
      notCache: true
    },
    component: Main,
    children: [{
        path: 'idcard_review_page',
        name: 'idcard_review_page',
        meta: {
          icon: 'ios-card',
          title: '身份证审核',
          notCache: true
        },
        component: () =>
          import('@/view/idcard-review/idcard-review.vue')
      },
      {
        path: 'idcard_record_page',
        name: 'idcard_record_page',
        meta: {
          icon: 'ios-paper',
          title: '审核记录',
          notCache: true
        },
        component: () =>
          import('@/view/idcard-review/idcard-record.vue')
      }
    ]
  },
  {
    path: '/manage_goods',
    name: 'manage_goods',
    meta: {
      icon: 'md-basket',
      title: '商品管理',
      notCache: true
    },
    component: Main,
    children: [{
        path: 'goods_list_page',
        name: 'goods_list_page',
        meta: {
          icon: 'ios-basket',
          title: '商品列表',
          notCache: true
        },
        component: () =>
          import('@/view/manage-goods/goods-list.vue')
      },
      {
        path: 'goods_edit_page',
        name: 'goods_edit_page',
        meta: {
          icon: 'md-add-circle',
          title: '商品编辑',
          notCache: true
        },
        component: () =>
          import('@/view/manage-goods/goods-edit.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import('@/view/error-page/404.vue')
  }
]
