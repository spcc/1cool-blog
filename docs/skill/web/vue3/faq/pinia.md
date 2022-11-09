# Pinia

- [一个登录案例包学会 Pinia](https://juejin.cn/post/7154579554034515982)
- [2k 字轻松入门 Pinia，猴子都可以看懂的教程](https://juejin.cn/post/7139724486625984543#heading-6)

Pinia 抛弃传统的 `mutation`，只有 `state`，`getter` 和 `action`，简化状态管理

`Pinia` 提供了更简单的 `API`，具有更少的规范，提供了 `Composition API` 风格的 `API`。尤其是对 `Typescript` 的支持，比 `Vuex` 好用太多。

Pinia 的核心概念只剩下了：

- store：状态仓库
- state：状态，和 vuex 保持一致
- getters：类似组件的计算属性，和 vuex 中的 getters 的保持一致
- actions：和 vuex 中的 actions 保持一致，可以处理逻辑并修改 state

## 使用 Pinia

### 1.安装依赖

```sh
npm add pinia axios
```

axios 一会在 actions 中发送请求。

使用 Pinia 的一般套路是：

- 创建 pinia
- 注册 pinia
- 创建 store
- 抽离需要管理的数据作为 state，声明 getters 优化状态读取，声明 actions 处理业务逻辑
- 在需要的地方（组件或其他），导入和使用 store

### 2. 创建 pinia

和 `Vuex` 的用法一样，通常会在 `src` 目录下创建 store 目录来存放状态管理有关的代码。

首先是创建 `pinia` 插件。在该文件中，从安装好的 `pinia` 模块中导出一个 `createPinia` 方法，它用于创建一个 `pinia` 插件实例供 Vue 注册和使用。

```js
// store/index.js
import { createPinia } from 'pinia'
​
const pinia = createPinia()
​
export default pinia
```

### 3. 注册 pinia

在项目的入口文件中，注册上面创建出来的 `pinia` 插件。

```js
import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store'
​
const app = createApp(App)
app.use(pinia).mount('#app')
```

`app` 实例调用 `use` 方法来注册插件。在 Vue2 中，注册插件直接调用 `Vue.use`方法。

### 4. 创建用户 store

过去使用 `Vuex` 时，通常会先创建一个根 `store`，然后划分模块，每个模块拆分成一个文件进行管理，然后再导入根 `store` 中注册。

`Pinia` 中没有 `module` 的概念，是一个拍平的 `store` 结构。`Pinia` 推荐按照功能去划分一个个的 `store` ，这样更方便管理和使用。

使用 `defineStore` 方法创建 `store`，`store` 的命名遵循 `useXXX` 的形式。创建时需要指定一个唯一的 `id`，有两种方式：

```js
const useStore = defineStore('main', {
   // other options...
})
​
const useStore = defineStore({
    id: 'main'
   // other options...
})
```

下面是定义的用户 `store`。

```js
// store/user.js
​
import axios from 'axios'
import { defineStore } from 'pinia'
​
// 创建 store
const useUserStore = defineStore('user', {
   // 定义状态：一个函数，返回一个对象
   state: () => ({
     username: '',
     token: ''
  }),
   
   // 定义 getters，等同于组件的计算属性
   getters: {
     // getter 函数接收 state 作为参数，推荐使用箭头函数
     hello: state => 'Hello!' + state.username
  },
   
   // 定义 actions，有同步和异步两种类型
   actions: {
     // 异步 action，一般用来处理异步逻辑
     async login(userData) {
       const result = await axios.post('/api/user/login', userData)
       const { data, code } = result.data
       if (code === 0) {
         // action 中修改状态
         this.username = data.username
         this.token = data.token
       }
     },
​
     // 同步 action
     logout() {
       this.token = ''
       this.username = ''
     }
  }
})
​
export default useUserStore
```

#### state、getters、actions

这几个概念，相信大家都很熟悉了，就不再过多介绍了。

重点说下 `actions` 。过去要修改 store 中的状态，需要先 `dispatch action`，再 `commit mutation`，真的很繁琐。

这次最大的改变，就是不再需要 `dispatch` 了，也没有 `mutation` 的概念了，可以当作普通函数那样使用就好了。无论是同步逻辑，还是异步逻辑，现在都可以一股脑写在 `actions` 中了。在一个 `action` 函数中， `this` 就是当前 `store` 的实例，可以直接修改状态。

### 4. 组件中使用 Pinia

组件中使用 `store` 非常方便，使用哪个就导入哪个。

`Pinia` 和 `Vuex4` 一样，支持 `Composition API` ，先实例化 `store`；实例化 `store` 之后，可以直接使用它的 `state`、`getters` 和 `actions`。

```vue
// App.vue ​
<script setup>
import { reactive } from 'vue'
import useUserStore from './stores/user'

const userData = reactive({
  username: '',
  password: ''
})

// 实例化 store
const userStore = useUserStore()

const onLogin = async () => {
  // 使用 actions，当作函数一样直接调用
  // login action 定义为了 async 函数，所以它返回一个 Promise
  await userStore.login(userData)
  userData.username = ''
  userData.password = ''
}

const onLogout = () => {
  userStore.logout()
}
</script>

<template>
  <div>
    <!-- state：通过 store 直接访问 -->
    <template v-if="userStore.token">
      {{ userStore.username }}<br />
      <button @click="onLogout">退 出</button>
    </template>
    <template v-else>
      用户名：<input v-model="userData.username" /><br />
      密码：<input v-model="userData.password" type="password" /><br />
      <button @click="onLogin">登 录</button>
    </template>
  </div>
</template>
```

运行代码，效果如图：

![login-demo](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c13a66d9450b457aae7138baff2d6a65~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 5. pinia 状态持久化

Pinia 的数据是存在内存当中的，页面刷新数据就会丢失。所以对于一些重要数据，需要持久化到本地存储，简单的数据可以直接调用 `localStorage` 或者 `sessionStorage` API。更推荐的方式，是使用持久化插件，比如 `pinia-plugin-persistedstate`。

安装：

```sh
npm install pinia-plugin-persistedstate
```

然后，在创建 `pinia` 实例的时候，进行插件的注册：

```js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
​
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
​
export default pinia
```

`Pinia` 中的状态是以 `store` 为单位进行管理的。哪个 `store` 中的数据需要持久化，就在哪个 `store` 中去开启。比如：

```js
// store/user.js
​
const useUserStore = defineStore('user', {
   persist: true,
   
   // ......
})
```

通过安装、注册插件、给 `store` 增加 `persist` 属性，就完成了持久化。

默认，持久化的数据放在 `localStorage` 中，`key` 就是该 `store` 的 `id`，存储的结构就是 `state` 的类型：

![image-20221010231550229](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58b346551f2c406f9dc40f47fdb24b21~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

可以通过 `persist` 进行具体的设置，比如：

```js
const useUserStore = defineStore('user', {
  persist: {
    key: 'USER',
    storage: sessionStorage,
    paths: ['token']
  } // ......
})
```

这样设置的效果是，数据存储在 `sessionStorage` 中，`key` 是 USER，只持久化 `token` 这个状态：

![image-20221010232522997](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7b7c0824bbc4810a4dd4eda95cb55c4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 结语

我们用了一个常见的登录场景，先注册好 `pinia` 插件，然后定义需要管理的数据（状态）和方法（登录逻辑），然后在组件中初始化 store，并使用数据，调用方法，演示了使用 `Pinia` 的基本流程，最后还介绍了一个持久化插件，帮助持久化 `Pinia` 中的状态。

从这个过程中很明显体会到，`Pinia` 的使用相比 `Vuex` ，API 更加简单，数据的流转也更加清晰。如果你还没有使用 `Pinia`，强烈推荐！

## pinia setup 写法

[摘自](https://juejin.cn/post/7143504636496855077)

```js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

在这种语法中，`ref` 与 `state` 对应、`computed` 与 `getters` 对应、`function` 与 `actions` 对应。

想必写过 Vue3 朋友就能一眼看出来这和 Vue3 新推出的 Composition API（组合式 API）非常类似！这样的话，在使用 Vue3 和 Pinia 的时候，就能统一语法了。

#### 在 Vue3 的 Setup 语法外使用 Pinia 呢？

如果你准备在 Vue3 的 Setup 语法外引入 Pinia 的 Store，例如 useCounterStore。

直接 `import { useCounterStore } from "@/store/modules/xxxxxx"` 是不行的，你得像这样：

```js
import store from '@/store'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

/** 在 setup 外使用 */
export function useCounterStoreHook() {
  return useCounterStore(store)
}
```

然后引入 `import { useCounterStoreHook } from "@/store/modules/xxxxxx"` 即可！

## pinia options 语法

### state 数据读取

```js
// store -> index.js
import { defineStore } from 'pinia'
export const userStore = defineStore('user', {
  state: () => {
    return {
      num: 1
    }
  }
})

// main.js初始化pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
```

1. 方式一：直接读取

```vue
<template>
  {{ store.num }}
</template>

<script lang="ts" setup>
import { userStore } from '@/store/index.js'
const store = userStore()
</script>
```

2. 方式二：使用 storeToRefs 解构

```vue
<template>
  <div>
    {{ num }}
  </div>
</template>

<script lang="ts" setup>
import { userStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'

const store = userStore()
//const {num} = store 直接结构是错误的，会让num数据失去响应式
const { num } = storeToRefs(store)
</script>
```

### getters

和 Vuex4 作用一样，只能读取 state 的数据，无法修改。类比 computed，就是对 state 的数据进行一层修饰。并且当依赖的 state 数据不改变时，具有缓存的效果。

```js
import { defineStore } from 'pinia'
export const userStore = defineStore('user', {
  state: () => {
    return {
      num: 1
    }
  },
  //和vuex一样，只有一个参数state
  getters: {
    dealNum: function (state) {
      return state.num + 1000
    }
  }
})
```

以使用 storeToRefs 同时解构出 state 和 getters 的数据，十分便捷。

```vue
<template>
  {{ num }}
  {{ dealNum }}
</template>
<script lang="ts" setup>
import { userStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
const store = userStore()

const { num, dealNum } = storeToRefs(store)
</script>
```

### actions

同步或者异步代码修改 state 数据

```js
import { defineStore } from 'pinia'
export const userStore = defineStore('user', {
  state: () => {
    return {
      num: 1
    }
  },
  //和vuex一样，只有一个参数state
  getters: {
    dealNum: function (state) {
      return state.num + 1000
    }
  },
  //对比vuex,省略参数state。
  actions: {
    //同步代码修改
    addNum: function (payload) {
      this.num += payload
    },
    //异步代码修改
    addNumAsync: function (payload) {
      setTimeout(() => {
        this.num += payload
      }, 2000)
    }
  }
})
```

组件中使用：pinia 对于数据 actions 的修改做了很大优化，可以直接使用 store.方法调用 actions 的方法

```vue
<template>
  <div>
    {{ num }}
  </div>
  <div @click="change1">同步修改num</div>
  <div @click="change2">异步修改num</div>
</template>
<script lang="ts" setup>
import { userStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
const store = userStore()

const { num } = storeToRefs(store)

const change1 = () => {
  store.addNum(10)
}
const change2 = () => {
  store.addNumAsync(100)
}
</script>

//页面显示 1,点击同步修改，页面显示11.点击异步修改，2s后页面显示101
```

#### 修改数据其它方式

通过 vuex 我们知道数据修改只能通过 mutaions 和 actions 完成修改，但 pinia 增加了许多种数据修改的方式，并且保证了数据响应式。

方式一：直接通过 store.数据 进行修改

```vue
<template>
  <div>
    {{ num }}
  </div>
  <div @click="change">直接修改num</div>
</template>
<script lang="ts" setup>
import { userStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
const store = userStore()

const { num } = storeToRefs(store)

//直接通过store.num操作数据
const change = () => {
  store.num++
}
</script>

页面显示1，点击修改后，显示2
```

方式二：store.$patch 修改，适用于批量修改数据，可有效减少页面二次渲染。

```vue
<template>
  <div>
    {{ num }}
  </div>
  <div @click="change">直接修改num</div>
</template>
<script lang="ts" setup>
import { userStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
const store = userStore()

const { num } = storeToRefs(store)

const change = () => {
  store.$patch(state => {
    state.num++
  })
}
</script>

页面显示1，点击修改后，显示2
```

方式三：$patch 传递函数

```js
const handleClickMethod = () => {
  // 这里的state就是指代的仓库中的state
  store.$patch(state => {
    state.count++
    state.helloWord = state.helloWord === 'jspang' ? 'Hello World' : 'jspang'
  })
}
```

方式四： action

当业务逻辑很复杂的时候，就将方法写在 store 中的 action 里

```js
actions: {
  changeState() {
    this.count++
    this.helloWord = 'jspang'
  }
}
```

### stores 互相调用

counter.ts

```js
import { defineStore } from 'pinia'

export const nameStore = defineStore('name', {
  state: () => {
    return {
      list: ['小红', '小美', '胖丫']
    }
  }
})
```

接着我们在 `counter.ts` 中导入,`import {jspangStore} from './jspang'`，在 `action` 中进行调用：

```js
 actions: {
  getList() {
    console.log(nameStore().list);
  }
}
```

查看控制台，发现已经成功调用了另一个仓库的 `state`，成功做到了 `store` 之间的相互调用
