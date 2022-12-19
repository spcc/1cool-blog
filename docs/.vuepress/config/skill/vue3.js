const vue3 = [
  {
    title: 'vue3', // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 0, // 可选的, 默认值是 1
    children: [
      {
        title: '理论',
        collapsable: false,
        sidebarDepth: 0,
        // path: "/skill/web/vue3/game",
        children: [
          '/skill/web/vue3/faq/pinia',
          '/skill/web/vue3/faq/base1',
          '/skill/web/vue3/faq/base',
          '/skill/web/vue3/faq/faq'
        ]
      },
      {
        title: '规范',
        collapsable: false,
        sidebarDepth: 0,
        // path: "/skill/web/vue3/game",
        children: ['/skill/web/vue3/api/base']
      },
      {
        title: '实战',
        collapsable: false,
        sidebarDepth: 0,
        // path: "/skill/web/vue3/game",
        children: [
          '/skill/web/vue3/api/difference',
          '/skill/web/vue3/api/transition'
        ]
      },
      {
        title: '其他',
        collapsable: false,
        sidebarDepth: 0,
        // path: "/skill/web/vue3/game",
        children: ['/skill/web/vue3/common']
      }
    ]
  },
  {
    title: '实战搭建', // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 0, // 可选的, 默认值是 1
    children: [
      '/skill/web/vue3/create/init',
      '/skill/web/vue3/create/login',
      '/skill/web/vue3/create/layout',
      '/skill/web/vue3/create/component',
      '/skill/web/vue3/create/profile',
      '/skill/web/vue3/create/quanXian',
      '/skill/web/vue3/create/rbac',
      '/skill/web/vue3/create/table',
      '/skill/web/vue3/create/markdown',
      '/skill/web/vue3/create/publish',
      '/skill/web/vue3/create/zongJie',
      '/skill/web/vue3/create/ss'
    ]
  },
  {
    title: '初始化', // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 0, // 可选的, 默认值是 1
    children: [
      {
        title: '搭建',
        collapsable: false,
        sidebarDepth: 0,
        // path: "/skill/web/vue3/game",
        children: ['/skill/web/vue3/game/base']
      },
      {
        title: '配置',
        collapsable: false,
        sidebarDepth: 0,
        path: '/problem/element-ui/components',
        children: ['/problem/element-ui/components/el-table']
      }
    ]
  },
  {
    title: '其他', // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 0, // 可选的, 默认值是 1
    children: ['/skill/web/vue3/other/package']
  },
  {
    title: 'Mock',
    collapsable: false,
    sidebarDepth: 0,
    path: '/skill/web/vue3/mock'
  }
]

module.exports = vue3
