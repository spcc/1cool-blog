# 创建项目

部分摘自

- [这是一份保姆级 Vue3+Vite 实战教程](https://juejin.cn/post/7147353734912147470)

## 一. 初始化项目

### 1. 使用 vite 创建项目

```sh
# npm
npm create vite@latest

# yarn
yarn create vite

# pnpm
pnpm create vite
```

### 默认配置（默认安装: VueRouter 丶 Pinia 丶 ESLint 丶 Prettier）

```sh
✔ Project name（项目名）: project-vue3
✔ Add TypeScript（添加TS）? : No
✔ Add JSX Support（添加JSX支持）? : No
✔ Add Vue Router for Single Page Application development（添加Vue-router）? : Yes
✔ Add Pinia for state management（添加状态管理Pinia）? : Yes
✔ Add Vitest for Unit testing（为单元测试添加Vitest）? : No
✔ Add Cypress for both Unit and End-to-End testing（为单元测试与端到端测试添加Cypress）? : No
✔ Add ESLint for code quality（为代码质量添加ESLint）? : Yes
✔ Add Prettier for code formatting（为代码格式添加Prettier）? : Yes

Scaffolding project in ./tooldog...
Done.
```

## 二. 去除无用

### 1. 删除无用文件

删除 `src/views` 下所有文件
删除 `src/stores` 下所有文件
删除 `src/components` 下所有文件
删除 `src/assets` 下所有文件

### 2. 重构文件

1. 们在 `src/views` 文件夹下新建一个 `HomeView.vue` 文件，随便写点东西：

```vue
<script setup></script>

<template>
  <div>hello, This is test-vue3 home page!</div>
</template>

<style scoped></style>
```

2. 修改一下 `router/index.js` 路由文件，把之前删掉页面的路由干掉，加上 `HomeView` 页面的路由

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/views/HomePage.vue')
    }
  ]
})

export default router
```

3. 修改项目根组件 `src/App.vue` 的内容，把无用的删了，只留下面内容即可

```vue
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
```

4. 最后，项目入口文件里，有一行 css 样式的引入，引入的样式文件我们已经删了，所以，把这行代码删除掉

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 删除掉，css文件已经删除过了
// import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

ok，处理好之后我们就会得到一个很干净的项目了，如果你的步骤和我一致，目前的文件目录应该是下面这样的，我们简单介绍下它们的作用。

```sh
test-vue3
├─.vscode                # vscode配置文件
|    └─extensions.json   # 项目推荐插件列表（可把项目中用到的vscode插件ID写进去，跑项目时没有安装这些插件会推荐安装）
├─public/                # 公共资源目录
├─src/                   # 核心开发目录
|  ├─App.vue             # 项目根组件
|  ├─main.js             # 项目入口文件
|  ├─views/              # 项目视图目录
|  | └─Home/index.vue
|  ├─stores/             # 统一状态管理目录-pinia
|  ├─router/             # 项目路由目录
|  | └─index.js
|  ├─components/         # 项目公共组件目录
|  ├─assets/             # 项目静态资源目录
├─.eslintrc.cjs          # eslint 配置文件
├─.gitignore             # git忽略文件
├─.prettierrc.json       # prettier 配置文件
├─README.md              # 项目说明文件
├─index.html             # html入口文件
├─package.json           # 项目配置和包管理文件
├─vite.config.js         # vite 配置文件
```

## 三. 安装第三方插件 及 配置

### ElementPlus

[官网网址](https://element-plus.org/zh-CN/#/zh-CN)

#### 1. 安装

[安装地址](https://element-plus.org/zh-CN/guide/installation.html#%E4%BD%BF%E7%94%A8%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8)

使用包管理器

```sh
# npm
npm install element-plus --save

# Yarn
$ yarn add element-plus

# pnpm
$ pnpm install element-plus
```

#### 2. 使用

- [完整引入](https://element-plus.org/zh-CN/guide/quickstart.html#%E5%AE%8C%E6%95%B4%E5%BC%95%E5%85%A5)

::: details 点击查看代码

```js
// main.js
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

:::

- [按需引入](hhttps://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)

安装插件

```sh
npm install -D unplugin-vue-components unplugin-auto-import
```

然后把下列代码插入到你的 `Vite` 或 `Webpack` 的配置文件中

vite

```js
// vite.config.ts 新增以下内容
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
})
```

### 2. 配置项目内组件 & API 的自动引入

我们在使用 `Vue` 的过程中，每个 `script` 以及 `js` 文件中或多或少需要引入一些像 `ref`、`reactive` 等 `VueAPI`，包括 `VueRouter`、`Pinia` 等都要引入一些 `API`，还有我们自己写的组件也都需要我们手动去引入使用。

那既然配置了组件库自动引入，我们接下来也配置 API、以及页面组件的自动引入。

还是在 vite.config.js 文件中，依旧还是上面那 2 个插件，我们来写一下配置。

```js
// vite.config.ts 新增以下内容
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 需要去解析的文件
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      // imports 指定自动引入的包位置（名）
      imports: ['vue', 'pinia', 'vue-router'],
      // 生成相应的自动导入json文件。
      eslintrc: {
        // 启用
        enabled: true,
        // 生成自动导入json文件位置
        filepath: './.eslintrc-auto-import.json',
        // 全局属性值
        globalsPropValue: true
      },
      resolvers: [ArcoResolver()]
    }),
    Components({
      // imports 指定组件所在目录，默认为 src/components
      dirs: ['src/components/', 'src/view/'],
      // 需要去解析的文件
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ]
    })
  ]
})
```

如上，在 `API` 自动引入插件 `AutoImport` 中我们写了指定要去解析的文件 `include` 配置，然后在 `import` 选项中指定了自动引入的包名，并且所有自动引入的 `API` 在被自动引入时会添加记录到根目录的 `./.eslintrc-auto-import.json` 文件中，方便我们查看都自动引入了哪些东西，后面我们使用这几个包的 `API` ，就不需要手动引入了，插件会帮我们在文件解析时自动引入。

同样的，在组件自动引入插件 `Components` 中，我们配置了指定要去解析的文件 `include` 配置，然后在 `import` 选项中指定了自动引入的组件目录，以后只要是在这几个目录下写的组件，我们在使用时都必须要手动去引入了

ok，我们来试一下。

我们在 `src/components` 文件夹下新建一个 `HelloWorld.vue` 文件，写上下面内容。

```vue
<script setup>
const name = ref('isboyjc')
</script>
<template>
  <div>hello {{ name }}, this is helloworld components</div>
</template>

<style scoped></style>
```

然后，直接在 `src/views/HomePage.vue` 文件中使用 `HelloWorld` 组件，不要引入，如下：

```vue
<script setup>
const handleClickMini = () => {
  alert('hello, click mini ElButton!')
}
</script>
<template>
  <div>hello, This is toolsdog home page!</div>
  <el-space>
    <el-button type="primary" size="mini" @click="handleClickMini">
      Mini
    </el-button>
    <el-button type="primary" size="small">Small</el-button>
    <el-button type="primary">Medium</el-button>
    <el-button type="primary" size="large">Large</el-button>
  </el-space>

  <!-- 这里 -->
  <HelloWorld />
</template>
<style scoped lang="scss"></style>
```

上面我们在创建的 `HelloWorld` 组件中使用了 `Vue` 的 `ref API`，并没有引入它，而后在 `HomeView` 页面中使用该组件也没有引入，我们来跑一下项目。

nice！后面我们使用 `Vue`、`VueRouter`、`Pinia`、`ElementPlus` 包括自建组件等等都不需要手动引入了，当然，后续你的项目中有用到其他地方你依然可以在插件中去配置！

### VueUse

[VueUse](https://vueuse.org/) 没用过的话可以先把它理解为一个基于 Vue 的工具库，Vue2、Vue3 都可以用，有很多实用的方法、组件包括指令，超级方便，后续我们会用到其中的一些方法，所以先装上

#### 1. 安装

```sh
# npm
npm i @vueuse/core

# pnpm
pnpm add @vueuse/core
```

#### 2. 配置自动引入

`VueUse` 不止有方法，还有组件和指令，所以我们还是需要上面两个自动引入的插件去处理，那由于作者是一个人，解析器都内置在自动引入插件中了，所以我们直接导出用就可以了。

我们配置 `VueUse` 的组件和指令自动引入需要两个解析器，还是在 `vite.config.js` 配置文件中引入，如下：

```js
// ArcoVue、VueUse 组件和指令的自动引入解析器
import {
  ArcoResolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers'
```

使用的话，只需要在配置文件 `plugins` 模块中之前写过的` Component`s 插件中使用一下这两个解析器就好了：

```js
plugins: [
  Components({
    // ...
    VueUseComponentsResolver(),
    VueUseDirectiveResolver()
  })
]
```

那 `API` 方法的自动引入就很简单了，还是配置文件中只需要在之前用过的 `AutoImport` 插件中添加一个 `VueUse` 包名配置就行了：

```js
plugins: [
  AutoImport({
    // 新增 '@vueuse/core'
    imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
    resolvers: [ArcoResolver()]
  })
]
```

这样我们就可以在项目中随时随地的使用 `VueUse` 了！建议大家有时间可以去看看 `VueUse` 的源码实现，也并不复杂，它有很多最佳实践，可以给我们使用 `Vue3` 提供很大的帮助！

### 配置 ESLint 和 Prettier

那上面我们配置了自动引入，但是大家会发现，由于之前我们给项目安装了 ESLint 和 Prettier ，虽然还没有进行配置，但是默认配置会给那些自动引入的 API 报红(报错 ref 之类的未定义哇，之类的)

根目录下的 `.eslintrc.cjs` 是 ESLint 配置，当前默认如下

```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
```

根目录下的 `.prettierrc.json` 是 Prettier 配置，当前默认如下

```json
{}
```

#### 1. Eslint

那报红这种检测肯定是 `ESLint` 干的， 还记得我们自动引入配置的那个导出文件吗？我们所有自动引入的 `API` 都生成了记录在这个文件，你只需要将它写入 `ESLint` 配置的 `extends` 中让 `Lint` 工具识别下就好了，如下

```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    // 这里
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
```

注意，`extends` 这个继承配置的是一个数组，最终会将所有规则项进行合并，出现冲突的时候，后面的会覆盖前面的，我们在初始化项目安装时默认给加上去了 3 个，我们看看这三个是什么？

- plugin:vue/vue3-essential
  - `ESLint Vue3` 插件扩展
- eslint:recommended
  - `ESLint` 官方扩展
- @vue/eslint-config-prettier
  - `Prettier NPM` 扩展

#### 2. Eslint 全局参数

下来要使用 Vue3 的 `CompositionAPI`，那 Vue3 有几个可以直接在 `<script setup>`  中可用的全局 API，比如 `defineProps`、`defineEmits`、`defineExpose`，如果你使用 TS，还会用到 `withDefaults` 。

那我们的 `ESLint` 默认是识别不了这些全局 `API` 的，此时需要向 `ESlint` 规则中添加需要辨认的全局变量。

那 ESLint 配置中的 `globals` 属性就是让项目在 `lint` 执行期间访问额外的全局变量，简单说就是开发者自定义的全局变量，我们依次加上这些属性就可以了。

```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  // 新增
  globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['warn', 'never'], // 禁止尾部使用分号
    'no-debugger': 'warn' // 禁止出现 debugger
  }
}
```

如上，添加全局属性时，`readonly` 代表只读，`writable` 代表可写，可写就是可以手动覆盖这个全局变量的意思，我们当然是不允许覆盖了，所以全部都设置成了 `readonly`。

可能我们也都发现了，我们新增了一个 `rules` 属性，如单词字面意思，就是规则的配置，可以配置启用一些规则及其各自的错误级别，那由于每个人的喜好不同，所以我没有过多配置，只配置了 2 个。

`rules` 的规则配置有三种：

- `off 或 0` 关闭对该规则的校验
- `warn 或 1` 启用规则，不满足时抛出警告，不会退出编译进程
- `error 或 2` 启用规则，不满足时抛出错误，会退出编译进程

注意，如果某项规则，有额外的选项，可以通过数组进行传递，数组的第一位必须是错误级别，就比如我们配置的 `semi` 规则中的 `never` 就是额外配置项。

#### 3. 配置完了 ESLint ，我们再来看 Prettier，我这边配置了几个常用的，如下

```sh
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 80,
  "trailingComma": "none",
  "arrowParens": "avoid",
  "tabWidth": 2
}
```

- semi 代码结尾是否加分号
- singleQuote 是否使用单引号
- printWidth 超过多少字符强制换行
- trailingComma 代码末尾不需要逗号
- arrowParens 单个参数的箭头函数不加括号 x => x
- tabWidth 使用 n 个空格缩进

`Prettier` 配置就比较简单，按照文档和喜好在 `.prettierrc.json` 文件中配置就可以，注意配置的时候一定要和 `ESLint` 的 `rules` 比较一下，这里是会发生冲突的地方，检测和格式化规则一定要一致。

### Styles 公共样式管理、初始化样式

#### 公共样式处理

`src` 目录下新增一个 `styles` 文件夹，此文件夹我们后期可以放一些公共的样式文件。

大家都知道，`HTML` 标签是有默认样式的，一般我们在写项目时都会直接清除掉这个默认样式，也就是做个重置。

那相较于 [Eric Merer](https://meyerweb.com/eric/tools/css/reset/) 原版的清楚样式文件，`Normalize.css` 它在默认的 `HTML` 元素样式上提供了跨浏览器的高度一致性，是一种现代的、为 `HTML5` 准备的优质替代方案，所以我们直接使用它就好了。

下载 [Normalize.css](https://necolas.github.io/normalize.css/latest/normalize.css) 到 `styles` 文件夹下，当然你也可以直接 `npm` 安装它，不过我比较喜欢直接下载下来这个文件。

下载下来之后直接在 `main.js` 最上面引入一下就行了，如下

其他的公共 `css` 文件我们用到的时候也可以这样引入一下就可以了。

### Utils、Hooks、API 管理

在项目 `src` 目录下添加一个 `utils` 文件夹，此文件夹用于存放我们项目中用到的一些公共方法文件。

在项目 `src` 目录下添加一个 `hooks` 文件夹，此文件夹用于存放我们项目中用到的一些 `hooks` 文件，因为我们用 `Vue3` 的 `CompsitionAPI`，后面用多了自然会有很多 `hooks` 文件，针对一些公用的，我们统一管理在此文件夹下

平常我们做项目，一般和请求相关的文件都统一放在一个文件夹下，所以我们在项目 src 目录下添加一个 api 文件夹，用于存放和请求相关的文件，因为项目性质，所以我们应该暂时用不到请求后端接口，那这边 api 文件的一些配置以及 axios 的封装甚至 API Mock 配置这里都先不展开说了，回头我会写好这块代码提交到 GitHub ，后面有需要的话会写一篇 axios 封装相关的文章来单独介绍这块。

### 其他 Vite 配置

先来说环境的配置，先放个官方文档压压惊

- [Vite env 配置文档](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)

OK，我们在 `env` 目录下新建下面 3 个文件

- `.env` 所有模式下都会加载
- `.env.development` 只在开发模式下加载
- `.env.production` 只在生产模式下加载

`.env` 文件在所有模式下都会加载，所以这里我们可以写一些所有环境都通用的环境变量，如下：

```sh
# 所有环境都会加载

# 项目标识代码
VITE_APP_CODE="TOOLSDOG"

# 项目名
VITE_APP_NAME="工具狗"

# 项目描述
VITE_APP_DESCRIPTION="你用的到的工具，这里都有！"
```

注意，我们在 `Vite` 中配置的环境变量默认只有以 `VITE_` 开头的配置，才会暴露给客户端，我们才能在项目中获取到。

开发模式 `.env.development` 配置

```sh
# 开发环境加载

# 环境标识
VITE_APP_ENV="development"

# 公共基础路径
VITE_BASE="/"

# 代理URL路径
VITE_BASE_URL ="/api"

# 模拟数据接口路径
VITE_BASE_MOCK_URL ="/mock-api"

# 服务端接口路径
VITE_BASE_SERVER_URL = "..."

# 打包是否使用Mock
VITE_APP_PRODMOCK=false
```

那生产环境除了环境标识 `VITE_APP_ENV` 和开发模式标识不同，其他配置项应尽量保持一致，只是配置项的内容不同而已，不一一的展示了。

接下来修改下 `package.json` 脚本命令如下

```json
{
  "scripts": {
    "serve": "vite --mode development",
    "build": "vite build --mode production",
    "preview": "vite preview --port 8081",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore"
  }
}
```

上面脚本中我们给启动命令搞成了

在 `dev` 脚本命令配置中，我们还传了一个 `mode`，其实这个 `mode` 就是对应我们的环境文件 `.env.[mode]`

开发环境默认 `mode` 就是 `development`，生产环境默认 `mode` 就是 `development`，所以脚本命令这里我不传 `mode` 也可以，但是如果大家把开发环境文件由 `.env.development` 改成 `.env.dev`，那脚本中 `mode` 就得传 `—-mode dev`，`build` 时也是一样的道理，如果有其他环境，那脚本命令传入对应的 `mode` 就可以了。

如果想要在 `vite.config.js` 文件中获取对应运行 `mode` 环境变量的配置，我们可以使用 `vite` 的 [loadEnv API](https://cn.vitejs.dev/guide/api-javascript.html#loadenv)。

`Vite` 的 `defineConfig` 方法也可以接收一个返回配置对象的回调函数，回调函数的参数里我们可以拿到运行脚本命令时传入的 `mode` 值，从而使用 `loadEnv` 方法去在 `Vite` 配置文件中获取对应 `mode` 下的环境变量，如下：

```js
// export default defineConfig({}) 修改

export default defineConfig(({ mode }) => {
  return {}
})
```

那其他一些基础配置就不一一说明了，大家可以直接看 [Vite 官方文档](https://cn.vitejs.dev/)

### 添加 Config 配置

上面说了，环境变量默认以 `VITE_` 开头的配置，才会暴露给客户端，我们也写了几个` VITE_` 开头的配置，所以在项目运行时，我们可以直接 `import.meta.env.VITE_XXX` 去查看配置，但是这样太麻烦了，所以我们写一个统一的配置文件去获取环境变量，包括项目后期的一些全局配置也可以写里面

项目 `src` 目录下新建 `config/config.js` 文件，写入下面文件：

```js
/*
 * @LastEditors: isboyjc
 * @Description: 全局config配置文件
 * @Date: 2022-09-17 14:35:02
 * @LastEditTime: 2022-09-17 14:35:02
 * @Author: isboyjc
 */

// 获取环境变量
const ENV = import.meta.env
// 配置文件
let config = {}
// 默认配置文件
const configSource = {
  appCode: ENV.VITE_APP_CODE,
  // 项目标识代码
  projectCode: `${ENV.VITE_APP_CODE}_${ENV.VITE_APP_ENV}`,
  // 项目名
  projectName: ENV.VITE_APP_NAME,
  // 项目描述
  projectDesc: ENV.VITE_APP_DESCRIPTION,
  // 资源base地址
  base: ENV.VITE_BASE,
  // 接口代理URL路径
  baseUrl: ENV.VITE_BASE_URL,
  // 模拟数据接口路径
  mockBaseUrl: ENV.VITE_BASE_MOCK_URL,
  // 服务端接口路径
  serverUrl: ENV.VITE_BASE_SERVER_URL
}

/**
 * @Author isboyjc
 * @Date 2022-09-17 14:35:02
 * @description 设置全局配置
 * @param {Object} cfg 配置项
 * @return {Object} 新的全局配置 config
 */
const setConfig = cfg => {
  config = Object.assign(config, cfg)
  return config
}

/**
 * @Author isboyjc
 * @Date 2022-09-17 14:35:02
 * @description 重置全局配置
 * @param {*}
 * @return {Object} 全局默认配置 configSource
 */
const resetConfig = () => {
  config = { ...configSource }
  return config
}
resetConfig()

/**
 * @Author isboyjc
 * @Date 2022-09-17 14:35:02
 * @description 获取全局配置
 * @param {String} key 配置项，支持 'a.b.c' 的方式获取
 * @return {Object} 新的全局配置 config
 */
const getConfig = key => {
  if (typeof key === 'string') {
    const arr = key.split('.')
    if (arr && arr.length) {
      let data = config
      arr.forEach(v => {
        if (data && typeof data[v] !== 'undefined') {
          data = data[v]
        } else {
          data = null
        }
      })
      return data
    }
  }
  if (Array.isArray(key)) {
    const data = config
    if (key && key.length > 1) {
      let res = {}
      key.forEach(v => {
        if (data && typeof data[v] !== 'undefined') {
          res[v] = data[v]
        } else {
          res[v] = null
        }
      })
      return res
    }
    return data[key]
  }
  return { ...config }
}

export { getConfig, setConfig, resetConfig }
```

上面代码不复杂，所以不过多解释了，介绍下为什么用这种方式，而不是直接写一个对象导出，其实是因为有次写项目有用到了动态修改全局配置的需求，所以就把全局配置项获取写成动态的了。

我们写入配置时，只需要在 `configSource` 对象中写入就可以了，项目中使用起来的话如下：

```js
import { getConfig, setConfig, resetConfig } from "@/config/config.js"

// 获取配置
getConfig("a")
getConfig("a.b")
getConfig("a.b.c")

// 动态设置
setConfig({ ... })

// 重置配置
resetConfig()
```

### 配置 VSCode 推荐扩展插件

打开项目根目录的 `.vscode/extensions.json` 文件如下：

```js
{
  "recommendations": [
    "vue.volar",
  ]
}
```

这是创建项目时默认存在的扩展插件推荐配置，此文件的作用上面也介绍过了，就是个扩展推荐，数组里是 `VSCode` 的扩展插件 `ID`，你在根目录打开此项目时，如果编辑器没有安装这两个插件，`VSCode` 就会在右下角自动提示你去安装插件。

### Mock

项目开发阶段通常会使用 mock 数据。插件 [vite-plugin-mock](https://www.npmjs.com/package/vite-plugin-mock) 同时提供了开发环境和生产环境下的数据 mock 服务，简单好用。

#### 1. 安装

插件依赖于 mockjs，需要一并安装：

```sh
npm add -D vite-plugin-mock mockjs
```

#### 2. 配置

在 `vite.config.js` 配置文件启用插件。

**Mock 服务通常只用于开发阶段**，因此我们需要在配置文件中判断当前所处环境。

在 webpack 中通常会配置一个 `NODE_ENV` 的环境变量。而在 Vite 中，不用开发者进行设置，它提供了一种方便的判断开发环境和生产环境的方式，如下：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
​
export default defineConfig((config) => {
  const { command } = config
  return {
    plugins: [
      vue(),
      viteMockServe({
        // 只在开发阶段开启 mock 服务
        localEnabled: command === 'serve'
      })
    ]
  }
})
```

上面，配置文件导出一个立即执行的 `defineConfig` 函数。它又接收一个函数作为参数，该函数接收一个 `config` 参数，它包含一个 `command 属性`。当在命令行中执行 `vite` （开发）命令时， `command` 的值为 `serve`，当执行 `vite build` （构建）命令时，对应的值为 `build`。据此，可以识别所处环境。

插件 `vite-plugin-mock` 有一个配置项 `localEnabled`，可以决定是否开启 `mock` 服务。默认即为开启状态。结合 `command` 属性，就可以动态的切换 `mock` 服务的状态了。

#### 3. 编写 mock server

该插件开箱即用。默认它会读取项目根目录下 `mock` 文件下的内容，作为 mock server。

新建一个模拟用户接口的服务，它导出一个数组，数组里每一项用来模拟一个接口：

```js
// /mock/user.js
​
export default [
  // 用户登录
  {
    // 请求地址
    url: "/api/user/login",
    // 请求方法
    method: "post",
    // 响应数据
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          token: "Token",
          username: "昆吾kw"
        }
      }
    }
  }
]
```

插件内部使用了 [Connect](https://github.com/senchalabs/connect) 来提供接口服务，它是一个比 `Express` 更悠久的 Node HTTP 框架。上面的写法就相当于创建了一个这样的接口服务：

```js
app.post('/api/user/login', (req, res) => {
  res.send({
    code: 0,
    message: 'success',
    data: {
      token: 'Token',
      username: '昆吾kw'
    }
  })
})
```

由于开启了 `mock` 服务，当前端在发出 `ajax` 请求时，会被拦截到，交由 `mock` 服务处理。没有做数据校验，前端传任何数据来都返回上面的结果。
