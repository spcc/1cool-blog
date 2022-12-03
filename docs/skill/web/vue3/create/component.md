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

所谓 `tagsView` 可以分成两部分来去看：

1. tags
2. view

好像和废话一样是吧。那怎么分开看呢？

首先我们先来看 `tags`：

所谓 `tgas` 指的是：**位于 `appmain` 之上的标签**

那么现在我们忽略掉 `view`，现在只有一个要求：

> 在 `view` 之上渲染这个 `tag`

仅看这一个要求，很简单吧。

**views：**

明确好了 `tags` 之后，我们来看 `views`。

脱离了 `tags` 只看 `views` 就更简单了，所谓 `views` ：**指的就是一个用来渲染组件的位置**，就像我们之前的 `Appmain` 一样，只不过这里的 `views` 可能稍微复杂一点，因为它需要在渲染的基础上增加：

1. 动画
2. 缓存

这两个额外的功能。

加上这两个功能之后可能会略显复杂，但是 [官网已经帮助我们处理了这个问题](https://next.router.vuejs.org/zh/guide/advanced/transitions.html#%E5%9F%BA%E4%BA%8E%E8%B7%AF%E7%94%B1%E7%9A%84%E5%8A%A8%E6%80%81%E8%BF%87%E6%B8%A1)

所以 单看 `views` 也是一个很简单的功能。

那么接下来我们需要做的就是把 `tags` 和 `view` 合并起来而已。

那么明确好了原理之后，我们就来看 **实现方案：**

1. 创建 `tagsView` 组件：用来处理 `tags` 的展示
2. 处理基于路由的动态过渡，在 `AppMain` 中进行：用于处理 `view` 的部分

整个的方案就是这么两大部，但是其中我们还需要处理一些细节相关的，**完整的方案为**：

1. 监听路由变化，组成用于渲染 `tags` 的数据源
2. 创建 `tags` 组件，根据数据源渲染 `tag`，渲染出来的 `tags` 需要同时具备
   1. 国际化 `title`
   2. 路由跳转
3. 处理鼠标右键效果，根据右键处理对应数据源
4. 处理基于路由的动态过渡

那么明确好了方案之后，接下来我们根据方案进行处理即可。

## 5-31：方案落地：创建 tags 数据源

`tags` 的数据源分为两部分：

1. 保存数据：`appmain` 组件中进行
2. 展示数据：`tags` 组件中进行

所以 `tags` 的数据我们最好把它保存到 `vuex` 中。

1. 在 `constant` 中新建常量

   ```js
   // tags
   export const TAGS_VIEW = 'tagsView'
   ```

2. 在 `store/app` 中创建 `tagsViewList`

   ```js
   import { LANG, TAGS_VIEW } from '@/constant'
   import { getItem, setItem } from '@/utils/storage'
   export default {
     namespaced: true,
     state: () => ({
       ...
       tagsViewList: getItem(TAGS_VIEW) || []
     }),
     mutations: {
       ...
       /**
        * 添加 tags
        */
       addTagsViewList(state, tag) {
         const isFind = state.tagsViewList.find(item => {
           return item.path === tag.path
         })
       // 处理重复
         if (!isFind) {
           state.tagsViewList.push(tag)
           setItem(TAGS_VIEW, state.tagsViewList)
         }
       }
     },
     actions: {}
   }

   ```

3. 在 `appmain` 中监听路由的变化

   ```vue
   <script setup>
   import { watch } from 'vue'
   import { isTags } from '@/utils/tags'
   import { generateTitle } from '@/utils/i18n'
   import { useRoute } from 'vue-router'
   import { useStore } from 'vuex'

   const route = useRoute()

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
   const store = useStore()
   watch(
     route,
     (to, from) => {
       if (!isTags(to.path)) return
       const { fullPath, meta, name, params, path, query } = to
       store.commit('app/addTagsViewList', {
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

4. 创建 `utils/tags`

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

## 5-32：方案落地：生成 tagsView

目前数据已经被保存到 `store` 中，那么接下来我们就依赖数据渲染 `tags`

1. 创建 `store/app` 中 `tagsViewList` 的快捷访问

   ```js
   tagsViewList: state => state.app.tagsViewList
   ```

2. 创建 `components/tagsview`

   ```vue
   <template>
     <div class="tags-view-container">
       <router-link
         class="tags-view-item"
         :class="isActive(tag) ? 'active' : ''"
         :style="{
           backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
           borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
         }"
         v-for="(tag, index) in $store.getters.tagsViewList"
         :key="tag.fullPath"
         :to="{ path: tag.fullPath }"
       >
         {{ tag.title }}
         <i
           v-show="!isActive(tag)"
           class="el-icon-close"
           @click.prevent.stop="onCloseClick(index)"
         />
       </router-link>
     </div>
   </template>

   <script setup>
   import { useRoute } from 'vue-router'
   const route = useRoute()

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

3. 在 `layout/index` 中导入

   ```vue
   <div class="fixed-header">
       <!-- 顶部的 navbar -->
       <navbar />
       <!-- tags -->
       <tags-view></tags-view>
   </div>

   import TagsView from '@/components/TagsView'
   ```

## 5-33：方案落地：tagsView 国际化处理

`tagsView` 的国际化处理可以理解为修改现有 `tags` 的 `title`。

所以我们只需要：

1. 监听到语言变化
2. 国际化对应的 `title` 即可

根据方案，可生成如下代码：

1. 在 `store/app` 中，创建修改 `ttile` 的 `mutations`

   ```js
   /**
   * 为指定的 tag 修改 title
   */
   changeTagsView(state, { index, tag }) {
       state.tagsViewList[index] = tag
       setItem(TAGS_VIEW, state.tagsViewList)
   }
   ```

2. 在 `appmain` 中监听语言变化

   ```js
   import { generateTitle, watchSwitchLang } from '@/utils/i18n'

   /**
    * 国际化 tags
    */
   watchSwitchLang(() => {
     store.getters.tagsViewList.forEach((route, index) => {
       store.commit('app/changeTagsView', {
         index,
         tag: {
           ...route,
           title: getTitle(route)
         }
       })
     })
   })
   ```

## 5-34：方案落地：contextMenu 展示处理

> [contextMenu](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event) 为 鼠标右键事件

[contextMenu](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event) 事件的处理分为两部分：

1. `contextMenu` 的展示
2. 右键项对应逻辑处理

那么这一小节我们先处理第一部分：`contextMenu` 的展示：

1. 创建 `components/TagsView/ContextMenu` 组件，作为右键展示部分

   ```vue
   <template>
     <ul class="context-menu-container">
       <li @click="onRefreshClick">
         {{ $t('msg.tagsView.refresh') }}
       </li>
       <li @click="onCloseRightClick">
         {{ $t('msg.tagsView.closeRight') }}
       </li>
       <li @click="onCloseOtherClick">
         {{ $t('msg.tagsView.closeOther') }}
       </li>
     </ul>
   </template>

   <script setup>
   import { defineProps } from 'vue'
   defineProps({
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

2. 在 `tagsview ` 中控制 `contextMenu` 的展示

   ```vue
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
       ></context-menu>
     </div>
   </template>

   <script setup>
   import ContextMenu from './ContextMenu.vue'
   import { ref, reactive, watch } from 'vue'
   import { useRoute } from 'vue-router'
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
   ```

## 5-35：方案落地：contextMenu 事件处理

对于 `contextMenu` 的事件一共分为三个：

1. 刷新
2. 关闭右侧
3. 关闭所有

但是不要忘记，我们之前 **关闭单个 `tags`** 的事件还没有进行处理，所以这一小节我们一共需要处理 4 个对应的事件

1. 刷新事件

   ```js
   const router = useRouter()
   const onRefreshClick = () => {
     router.go(0)
   }
   ```

2. 在 `store/app` 中，创建删除 `tags` 的 `mutations`，该 `mutations` 需要同时具备以下三个能力：

   1. 删除 “右侧”
   2. 删除 “其他”
   3. 删除 “当前”

3. 根据以上理论得出以下代码：

   ```js
   /**
        * 删除 tag
        * @param {type: 'other'||'right'||'index', index: index} payload
        */
       removeTagsView(state, payload) {
         if (payload.type === 'index') {
           state.tagsViewList.splice(payload.index, 1)
           return
         } else if (payload.type === 'other') {
           state.tagsViewList.splice(
             payload.index + 1,
             state.tagsViewList.length - payload.index + 1
           )
           state.tagsViewList.splice(0, payload.index)
         } else if (payload.type === 'right') {
           state.tagsViewList.splice(
             payload.index + 1,
             state.tagsViewList.length - payload.index + 1
           )
         }
         setItem(TAGS_VIEW, state.tagsViewList)
       },
   ```

4. 关闭右侧事件

   ```js
   const store = useStore()
   const onCloseRightClick = () => {
     store.commit('app/removeTagsView', {
       type: 'right',
       index: props.index
     })
   }
   ```

5. 关闭其他

   ```js
   const onCloseOtherClick = () => {
     store.commit('app/removeTagsView', {
       type: 'other',
       index: props.index
     })
   }
   ```

6. 关闭当前（`tagsview`）

   ```js
   /**
    * 关闭 tag 的点击事件
    */
   const store = useStore()
   const onCloseClick = index => {
     store.commit('app/removeTagsView', {
       type: 'index',
       index: index
     })
   }
   ```

## 5-36：方案落地：处理 contextMenu 的关闭行为

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

## 5-37：方案落地：处理基于路由的动态过渡

[处理基于路由的动态过渡](https://next.router.vuejs.org/zh/guide/advanced/transitions.html#%E5%9F%BA%E4%BA%8E%E8%B7%AF%E7%94%B1%E7%9A%84%E5%8A%A8%E6%80%81%E8%BF%87%E6%B8%A1) 官方已经给出了示例代码，结合 `router-view` 和 `transition` 我们可以非常方便的实现这个功能

1. 在 `appmain` 中处理对应代码逻辑

   ```vue
   <template>
     <div class="app-main">
       <router-view v-slot="{ Component, route }">
         <transition name="fade-transform" mode="out-in">
           <keep-alive>
             <component :is="Component" :key="route.path" />
           </keep-alive>
         </transition>
       </router-view>
     </div>
   </template>
   ```

2. 增加了 `tags` 之后，`app-main` 的位置需要进行以下处理

   ```vue
   <style lang="scss" scoped>
   .app-main {
     min-height: calc(100vh - 50px - 43px);
     ...
     padding: 104px 20px 20px 20px;
     ...
   }
   </style>
   ```

3. 在 `styles/transition` 中增加动画渲染

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

## 5-38：tagsView 方案总结

那么到这里关于 `tagsView` 的内容我们就已经处理完成了。

整个 `tagsView` 就像我们之前说的，拆开来看之后，会显得明确很多。

整个 `tagsView` 整体来看就是三块大的内容：

1. `tags`：`tagsView` 组件
2. `contextMenu`：`contextMenu` 组件
3. `view`：`appmain` 组件

再加上一部分的数据处理即可。

最后关于 `tags` 的国际化部分，其实处理的方案有非常多，大家也可以在后面的 **讨论题** 中探讨一下关于 **此处国家化** 的实现，相信会有很多新的思路被打开的。

## 5-39：guide 原理及方案分析

所谓 `guide` 指的就是 **引导页**

引导页是软件中经常见到的一个功能，无论是在后台项目还是前台或者是移动端项目中。

那么对于引导页而言，它是如何实现的呢？我们来分析一下。

通常情况下引导页是通过 **聚焦** 的方式，高亮一块视图，然后通过文字解释的形式来告知用户该功能的作用。

所以说对于引导页而言，它的实现其实就是：**页面样式** 的实现。

我们只需要可以做到：

1. 高亮某一块指定的样式
2. 在高亮的样式处通过文本展示内容
3. 用户可以进行下一次高亮或者关闭事件

那么就可以实现对应的引导功能。

**方案：**

对于引导页来说，市面上有很多现成的轮子，所以我们不需要手动的去进行以上内容的处理，我们这里可以直接使用 [driver.js](https://kamranahmed.info/driver.js/) 进行引导页处理。

基于 [driver.js](https://kamranahmed.info/driver.js/) 我们的实现方案如下：

1. 创建 `Guide` 组件：用于处理 `icon` 展示
2. 初始化 [driver.js](https://kamranahmed.info/driver.js/)
3. 指定 [driver.js](https://kamranahmed.info/driver.js/) 的 `steps`

## 5-40：方案落地：生成 Guide

1.  创建`components/Guide`

```vue
<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon icon="guide" />
    </el-tooltip>
  </div>
</template>

<script setup></script>

<style scoped></style>
```

2. 在 `navbar` 中导入该组件

   ```vue
   <guide class="right-menu-item hover-effect" />

   import Guide from '@/components/Guide'
   ```

## 5-41：方案落地：Guide 业务逻辑处理

1. 导入 [driver.js](https://kamranahmed.info/driver.js/)

   ```
   npm i driver.js@0.9.8
   ```

2. 在 `guide.vue` 中初始化 `driiver`

   ```vue
   <script setup>
   import Driver from 'driver.js'
   import 'driver.js/dist/driver.min.css'
   import { onMounted } from 'vue'
   import { useI18n } from 'vue-i18n'

   const i18n = useI18n()

   let driver = null
   onMounted(() => {
     driver = new Driver({
       // 禁止点击蒙版关闭
       allowClose: false,
       closeBtnText: i18n.t('msg.guide.close'),
       nextBtnText: i18n.t('msg.guide.next'),
       prevBtnText: i18n.t('msg.guide.prev')
     })
   })
   </script>
   ```

3. 创建 **步骤** `steps.js`

   ```js
   // 此处不要导入 @/i18n 使用 i18n.global ，因为我们在 router 中 layout 不是按需加载，所以会在 Guide 会在 I18n 初始化完成之前被直接调用。导致 i18n 为 undefined
   const steps = i18n => {
     return [
       {
         element: '#guide-start',
         popover: {
           title: i18n.t('msg.guide.guideTitle'),
           description: i18n.t('msg.guide.guideDesc'),
           position: 'bottom-right'
         }
       },
       {
         element: '#guide-hamburger',
         popover: {
           title: i18n.t('msg.guide.hamburgerTitle'),
           description: i18n.t('msg.guide.hamburgerDesc')
         }
       },
       {
         element: '#guide-breadcrumb',
         popover: {
           title: i18n.t('msg.guide.breadcrumbTitle'),
           description: i18n.t('msg.guide.breadcrumbDesc')
         }
       },
       {
         element: '#guide-search',
         popover: {
           title: i18n.t('msg.guide.searchTitle'),
           description: i18n.t('msg.guide.searchDesc'),
           position: 'bottom-right'
         }
       },
       {
         element: '#guide-full',
         popover: {
           title: i18n.t('msg.guide.fullTitle'),
           description: i18n.t('msg.guide.fullDesc'),
           position: 'bottom-right'
         }
       },
       {
         element: '#guide-theme',
         popover: {
           title: i18n.t('msg.guide.themeTitle'),
           description: i18n.t('msg.guide.themeDesc'),
           position: 'bottom-right'
         }
       },
       {
         element: '#guide-lang',
         popover: {
           title: i18n.t('msg.guide.langTitle'),
           description: i18n.t('msg.guide.langDesc'),
           position: 'bottom-right'
         }
       },
       {
         element: '#guide-tags',
         popover: {
           title: i18n.t('msg.guide.tagTitle'),
           description: i18n.t('msg.guide.tagDesc')
         }
       },
       {
         element: '#guide-sidebar',
         popover: {
           title: i18n.t('msg.guide.sidebarTitle'),
           description: i18n.t('msg.guide.sidebarDesc'),
           position: 'right-center'
         }
       }
     ]
   }
   export default steps
   ```

4. 在 `guide` 中导入“步骤”

   ```vue
   <template>
     ...
     <svg-icon icon="guide" @click="onClick" />
     ...
   </template>

   <script setup>
   ...
   import steps from './steps'
   ...
   const onClick = () => {
     driver.defineSteps(steps(i18n))
     driver.start()
   }
   </script>

   <style scoped></style>
   ```

5. 为 **引导高亮区域增加 ID**

6. 在 `components/Guide/index` 中增加

   ```html
   <svg-icon id="guide-start" icon="guide" @click="onClick" />
   ```

7. 在 `components/Hamburger/index` 增加

   ```html
   <svg-icon id="guide-hamburger" class="hamburger" :icon="icon"></svg-icon>
   ```

8. 在 `src/layout/components` 增加

   ```html
   <breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
   ```

9. 在 `components/HeaderSearch/index` 增加

   ```html
   <svg-icon
     id="guide-search"
     class-name="search-icon"
     icon="search"
     @click.stop="onShowClick"
   />
   ```

10. 在 `components/Screenfull/index` 增加

    ```html
    <svg-icon
      id="guide-full"
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="onToggle"
    />
    ```

11. 在 `components/ThemePicker/index` 增加

    ```html
    <svg-icon id="guide-theme" icon="change-theme" />
    ```

12. 在 `components/LangSelect/index` 增加

    ```html
    <svg-icon id="guide-lang" icon="language" />
    ```

13. 在 `layout/index` 增加

    ```html
    <tags-view id="guide-tags"></tags-view>
    ```

14. 在 `layout/index` 增加

    ```html
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    />
    ```

## 5-42：总结

那么到这里我们整个的 **后台项目前端综合解决方案之通用功能开发** 这一章节就算是处理完成了。

在本章中我们对以下通用功能进行了处理：

1. 国际化
2. 动态换肤
3. `screenfull`
4. `headerSearch`
5. `tagView`
6. `guide`

其中除了 `screenfull` 和 `guide` 之外其他的功能都是具备一定的复杂度的。

但是只要我们可以根据功能分析出对应原理，就可以根据原理实现对应方案，有了方案就可以制定出对应的实现步骤。

只要大的步骤没有错误，那么具体的细节功能实现只需要具体情况具体分析即可。

不过大家要注意，对于这些实现方案而言，**并非** 只有我们课程中的这一种实现方式。大家也可以针对这些实现方案在咱们的 **群里** 或者 **讨论区** 中，和我们一起多多发言或者讨论。