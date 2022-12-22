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

### 2.3 VsCode 扩展

为了开发人员保持同一个环境，保证代码风格一模一样，避免差异性

1. 推荐扩展安装
2. 常用配置同步

---

根目录的 **.vscode/extensions.json** 文件如下：

:::details 点击查看代码

```sh
{
  "recommendations": [
    "vue.volar",
  ]
}
```

:::

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
|  ├─ mixin.scss         # mixin
|  ├─ normalize.scss     # html元素样式重置
|  ├─ reset.scss         # normalize不支持的样式重置
|  ├─ sidebar.scss       # 侧边栏
|  ├─ index.scss         # 样式统一导出接口
```

1. 样式重置

`HTML` 标签是有默认样式的，一般在写项目时都会直接清除掉这个默认样式，也就是做个重置。

那相较于 [Eric Merer](https://meyerweb.com/eric/tools/css/reset/) 原版的清除样式文件，`Normalize.css` 它在默认的 `HTML` 元素样式上提供了跨浏览器的高度一致性，是一种现代的、为 `HTML5` 准备的优质替代方案，所以我们直接使用它就好了。

下载 [Normalize.css](https://necolas.github.io/normalize.css/latest/normalize.css) 到 `styles` 文件夹下，当然你也可以直接 `npm` 安装它，不过我比较喜欢直接下载下来这个文件。

2. normalize 不支持的样式重置

也需要一份[Normalize.css](https://necolas.github.io/normalize.css/latest/normalize.css)不支持的一部分样式重置，放到`style/reset.scss`

:::details 点击查看代码

```scss
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
  font-size: 14px;
}
```

:::

3. index.scss 中统一引入

:::details 点击查看代码

```scss
// 重置
@import './normalize.scss';
@import './reset.scss';

@import './variables.scss';
@import './transition.scss';
@import './mixin.scss';
@import './sidebar.scss';
```

:::

4. main.js 引入

```js
import '@/styles/index.scss'
```

### 3.2 Utils、Hooks、API 管理

```sh
├─ src/
|  ├─ api                # 公共请求相关
|  ├─ utils              # 公共方法文件
|  ├─ hooks              # 公共hooks
```

## 4. Vite 内部配置

### 4.1 自动引入（组件 和 API）

使用 `vue`过程中，每个 `script` 或者 `js` 都会引入（很麻烦）

- 一些像 `ref`、`reactive` 等 **VueAPI**
- `VueRouter`、`Pinia` 等都要引入一些 API
- 自己写的组件也都需要我们手动去引入使用

#### 4.11) 安装插件

:::details 点击查看代码

示例安装版本:  
unplugin-auto-import: 0.12.1  
unplugin-vue-components: 0.22.12

```sh
npm install -D unplugin-vue-components unplugin-auto-import
```

:::

#### 4.12) 在 `vite.config.js` 文件中新增以下内容

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

### 4.2 环境变量配置

- [Vite env 配置文档](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)

#### 4.21) 新建以下目录

```sh
├─ .env                  # 所有模式都会加载
├─ .env.development      # 只在开发模式下加载
├─ .env.production       # 只在生产模式下加载
```

#### 4.22) 设置内容

:::warning 注意

在 **Vite** 中配置的环境变量默认只有以 `VITE_` 开头的配置，才会暴露给客户端，才能在项目中获取到。
:::

1. **.env** 文件在所有模式下都会加载，所以这里可以写一些所有环境都通用的环境变量，如下：

:::details 点击查看代码

```sh
# 端口
VITE_PORT = 3100

# 项目标题
VITE_TITLE = QDesign Admin

# 项目简称
VITE_SHORT_NAME = qdesign_admin
```

:::

2. **.env.development** 开发模式配置

:::details 点击查看代码

```sh
# 环境标识
VITE_ENV = development

# 是否开启 mock
VITE_USE_MOCK = true

# 公共基础路径
VITE_BASE = /

# 代理URL路径
VITE_BASE_URL = /api


# 跨域代理，可以配置多个
# 注意：不能存在空格!!!
# VITE_PROXY = [["/basic-api","http://localhost:3000"],["/upload","http://localhost:3300/upload"]]
# VITE_PROXY= [["/api","https://vvbin.cn/test"]]
```

:::

3. **.env.production** 生产模式配置

生产环境除了环境标识 `VITE_ENV` 和开发模式标识不同，其他配置项应尽量保持一致，只是配置项的内容不同而已，不一一的展示了。

:::details 点击查看代码

```sh
# 环境标识
VITE_ENV = production

# 是否开启 mock
VITE_USE_MOCK = true

# 公共基础路径
VITE_BASE = /

# 代理URL路径
VITE_BASE_URL = /basic-api
```

:::

#### 4.24) 配置 package.json 启动模式

:::details 点击查看代码

```json
{
  "scripts": {
    "dev": "vite --mode development",
    "build": "vite build --mode production",
    "preview": "vite preview --port 8081"
  }
}
```

:::

- 在 **dev** 脚本命令配置中，传入 **mode**，其实这个 **mode** 就是对应的环境文件 **.env.[mode]**
- 开发环境默认 **mode** 就是 **development**，生产环境默认 **mode** 就是 **development**
  - 所以脚本命令这里不传 **mode** 也可以
  - 如果把开发环境文件由 **.env.development** 改成 **.env.dev**，那脚本中 **mode** 就得传 **—-mode dev**，**build** 时也是一样的道理。
  - 如果有其他环境，那脚本命令传入对应的 **mode** 就可以了。

---

如果想要在 **vite.config.js** 文件中获取对应运行 **mode** 环境变量的配置，可以使用 **vite** 的 [loadEnv API](https://cn.vitejs.dev/guide/api-javascript.html#loadenv)。

**Vite** 的 **defineConfig** 方法可以接收一个返回配置对象的回调函数，回调函数的参数里可以拿到运行脚本命令时传入的 **mode** 值，从而使用 **loadEnv** 方法去在 **Vite** 配置文件中获取对应 **mode** 下的环境变量，如下：

:::details 点击查看代码

```js
// export default defineConfig({}) 修改

export default defineConfig(({ mode }) => {
  return {}
})
```

:::

那其他一些基础配置就不一一说明了，查看 [Vite 官方文档](https://cn.vitejs.dev/)

#### 4.25 使用

:::details 点击查看代码

```js
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})
```

:::

### 4.3 环境变量动态配置

::: danger 警告
未作整理，请谨慎粘贴复制
:::

::: details 点击查看代码
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

:::

## 5. 第三方插件安装

### 5.1 Sass

:::details 点击查看代码

示例安装版本：1.57.0

```sh
npm install sass -D
```

:::

### 5.2 Element Plus

- [官方网址](https://element-plus.org/zh-CN/#/zh-CN)

#### 5.21) [安装](https://element-plus.org/zh-CN/guide/installation.html#%E4%BD%BF%E7%94%A8%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8)

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

#### 5.22) 使用

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

### 5.3 VueUse

[VueUse](https://vueuse.org/) 没用过的话可以先把它理解为一个基于 Vue 的工具库，Vue2、Vue3 都可以用，有很多实用的方法、组件包括指令，超级方便，后续我们会用到其中的一些方法，所以先装上

#### 5.31) 安装

:::details 点击查看代码

```sh
# npm
npm i @vueuse/core

# pnpm
pnpm add @vueuse/core
```

:::

#### 5.32) 配置自动引入

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

### 5.4 Mock

项目开发阶段通常会使用 **mock** 数据。插件 [vite-plugin-mock](https://www.npmjs.com/package/vite-plugin-mock) 同时提供了开发环境和生产环境下的数据 mock 服务，简单好用。

#### 5.41) 安装

插件依赖于 **mockjs**，需要一并安装：

:::details 点击查看代码

示例安装版本:  
mockjs: 1.1.0  
vite-plugin-mock: 2.9.6

```sh
npm add -D vite-plugin-mock mockjs
```

:::

#### 5.42) 配置

根据情况任选一种即可

- 根据 env 配置是否开启 mock
- 根据环境（开发环境/生产环境）配置是否开启 mock

##### 5.421 根据 env 文件配置是否开启 mock

在 **vite.config.js** 配置文件启用插件。

:::details 点击查看代码

```js
import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(mode => {
  return {
    plugins: [
      viteMockServe({
        // 只在开发阶段开启 mock 服务
        localEnabled: loadEnv(mode, process.cwd()).VITE_USE_MOCK
      })
    ]
  }
})
```

:::

解决 `eslint 报错`: 'process' is not defined.

在 `eslintrc.cjs`

:::details 点击查看代码

```js
module.exports = {
  globals: {
    process: true
  }
}
```

:::

##### 5.422 根据开发环境和生产环境 配置是否开启 mock

在 **vite.config.js** 配置文件启用插件。

**Mock 服务通常只用于开发阶段**，因此我们需要在配置文件中判断当前所处环境。

在 webpack 中通常会配置一个 `NODE_ENV` 的环境变量。而在 Vite 中，不用开发者进行设置，它提供了一种方便的判断开发环境和生产环境的方式，如下：

:::details 点击查看代码

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

:::

上面，配置文件导出一个立即执行的 `defineConfig` 函数。它又接收一个函数作为参数，该函数接收一个 `config` 参数，它包含一个 `command 属性`。当在命令行中执行 `vite` （开发）命令时， `command` 的值为 `serve`，当执行 `vite build` （构建）命令时，对应的值为 `build`。据此，可以识别所处环境。

插件 `vite-plugin-mock` 有一个配置项 `localEnabled`，可以决定是否开启 `mock` 服务。默认即为开启状态。结合 `command` 属性，就可以动态的切换 `mock` 服务的状态了。

#### 5.43) 编写 mock server

该插件开箱即用。默认它会读取项目根目录下 `mock` 文件下的内容，作为 mock server。

在根目录新建一个模拟用户接口的服务，它导出一个数组，数组里每一项用来模拟一个接口：

:::details 点击查看代码

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

:::

插件内部使用了 [Connect](https://github.com/senchalabs/connect) 来提供接口服务，它是一个比 `Express` 更悠久的 Node HTTP 框架。上面的写法就相当于创建了一个这样的接口服务：

:::details 点击查看代码

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

:::

由于开启了 `mock` 服务，当前端在发出 `ajax` 请求时，会被拦截到，交由 `mock` 服务处理。没有做数据校验，前端传任何数据来都返回上面的结果。

:::details 点击查看代码

```js
const result = await axios.post('/api/user/login', userData)
```

:::
