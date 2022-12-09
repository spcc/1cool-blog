const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  // 打包路径
  base: isDev ? '/' : '/cc/',
  // 标题
  title: '1cool',
  // 介绍
  description: '我本可以容忍黑暗，如果我不曾见过太阳',
  // 喜欢的人是真的会发光啊
  // 你要幸福哦，如果开心的话，忘了我也没关系的
  // 我做过最勇敢的一件事，就是喜欢你
  // 我没有梦想，但我可以守护别人的梦想！
  // 永远别放弃一个你每天都在想念的人
  // 差距并不可怕，可怕的是因为差距而放弃
  // 主题
  theme: '@qingui/v1',
  plugins: [
    '@vuepress/back-to-top',
    'reading-progress',
    [
      'dynamic-title',
      {
        showIcon: '/favicon.ico',
        showText: '',
        hideIcon: '/failure.ico',
        hideText: '燕子没有你我怎么活啊',
        recoverTime: 2000
      }
    ]
  ],
  head: [
    [
      'script',
      {
        language: 'javascript',
        type: 'text/javascript',
        src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js'
      }
    ],
    // 引入鼠标点击脚本
    [
      'script',
      {
        language: 'javascript',
        type: 'text/javascript',
        src: '/js/MouseClickEffect.js'
      }
    ]
  ],
  // 主题配置
  themeConfig: {
    lastUpdated: '最后更新时间',
    nav: [
      { text: '首页', link: '/' },
      { text: '富通天下', link: '/fuTong' },
      { text: '常用链接', link: '/link' },
      {
        text: '知识点',
        items: [
          {
            text: '技术',
            items: [
              { text: 'JS', link: '/skill/web/js/array' },
              { text: 'Vue2', link: '/skill/web/vue2/router/base' },
              { text: 'Vue3', link: '/skill/web/vue3/common' },
              { text: 'Css3', link: '/skill/web/css3/bem' },
              { text: '其他', link: '/skill/web/other/git/common' }
            ]
          },
          {
            text: '工具',
            items: [
              { text: 'VsCode', link: '/skill/tool/vscode/fun' },
              { text: 'Github/Gitee', link: '/skill/tool/warehouse/base' },
              { text: '装机必备', link: '/skill/tool/windows/base' }
            ]
          }
        ]
      },
      {
        text: '疑难杂症',
        link: '/problem/Vue2/base'
      },
      { text: '书籍', link: '/book/es6/intro' },
      { text: '面试', link: '/interview/' },
      {
        text: '关于我',
        items: [
          {
            text: '关于我',
            link: '/my/'
          }
          // { text: "时间痕迹", link: "/life/" },
        ]
      }
      // { text: "External", link: "https://google.com" },
    ],
    sidebar: {
      /**
       * vue3
       */
      '/skill/web/vue3': [
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
      ],

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
          children: [
            '/interview/other/reverse-interview',
            '/interview/other/short'
          ]
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
          children: [
            '/problem/js/base',
            '/problem/js/array',
            '/problem/js/object'
          ]
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
                '/problem/element-plus/components/el-tree'
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
  }
}
