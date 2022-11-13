# 包含

## 包含哪些

- 基于最新 vue 标准
- Script setup 语法标准
- 最新的响应式变更
- 组件状态驱动的动态 css
- 最新的 vue 全家桶
- 基于大厂编程规范
- eslint
- prettier
- Commitizen
- husky
- commitlint
- Pre-commit
- Lint-staged
- Svg Sprite Icon
- 环境变量处理方案
- 接口模块封装方案
- 请求动态封装方案
- Token 处理方案
- 登录鉴权方案
- 主动登出方案
- 被动登出方案
- 动态路由表处理方案
- 动态菜单项处理方案
- 动态面包屑处理方案
- 联动处理
- 动画处理
- 国际化处理方案
- 动态主题处理方案
- 全屏处理方案
- 页面检索处理方案
- TagsView 处理方案
- 功能引导处理方案
- 多组件
- 基于文件选择的 Excel 导入方案
- 基于文件拖拽的 Excel 导入方案
- Excel 数据导出方案
- RBAC 权限分控系统
- 动态权限设定
- 页面权限处理方案
- 功能权限处理方案
- 动态表格处理方案
- 拖拽表格处理方案
- 辅助库选择标准
- Markdown 编辑器处理
- 富文本编辑器处理
- 打包优化处理方案
- 服务器丶域名购买与备案标准
- 前端项目部署方案

## 构建登录页面 UI 架构

1. 在 views 中 login 文件夹新建 index.vue 文件
2. 在 router/index.js 中增加以下路由

```js
import { createRouter, createWebHistory } from 'vue-router'

/**
 * 公开路由表
 */
const publicRoutes = [
  {
    path: '/login',
    component: () => import('../views/login/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRoutes
})

export default router
```

3. 在 login/index.vue 中，创建登录页面基本结构

```vue
<script setup>
// import { Avator } from "@element-plus/icons";
</script>

<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- username -->
      <el-form-item>
        <span class="svg-container">
          <!-- <el-icon><Avator /></el-icon> -->
        </span>
        <el-input placeholder="username" name="username" type="text"></el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item>
        <span class="svg-container">
          <!-- <el-icon><Avator /></el-icon> -->
        </span>
        <el-input placeholder="password" name="password"></el-input>
        <span class="show-pwd">
          <!-- <el-icon><Avator /></el-icon> -->
        </span>
        <!--登录按钮-->
        <el-button type="primary" style="width: 100%; margin-bottom: 30px"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
```

## 登录

- 完善登录表单校验

```vue
<script setup>
// import { Avator } from "@element-plus/icons";

import { ref } from 'vue'
import { validatePassword } from './rules'

// 数据源
const loginForm = ref({
  username: 'cc',
  password: '123456'
})
// 验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名必填项'
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
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <!-- <el-icon><Avator /></el-icon> -->
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          name="username"
          type="text"
        ></el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <!-- <el-icon><Avator /></el-icon> -->
        </span>
        <el-input
          v-model="loginForm.password"
          placeholder="password"
          name="password"
        ></el-input>
        <span class="show-pwd">
          <!-- <el-icon><Avator /></el-icon> -->
        </span>
        <!--登录按钮-->
        <el-button type="primary" style="width: 100%; margin-bottom: 30px"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
```

rules

```js
// 单独新建的原因
// 是因为大型项目 用户名和密码验证比较繁琐，避免判断 造成代码臃肿

export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码不能少于6位'))
    } else {
      callback()
    }
  }
}

// 和上面的效果一样，是因为以后 可能会从外面传递其他参数
// export const validatePassword = (rule, value, callback) => {
//   if (value.length < 6) {
//     callback(new Error("密码不能少于6位"));
//   } else {
//     callback();
//   }
// };
```

- 密码框状态通用处理
- 通用后台登录方案解析
- 配置环境变量封装 axios 模块
- 封装请求动作
- 登录触发动作
- 本地缓存处理方案
- 响应数据的统一处理
- 登录后操作
- 登录鉴权解决方案
