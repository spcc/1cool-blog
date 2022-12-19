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

#### 1.22) 重构文件

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

```js
// 删除掉，css文件已经删除过了
import './assets/main.css'
```

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
