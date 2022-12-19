const sidebar = require('./config/index.js')
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
    sidebar
  }
}
