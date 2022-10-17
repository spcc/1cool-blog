module.exports = {
  // 打包路径
  base: "/1cool/",
  // 标题
  title: "1cool",
  // 介绍
  description: "- . -",
  // 主题
  theme: "@qingui/v1",
  plugins: ["@vuepress/back-to-top"],
  // 主题配置
  themeConfig: {
    lastUpdated: "最后更新时间",
    nav: [
      { text: "首页", link: "/" },
      { text: "常用链接", link: "/link" },
      {
        text: "知识点",
        items: [
          {
            text: "技术",
            items: [
              { text: "JS", link: "/skill/web/js/array" },
              { text: "Vue2", link: "/skill/web/vue2/router/base" },
              { text: "Vue3", link: "/skill/web/vue3/common" },
              { text: "Css3", link: "/skill/web/css3/bem" },
              { text: "http", link: "/skill/web/http/base" },
            ],
          },
          {
            text: "工具",
            items: [
              { text: "Git", link: "/skill/tool/git/common" },
              { text: "VsCode", link: "/skill/tool/vscode/fun" },
              { text: "Github/Gitee", link: "/skill/tool/warehouse/base" },
              { text: "装机必备", link: "/skill/tool/windows/base" },
            ],
          },
        ],
      },
      {
        text: "疑难杂症",
        link: "/problem/Vue2/base",
      },
      { text: "书籍", link: "/book/web-es6/1" },
      { text: "面试", link: "/interview/" },
      {
        text: "关于我",
        items: [
          {
            text: "关于我",
            link: "/my/",
          },
          { text: "时间痕迹", link: "/life/" },
        ],
      },
      // { text: "External", link: "https://google.com" },
    ],
    sidebar: {
      /**
       * vue2
       */
      "/skill/web/vue2": [
        {
          title: "路由", // 必要的
          path: "/skill/web/vue2/router/base", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        },
      ],

      /**
       * vue3
       */
      "/skill/web/vue3": [
        {
          title: "vue3", // 必要的
          path: "/skill/web/vue3/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: [
            {
              title: "知识点分析",
              collapsable: false,
              sidebarDepth: 0,
              // path: "/skill/web/vue3/game",
              children: ["/skill/web/vue3/faq/base", "/skill/web/vue3/faq/faq"],
            },
            {
              title: "语法",
              collapsable: false,
              sidebarDepth: 0,
              // path: "/skill/web/vue3/game",
              children: ["/skill/web/vue3/api/base"],
            },
            {
              title: "其他",
              collapsable: false,
              sidebarDepth: 0,
              // path: "/skill/web/vue3/game",
              children: ["/skill/web/vue3/common"],
            },
          ],
        },
        {
          title: "实战搭建", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: [
            {
              title: "搭建",
              collapsable: false,
              sidebarDepth: 0,
              // path: "/skill/web/vue3/game",
              children: ["/skill/web/vue3/game/base"],
            },
            {
              title: "配置",
              collapsable: false,
              sidebarDepth: 0,
              path: "/problem/element-ui/components",
              children: ["/problem/element-ui/components/el-table"],
            },
          ],
        },
        {
          title: "其他", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: ["/skill/web/vue3/other/package"],
        },
      ],

      /**
       * CSS3
       */
      "/skill/web/css3": [
        {
          title: "基础",
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          path: "/skill/web/css3/bem",
        },
        {
          title: "动效", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: [
            {
              title: "有用",
              collapsable: false,
              sidebarDepth: 0,
              // path: "/skill/web/vue3/game",
              children: ["/skill/web/vue3/game/base"],
            },
            {
              title: "无用",
              collapsable: false,
              sidebarDepth: 0,
              children: ["/skill/web/css3/move/bg"],
            },
          ],
        },
      ],

      /**
       * VSCODE
       */
      "/skill/tool/vscode": [
        {
          title: "快捷键", // 必要的
          path: "/skill/tool/vscode/key", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        },
        {
          title: "娱乐类", // 必要的
          path: "/skill/tool/vscode/fun", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        },
      ],

      /**
       * 时间痕迹
       */
      "/life/": [
        {
          title: "心情", // 必要的
          path: "/life/mood/2022-8/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: ["/life/mood/2022-8", "/life/mood/2022-9"],
        },
        {
          title: "看过", // 必要的
          path: "/life/read/2022/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: ["/life/read/2022", "/life/read/2023"],
        },
      ],

      "/skill/web/js": [
        {
          title: "JS", // 必要的
          path: "/skill/web/js/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: [
            "/skill/web/js/base",
            "/skill/web/js/array",
            "/skill/web/js/string",
            "/skill/web/js/math",
          ],
        },
        {
          title: "代码整洁", // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: ["/skill/web/js/clean"],
        },
      ],
      "/interview": [
        {
          title: "面试", // 必要的
          path: "/interview/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: ["/interview/reverse-interview"],
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

      /**
       * 疑难杂症
       */
      "/problem/": [
        {
          title: "Vue2", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: [
            "/problem/vue2/base",
            "/problem/vue2/npm",
            "/problem/vue2/config",
            "/problem/vue2/experience",
            "/problem/vue2/other",
          ],
        },
        {
          title: "JS", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: [
            "/problem/js/base",
            "/problem/js/array",
            "/problem/js/object",
          ],
        },
        {
          title: "ElementUI", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: [
            {
              title: "组件",
              collapsable: false,
              sidebarDepth: 0,
              path: "/problem/element-ui/components",
              children: [
                "/problem/element-ui/components/el-table",
                "/problem/element-ui/components/el-tree",
                "/problem/element-ui/components/el-tooltip",
                "/problem/element-ui/components/el-dropdown",
              ],
            },
          ],
        },
        {
          title: "Css", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: ["/problem/css/base"],
        },
        {
          title: "Html", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: ["/problem/html/base"],
        },
      ],

      // "/problem/element-ui": [
      //   {
      //     title: "组件", // 必要的
      //     path: "/problem/element-ui/components", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      //     collapsable: false, // 可选的, 默认值是 true,
      //     sidebarDepth: 0, // 可选的, 默认值是 1
      //     children: ["/problem/element-ui/components/el-table"],
      //   },
      // ],
      "/book/": [
        {
          title: "ES6 标准入门",
          path: "/book/es6/",
          collapsable: false,
          sidebarDepth: 0,
          children: ["/book/es6/intro"],
        },
        {
          title: "从 0 到 1 落地前端工程化", // 必要的
          path: "/book/web-engineering/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 0, // 可选的, 默认值是 1
          children: [
            "/book/web-engineering/introduction",
            "/book/web-engineering/2",
          ],
        },
      ],
    },
  },
};
