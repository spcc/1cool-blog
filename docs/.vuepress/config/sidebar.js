const vue3 = require('./sidebar/skill/vue3')
const money = require('./sidebar/my/money')

const sidebar = {
  // 知识点 -> vue3
  // skill/web/vue3
  '/skill/web/vue3': vue3,
  '/skill/vue3': vue3,
  '/my/money': money,

  /**
   * js
   */
  '/skill/web/js': [
    {
      title: 'JS', // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      children: [
        '/skill/web/js/base',
        '/skill/web/js/click',
        '/skill/web/js/array',
        '/skill/web/js/string',
        '/skill/web/js/math',
        '/skill/web/js/closure',
        '/skill/web/js/for',
        '/skill/web/js/regular'
      ]
    },
    {
      title: '代码整洁', // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      children: [
        '/skill/web/js/clean',
        '/skill/web/js/clean-name',
        '/skill/web/js/clean-function',
        '/skill/web/js/clean-function-reset',
        '/skill/web/js/clean-notes'
      ]
    }
  ],

  /**
   * 其他
   */
  '/skill/web/other': [
    {
      title: 'npm',
      collapsable: true,
      sidebarDepth: 0,
      children: [
        '/skill/web/other/npm/base',
        '/skill/web/other/npm/common',
        '/skill/web/other/npm/package'
      ]
    },
    {
      title: 'Git', // 必要的
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      children: [
        '/skill/web/other/git/common',
        '/skill/web/other/git/reset',
        '/skill/web/other/git/config'
      ]
    },
    {
      title: 'Http', // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      path: '/skill/web/other/http/base'
    },
    {
      title: 'nrm',
      collapsable: false,
      sidebarDepth: 0,
      path: '/skill/web/other/nrm'
    },
    {
      title: 'Vuepress1',
      collapsable: false,
      sidebarDepth: -1,
      path: '/skill/web/other/vuepress1'
    },
    {
      title: 'gitlab',
      collapsable: false,
      sidebarDepth: -1,
      path: '/skill/web/other/gitlab'
    },
    {
      title: 'SwitchHosts',
      collapsable: false,
      sidebarDepth: -1,
      path: '/skill/web/other/switch-hosts'
    }
  ],

  /**
   * 面试
   */
  '/interview': [
    {
      title: 'JS理论',
      collapsable: true,
      sidebarDepth: 0,
      children: [
        '/interview/js/closure',
        '/interview/js/copy',
        '/interview/js/debounce-throttle',
        '/interview/js/save',
        '/interview/js/url',
        '/interview/js/proto'
      ]
    },
    {
      title: 'vue理论',
      collapsable: true,
      sidebarDepth: 0,
      children: [
        '/interview/vue/common',
        '/interview/vue/scoped',
        '/interview/vue/router'
      ]
    },
    {
      title: '其他',
      collapsable: true,
      sidebarDepth: 0,
      children: ['/interview/other/reverse-interview', '/interview/other/short']
    },
    {
      title: '心态',
      collapsable: true,
      sidebarDepth: 0,
      children: ['/interview/money/base', '/interview/money/p7']
    },
    {
      title: '暂时没有用到',
      collapsable: true,
      sidebarDepth: 0,
      children: ['/interview/not-used/base']
    }
  ],

  /**
   * 时间痕迹
   */
  '/life/': [
    {
      title: '心情', // 必要的
      path: '/life/mood/2022-8/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      children: ['/life/mood/2022']
    },
    {
      title: '看过', // 必要的
      path: '/life/read/2022/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      children: ['/life/read/2022', '/life/read/2023']
    }
  ],

  /**
   * 疑难杂症
   */
  '/problem/': [
    {
      title: 'Vue2', // 必要的
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      children: [
        '/problem/vue2/base',
        '/problem/vue2/npm',
        '/problem/vue2/config',
        '/problem/vue2/experience',
        '/problem/vue2/other'
      ]
    },
    {
      title: 'JS', // 必要的
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      children: ['/problem/js/base', '/problem/js/array', '/problem/js/object']
    },
    {
      title: 'ElementUI', // 必要的
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      children: [
        {
          title: '组件',
          collapsable: false,
          sidebarDepth: 0,
          path: '/problem/element-ui/components',
          children: [
            '/problem/element-ui/components/el-table',
            '/problem/element-ui/components/el-tree',
            '/problem/element-ui/components/el-tooltip',
            '/problem/element-ui/components/el-dropdown',
            '/problem/element-ui/components/el-form'
          ]
        }
      ]
    },
    {
      title: 'ElementPlus', // 必要的
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      children: [
        {
          title: '组件',
          collapsable: false,
          sidebarDepth: 0,
          path: '/problem/element-plus/components',
          children: [
            '/problem/element-plus/components/el-input',
            '/problem/element-plus/components/el-date-time-picker',
            '/problem/element-plus/components/el-scrollbar',
            '/problem/element-plus/components/el-dialog',
            '/problem/element-plus/components/el-tree',
            '/problem/element-plus/components/el-color-picker'
          ]
        }
      ]
    },
    {
      title: 'Css', // 必要的
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      children: ['/problem/css/base', '/problem/css/common']
    },
    {
      title: 'Html', // 必要的
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      children: ['/problem/html/base']
    }
  ],

  '/book/': [
    {
      title: 'JavaScript 高级程序设计（第4版）',
      collapsable: true,
      sidebarDepth: 0,
      path: '/book/js4/',
      children: [
        {
          title: '第 1 章 什么是 JavaScript',
          path: '/book/js4/base'
        },
        {
          title: '第 2 章 HTML 中的 JavaScript',
          path: '/book/js4/html'
        },
        {
          title: '第 3 章 语言基础',
          path: '/book/js4/basic'
        },
        {
          title: '第 4 章 变量、作用域与内存',
          path: '/book/js4/var'
        },
        {
          title: '第 5 章 基本引用类型',
          path: '/book/js4/referenceType'
        },
        {
          title: '第 6 章 集合引用类型',
          path: '/book/js4/collectionType'
        }
      ]
    },
    {
      title: 'ES6 标准入门',
      collapsable: true,
      sidebarDepth: 0,
      children: [
        '/book/es6/intro',
        '/book/es6/let',
        '/book/es6/destructuring',
        '/book/es6/string',
        '/book/es6/string-methods',
        '/book/es6/number',
        '/book/es6/function',
        '/book/es6/array',
        '/book/es6/object',
        '/book/es6/object-methods',
        '/book/es6/operator',
        '/book/es6/symbol'
        // "/book/es6/async",
      ]
    },
    {
      title: '从 0 到 1 落地前端工程化', // 必要的
      path: '/book/web-engineering/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      children: [
        '/book/web-engineering/introduction',
        '/book/web-engineering/2'
      ]
    }
  ]
}

module.exports = sidebar
