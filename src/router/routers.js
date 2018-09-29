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
  // {
  //   path: '',
  //   name: 'doc',
  //   meta: {
  //     title: '文档',
  //     href: 'https://lison16.github.io/iview-admin-doc/#/',
  //     icon: 'ios-book'
  //   }
  // },
  // {
  //   path: '/join',
  //   name: 'join',
  //   component: Main,
  //   children: [
  //     {
  //       path: 'join_page',
  //       name: 'join_page',
  //       meta: {
  //         icon: '_qq',
  //         title: 'QQ群'
  //       },
  //       component: () => import('@/view/join-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/components',
  //   name: 'components',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: '组件'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'count_to_page',
  //       name: 'count_to_page',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '数字渐变'
  //       },
  //       component: () => import('@/view/components/count-to/count-to.vue')
  //     },
  //     {
  //       path: 'drag_list_page',
  //       name: 'drag_list_page',
  //       meta: {
  //         icon: 'ios-infinite',
  //         title: '拖拽列表'
  //       },
  //       component: () => import('@/view/components/drag-list/drag-list.vue')
  //     },
  //     {
  //       path: 'tables_page',
  //       name: 'tables_page',
  //       meta: {
  //         icon: 'md-grid',
  //         title: '多功能表格'
  //       },
  //       component: () => import('@/view/components/tables/tables.vue')
  //     },
  //     {
  //       path: 'split_pane_page',
  //       name: 'split_pane_page',
  //       meta: {
  //         icon: 'md-pause',
  //         title: '分割窗口'
  //       },
  //       component: () => import('@/view/components/split-pane/split-pane.vue')
  //     },
  //     {
  //       path: 'markdown_page',
  //       name: 'markdown_page',
  //       meta: {
  //         icon: 'logo-markdown',
  //         title: 'Markdown编辑器'
  //       },
  //       component: () => import('@/view/components/markdown/markdown.vue')
  //     },
  //     {
  //       path: 'editor_page',
  //       name: 'editor_page',
  //       meta: {
  //         icon: 'ios-create',
  //         title: '富文本编辑器'
  //       },
  //       component: () => import('@/view/components/editor/editor.vue')
  //     },
  //     {
  //       path: 'icons_page',
  //       name: 'icons_page',
  //       meta: {
  //         icon: '_bear',
  //         title: '自定义图标'
  //       },
  //       component: () => import('@/view/components/icons/icons.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/update',
  //   name: 'update',
  //   meta: {
  //     icon: 'md-cloud-upload',
  //     title: '数据上传'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'update_table_page',
  //       name: 'update_table_page',
  //       meta: {
  //         icon: 'ios-document',
  //         title: '上传Csv'
  //       },
  //       component: () => import('@/view/update/update-table.vue')
  //     },
  //     {
  //       path: 'update_paste_page',
  //       name: 'update_paste_page',
  //       meta: {
  //         icon: 'md-clipboard',
  //         title: '粘贴表格数据'
  //       },
  //       component: () => import('@/view/update/update-paste.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/excel',
  //   name: 'excel',
  //   meta: {
  //     icon: 'ios-stats',
  //     title: 'EXCEL导入导出'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'upload-excel',
  //       name: 'upload-excel',
  //       meta: {
  //         icon: 'md-add',
  //         title: '导入EXCEL'
  //       },
  //       component: () => import('@/view/excel/upload-excel.vue')
  //     },
  //     {
  //       path: 'export-excel',
  //       name: 'export-excel',
  //       meta: {
  //         icon: 'md-download',
  //         title: '导出EXCEL'
  //       },
  //       component: () => import('@/view/excel/export-excel.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/tools_methods',
  //   name: 'tools_methods',
  //   meta: {
  //     hide: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'tools_methods_page',
  //       name: 'tools_methods_page',
  //       meta: {
  //         icon: 'ios-hammer',
  //         title: '工具方法'
  //       },
  //       component: () => import('@/view/tools-methods/tools-methods.vue')
  //     }
  //   ]
  // },
  {
    path: '/user_list',
    name: 'user_list',
    meta: {
      icon: 'md-people',
      title: '用户列表'
    },
    component: Main,
    children: [{
        path: 'user_list_page',
        name: 'user_list_page',
        meta: {
          icon: 'md-person',
          title: '用户列表'
        },
        component: () =>
          import('@/view/user-list/user-list.vue')
      },
      {
        path: 'user_search_page',
        name: 'user_search_page',
        meta: {
          icon: 'ios-search',
          title: '用户搜索'
        },
        component: () =>
          import('@/view/user-list/user-search.vue')
      }
    ]
  },
  {
    path: '/shipping_application',
    name: 'shipping_application',
    meta: {
      icon: 'ios-cart',
      title: '发货申请'
    },
    component: Main,
    children: [{
        path: 'shipping_application_page',
        name: 'shipping_application_page',
        meta: {
          icon: 'ios-cart',
          title: '发货申请'
        },
        component: () =>
          import('@/view/shipping-application/shipping-application.vue')
      },
      {
        path: 'shipping_record_page',
        name: 'shipping_record_page',
        meta: {
          icon: 'ios-list-box',
          title: '发货记录'
        },
        component: () =>
          import('@/view/shipping-application/shipping-record.vue')
      }
    ]
  },
  {
    path: '/withdrawal_application',
    name: 'withdrawal_application',
    meta: {
      icon: 'logo-yen',
      title: '提现申请'
    },
    component: Main,
    children: [{
        path: 'withdrawal_application_page',
        name: 'withdrawal_application_page',
        meta: {
          icon: 'md-add',
          title: '提现申请'
        },
        component: () =>
          import('@/view/withdrawal-application/withdrawal-application.vue')
      },
      {
        path: 'withdrawal_record_page',
        name: 'withdrawal_record_page',
        meta: {
          icon: 'logo-yen',
          title: '提现记录'
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
      title: '身份证审核'
    },
    component: Main,
    children: [{
        path: 'idcard_review_page',
        name: 'idcard_review_page',
        meta: {
          icon: 'ios-card',
          title: '身份证审核'
        },
        component: () =>
          import('@/view/idcard-review/idcard-review.vue')
      },
      {
        path: 'idcard_record_page',
        name: 'idcard_record_page',
        meta: {
          icon: 'ios-paper',
          title: '审核记录'
        },
        component: () =>
          import('@/view/idcard-review/idcard-review.vue')
      }
    ]
  },

  // {
  //   path: '/directive',
  //   name: 'directive',
  //   meta: {
  //     hide: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'directive_page',
  //       name: 'directive_page',
  //       meta: {
  //         icon: 'ios-navigate',
  //         title: '指令'
  //       },
  //       component: () => import('@/view/directive/directive.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/multilevel',
  //   name: 'multilevel',
  //   meta: {
  //     icon: 'md-menu',
  //     title: '多级菜单'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'level_2_1',
  //       name: 'level_2_1',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-1'
  //       },
  //       component: () => import('@/view/multilevel/level-2-1.vue')
  //     },
  //     {
  //       path: 'level_2_2',
  //       name: 'level_2_2',
  //       meta: {
  //         access: ['super_admin'],
  //         icon: 'md-funnel',
  //         showAlways: true,
  //         title: '二级-2'
  //       },
  //       component: parentView,
  //       children: [
  //         {
  //           path: 'level_2_2_1',
  //           name: 'level_2_2_1',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级'
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
  //         }
  //       ]
  //     },
  //     {
  //       path: 'level_2_3',
  //       name: 'level_2_3',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-3'
  //       },
  //       component: () => import('@/view/multilevel/level-2-3.vue')
  //     },
  //   ]
  // },
  // {
  //   path: '/argu',
  //   name: 'argu',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'params/:id',
  //       name: 'params',
  //       meta: {
  //         icon: 'md-flower',
  //         title: '动态路由',
  //         notCache: true
  //       },
  //       component: () => import('@/view/argu-page/params.vue')
  //     },
  //     {
  //       path: 'query',
  //       name: 'query',
  //       meta: {
  //         icon: 'md-flower',
  //         title: '带参路由',
  //         notCache: true
  //       },
  //       component: () => import('@/view/argu-page/query.vue')
  //     }
  //   ]
  // },
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
