const sidebar = require('./config/sidebar')
const nav = require('./config/nav')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  // 打包路径
  base: isDev ? '/' : '/cc/',
  // 标题
  title: '1cool',
  // 介绍
  description: '我做过最勇敢的一件事，就是喜欢你',
  // 喜欢的人是真的会发光啊
  // 你要幸福哦，如果开心的话，忘了我也没关系的
  // 我本可以容忍黑暗，如果我不曾见过太阳
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
    nav,
    sidebar
  }
}
