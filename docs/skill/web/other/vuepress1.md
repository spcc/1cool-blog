# Vuepress1

## 插件

### 鼠标点击文字弹浮消失

1. 在`.vuepress\public\js` 文件夹下创建 `MouseClickEffect.js`

::: details 点击查看代码

```js
var a_idx = 0;

function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
jQuery(document).ready(function ($) {
  $("body").click(function (e) {
    var a = new Array(
      "❤",
      "球球",
      "努力",
      "加油",
      "奋斗",
      "拼搏",
      "勇闯",
      "热爱",
      "变强",
      "要cool",
      "必须",
      "不死"
    );
    var $i = $("<span/>").text(a[a_idx]);
    a_idx = (a_idx + 1) % a.length;
    var x = e.pageX,
      y = e.pageY;
    $i.css({
      "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
      top: y - 20,
      left: x,
      position: "absolute",
      "font-weight": "bold",
      color: `rgb(${getRandom(255, 0)},${getRandom(255, 0)},${getRandom(
        255,
        0
      )})`,
      "user-select": "none",
      cursor: "default",
    });
    $("body").append($i);
    $i.animate(
      {
        top: y - 180,
        opacity: 0,
      },
      1500,
      function () {
        $i.remove();
      }
    );
  });
});
```

:::

2. 在主题配置文件 `config.js` 下的 `head` 引入以上 `js`，这里的 `jquery` 必须引入，鼠标点击代码才能生效

::: details 点击查看代码

```js
head: [
  [
    "script",
    {
      language: "javascript",
      type: "text/javascript",
      src: "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js",
    },
  ],
  // 引入鼠标点击脚本
  [
    "script",
    {
      language: "javascript",
      type: "text/javascript",
      src: "/js/MouseClickEffect.js",
    },
  ],
],
```

:::

### 趣味标题插件

主要在标签栏当时选中和离开页面时会有变化

1. 安装

```sh
npm i vuepress-plugin-dynamic-title -D
```

2. 注册

```js
module.exports = {
  plugins: [
    [
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "燕子没有你我怎么活啊",
        hideIcon: "/failure.ico",
        hideText: "1cool",
        recoverTime: 2000,
      },
    ],
  ],
};
```

## 评论插件 Valine

请先登录或注册 [LeanCloud (opens new window)](https://www.leancloud.cn/), 进入控制台后点击左下角创建应用：

```js
themeConfig: {
  valineConfig: {
    appId: '...',// your appId
    appKey: '...', // your appKey
  }
}
```

## 评论插件 Vssue

```js
themeConfig: {
  vssueConfig: {
    platform: 'github',
    owner: 'OWNER_OF_REPO',
    repo: 'NAME_OF_REPO',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
  }
}
```

#### options 详解：

- title: 在这里设置当前页面的 `Issue` 标题
- platform: 支持的代码托管平台
- owner: 对应 `repository` 的拥有者帐号或者团队
- repo: 用来存储评论的 `repository`
- clientId: `OAuth App` 的 `client id`
- clientSecret: `OAuth App` 的 `client secret`（只有在使用某些平台时需要）
