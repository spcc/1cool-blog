# 常用包

## 状态管理

### Pinia

[Github](https://github.com/vuejs/pinia)

Pinia 是最新一代的 Vue 轻量级状态管理库。它适用于 Vue 2.x 和 Vue 3.x。它是 Vue 官方成员在 2019 年 11 月重新设计的一个状态存储库，它允许你跨组件/页面共享状态，并且是响应式的，类似于 Vuex。

### vuex-persist

[Github](https://github.com/championswimmer/vuex-persist)

vuex-persistedstate 是一个支持 Typescript 的 Vuex 插件，使你能够将应用程序的状态保存到持久存储中，例如 Cookies 或 localStorage。

## 工具函数

### lodash

老牌工具函数库，虽然里面有一部分功能已经变成了 js 标准，但是为了兼容性，还是用一下比较好，比如我常用的 clonedeep 和 get

### day.js

极其轻量化的日期格式库，显示日期，转换日期的时候很有用

### clipboard.js

浏览器中操作剪贴板的库

### axios-retry

axios 自动重试

### await-to-js

处理 async await 的错误

### number-precision

使用 javascript 精确地执行加法、减法、乘法和除法运算[文档](https://www.npmjs.com/package/number-precision)

```js
import NP from 'number-precision' // plus(+) minus(-) times(*) divide(/) round

NP.plus(1.111, 2.222)
```

### accounting

accounting.js 是一个用于数字、货币和货币解析/格式化的小型 JavaScript 库。它是轻量级的，完全可本地化的，没有依赖关系，并且在客户端或服务器端工作得很好

```js
import account from 'accounting' // 小数处理

accounting.formatMoney(12345678) // $12,345,678.00
```

### countUp.js

CountUp.js 是一个无依赖的轻量级 JavaScript 类，可用于快速创建以更有趣的方式显示数字数据的动画。[文档](http://inorganik.github.io/countUp.js/)

```js
import { CountUp } from 'countup.js'

let demo = new CountUp('myTargetElement', 6964)
if (!demo.error) {
  demo.start()
} else {
  console.error(demo.error)
}
```

## 表单

### VeeValidate

[Github](https://github.com/logaretm/vee-validate)

vee-validate 是 Vue.js 的表单验证库，它允许验证输入并以熟悉的声明式样式或使用组合函数构建更好的表单 UI。

### vue-form-making

[Github](https://github.com/GavinZhuLei/vue-form-making)

vue-form-making 是一个基于 vue 和 element-ui 实现的可视化表单设计器，使用了最新的前端技术栈，内置了 i18n 国际化解决方案，可以让表单开发简单而高效。

### FormKit

[Github](https://github.com/formkit/formkit)

FormKit 是一个面向 Vue 开发人员的表单创作框架，它使构建高质量的生产就绪表单的速度提高了 10 倍。

## 测试

### Vitest

[Github](https://github.com/vitest-dev/vitest)

Vitest 是一个由 Vite 提供支持的极速单元测试框架。其和 Vite 的配置、转换器、解析器和插件保持一致，具有开箱即用的 TypeScript / JSX 支持。

### Jest

[Github](https://github.com/facebook/jest)

Jest 是一个全面的 JavaScript 测试解决方案，专注于简洁明快。适用于大多数 JavaScript 项目。

### Mocha

[Github](https://github.com/mochajs/mocha)

mocha 是一个功能丰富的 javascript 测试框架，运行在 node.js 和浏览器中，使异步测试变得简单有趣。Mocha 测试连续运行，允许灵活和准确的报告，同时将未捕获的异常映射到正确的测试用例。

## 可视化

### Vue ChartJS

vue-chartjs 是一个 Vue 对于 Chart.js 的封装，让用户可以在 Vue 中轻松使用 Chart.js，很简单的创建可复用的图表组件，非常适合需要简单的图表并尽可能快地运行的人。 vue-chartjs 抽象了基本逻辑，同时也暴露了 Chart.js 对象，让用户获得最大的灵活性。它支持 Vue 3 和 Vue 2。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d3bf5be768e4389ad0ff84ea9128a9a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/apertureles…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fapertureless%2Fvue-chartjs 'https://github.com/apertureless/vue-chartjs')

### Apache ECharts

Apache ECharts 是一款基于 Javascript 的数据可视化图表库，提供直观，生动，可交互，可个性化定制的数据可视化图表。它是用纯 JavaScript 编写的，基于 zrender，是一个全新的轻量级画布库。!

**GitHub：**[github.com/apache/echa…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fapache%2Fecharts 'https://github.com/apache/echarts')

### Vue-ECharts

Vue-ECharts 是 Apache ECharts 的 Vue.js 组件。使用 Apache ECharts 5，同时支持 Vue.js 2/3。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d12c98dc6ef4dd79a28f907ecfd5d89~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/ecomfe/vue-…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fecomfe%2Fvue-echarts 'https://github.com/ecomfe/vue-echarts')

## 组件

### Vue Grid Layout

vue-grid-layout 是一个网格布局系统，类似于 Gridster，用于 Vue.js。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae46003276ca4fd28e837d70087989d0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/jbaysolutio…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fjbaysolutions%2Fvue-grid-layout 'https://github.com/jbaysolutions/vue-grid-layout')

### Vue Draggable

Vue Draggable 是一个基于 Sortable.js 的 Vue 拖拽组件。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cedb45e6520f42bb92ea0b3fcf401607~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/SortableJS/…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FSortableJS%2FVue.Draggable 'https://github.com/SortableJS/Vue.Draggable')

### Vue Tour

Vue Tour 是一个轻量级、简单且可定制的导览插件，可与 Vue.js 一起使用。它提供了一种快速简便的方法来指导用户完成你的应用程序。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98f9f21473684eafb540ca6a02d6be80~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/pulsardev/v…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fpulsardev%2Fvue-tour 'https://github.com/pulsardev/vue-tour')

### Swiper.js

Swiper 是一款免费以及轻量级的移动设备触控滑块的框架，使用硬件加速过渡。主要使用与移动端的网站、网页应用程序，以及原生的应用程序。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07f45f96b87547c3b9c752b14a308709~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/nolimits4we…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fnolimits4web%2Fswiper 'https://github.com/nolimits4web/swiper')

### vue-easytable

该库提供了一个功能齐全且高度可定制的表格组件/数据网格。它支持许多功能，如虚拟滚动、列固定、标题固定、标题分组、过滤器、排序、单元格省略号、行扩展、行复选框等。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/163d0429cf1b45bb8c64099e7646affd~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/Happy-Codin…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FHappy-Coding-Clans%2Fvue-easytable 'https://github.com/Happy-Coding-Clans/vue-easytable')

## 动画

### Animate.css

animate.css 是一个使用 CSS3 的 animation 制作的动画效果的 CSS 集合，里面预设了很多种常用的动画，且使用非常简单。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2da46148ef2948dab70cf2a3047cbf98~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**GitHub：**[github.com/animate-css…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fanimate-css%2Fanimate.css 'https://github.com/animate-css/animate.css')

### Greensock

GreenSock 是一个 JavaScript 动画库，可轻松对 HTML 元素进行动画处理。 用于创建高性能，零依赖性，跨浏览器动画，声称在超过 400 万个网站中使用。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d650a7daf5544b40896b3ad2bb3ae54d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/greensock/G…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fgreensock%2FGreenSock-JS%2F 'https://github.com/greensock/GreenSock-JS/')

### Popmotion

Popmotion 是一个只有 12KB 的 JavaScript 运动引擎，可以用来实现动画，物理效果和输入跟踪。原生的 DOM 支持：CSS，SVG，SVG 路径和 DOM 属性的支持，开箱即用。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea919a4b500b4b97ac28ef61cff940c3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/Popmotion/p…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FPopmotion%2Fpopmotion 'https://github.com/Popmotion/popmotion')

### Vue Kinesis

Vue Kinesis 支持使用 Vue.js 轻松创建复杂的交互式动画，其支持 Vue 3。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5252b340751c4f629ebe7d0651e69d98~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/Aminerman/v…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FAminerman%2Fvue-kinesis 'https://github.com/Aminerman/vue-kinesis')

## 图标

### IconPark

IconPark 提供超过 2400 个高质量图标，还提供了每个图标的含义和来源的描述，便于开发者使用。除此之外，该网站还可以自定义图标，这是与其他图标网站与众不同的地方。该图标库是字节跳动旗下的技术驱动图标样式的开源图标库。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42dc68aa59bf4694af406f378d0db419~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/bytedance/i…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fbytedance%2Ficonpark 'https://github.com/bytedance/iconpark')

### Font Awesome

Font Awesome 提供了可缩放的矢量图标，可以使用 CSS 所提供的所有特性对它们进行更改，包括：大小、颜色、阴影或者其它任何支持的效果。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fee1aaabfbf4f0daf4ae5aa15c11fc5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/FortAwesome…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FFortAwesome%2FFont-Awesome 'https://github.com/FortAwesome/Font-Awesome')

### Ionicons

Ionicons 是一个完全开源的图标集，是知名混合开发框架 Ionic Framework 内置的图标库，包含 1300 个设计优雅、风格统一的高质量图标，能满足大多数的业务场景。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5216addff6014225b6058364c87862b3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/ionic-team/…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fionic-team%2Fionicons 'https://github.com/ionic-team/ionicons')

### Bootstrap Icons

Bootstrap Icons 是 Bootstrap 开源的 SVG 图标库，此图标库起初专门针对其组件（从表单控件到导航）和文档进行定制设计和构建，现在可以免费用于任何项目。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89bee69d3d8043d8940513abd585fd37~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/twbs/icons](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftwbs%2Ficons 'https://github.com/twbs/icons')

## 富文本编辑器

### Tiptap

Tiptap 是一个基于 Vue 的无渲染的富文本编辑器，它基于 Prosemirror，完全可扩展且无渲染。可以轻松地将自定义节点添加为 Vue 组件。使用无渲染组件（函数式组件），几乎完全控制标记和样式。菜单的外观或在 DOM 中的显示位置。这完全取决于使用者。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22eb5824b1d244f6a298966fbfcf0c9f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**GitHub：**[github.com/ueberdosis/…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fueberdosis%2Ftiptap 'https://github.com/ueberdosis/tiptap')

### Quill.js

Quill.js 是一个具有跨平台和跨浏览器支持的富文本编辑器。凭借其可扩展架构和富有表现力的 API，可以完全自定义它以满足个性化的需求。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/208498fab3fa4d82844158f51e55ce63~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**GitHub：**[github.com/quilljs/qui…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fquilljs%2Fquill%2F 'https://github.com/quilljs/quill/')

### TinyMCE

TinyMCE 是一个热门的富文本编辑器。它的目标是帮助其他开发人员构建精美的 Web 内容解决方案。它易于集成，可以部署在基于云的、自托管或混合环境中。该设置使得合并诸如 Angular、React 和 Vue 等框架成为可能。它还可以使用 50 多个插件进行扩展，每个插件都有 100 多个自定义选项。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80a39cb6c63d4934b53e7c4857007b20~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**GitHub：**[github.com/tinymce/tin…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftinymce%2Ftinymce 'https://github.com/tinymce/tinymce')

### **CKEditor 5**

CKEditor 是一个强大的富文本编辑器框架，具有模块化架构、现代集成和协作编辑等功能。它可以通过基于插件的架构进行扩展，从而可以将必要的内容处理功能引入。它是在 ES6 中从头开始编写的，并且具有出色的 webpack 支持。可以使用与 Angular、React 和 Vue.js 的原生集成。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb2111358f434427973ce9556efa606e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**GitHub：**[github.com/ckeditor/ck…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fckeditor%2Fckeditor5 'https://github.com/ckeditor/ckeditor5')

## 服务端渲染

### Nuxt.js

Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI 渲染。它预设了利用 Vue.js 开发服务端渲染的应用所需要的各种配置。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/935fca25761c4c9da8a93b888bae44bf~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/nuxt/nuxt.j…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fnuxt%2Fnuxt.js 'https://github.com/nuxt/nuxt.js')

### SSR

ssr 框架是为前端框架在服务端渲染的场景下所打造的开箱即用的服务端渲染框架。面向 Serverless，同时支持 React，Vue2，Vue3。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2841eb69e9e4b5c9850297e3501d08f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/zhangyuang/…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fzhangyuang%2Fssr 'https://github.com/zhangyuang/ssr')

### Vue-meta

Vue-meta 是 Vue.js 的一个插件，它可以帮助你使用 SSR 支持管理 Vue.js 组件中的 HTML 元数据。Vue-meta 使用 Vue 的内置响应性使管理应用程序的元数据变得简单。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07b18d838e624984ac35b77ad510e096~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[vue-meta.nuxtjs.org/](https://link.juejin.cn?target=https%3A%2F%2Fvue-meta.nuxtjs.org%2F 'https://vue-meta.nuxtjs.org/')

## 数据获取

### （1）Axios

Axios 是一个基于 promise 的网络请求库，作用于 node.js 和浏览器中。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/717d14616c7e4d6a8c5cde2c3c361585~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/axios/axios](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Faxios%2Faxios 'https://github.com/axios/axios')

### vue-axios

vue-axios 是一个将 axios 集成到 Vuejs 的小型库。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d334c2455344b84a868450156b10a92~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/imcvampire/…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fimcvampire%2Fvue-axios 'https://github.com/imcvampire/vue-axios')

## 构建工具

### Vite

Vite 是下一代前端开发与构建工具。 Vite 意在提供开箱即用的配置，同时它的插件 API 和 JavaScript API 带来了高度的可扩展性，并有完整的类型支持。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3546030d10545a99487195c8d3a91c8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/vitejs/vite](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite 'https://github.com/vitejs/vite')

### Webpack

webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个依赖图(dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1c9adace8bf4d72896a7aa448ecc1a7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**Github：**[github.com/webpack/web…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Fwebpack 'https://github.com/webpack/webpack')
