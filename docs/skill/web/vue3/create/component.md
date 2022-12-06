# 通用功能封装

为什么封装

- 通用业务功能，避免频繁 CV
- 存在一定技术难度

通用功能，具体如下：

1. 国际化
2. 动态换肤
3. `screenfull`
4. `headerSearch`
5. `tagView`
6. `guide` 引导图

## 1. 国际化

项目中完成国际化分成以下几步进行:

1. 封装 `langSelect` 组件用于修改 `locale`
2. 导入 `el-locale` 语言包
3. 创建自定义语言包

### 1.1 国际化实现原理

:::details 点击查看代码

先来看一个需求：

> 我们有一个变量 `msg` ，但是这个 `msg` 有且只能有两个值：
>
> 1. hello world
> 2. 你好世界
>
> 要求：根据需要切换 `msg` 的值

这样的一个需求就是 国际化 的需求，那么我们可以通过以下代码来实现这个需求

```js
// 1. 定义 msg 值的数据源
const messages = {
  en: {
    msg: 'hello world'
  },
  zh: {
    msg: '你好世界'
  }
}

// 2. 定义切换变量
let locale = 'en'

// 3. 定义赋值函数
function t(key) {
  return messages[locale][key]
}

// 4. 为 msg 赋值
let msg = t('msg')
console.log(msg)
// 修改 locale， 重新执行 t 方法，获取不同语言环境下的值
```

总结：

1. 通过一个变量来 **控制** 语言环境
2. 所有语言环境下的数据源要 **预先** 定义好
3. 通过一个方法来获取 **当前语言** 下 **指定属性** 的值
4. 该值即为国际化下展示值

:::

### 1.2 基于 vue-i18n V9 的国际化实现方案分析

使用第三方库实现 - [vue-i18n](https://vue-i18n.intlify.dev/) （注意：**`vue3` 下需要使用 `V 9.x` 的 `i18n`**）

[vue-i18n](https://vue-i18n.intlify.dev/guide/) 的使用可以分为四个部分：

1. 创建 `messages` 数据源
2. 创建 `locale` 语言变量
3. 初始化 `i18n` 实例
4. 注册 `i18n` 实例

---

那么接下来我们就去实现以下：

1. 安装 `vue-i18n`

```sh
npm install vue-i18n@9
```

2. 创建 `i18n/index.js` 文件

```js
import { createI18n } from 'vue-i18n'

import zh from './zh'
import en from './en'

// 创建 `messages` 数据源
const messages = {
  zh: {
    ...zh
  },
  en: {
    ...en
  }
}
// 设置默认语言类型
const locale = 'en'

// 初始化 i18n 实例
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale,
  messages
})

export default i18n
```

3. 新建 `zh.js` 存放中文语言

```js
const langObj = {
  // 全局提示,
  tips: {},
  msg: {
    test: '你好世界'
  }
}

export default langObj
```

4. 新建 `en.js` 存放英文语言

```js
const langObj = {
  // 全局提示,
  tips: {},
  msg: {
    test: 'hello world'
  }
}

export default langObj
```

5. 在 `main.js` 中导入

```js
// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from '@/i18n'
...
app.use(i18n)
```

6. 在 `layout/components/sidebar/index.vue` 中使用 `i18n`

```html
<h1 class="logo-title">{{ $t('msg.test') }}</h1>
```

7. 修改 `locale` 的值，即可改变展示的内容

### 1.3 封装 langSelect 组件

1. 定义 `store/app.js`

:::details 点击查看代码

```js
import { defineStore } from 'pinia'

const useAppStore = defineStore('app', {
  persist: {
    key: 'APP',
    storage: localStorage,
    paths: ['language']
  },
  state: () => ({
    language: 'zh'
  }),
  actions: {
    //设置国际化
    setLanguage(lang) {
      this.language = lang
    }
  }
})

export default useAppStore
```

:::

2. 创建 `components/LangSelect/index.vue`

:::details 点击查看代码

```vue
<script setup>
import { defineProps, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { SwitchFilled } from '@element-plus/icons-vue'

import useAppStore from '@/stores/app'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

const appStore = useAppStore()
const language = computed(() => appStore.language)

// 切换语言的方法
const i18n = useI18n()
const handleSetLanguage = lang => {
  i18n.locale.value = lang
  appStore.setLanguage(lang)
  ElMessage.success('更新成功')
}
</script>

<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip content="国际化" :effect="effect">
        <el-icon><SwitchFilled /></el-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
```

:::

3. 在 `navbar` 中导入 `LangSelect`

:::details 点击查看代码

```vue
<script setup>
import LangSelect from '@/components/lang-select/index.vue'
...
</script>

<template>
  <div class="navbar">
    ...
    <div class="right-menu">
      <!-- 国际化 -->
      <LangSelect class="right-menu-item hover-effect" />
      <!-- 头像 -->
      ...
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  ...

  .right-menu {
    ...

    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }

    ...
}
</style>
```

:::

### 1.4 element-plus 国际化处理

在 `layout/LayoutMain.vue`

:::details 点击查看代码

```vue
<script setup>
import { RouterView } from 'vue-router'
import elementZh from 'element-plus/dist/locale/zh-cn.mjs'
import elementEn from 'element-plus/dist/locale/en.mjs'

import useAppStore from '@/stores/app'

const appStore = useAppStore()
const language = computed(() =>
  appStore.language === 'zh' ? elementZh : elementEn
)
</script>

<template>
  <el-config-provider :locale="language">
    <div class="app-main"><RouterView /></div>
  </el-config-provider>
</template>
```

:::

### 1.5 文件内使用

`login/index`

```vue
<template>
  <h3 class="title">{{ $t('login.title') }}</h3>
</template>

<script setup>
// js使用第一种
import { useI18n } from 'vue-i18n'
...
// 验证规则
const i18n = useI18n()
const loginRules = ref({
  username: [
    {
      ...
      message: i18n.t('msg.login.usernameRule')
    }
  ],
  ...
})
...
</script>
```

`login/rules`

```js
// js使用第二种
import i18n from '@/i18n'
export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('login.passwordRule')))
    } else {
      callback()
    }
  }
}
```

### 1.6 sidebar 与 面包屑 区域的国际化处理

**sidebar 区域**

目前对于 `sidebar` 而言，文本如何支持国际化

我们可以 **把 `title` 作为语言包内容的 `key` 进行处理**

创建 `utils/i18n` 工具模块，用于 **将 `title` 转化为国际化内容**

:::details 点击查看代码

```js
import i18n from '@/i18n'

export function generateTitle(title) {
  return i18n.global.t('route.' + title)
}
```

:::

在 `layout/components/sidebar/MenuItem.vue` 中导入该方法：

:::details 点击查看代码

```vue
<script setup>
import { generateTitle } from '@/utils/i18n'
...
</script>

<template>
  ...
  <span>{{ generateTitle(title) }}</span>
</template>
```

:::

**面包屑区域：**

在 `components/breadcrumb/index`

:::details 点击查看代码

```vue
<script setup>
import { generateTitle } from '@/utils/i18n'
...
</script>

<template>
  ...
  <!-- 不可点击项 -->
  <span v-if="index === breadcrumbData.length - 1" class="no-redirect">
    {{ generateTitle(item.meta.title) }}
  </span>
  <!-- 可点击项 -->
  <a v-else class="redirect" @click.prevent="onLinkClick(item)">
    {{ generateTitle(item.meta.title) }}
  </a>
  ...
</template>
```

:::

### 1.7 国际化缓存处理

pinia 在 js 中如何实时获取不知道

但是 localStorage

```js
const locale = JSON.parse(localStorage.getItem('APP')).language

const i18n = createI18n({
  locale
})
```

## 2. 动态换肤

## 3. screenfull 全屏

### 3.1 原生实现（兼容问题，不推荐）

:::details 点击查看代码

对于 `screenfull ` 而言：浏览器本身已经提供了对用的 `API`，[点击这里即可查看](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API)，这个 `API` 中，主要提供了两个方法：

1. [`Document.exitFullscreen()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/exitFullscreen)：该方法用于请求从全屏模式切换到窗口模式
2. [`Element.requestFullscreen()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen)：该方法用于请求浏览器（user agent）将特定元素（甚至延伸到它的后代元素）置为全屏模式

比如我们可以通过 `document.getElementById('app').requestFullscreen()` 在获取 `id=app` 的 `DOM` 之后，把该区域置为全屏  
但是该方法存在一定的小问题，比如：

- `appmain` 区域背景颜色为黑色

所以通常情况下我们不会直接使用该 `API` 来去实现全屏效果，而是会使用它的包装库 [screenfull](https://www.npmjs.com/package/screenfull)

:::

### 3.2 第三方插件

1. 下来依赖包 [screenfull](https://www.npmjs.com/package/screenfull)

```sh
npm install screenfull
```

2. 创建 `components/screenfull/index`

:::details 点击查看代码

```vue
<script setup>
import screenfull from 'screenfull'
import { FullScreen, Aim } from '@element-plus/icons-vue'

// 是否全屏
const isFullscreen = ref(false)

// 监听变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 切换事件
const onToggle = () => {
  screenfull.toggle()
}

// 设置侦听器
onMounted(() => {
  screenfull.on('change', change)
})

// 删除侦听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<template>
  <div @click="onToggle">
    <el-icon v-if="isFullscreen"><FullScreen /></el-icon>
    <el-icon v-else><Aim /></el-icon>
  </div>
</template>
```

:::

**在 `navbar` 中引入该组件：**

```vue
import Screenfull from '@/components/Screenfull'
<screenfull class="right-menu-item hover-effect" />
```

## 4. headerSearch 原理及方案分析

所谓 `headerSearch` 指 **页面搜索**  
`headerSearch` 是复杂后台系统中非常常见的一个功能  
它可以：**在指定搜索框中对当前应用中所有页面进行检索，以 `select` 的形式展示出被检索的页面，以达到快速进入的目的**

---

**方案：**

1. 创建 `headerSearch` 组件，用作样式展示和用户输入内容获取
2. 获取所有的页面数据，用作被检索的数据源
3. 根据用户输入内容在数据源中进行 [模糊搜索](https://fusejs.io/)
4. 把搜索到的内容以 `select` 进行展示
5. 监听 `select` 的 `change` 事件，完成对应跳转

### 4.1 创建 headerSearch 组件

1. 创建 `components/headerSearch/index` 组件：

::: details 点击查看代码

```vue
<script setup>
import { Search } from '@element-plus/icons-vue'

// 控制 search 显示
const isShow = ref(false)
// el-select 实例
const headerSearchSelectRef = ref(null)
const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}

// search 相关
const search = ref('')
// 搜索方法
const querySearch = () => {
  console.log('querySearch')
}
// 选中回调
const onSelectChange = () => {
  console.log('onSelectChange')
}
</script>

<template>
  <div :class="{ show: isShow }" class="header-search">
    <el-icon class="search-icon" @click.stop="onShowClick"><Search /></el-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in 5"
        :key="option"
        :label="option"
        :value="option"
      ></el-option>
    </el-select>
  </div>
</template>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
```

:::

2. 在 `navbar` 中导入该组件

```vue
<!-- 页面搜索 -->
<HeaderSearch class="right-menu-item hover-effect" />
```

### 4.2 获取所有的页面数据，用作被检索的数据源

**检索数据源** 表示：**有哪些页面希望检索**

那么对于我们当前的业务而言，我们希望被检索的页面其实就是左侧菜单中的页面，那么我们检索数据源即为：**左侧菜单对应的数据源**

根据以上原理，我们可以得出以下代码：

:::details 点击查看代码

```vue
<script setup>
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
...
// 检索数据源
const router = useRouter()
const searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  console.log(generateMenus(filterRoutes))
  return generateMenus(filterRoutes)
})
console.log(searchPool)
</script>
```

:::

### 4.3 对检索数据源进行模糊搜索

如果我们想要进行 **模糊搜索** 的话，那么需要依赖一个第三方的库 [fuse.js](https://fusejs.io/)

1. 安装 [fuse.js](https://fusejs.io/)

```sjh
npm install --save fuse.js@6.4.6
```

2. 初始化 `Fuse`，更多初始化配置项 [可点击这里](https://fusejs.io/api/options.html)

在 `components/header-search/index.vue` 中

:::details 点击查看代码

```js
import Fuse from 'fuse.js'

/**
 * 搜索库相关
 */
const fuse = new Fuse(list, {
  // 是否按优先级进行排序
  shouldSort: true,
  // 匹配长度超过这个值的才会被认为是匹配的
  minMatchCharLength: 1,
  // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
  // name：搜索的键
  // weight：对应的权重
  keys: [
    {
      name: 'title',
      weight: 0.7
    },
    {
      name: 'path',
      weight: 0.3
    }
  ]
})
```

:::

3. 参考 [Fuse Demo](https://fusejs.io/demo.html) 与 最终效果，可以得出，我们最终期望得到如下的检索数据源结构

:::details 点击查看代码

```json
[
  {
    "path": "/my",
    "title": ["个人中心"]
  },
  {
    "path": "/user",
    "title": ["用户"]
  },
  {
    "path": "/user/manage",
    "title": ["用户", "用户管理"]
  },
  {
    "path": "/user/info",
    "title": ["用户", "用户信息"]
  },
  {
    "path": "/article",
    "title": ["文章"]
  },
  {
    "path": "/article/ranking",
    "title": ["文章", "文章排名"]
  },
  {
    "path": "/article/create",
    "title": ["文章", "创建文章"]
  }
]
```

:::

4. 数据源重处理，生成 `searchPoll`

所以我们之前处理了的数据源并不符合我们的需要，所以我们需要对数据源进行重新处理

创建 `compositions/header-search/fuseData.js`

:::details 点击查看代码

```js
import path from 'path'
import i18n from '@/i18n'
/**
 * 筛选出可供搜索的路由对象
 * @param routes 路由表
 * @param basePath 基础路径，默认为 /
 * @param prefixTitle
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  // 创建 result 数据
  let res = []
  // 循环 routes 路由
  for (const route of routes) {
    // 创建包含 path 和 title 的 item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
    // 动态路由不允许被搜索
    // 匹配动态路由的正则
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18ntitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18ntitle]
      res.push(data)
    }

    // 存在 children 时，迭代调用
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
```

:::

在 `headerSearch` 中导入 `generateRoutes`

:::details 点击查看代码

```vue
<script setup>
import Fuse from 'fuse.js'
import { generateRoutes } from './FuseData'
import { filterRouters } from '@/utils/route'
import { useRouter } from 'vue-router'

...

// 检索数据源
const router = useRouter()
const searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})
/**
 * 搜索库相关
 */
const fuse = new Fuse(searchPool.value, {
  ...
})
</script>
```

:::

通过 `querySearch` 测试搜索结果

:::details 点击查看代码

```js
// 搜索方法
const querySearch = query => {
  console.log(fuse.search(query))
}
```

:::

### 4.4 渲染检索数据

```vue
<template>
  <el-option
    v-for="option in searchOptions"
    :key="option.item.path"
    :label="option.item.title.join(' > ')"
    :value="option.item"
  ></el-option>
</template>

<script setup>
...
// 搜索结果
const searchOptions = ref([])
// 搜索方法
const querySearch = query => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
...
</script>
```

### 4.5 完成对应跳转

```js
// 选中回调
const onSelectChange = val => {
  router.push(val.path)
}
```

### 4.6 剩余问题处理

1. 在 `search` 打开时，点击 `body` 关闭 `search`
2. 在 `search` 关闭时，清理 `searchOptions`
3. `headerSearch` 应该具备国际化能力

---

首先我们先处理前前面两个问题：

:::details 点击查看代码

```js
/**
 * 关闭 search 的处理事件
 */
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}
/**
 * 监听 search 打开，处理 close 事件
 */
watch(isShow, val => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
```

:::

接下来是国际化的问题，想要处理这个问题非常简单，我们只需要：**监听语言变化，重新计算数据源初始化 `fuse` 即可**

1. 在 `utils/i18n` 下，新建方法 `watchSwitchLang`

::: details 点击查看代码

```js
import { watch } from 'vue'
import store from '@/store'

/**
 *
 * @param  {...any} cbs 所有的回调
 */
export function watchSwitchLang(...cbs) {
  watch(
    () => JSON.parse(localStorage.getItem('APP')).language,
    () => {
      cbs.forEach(cb => cb(JSON.parse(localStorage.getItem('APP')).language))
    }
  )
}
```

:::

2. 在 `headerSearch` 监听变化，重新赋值

:::details 点击查看代码

```vue
<script setup>
...
import { watchSwitchLang } from '@/utils/i18n'

...

// 检索数据源
const router = useRouter()
let searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})
/**
* 搜索库相关
*/
let fuse
const initFuse = searchPool => {
  fuse = new Fuse(searchPool, {
    ...
  })
}
initFuse(searchPool.value)

...

// 处理国际化
watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateRoutes(filterRoutes)
  })
  initFuse(searchPool.value)
})
</script>
```

:::

## 5. tagsView 原理及方案分析

整个方案分为两大部：

1. 创建 `tagsView` 组件：用来处理 `tags` 的展示
2. 处理基于路由的动态过渡，在 `AppMain` 中进行：用于处理 `view` 的部分

完整方案分为：

1. 监听路由变化，组成用于渲染 `tags` 的数据源
2. 创建 `tags` 组件，根据数据源渲染 `tag`，渲染出来的 `tags` 需要同时具备
   1. 国际化 `title`
   2. 路由跳转
3. 处理鼠标右键效果，根据右键处理对应数据源
4. 处理基于路由的动态过渡

### 5.1 创建 tags 数据源

`tags` 的数据源分为两部分：

1. 保存数据：`appMain` 组件中进行
2. 展示数据：`tags` 组件中进行

所以 `tags` 的数据最好把它保存到 `pinia` 中

---

1. 在 `store/app` 中创建 `tagsViewList` 数据

::: details 点击查看代码

```js
export default {
  persist: {
    key: 'APP',
    storage: localStorage,
    paths: ['tagsViewList']
  },
  state: () => ({
    tagsViewList: []
  }),
  actions: {
    ...
    // 添加 tags
    addTagsViewList(tag) {
      const isFind = this.tagsViewList.find(item => item.path === tag.path)
      // 处理重复
      if (!isFind) {
        this.tagsViewList.push(tag)
      }
    },
  },
}

```

2. 在 `AppMain.vue` 中监听路由的变化

:::details 点击查看代码

```vue
<script setup>
import { useRoute } from 'vue-router'
import useAppStore from '@/stores/app'

import { isTags } from '@/utils/tags'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
const appStore = useAppStore()

/**
 * 生成 title
 */
const getTitle = route => {
  let title = ''
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}
/**
 * 监听路由变化
 */
watch(
  route,
  to => {
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    appStore.addTagsViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)
</script>
```

:::

3. 新建 `utils/tags.js`

过滤不需要显示 tag 的页面

:::details 点击查看代码

```js
const whiteList = ['/login', '/import', '/404', '/401']

/**
 * path 是否需要被缓存
 * @param {*} path
 * @returns
 */
export function isTags(path) {
  return !whiteList.includes(path)
}
```

:::

### 5.2 生成 tagsView

目前数据已经被保存到 `store` 中，那么接下来我们就依赖数据渲染 `tags`

1. 创建 `components/tags-view/index.vue`

:::details 点击查看代码

```vue
<script setup>
import { useRoute } from 'vue-router'
import useAppStore from '@/stores/app'
import { Close } from '@element-plus/icons-vue'

const route = useRoute()
const appStore = useAppStore()

/**
 * 是否被选中
 */
const isActive = tag => {
  return tag.path === route.path
}

/**
 * 关闭 tag 的点击事件
 */
const onCloseClick = index => {}
</script>

<template>
  <div class="tags-view-container">
    <router-link
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :style="{
        backgroundColor: isActive(tag) ? '#304156' : '',
        borderColor: isActive(tag) ? '#304156' : ''
      }"
      v-for="(tag, index) in appStore.tagsViewList"
      :key="tag.fullPath"
      :to="{ path: tag.fullPath }"
    >
      {{ tag.title }}
      <el-icon
        v-show="!isActive(tag)"
        class="el-icon-close"
        @click.prevent.stop="onCloseClick(index)"
      >
        <Close />
      </el-icon>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
```

:::

2. 在 `layout/index.vue` 中导入

:::details 点击查看代码

```vue
<script setup>
import TagsView from '@/components/tags-view/index.vue'
</script>

<template>
  <div class="fixed-header">
    <!-- 顶部 navbar -->
    <Navbar />
    <!-- tags -->
    <TagsView />
  </div>
</template>
```

:::

#### 5.21 tagsView 国际化处理

`tagsView` 的国际化处理可以理解为修改现有 `tags` 的 `title`。

所以我们只需要：

1. 监听到语言变化
2. 国际化对应的 `title` 即可

根据方案，可生成如下代码：

1. 在 `store/app.js` 中，创建修改 `title` 的 `actions`

:::details 点击查看代码

```js
// 为指定的 tag 修改 title
changeTagsView({ index, tag }) {
  this.tagsViewList[index] = tag
},
```

:::

2. 在 `AppMain.vue` 中监听语言变化

:::details 点击查看代码

```js
import useAppStore from '@/stores/app'
import { generateTitle } from '@/utils/i18n'

const appStore = useAppStore()

/**
 * 国际化 tags
 */
watch(
  () => appStore.language,
  () => {
    appStore.tagsViewList.forEach((route, index) => {
      appStore.changeTagsView({
        index,
        tag: {
          ...route,
          title: getTitle(route)
        }
      })
    })
  }
)
```

:::

#### 5.22 contextMenu 展示处理

> [contextMenu](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event) 为 鼠标右键事件

[contextMenu](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event) 事件的处理分为两部分：

- `contextMenu` 的展示
- 右键项对应逻辑处理

那么这一小节我们先处理第一部分：`contextMenu` 的展示：

1. 创建 `components/tagsView/ContextMenu.vue` 组件，作为右键展示部分

:::details 点击查看代码

```vue
<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">
      {{ $t('tagsView.refresh') }}
    </li>
    <li @click="onCloseRightClick">
      {{ $t('tagsView.closeRight') }}
    </li>
    <li @click="onCloseOtherClick">
      {{ $t('tagsView.closeOther') }}
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const onRefreshClick = () => {}

const onCloseRightClick = () => {}

const onCloseOtherClick = () => {}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
```

:::

2. 在 `tags-view/index.vue ` 中控制 `contextMenu` 的展示

:::details 点击查看代码

```vue
<script setup>
import { useRoute } from 'vue-router'

import ContextMenu from './ContextMenu.vue'
...

// contextMenu 相关
const selectIndex = ref(0)
const visible = ref(false)
const menuStyle = reactive({
  left: 0,
  top: 0
})
/**
* 展示 menu
*/
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}
</script>

<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        ...
        @contextmenu.prevent="openMenu($event, index)"
      >
        ...
    </el-scrollbar>
    <context-menu
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
    />
  </div>
</template>
```

:::

### 5.3：处理鼠标右键效果，根据右键处理对应数据源

对于 `contextMenu` 的事件一共分为四个：

1. 刷新
2. 关闭当前
3. 关闭右侧
4. 关闭所有

---

1. 刷新事件

`tags-view/ContentMenu.vue`

:::details 点击查看代码

```js
const router = useRouter()
const onRefreshClick = () => {
  router.go(0)
}
```

:::

2. 在 `store/app.js` 中，创建删除 `tags` 的 `actions`，该 `actions` 需要同时具备以下三个能力：

   1. 删除 “右侧”
   2. 删除 “其他”
   3. 删除 “当前”

:::details 点击查看代码

```js
/**
 * 删除tag
 * @param {type: 'other'||'right'||'index', index: index} payload
 */
removeTagsView(payload) {
  if (payload.type === 'index') {
    this.tagsViewList.splice(payload.index, 1)
    return
  } else if (payload.type === 'other') {
    this.tagsViewList.splice(
      payload.index + 1,
      this.tagsViewList.length - payload.index + 1
    )
    this.tagsViewList.splice(0, payload.index)
  } else if (payload.type === 'right') {
    this.tagsViewList.splice(
      payload.index + 1,
      this.tagsViewList.length - payload.index + 1
    )
  }
}
```

:::

3. 关闭右侧事件

`tags-view/ContentMenu.vue`

:::details 点击查看代码

```js
import useAppStore from '@/stores/app'
const appStore = useAppStore()

const onCloseRightClick = () => {
  appStore.removeTagsView({
    type: 'right',
    index: props.index
  })
}
```

:::

4. 关闭其他

`tags-view/ContentMenu.vue`

:::details 点击查看代码

```js
import useAppStore from '@/stores/app'
const appStore = useAppStore()

const onCloseOtherClick = () => {
  appStore.removeTagsView({
    type: 'other',
    index: props.index
  })
}
```

:::

5. 关闭当前

`tags-view/index.vue`

:::details 点击查看代码

```js
import useAppStore from '@/stores/app'
const appStore = useAppStore()

/**
 * 关闭 tag 的点击事件
 */
const onCloseClick = index => {
  appStore.removeTagsView({
    type: 'other',
    index: index
  })
}
```

:::

6. 处理 contextMenu 的关闭行为

点击之后需要关闭自己

`tagsView/index.vue`

:::details 点击查看代码

```js
/**
 * 关闭 menu
 */
const closeMenu = () => {
  visible.value = false
}

/**
 * 监听变化
 */
watch(visible, val => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
```

:::

### 5.4 处理基于路由的动态过渡

[处理基于路由的动态过渡](https://next.router.vuejs.org/zh/guide/advanced/transitions.html#%E5%9F%BA%E4%BA%8E%E8%B7%AF%E7%94%B1%E7%9A%84%E5%8A%A8%E6%80%81%E8%BF%87%E6%B8%A1) 官方已经给出了示例代码，结合 `router-view` 和 `transition` 我们可以非常方便的实现这个功能

1. 在 `AppMain.vue` 中处理对应代码逻辑

:::details 点击查看代码

```vue
<template>
  <el-config-provider :locale="language">
    <div class="app-main">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </el-config-provider>
</template>
```

:::

2. 增加了 `tags` 之后，`app-main` 的位置需要进行以下处理

:::details 点击查看代码

```vue
<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  padding: 104px 20px 20px 20px;
  ...
}
</style>
```

:::

3. 在 `styles/transition.scss` 中增加动画渲染

:::details 点击查看代码

```scss
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

:::

## 6. guide 引导页 原理及方案分析

[driver.js](https://kamranahmed.info/driver.js/) 进行引导页处理

基于 `driver.js` 实现方案如下：

1. 创建 `Guide` 组件：用于处理 `icon` 展示
2. 初始化 [driver.js](https://kamranahmed.info/driver.js/)
3. 指定 [driver.js](https://kamranahmed.info/driver.js/) 的 `steps`

### 6.1 生成 Guide

1. 创建`components/guide/index.vue`

:::details 点击查看代码

```vue
<script setup>
import { WindPower } from '@element-plus/icons-vue'
</script>

<template>
  <div>
    <el-tooltip :content="$t('navBar.guide')">
      <el-icon><WindPower /></el-icon>
    </el-tooltip>
  </div>
</template>
```

:::

2. 在 `layout/components/Navbar.vue` 中导入该组件

:::details 点击查看代码

```vue
<script setup>
import Guide from '@/components/guide/index.vue'
</script>

<template>
  <!-- 引导图 -->
  <Guide class="right-menu-item hover-effect" />
  ...
</template>
```

:::

### 6.2 初始化 Guide 业务逻辑处理

1. 导入 [driver.js](https://kamranahmed.info/driver.js/)

```sh
npm i driver.js@0.9.8
```

2. 在 `components/guide/index.vue` 中初始化 `driiver`

:::details 点击查看代码

```vue
<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { WindPower } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

let driver = null
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: i18n.t('guide.close'),
    nextBtnText: i18n.t('guide.next'),
    prevBtnText: i18n.t('guide.prev')
  })
})
</script>
```

:::

### 6.3 指定 step 步骤

1. 创建 **步骤** `components/guide/steps.js`

:::details 点击查看代码

```js
// 此处不要导入 @/i18n 使用 i18n.global ，因为我们在 router 中 layout 不是按需加载，所以会在 Guide 会在 I18n 初始化完成之前被直接调用。导致 i18n 为 undefined

const steps = i18n => {
  return [
    {
      element: '#guide-start',
      popover: {
        title: i18n.t('guide.guideTitle'),
        description: i18n.t('guide.guideDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-hamburger',
      popover: {
        title: i18n.t('guide.hamburgerTitle'),
        description: i18n.t('guide.hamburgerDesc')
      }
    },
    {
      element: '#guide-breadcrumb',
      popover: {
        title: i18n.t('guide.breadcrumbTitle'),
        description: i18n.t('guide.breadcrumbDesc')
      }
    },
    {
      element: '#guide-search',
      popover: {
        title: i18n.t('guide.searchTitle'),
        description: i18n.t('guide.searchDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-full',
      popover: {
        title: i18n.t('guide.fullTitle'),
        description: i18n.t('guide.fullDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-lang',
      popover: {
        title: i18n.t('guide.langTitle'),
        description: i18n.t('guide.langDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-tags',
      popover: {
        title: i18n.t('guide.tagTitle'),
        description: i18n.t('guide.tagDesc')
      }
    },
    {
      element: '#guide-sidebar',
      popover: {
        title: i18n.t('guide.sidebarTitle'),
        description: i18n.t('guide.sidebarDesc'),
        position: 'right-center'
      }
    }
  ]
}
export default steps
```

:::

2. 在 `components/guide/index.vue` 中导入“步骤”

:::details 点击查看代码

```vue
<template>
  ...
  <el-icon @click="onClick"><WindPower /></el-icon>
  ...
</template>

<script setup>
import steps from './steps'
...
const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>
```

:::

3. 为 **引导高亮区域增加 ID**

::: details 点击查看代码

```js
// components/guide/index.vue
<svg-icon id="guide-start" icon="guide" @click="onClick" />

// components/hamburger/index.vue
<svg-icon id="guide-hamburger" class="hamburger" :icon="icon"></svg-icon>

// src/layout/components
<breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />

// components/HeaderSearch/index
<svg-icon
  id="guide-search"
  class-name="search-icon"
  icon="search"
  @click.stop="onShowClick"
/>

// components/Screenfull/index
<svg-icon
  id="guide-full"
  :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
  @click="onToggle"
/>

// components/ThemePicker/index
<svg-icon id="guide-theme" icon="change-theme" />

// components/LangSelect/index
<svg-icon id="guide-lang" icon="language" />

// layout/index
<tags-view id="guide-tags"></tags-view>

// layout/index
<sidebar
  id="guide-sidebar"
  class="sidebar-container"
  :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
/>

```

:::
