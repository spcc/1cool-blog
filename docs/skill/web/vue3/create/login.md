# 登录架构

- 通用后台登录方案解析
- 配置环境变量封装 axios 模块
- 封装请求动作
- 登录触发动作
- 本地缓存处理方案
- 响应数据的统一处理
- 登录后操作
- 登录鉴权解决方案

## 构建登录页面 UI 架构

1. 在 `views` 中 `login` 文件夹新建 `LoginView.vue` 文件

2. 在 `router/index.js` 中增加以下路由

```js
import { createRouter, createWebHistory } from 'vue-router'

// 公共路由表
const publicRoutes = [
  {
    path: '/login',
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/',
    name: 'HomeView',
    component: () => import('@/views/home/HomeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRoutes
})

export default router
```

3. 在 `login/LoginView.vue` 中，创建登录页面基本结构

```vue
<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { validatePassword } from './rules'

// 数据源
const loginForm = reactive({
  username: '',
  password: ''
})

// 验证规则
const loginRules = reactive({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名必填'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})
</script>

<template>
  <div class="login-page">
    <el-form :model="loginForm" :rules="loginRules" class="login-form">
      <h2 class="login-form__title">用户登录</h2>

      <!-- username -->
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          :prefix-icon="User"
          placeholder="请输入账号"
        />
      </el-form-item>

      <!-- password -->
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          :prefix-icon="Lock"
          placeholder="请输入密码"
          show-password
          autocomplete="off"
        />
      </el-form-item>

      <!--登录按钮-->
      <el-button type="primary" style="width: 100%">登录</el-button>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
$bg: #2d3a4b; // 背景色
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: $bg;
}

.login-form {
  width: 520px;
  margin: 0 auto;
  padding: 160px 36px 0;
  box-sizing: border-box;

  &__title {
    margin-bottom: 40px;
    color: $light_gray;
    font-size: 26px;
    text-align: center;
    font-weight: bold;
  }

  :deep(.el-input__wrapper) {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    box-shadow: none;

    input:-internal-autofill-previewed,
    input:-internal-autofill-selected {
      -webkit-text-fill-color: #ffffff;
      transition: background-color 5000s ease-in-out 0s;
    }
    input:-internal-autofill-selected {
      transition: background-color 5000s ease-in-out 0s;
      background-color: transparent;
    }
  }
}
</style>
```

4. 新建 `login/rules.js`

单独新建一个文件，是因为在大型项目中，用户名和密码验证比较繁琐，造成代码臃肿

```js
export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码不能少于6位'))
    } else {
      callback()
    }
  }
}

// 和上面的效果一样，不这样做 因为可能会从外面传递其他参数
// export const validatePassword = (rule, value, callback) => {
//   if (value.length < 6) {
//     callback(new Error("密码不能少于6位"));
//   } else {
//     callback();
//   }
// };
```

## 通用后台登录解决方案

- axios 模块封装
- 接口请求模块
- 登录请求动作
- Token 缓存
- 登录路由鉴权

### 根据环境变量封装 axios 模块

根据当前模式的不同，设置不同的`BaseUrl`,通常情况，**开发状态**和**生产状态**下他的 baseUrl 是不同的

1. 新建 `.env.development` 和 `.env.production`

开发模式 `.env.development` 配置

```sh

# 环境标识
VITE_ENV = "development"

# 代理URL路径
VITE_BASE_URL = "/api"
```

开发模式 `.env.production` 配置

```sh
# 生产环境加载

# 环境标识
VITE_ENV = "production"

# 代理URL路径
VITE_BASE_URL = "/"
```

2. 新建`utils/axios`

安装 [axios](https://www.axios-http.cn/)

```sh
npm install axios
```

```js
import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000 // 超时时间
})

export default service
```

## 封装请求动作

### 封装接口请求模块

1. 创建 api 文件夹，创建 sys.js

```js
import request from '@/utils/request'

/**
 * 登录
 * return promise
 */
export const login = data => {
  return request({
    url: '/sys/login',
    methods: 'post',
    data
  })
}
```

### 封装登录请求动作

在 `store` 目录下新建 `user.js` 模块，用于处理所有和 **用户相关** 的内容

```js
import axios from 'axios'
import md5 from 'md5'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    token: ''
  }),

  actions: {
    async login({ username = '', password = '' }) {
      const result = await axios.post('/api/user/login', {
        username,
        password: md5(password)
      })
      const { data, code } = result.data
      if (code === 0) {
        // action 中修改状态
        this.username = data.username
        this.token = data.token
      }
    }
  }
})

export default useUserStore
```

## 登录触发动作

在 login 中，触发定义的 action

```vue
<script setup>
import { validatePassword } from './rules'
const userStore = useUserStore()

// 处理登录
const loading = ref(false)
const loginFormRef = ref(null)
const handleLogin = async formEl => {
  // 1. 进行表单验证
  if (!formEl) return
  const validate = await formEl.validate(valid => valid)
  if (!validate) return

  try {
    loading.value = true
    const res = await userStore.login(loginForm)
    if (res) {
      loading.value = false
    }
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }

  // 3. 进行登录后操作
  //
}
</script>

<template>
  <el-form ref="loginFormRef">
    <!--登录按钮-->
    <el-button :loading="loading" @click="handleLogin(loginFormRef)">
      登录
    </el-button>
  </el-form>
</template>
```

## 本地缓存处理方案

- 本地缓存一份`LocalStorage`(因为 token 没有过期的情况下，可以实现自动登录功能)
- 保存 `pinia` 中是为了后面在其他位置进行使用

### localStorage

1. 新建 `utils/storage.js`文件，封装 localStorage 方法

```js
/**
 * 存储数据
 */
export const setItem = (key, value) => {
  // value 分为两种情况 1. 基本数据类型 2. 复杂数据类型
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  // 如果判断data是否是json字符串比较麻烦
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/**
 * 删除指定数据
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const removeAllItem = () => {
  window.localStorage.clear()
}
```
