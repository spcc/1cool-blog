module.exports = {
  // 打包路径
  base: "",
  // 标题
  title: "1cool",
  // 介绍
  description: "- . -",
  // 主题
  theme: "@qingui/v1",
  // 主题配置
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      {
        text: "知识点",
        items: [
          {
            text: "技术",
            items: [
              { text: "JS", link: "/skill/web/js/math" }
            ],
          },
          {
            text: "工具",
            items: [{ text: "Git", link: "/skill/tool/git/common" }],
          },
        ],
      },
      {
        text: "疑难杂症",
        items: [{ text: "element-ui", link: "/problem/element-ui/components/" }],
      },
      { text: "书籍", link: "/book/web-es6/1" },
      { text: "External", link: "https://google.com" },
    ],
    sidebar: {
      "/skill/web/js": [
        {
          title: "JS", // 必要的
          path: "/skill/web/js/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: ["/skill/web/js/math"],
        },
      ],
      "/skill/tool/git": [
        {
          title: "Git", // 必要的
          path: "/skill/tool/git/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: ["/skill/tool/git/common"],
        },
      ],
      "/problem/element-ui": [
        {
          title: "组件", // 必要的
          path: "/problem/element-ui/components", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: ["/problem/element-ui/components/el-table"],
        }
      ],
      "/book/": [
        {
          title: "/book/web-es6/", // 必要的
          path: "/book/web-es6/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: ["/book/web-es6/1", "/book/web-es6/2"],
        },
      ],
    },
  },
};
