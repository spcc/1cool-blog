# 登录架构

- 密码框状态通用处理
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
        <span class="login-form__svg">
          <!-- <el-icon><Avator /></el-icon> -->
        </span>
        <el-input
          v-model="loginForm.password"
          :prefix-icon="Lock"
          placeholder="请输入密码"
          show-password
          autocomplete="off"
        ></el-input>
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
