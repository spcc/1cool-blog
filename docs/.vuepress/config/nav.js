const nav = [
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
]

module.exports = nav