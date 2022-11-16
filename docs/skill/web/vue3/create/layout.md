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

## 动态 menu 菜单

**动态 menu 菜单** 其实主要是和 **动态路由表** 配合来去实现 **用户权限** 的

### 动态 menu 菜单

指的是：

- 根据路由表配置，自动生成对应的 menu 菜单
- 当路由表发生变化时，menu 菜单自动发生变化

实现方案：

- 定义 **路由表** 对应 **menu 菜单规格**
- 根据规格制定 **路由表**
- 根据规格，依据**路由表**，生成 **menu 菜单**

#### 1. 创建页面组件

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

#### 2. 创建结构路由表

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
