## 配置

统一在.vuepress -> config.js 中进行配置

统一导出一个对象
```js
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around'
}
```

### base
类型: string
默认值: /
部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 GitHub pages，如果你想将你的网站部署到 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/"，它的值应当总是以斜杠开始，并以斜杠结束。

base 将会作为前缀自动地插入到所有以 / 开始的其他选项的链接中，所以你只需要指定一次。

### title
类型: string
默认值: undefined
网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上。

### description
类型: string
默认值: undefined
网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中。

### theme