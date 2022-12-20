# 项目初始化

## 1. 初始化项目

- [官方：Vite 搭建项目](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

### 1.1 使用 vite 创建项目

::: details 点击查看代码

```sh
# npm
npm create vite@latest

# yarn
yarn create vite

# pnpm
pnpm create vite
```

:::

选择配置（默认安装: VueRouter 丶 Pinia 丶 ESLint 丶 Prettier）

::: details 点击查看代码

```sh
✔ Project name（项目名）: project-vue3
? Select a framework: » - Use arrow-keys. Return to submit.
  Vanilla
  > Vue
    React
    Preact
    Lit
    Svelte
    Others
? Select a variant: » - Use arrow-keys. Return to submit.
    JavaScript
    TypeScript
  > Customize with create-vue ↗
    Nuxt ↗
✔ Add TypeScript ?（添加TS） : No
✔ Add JSX Support ?（添加JSX支持） : No
✔ Add Vue Router for Single Page Application development ?（添加Vue-router） : Yes
✔ Add Pinia for state management ?（添加状态管理Pinia） : Yes
✔ Add Vitest for Unit testing（为单元测试添加Vitest）? : No
✔ Add an End-to-End Testing Solution ?（添加端到端测试解决方案 No / Cypress / Playwright） : No
✔ Add ESLint for code quality（为代码质量添加ESLint）? : Yes
✔ Add Prettier for code formatting（为代码格式添加Prettier）? : Yes

Scaffolding project in ./tooldog...
Done.
```

:::

### 1.2 重构无用内容

#### 1.21) 删除无用文件

1. 删除 `views` 下所有文件
2. 删除 `stores` 下所有文件
3. 删除 `components` 下所有文件
4. 删除 `assets` 下所有文件

#### 1.22) 重构内容

1. 在 `views` 文件夹下新建 `dashboard/analysis/index.vue` 文件：

::: details 点击查看代码

```vue
<template>
  <div>分析页</div>
</template>
```

:::

2. 修改 `router/index.js` 路由文件（把删掉页面的路由干掉，加上 `HomeView.vue` 页面路由）

:::details 点击查看代码

```js
import { createRouter, createWebHistory } from 'vue-router'

// 公共路由表
const publicRoutes = [
  {
    path: '/',
    name: 'analysis',
    component: () => import('@/views/dashboard/analysis/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRoutes
})

export default router
```

:::

3. 修改项目根组件 `App.vue` 的内容（把无用的删了，只留下面内容即可）

:::details 点击查看代码

```vue
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>
```

:::

4. 在 `main.js` 删除示例样式

:::details 点击查看代码

```js
// 删除掉，css文件已经删除过了
import './assets/main.css'
```

:::

ok，处理好之后我们就会得到一个很干净的项目了，如果你的步骤和我一致，目前的文件目录应该是下面这样的，我们简单介绍下它们的作用。

:::details 点击查看代码

```sh
test-vue3
├─.vscode                # vscode配置文件
|    └─extensions.json   # 项目推荐插件列表（可把项目中用到的vscode插件ID写进去，跑项目时没有安装这些插件会推荐安装）
├─public/                # 公共资源目录
├─src/                   # 核心开发目录
|  ├─App.vue             # 项目根组件
|  ├─main.js             # 项目入口文件
|  ├─views/              # 项目视图目录
|  | └─dashboard/analysis/index.vue
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

:::

## 2. 格式化配置

:::danger 注意
配置完如果还是报错，请关闭重启 vscode
:::

项目初始化的时候安装了 `ESLint` 和 `Prettier`，默认配置会给那些自动引入的 `API` 报红(报错 `ref` 之类的未定义之类的)

- 根目录下的 `.eslintrc.cjs` 是 `ESLint` 配置，当前默认如下

:::details 点击查看代码

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

:::

- 根目录下的 `.prettierrc.json` 是 `Prettier` 配置，当前默认如下

```json
{}
```

### 2.1 Eslint 配置

#### 2.11) 自动引入 API/组件 报错配置

报红检测是 **ESLint** 干的。自动引入配置的导出文件，所有自动引入的 `API` 都生成了记录在这个文件，只需要将它写入 `ESLint` 配置的 `extends` 中让 `Lint` 工具识别下就好了，如下

::: warning 注意：

`extends` 这个继承配置的是一个数组，最终会将所有规则项进行合并，出现冲突的时候，后面的会覆盖前面的，我们在初始化项目安装时默认给加上去了 3 个，这三个是什么？

- plugin:vue/vue3-essential
  - `ESLint Vue3` 插件扩展
- eslint:recommended
  - `ESLint` 官方扩展
- @vue/eslint-config-prettier
  - `Prettier NPM` 扩展

:::

在 `根目录/.eslintrc.cjs`

:::details 点击查看代码

```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    // 新增
    './.eslintrc-auto-import.json',
    // 新增结束
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
```

:::

#### 2.12) 全局参数 API 识别

比如 `defineProps`、`defineEmits`、`defineExpose`，如果你使用 **TS**，还会用到 `withDefaults`  
**ESLint** 默认是识别不了这些全局 **API** 的，此时需要向 **ESlint** 规则中添加需要辨认的全局变量  
**ESLint** 配置中的 **globals** 属性就是让项目在 **lint** 执行期间访问额外的全局变量，简单说就是开发者自定义的全局变量，我们依次加上这些属性就可以了。

:::details 点击查看代码

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
  // 新增结束
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // 新增开始
  rules: {
    semi: ['warn', 'never'], // 禁止尾部使用分号
    'no-debugger': 'warn' // 禁止出现 debugger
  }
  // 新增结束
}
```

:::

如上，添加全局属性时，`readonly` 代表只读，`writable` 代表可写，可写就是可以手动覆盖这个全局变量的意思。所以不允许覆盖，全部都设置成了 `readonly`。

这里新增了一个 `rules` 属性，如单词字面意思，就是规则的配置，可以配置启用一些规则及其各自的错误级别，那由于每个人的喜好不同，只配置了 2 个。

`rules` 的规则配置有三种：

- `off 或 0` 关闭对该规则的校验
- `warn 或 1` 启用规则，不满足时抛出警告，不会退出编译进程
- `error 或 2` 启用规则，不满足时抛出错误，会退出编译进程

注意，如果某项规则，有额外的选项，可以通过数组进行传递，数组的第一位必须是错误级别，就比如我们配置的 `semi` 规则中的 `never` 就是额外配置项。

### 2.2 Prettier

:::details 点击查看代码

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 80,
  "trailingComma": "none",
  "arrowParens": "avoid",
  "tabWidth": 2
}
```

:::

- semi 代码结尾是否加分号
- singleQuote 是否使用单引号
- printWidth 超过多少字符强制换行
- trailingComma 代码末尾不需要逗号
- arrowParens 单个参数的箭头函数不加括号 x => x
- tabWidth 使用 n 个空格缩进

`Prettier` 配置比较简单，按照文档和喜好在 `.prettierrc.json` 文件中配置即可，注意配置的时候一定要和 `ESLint` 的 `rules` 比较一下，这里是会发生冲突的地方，检测和格式化规则一定要一致。

## 3. 架构配置

### 3.1 公共样式管理、初始化样式

#### 3.11 安装 sass

:::details 点击查看代码

示例安装版本：1.57.0

```sh
npm install sass -D
```

:::

#### 3.12 公共样式处理

根据下面创建文件，存放公共样式

```sh
├─ styles/               # 样式
|  ├─ element-plus       # 重置element样式
|  ├─ └─ el-xxx.scss
|  ├─ variables.scss     # 变量
|  ├─ transition.scss    # 动效
|  ├─ reset.scss         # 重置
|  ├─ normalize.scss     # 初始化
|  ├─ sidebar.scss       # 侧边栏
|  ├─ mixin.scss         # mixin
|  ├─ index.scss         # 样式统一导出接口
```

## 3. Vite 内部配置

### 3.1 自动引入（组件 和 API）

使用 `vue`过程中，每个 `script` 或者 `js` 都会引入（很麻烦）

- 一些像 `ref`、`reactive` 等 **VueAPI**
- `VueRouter`、`Pinia` 等都要引入一些 API
- 自己写的组件也都需要我们手动去引入使用

#### 3.11) 安装插件

:::details 点击查看代码

示例安装版本:  
unplugin-auto-import: 0.12.1  
unplugin-vue-components: 0.22.12

```sh
npm install -D unplugin-vue-components unplugin-auto-import
```

:::

#### 3.12) 在 `vite.config.js` 文件中新增以下内容

:::details 点击查看代码

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
      dirs: ['src/components/', 'src/views/'],
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

:::

---

**解释：**

如上，在 `API` 自动引入插件 `AutoImport` 中我们写了指定要去解析的文件 `include` 配置，然后在 `import` 选项中指定了自动引入的包名，并且所有自动引入的 `API` 在被自动引入时会添加记录到根目录的 `./.eslintrc-auto-import.json` 文件中，方便我们查看都自动引入了哪些东西，后面我们使用这几个包的 `API` ，就不需要手动引入了，插件会帮我们在文件解析时自动引入。

同样的，在组件自动引入插件 `Components` 中，我们配置了指定要去解析的文件 `include` 配置，然后在 `import` 选项中指定了自动引入的组件目录，以后只要是在这几个目录下写的组件，在使用时都不必须要手动去引入了

**例子：**

我们在 `src/components` 文件夹下新建一个 `HelloWorld.vue` 文件，写上下面内容。

:::details 点击查看代码

```vue
<script setup>
const name = ref('宝贝')
</script>
<template>
  <div>hello {{ name }}, this is 子组件 components</div>
</template>
```

:::

然后，直接在 `src/views/dashboard/analysis/index.vue` 文件中使用 `HelloWorld` 组件，不要引入，如下：

:::details 点击查看代码

```vue
<script setup>
const handleClickSmall = () => {
  alert('hello, click mini ElButton!')
}
</script>
<template>
  <el-space>
    <el-button type="primary" size="small" @click="handleClickSmall"
      >Small</el-button
    >
    <el-button type="primary">Medium</el-button>
    <el-button type="primary" size="large">Large</el-button>
  </el-space>

  <!-- 子组件，不需要import组件 -->
  <HelloWorld />
</template>
```

:::

上面创建的 `HelloWorld` 组件中使用了 `Vue` 的 `ref API`，并没有引入它，而后在 `HomeView` 页面中使用该组件也没有引入，后面使用 `Vue`、`VueRouter`、`Pinia`， 包括自建组件等等都不需要手动引入了，当然，后续你的项目中有用到其他地方你依然可以在插件中去配置！

## 4. 第三方插件安装

### 4.1 Element Plus

- [官方网址](https://element-plus.org/zh-CN/#/zh-CN)

#### 4.11) [安装](https://element-plus.org/zh-CN/guide/installation.html#%E4%BD%BF%E7%94%A8%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8)

使用包管理器

:::details 点击查看代码

示例安装版本: 2.2.27

```sh
# npm
npm install element-plus --save

# Yarn
$ yarn add element-plus

# pnpm
$ pnpm install element-plus
```

:::

#### 4.12) 使用

1. [完整引入](https://element-plus.org/zh-CN/guide/quickstart.html#%E5%AE%8C%E6%95%B4%E5%BC%95%E5%85%A5)

:::details 点击查看代码

```js
// main.js
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

:::

2. [按需引入](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)

安装插件

:::details 点击查看代码

示例安装版本:  
unplugin-auto-import: 0.12.1  
unplugin-vue-components: 0.22.12

```sh
npm install -D unplugin-vue-components unplugin-auto-import
```

:::

`vite.config.js` 新增以下内容

:::details 点击查看代码

```js
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

:::

### 4.2 VueUse

[VueUse](https://vueuse.org/) 没用过的话可以先把它理解为一个基于 Vue 的工具库，Vue2、Vue3 都可以用，有很多实用的方法、组件包括指令，超级方便，后续我们会用到其中的一些方法，所以先装上

#### 4.21) 安装

:::details 点击查看代码

```sh
# npm
npm i @vueuse/core

# pnpm
pnpm add @vueuse/core
```

:::

#### 4.22) 配置自动引入

`VueUse` 不止有方法，还有组件和指令，所以我们还是需要上面两个自动引入的插件去处理，那由于作者是一个人，解析器都内置在自动引入插件中了，所以我们直接导出用就可以了。

我们配置 `VueUse` 的组件和指令自动引入需要两个解析器，还是在 `vite.config.js` 配置文件中引入，如下：

:::details 点击查看代码

```js
// ArcoVue、VueUse 组件和指令的自动引入解析器
import {
  ArcoResolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers'
```

:::

使用的话，只需要在配置文件 `plugins` 模块中之前写过的` Component`s 插件中使用一下这两个解析器就好了：

:::details 点击查看代码

```js
plugins: [
  Components({
    // ...
    VueUseComponentsResolver(),
    VueUseDirectiveResolver()
  })
]
```

:::

那 `API` 方法的自动引入就很简单了，还是配置文件中只需要在之前用过的 `AutoImport` 插件中添加一个 `VueUse` 包名配置就行了：

:::details 点击查看代码

```js
plugins: [
  AutoImport({
    // 新增 '@vueuse/core'
    imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
    resolvers: [ArcoResolver()]
  })
]
```

:::

这样我们就可以在项目中随时随地的使用 `VueUse` 了！建议大家有时间可以去看看 `VueUse` 的源码实现，也并不复杂，它有很多最佳实践，可以给我们使用 `Vue3` 提供很大的帮助！
