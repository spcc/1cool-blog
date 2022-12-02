# Layout 架构解决方案

核心解决方案

1. 用户退出方案
2. 动态侧边栏方案
3. 动态面包屑方案

小功能

1. 退出的通用逻辑封装
2. 伸缩侧边栏动画
3. vue3 动画
4. 组件状态驱动的 css 值

## 1. 创建 Layout 基础架构

1. 新建

- layout/components/sidebar/index.vue
- layout/components/Navbar.vue
- layout/components/AppMain.vue

2. 引入，并完成对应的布局结构

```vue
<script setup>
import Sidebar from '@/layout/components/sidebar/index.vue'
import Navbar from '@/layout/components/Navbar.vue'
import AppMain from '@/layout/components/AppMain.vue'
</script>

<template>
  <div class="app-wrapper">
    <!-- 左侧 menu -->
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 navbar -->
        <Navbar />
      </div>
      <!-- 内容区 -->
      <AppMain />
    </div>
  </div>
</template>
```

3. 在 styles 中创建如何 css 文件

- variables.scss: 定义常量
- mixin.scss: 定义通用的 css
- sidebar.scss: 处理 menu 菜单的样式

4. 为 variables.scss, 定义如何变量并进行导出（:export 可见 scss 与 js 共享变量）

```scss
// sidebar
$menuText: #bfcbd9;
$menuActiveText: #ffffff;
$subMenuActiveText: #f4f4f5;

$menuBg: #304156;
$menuHover: #263445;

$subMenuBg: #1f2d3d;
$subMenuHover: #001528;

$sideBarWidth: 210px;
$hideSideBarWidth: 54px;
$sideBarDuration: 0.28s;

// https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass
// JS 与 scss 共享变量，在 scss 中通过 :export 进行导出，在 js 中可通过 ESM 进行导入
:export {
  menuText: $menuText;
  menuActiveText: $menuActiveText;
  subMenuActiveText: $subMenuActiveText;
  menuBg: $menuBg;
  menuHover: $menuHover;
  subMenuBg: $subMenuBg;
  subMenuHover: $subMenuHover;
  sideBarWidth: $sideBarWidth;
}
```

5. 为 mixin.scss 定义如下样式

```scss
@mixin clearfix {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

@mixin scrollBar {
  &::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }
}

@mixin relative {
  position: relative;
  width: 100%;
  height: 100%;
}
```

6. 为 sidebar.scss 定义如下样式

```scss
#app {
  .main-container {
    min-height: 100%;
    transition: margin-left #{$sideBarDuration};
    margin-left: $sideBarWidth;
    position: relative;
  }

  .sidebar-container {
    transition: width #{$sideBarDuration};
    width: $sideBarWidth !important;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;

    // 重置 element-plus 的css
    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out,
        0s padding-right ease-in-out;
    }

    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .el-scrollbar__bar.is-vertical {
      right: 0px;
    }

    .el-scrollbar {
      height: 100%;
    }

    &.has-logo {
      .el-scrollbar {
        height: calc(100% - 50px);
      }
    }

    .is-horizontal {
      display: none;
    }

    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }

    .svg-icon {
      margin-right: 16px;
    }

    .sub-el-icon {
      margin-right: 12px;
      margin-left: -2px;
    }

    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
    }

    .is-active > .el-submenu__title {
      color: $subMenuActiveText !important;
    }

    & .nest-menu .el-submenu > .el-submenu__title,
    & .el-submenu .el-menu-item {
      min-width: $sideBarWidth !important;
    }
  }

  .hideSidebar {
    .sidebar-container {
      width: 54px !important;
    }

    .main-container {
      margin-left: 54px;
    }

    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;

        .svg-icon {
          margin-left: 20px;
        }

        .sub-el-icon {
          margin-left: 19px;
        }
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0 !important;

        .svg-icon {
          margin-left: 20px;
        }

        .sub-el-icon {
          margin-left: 19px;
        }

        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }

    .el-menu--collapse {
      .el-submenu {
        & > .el-submenu__title {
          & > span {
            height: 0;
            width: 0;
            overflow: hidden;
            visibility: hidden;
            display: inline-block;
          }
        }
      }
    }
  }

  .el-menu--collapse .el-menu .el-submenu {
    min-width: $sideBarWidth !important;
  }

  .withoutAnimation {
    .main-container,
    .sidebar-container {
      transition: none;
    }
  }
}

.el-menu--vertical {
  & > .el-menu {
    .svg-icon {
      margin-right: 16px;
    }
    .sub-el-icon {
      margin-right: 12px;
      margin-left: -2px;
    }
  }

  // 菜单项过长时
  > .el-menu--popup {
    max-height: 100vh;
    overflow-y: auto;

    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }
  }
}
```

7. 在 index.scss 中安顺序导入以上样式文件

```scss
@import './variables.scss';
@import './mixin.scss';
@import './sidebar.scss';
```

8. 在 layout/LayoutView 中写入如下样式

```scss
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>

```

9. 因为将来要实现**主题更换**,所以 sidebar 赋值动态的颜色

LayoutMain.vue

```vue
<script>
// vite 不行是一个字符串
import variables from '@/styles/variables.scss'
console.log(variables)
</script>

<template>
  <!-- 左侧menu -->
  <Sidebar :style="{ backgroundColor: variables.menuBg }" />
</template>
```

10. 初始化组件内容

AppMain.vue

```vue
<template>
  <div class="app-main">appmain</div>
</template>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
```

Navbar.vue

```vue
<template>
  <div>navbar</div>
</template>
```

sidebar/index.vue

```vue
<template>
  <div class="page">sidebar</div>
</template>
e
```

## 2. navbar 头像菜单功能

- 获取并展示用户信息
- element-plus 中的 dropdown 使用
- 退出登录的方案实现

### 获取并展示用户信息

- 定义接口请求方法
- 定义调用接口的动作
- 在权限拦截时触发操作

1. 定义接口请求方法

api/sys.js

```js
/**
 * 获取用户信息
 * return promise
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/login',
    methods: 'get'
  })
}
```

因为很多接口都要携带 token，所以利用 axios 的**请求拦截器**进行统一注入

在 utils/request.js 中写入以下代码

```js
import useUserStore from '@/stores/user'

// 请求拦截器
service.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    // 在这里统一注入token
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
```

2. 定义调用接口的动作

store/user.js

```js
import { getUserInfo } from '@/api/sys'

const useUserStore = defineStore('user', {
  persist: {
    key: 'USER',
    storage: localStorage,
    paths: ['userInfo']
  },
  state: () => ({
    userInfo: {}
  }),
  actions: {
    // 获取用户信息
    async getUserInfo() {
      const res = await getUserInfo()
      // action 中修改状态
      this.userInfo = res
    }
  }
})
```

3. 在权限拦截时添加

```js
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 1. 用户已登录，则不允许进入login
  if (userStore.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在，如果不存在，则获取用户信息
      const hasUserInfo = JSON.stringify(userStore.userInfo) !== '{}'
      if (!hasUserInfo) {
        userStore.getUserInfo()
      }
      next()
    }
  }
})
```

### 渲染用户头像菜单

用到 element-plus 两个组件

- Avatar
- Dropdown

1. 在 `layout/components/navbar.js` 中实现以下代码

```vue
<script setup>
import useUserStore from '@/stores/user'
const userStore = useUserStore()
</script>

<template>
  <div class="navbar">
    <div class="right-menu">
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="userStore.userInfo.avatar"
          ></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>用户信息</el-dropdown-item>
            </a>
            <el-dropdown-item divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
```

### 退出登录方案实现

**退出登录**一直是一个通用的前端实现方案，对于退出登录而言，它的触发时机一般有两种

- 用户主动退出登录
  - 用户点击退出按钮
- 用户被动退出登录
  - token 过期或被其他人顶下来

无论是什么退出方式，在用户退出时，所需要执行的操作是固定的

1. 清掉当前用户缓存数据
2. 清掉权限相关配置
3. 返回登录页

#### 用户主动退出的对应策略

在 store/user.js 中，添加对应的 action

```js
const useUserStore = defineStore('user', {
  persist: {
    key: 'USER',
    storage: localStorage,
    paths: ['token', 'userInfo']
  },
  state: () => ({
    token: '',
    userInfo: {}
  }),
  actions: {
    // 退出登录
    logout() {
      this.token = ''
      this.userInfo = {}
      // TODO：是因为重置token和userInfo方法不太对，需查询pinia-plugin-persistedstate 插件清除方法
      setTimeout(() => window.localStorage.clear(), 0)
      // TODO: 清理掉权限相关配置
      router.push('/login')
    }
  }
})

export default useUserStore
```

在 navbar.vue 组件中使用

```vue
<script setup>
import useUserStore from '@/stores/user'
const userStore = useUserStore()

const handleLogout = () => {
  userStore.logout()
}
</script>

<template>
  <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
  </div>
</template>
```

#### 用户被动退出

场景

- token 失效
- 单点登录：其他人登录账号被顶下来

处理方案

- 主动处理：主要应对 token 失效
  - 动态 token/可变 token（第一次请求是 1，第二次请求是 2）
  - 刷新 token（token 过期的时候，通过另一个接口刷新 token）
  - 时效 token（token 有一个有效期，超过重新登录）
- 被动处理：同时应对 token 失效与**单点登录**
  - token 过期（服务端生成 token 超过服务端指定时效）
  - 单点登录（同一账户尽可以在一个设备中保持在线状态）

##### 主动处理 - 时效 token

服务端处理 token 时效的同时，在前端主动介入 token 时效的处理。从而保证用户信息的安全性。

对应代码的试验方案为

- 在用户登陆时，记录当前 **登录时间**
- 制定一个 **失效时常**
- 在接口调用时，根据 **当前时间** 对比 **登录时间**，看是否超过 **失效时间**
  - 如果未超时，则正常进行后续操作
  - 如果超时，则进行 **退出登录** 操作

创建 utils/auth.js 文件，并写入以下代码

```js
import { getItem, setItem } from '@/utils/storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'

/**
 * 获取时间戳
 */

export function getTimeStamp() {
  return getItem(TIME_STAMP)
}

/**
 * 设置时间戳
 */
export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}

/**
 * 是否超时
 */
export function isCheckTimeout() {
  // 当前时间
  const currentTime = Date.now()
  // 缓存时间
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
```

utils/storage.js

```js
// token 时间戳
export const TIME_STAMP = 'timeStamp'
// 超时时常（2小时过期）
export const TOKEN_TIMEOUT_VALUE = 2 * 3600 * 10
```

store/user.js 在登陆后保存登录时间

```js
import { setTimeStamp } from '@/utils/auth'
const useUserStore = defineStore('user', {
  actions: {
    // 登录
    async login({ username = '', password = '' }) {
      // 跳转
      router.push('/')
      // 保存登录时间
      setTimeStamp()
    }
  }
})
```

utils/request.js 拦截器拦截

```js
// 请求拦截器
service.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    // 在这里统一注入token
    if (userStore.token) {
      // 如果本地token超时
      if (isCheckTimeout()) {
        // 退出操作
        userStore.logout()
        return Promise.reject(new Error('token 失效'))
      }
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
```

##### 用户被动退出-被动处理

服务端通知前端的一个过程

- 服务端返回数据时，会通过特定的状态码通知前端
- 当前端接收到特定状态码时，表示遇到了特定状态：**token 时效** 或 **单点登录**
- 此时进行 **退出登录** 处理

在 utils/request.js 中

```js
// 响应拦截器
service.interceptors.response.use(
  response => {},
  error => {
    const userStore = useUserStore()
    // token 过期
    if (error.response?.data?.code === 401) {
      userStore.logout()
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
```

## 3. 动态 menu 菜单

**动态 menu 菜单** 其实主要是和 **动态路由表** 配合来去实现 **用户权限** 的

指的是：

- 根据路由表配置，自动生成对应的 menu 菜单
- 当路由表发生变化时，menu 菜单自动发生变化

实现方案：

- 定义 **路由表** 对应 **menu 菜单规格**
- 根据规格制定 **路由表**
- 根据规格，依据**路由表**，生成 **menu 菜单**

### 1. 建结构路由表

#### 1.1 创建页面组件

在 `views` 文件夹下，创建如下页面：

1. 创建文章：`article-create`
2. 文章详情：`article-detail`
3. 文章排名：`article-ranking`
4. 错误页面：`error-page`
   1. `404`
   2. `401`
5. 导入：`import`
6. 权限列表：`permission-list`
7. 个人中心：`profile`
8. 角色列表：`role-list`
9. 用户信息：`user-info`
10. 用户管理：`user-manage`

#### 1.2 创建结构路由表

:::details 点击查看代码

```js
import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/layout/LayoutView.vue'

/**
 * 私有路由表
 */
const privateRoutes = [
  {
    path: '/user',
    component: layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/user-manage/index.vue'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        component: () => import('@/views/role-list/index.vue'),
        meta: {
          title: 'roleList',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        component: () => import('@/views/permission-list/index.vue'),
        meta: {
          title: 'permissionList',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/user-info/index.vue'),
        meta: {
          title: 'userInfo'
        }
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/import/index.vue'),
        meta: {
          title: 'excelImport'
        }
      }
    ]
  },
  {
    path: '/article',
    component: layout,
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('@/views/article-ranking/index.vue'),
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/:id',
        component: () => import('@/views/article-detail/index.vue'),
        meta: {
          title: 'articleDetail'
        }
      },
      {
        path: '/article/create',
        component: () => import('@/views/article-create/index.vue'),
        meta: {
          title: 'articleCreate',
          icon: 'article-create'
        }
      },
      {
        path: '/article/editor/:id',
        component: () => import('@/views/article-create/index.vue'),
        meta: {
          title: 'articleEditor'
        }
      }
    ]
  }
]

/**
 * 公开路由表
 */
const publicRoutes = [
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('@/views/login/LoginView.vue')
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
```

:::

最后不要忘记在 `layout/appMain` 下设置路由出口

```vue
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-main"><RouterView /></div>
</template>
```

### 2. 解析路由表，获取结构化数据

获取路由表数据，那么有两种方式：

1. [router.options.routes](https://next.router.vuejs.org/zh/api/#routes)：初始路由列表（[新增的路由](https://next.router.vuejs.org/zh/api/#addroute) 无法获取到）
2. [router.getRoutes()](https://next.router.vuejs.org/zh/api/#getroutes)：获取所有 [路由记录](https://next.router.vuejs.org/zh/api/#routerecord) 的完整列表

所以，我们此时使用 [router.getRoutes()](https://next.router.vuejs.org/zh/api/#getroutes)

在 `layout/components/Sidebar/SidebarMenu` 下写入以下代码：

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
console.log(router.getRoutes())
</script>
```

这个路由表距离我们想要的存在两个问题：

1. 存在重复的路由数据
2. 不满足该条件 `meta && meta.title && meta.icon` 的数据不应该存在

那么接下来我们就应该来处理这两个问题

创建 `utils/route` 文件，创建两个方法分别处理对应的两个问题：

1. `filterRouters`
2. `generateMenus`

写入以下代码：

```js
import path from 'path-browserify'
// vite 不支持path，需要安装path-browserify

/**
 * 返回所有子路由
 */
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = routes => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
export function generateMenus(routes, basePath = '') {
  const result = []
  // 遍历路由表
  routes.forEach(item => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
```

在 `SidebarMenu` 中调用该方法

```vue
<script setup>
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

console.log(JSON.stringify(routes.value))
</script>
```

得到该数据结构

::: details 点击查看代码

```json
[
  {
    "path": "/profile",
    "name": "profile",
    "meta": {
      "title": "profile",
      "icon": "el-icon-user"
    }
  },
  {
    "path": "/user",
    "redirect": "/user/manage",
    "meta": {
      "title": "user",
      "icon": "personnel"
    },
    "props": {
      "default": false
    },
    "children": [
      {
        "path": "/user/manage",
        "name": "userManage",
        "meta": {
          "title": "userManage",
          "icon": "personnel-manage"
        },
        "children": []
      },
      {
        "path": "/user/role",
        "name": "userRole",
        "meta": {
          "title": "roleList",
          "icon": "role"
        },
        "children": []
      },
      {
        "path": "/user/permission",
        "name": "userPermission",
        "meta": {
          "title": "permissionList",
          "icon": "permission"
        },
        "children": []
      }
    ]
  },
  {
    "path": "/article",
    "redirect": "/article/ranking",
    "meta": {
      "title": "article",
      "icon": "article"
    },
    "props": {
      "default": false
    },
    "children": [
      {
        "path": "/article/ranking",
        "name": "articleRanking",
        "meta": {
          "title": "articleRanking",
          "icon": "article-ranking"
        },
        "children": []
      },
      {
        "path": "/article/create",
        "name": "articleCreate",
        "meta": {
          "title": "articleCreate",
          "icon": "article-create"
        },
        "children": []
      }
    ]
  }
]
```

:::

### 3. 生成动态 menu 菜单

有了数据结构之后，最后的步骤就水到渠成了

整个 `menu` 菜单，我们将分成三个组件来进行处理

1. `SidebarMenu`：处理数据，作为最顶层 `menu` 载体
2. `SidebarItem`：根据数据处理 **当前项为 `el-submenu` || `el-menu-item`**
3. `MenuItem`：处理 `el-menu-item` 样式

那么下面我们一个个来处理

首先是 `SidebarMenu`

```vue
<script setup>
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'

import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
</script>

<template>
  <el-menu
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened
  >
    <SidebarItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>
```

创建 `SidebarItem` 组件，用来根据数据处理 **当前项为 `el-submenu` || `el-menu-item`**

```vue
<script setup>
import MenuItem from './MenuItem.vue'
// 定义 props
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- 支持渲染多级 menu 菜单 -->
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <!-- 循环渲染 -->
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-sub-menu>
  <!-- 渲染 item 项 -->
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>
```

创建 `MenuItem` 用来处理 `el-menu-item` 样式

```vue
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<template>
  <!-- <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i> -->
  <!-- <svg-icon v-else :icon="icon"></svg-icon> -->
  <span>{{ title }}</span>
</template>
```

至此，整个的 `menu` 菜单结构就已经完成了

但是此时我们的 `menu` 菜单还存在三个小的问题：

1. 样式问题
2. 路由跳转问题
3. 默认激活项

那么下一小节，我们来修复这些残余的问题

### 4. 修复最后残余问题

目前 `menu` 菜单存在三个问题

1. 样式问题
2. 路由跳转问题
3. 默认激活项

#### 4.1 样式问题

首先处理样式，因为后面我们需要处理 **主题替换** ，所以此处我们不能把样式写死

在 `store/getters` 中创建一个新的 **快捷访问**

```js
import variables from '@/styles/variables.scss'
const getters = {
  ...
  cssVar: state => variables
}
export default getters
```

在 `SidebarMenu` 中写入如下样式

```html
<el-menu
  :background-color="$store.getters.cssVar.menuBg"
  :text-color="$store.getters.cssVar.menuText"
  :active-text-color="$store.getters.cssVar.menuActiveText"
  :unique-opened="true"
></el-menu>
```

#### 4.2 路由跳转问题

为 `el-menu` 指定 `router`

```html
<el-menu ... router></el-menu>
```

#### 4.3 默认激活项

根据当前 `url` 进行判断即可

```vue
<script setup>
import { useRoute } from 'vue-router'

// 计算高亮 menu 的方法
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<template>
  <el-menu
    :default-active="activeMenu"
    ...
  >
</template>
```

至此整个 **动态`menu`完成**

### 5. 动画逻辑，左侧菜单伸缩功能实现

由数据驱动是否展开，所以首先我们去创建对应的数据

创建 `stores/app.js` 模块，写入如下代码

```js
import { defineStore } from 'pinia'

const useAppStore = defineStore('app', {
  state: () => ({
    sidebarOpened: true // 是否展开菜单
  }),
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    }
  }
})

export default useAppStore
```

创建 `components/hamburger/index.vue` 组件，用来控制数据

```vue
<script setup>
import { Fold, Expand } from '@element-plus/icons-vue'
import useAppStore from '@/stores/app'
const appStore = useAppStore()

const toggleClick = () => {
  appStore.triggerSidebarOpened()
}

const icon = computed(() => appStore.sidebarOpened)
</script>

<template>
  <div class="hamburger-container" @click="toggleClick">
    <el-icon v-if="!icon" class="hamburger"><Expand /></el-icon>
    <el-icon v-else class="hamburger"><Fold /></el-icon>
  </div>
</template>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
  }
}
</style>
```

在 `navbar` 中使用该组件

::: details 点击查看代码

```vue
<script setup>
import useUserStore from '@/stores/user'
import Hamburger from '@/components/hamburger/index.vue'
const userStore = useUserStore()
</script>

<template>
  <div class="navbar">
    <Hamburger class="hamburger-container" />
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
```

:::

在 `SidebarMenu` 中，控制 `el-menu` 的 [collapse](https://element-plus.org/#/zh-CN/component/menu) 属性

```vue
<script setup>
import useAppStore from '@/stores/app'
const appStore = useAppStore()
</script>

<template>
  <el-menu :collapse="!appStore.sidebarOpened"> </el-menu>
</template>
```

在 `layout/index` 中指定 **整个侧边栏的宽度和缩放动画**

```vue
<script setup>
import useAppStore from '@/stores/app'
const appStore = useAppStore()
</script>

<div
  :class="[appStore.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  class="app-wrapper"
>
</div>
```

在 `layout/index` 中 处理 `navbar` 的宽度

```vue
<style lang="scss" scoped>
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
```

在 `styles/variables.scss` 中指定 `hideSideBarWidth`

```scss
$hideSideBarWidth: 54px;
```

### 6. SidebarHeader 处理

整个左侧的 `menu` 菜单，到现在咱们还剩下最后一个 `header` 没有进行处理

在 `sidebar/index` 中写入如下代码

```vue
<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        size="44"
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        imooc-admin
      </h1>
    </div>
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
```

创建 `styles/element-plus/el-avatar.scss` 文件，统一处理 `el-avatar` 的背景问题

```scss
.el-avatar {
  --el-avatar-bg-color: none;
}
```

在 `styles/index.scss` 中导入

```scss
...
@import './element-plus/el-avatar.scss';
```

统一处理下动画时长的问题，在 `styles/variables.scss` 中，加入以下变量

```scss
$sideBarDuration: 0.28s;
```

为 `styles/sidebar.scss` 修改时长

```scss
.main-container {
  transition: margin-left #{$sideBarDuration};
  ...
}

.sidebar-container {
  transition: width #{$sideBarDuration};
  ...
}
```

为 `layout/index` 修改样式

```scss
.fixed-header {
  ...
  transition: width #{$sideBarDuration};
}
```

## 4. 组件状态驱动的动态 CSS 值

在 [vue 3.2](https://blog.vuejs.org/posts/vue-3.2.html) 最新更新中，除了之前我们介绍的 **响应式变化** 之外，还有另外一个很重要的更新，那就是 **组件状态驱动的动态 `CSS` 值** ，对应的文档也已经公布，大家可以 [点击这里](https://v3.vuejs.org/api/sfc-style.html#state-driven-dynamic-css) 查看

那么下面我们就使用下最新的特性，来为 `logo-container` 指定下高度：

```vue
<template><el-avatar :size="logoHeight" /></template>

<script setup>
...
const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
...
}
</style>
```

## 5. 动态面包屑方案分析

**根据当前的 `url` 自动生成面包屑导航菜单**

无论之后路径发生了什么变化，**动态面包屑** 都会正确的进行计算

那么在后面的实现过程中，我们将会分成三大步来实现

1. 创建、渲染基本的面包屑组件
2. 计算面包屑结构数据
3. 根据数据渲染动态面包屑内容

### 5.1 渲染基本的面包屑组件

完成第一步，先去创建并渲染出基本的 [面包屑](https://element-plus.org/#/zh-CN/component/breadcrumb) 组件

创建 `components/breadcrumb/index`，并写入如下代码：

```vue
<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <!-- 面包屑的最后一项 -->
    <el-breadcrumb-item>
      <span class="no-redirect">活动详情</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
```

在 `layout/components/Navbar` 组件下导入

```vue
<template>
  <div class="navbar">
    <hamburger class="hamburger-container" />
    <breadcrumb class="breadcrumb-container" />
    ...
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  ...

  .breadcrumb-container {
    float: left;
  }
  ...
}
</style>
```

### 5.2 动态计算面包屑结构数据

我们希望可以制作出一个 **数组**，数组中每个 `item` 都表示一个 **路由信息**：

创建一个方法，用来生成数组数据，在这里我们要使用到 [route.match](https://next.router.vuejs.org/zh/api/#matched) 属性来：**获取与给定路由地址匹配的[标准化的路由记录](https://next.router.vuejs.org/zh/api/#routerecord)数组**

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// 生成数组数据
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    item => item.meta && item.meta.title
  )
}

// 监听路由变化时触发
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)
</script>
```

### 5.3 依据动态数据，渲染面包屑

有了数据之后，根据数据来去渲染面包屑就比较简单了。

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// 生成数组数据
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    item => item.meta && item.meta.title
  )
}

// 监听路由变化时触发
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)
</script>

<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <template v-for="(item, index) in breadcrumbData">
      <!-- 不可点击项 -->
      <el-breadcrumb-item
        v-if="index === breadcrumbData.length - 1"
        :key="item.path"
      >
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>

      <!-- 可点击项 -->
      <el-breadcrumb-item v-else :to="{ path: item.path }" :key="item.path + 1">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
```

## 4-23：vue3 动画处理

vue3 对 [动画](https://v3.cn.vuejs.org/guide/transitions-overview.html#%E5%9F%BA%E4%BA%8E-class-%E7%9A%84%E5%8A%A8%E7%94%BB%E5%92%8C%E8%BF%87%E6%B8%A1) 进行了一些修改（[vue 动画迁移文档](https://v3.cn.vuejs.org/guide/migration/transition.html#%E6%A6%82%E8%A7%88)）

主要的修改其实只有两个：

1. 过渡类名 `v-enter` 修改为 `v-enter-from`
2. 过渡类名 `v-leave` 修改为 `v-leave-from`

那么依据修改之后的动画，我们来为面包屑增加一些动画样式：

1. 在 `Breadcrumb/index` 中增加 `transition-group`

   ```vue
   <template>
     <el-breadcrumb class="breadcrumb" separator="/">
       <transition-group name="breadcrumb"> ... </transition-group>
     </el-breadcrumb>
   </template>
   ```

2. 新建 `styles/transition` 样式文件

   ```scss
   .breadcrumb-enter-active,
   .breadcrumb-leave-active {
     transition: all 0.5s;
   }

   .breadcrumb-enter-from,
   .breadcrumb-leave-active {
     opacity: 0;
     transform: translateX(20px);
   }

   .breadcrumb-leave-active {
     position: absolute;
   }
   ```

3. 在 `styles/index` 中导入

   ```scss
   @import './transition.scss';
   ```

## 4-24：总结

到这里我们本章的内容就算是完成了，本章围绕着`layout` 为核心，主要实现了三个大的业务方案：

1. 用户退出方案
2. 动态侧边栏方案
3. 动态面包屑方案

除了这三块大的方案之后，还有一些小的功能，比如：

1. 退出的通用逻辑封装
2. 伸缩侧边栏动画
3. `vue3` 动画
4. 组件状态驱动的动态 `CSS` 值等等

那么这些方案的实现逻辑，就不在这里在跟大家重复了。

这些方案在企业后台项目开发中，整体的覆盖率还是很高的

那么在下一章节中，我们会去讲解一些通用的功能方案，相信这些功能方案大家一定都或多或少的遇到过，并且给大家带来过一定的麻烦。

那么具体这样方案都有什么呢？我们一起期待吧！
