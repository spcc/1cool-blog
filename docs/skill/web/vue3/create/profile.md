# 个人中心模块

主要功能：业务中的接口国际化处理

## 1. 个人中心模块基本布局

整个 **个人中心** 被分为左右两大块：

- 项目介绍
- `tabs`
  - 功能
  - 章节
  - 作者

---

根据功能划分，整个项目应该包含 4 个组件，分别对应着 4 个功能。

1. 在 `views/profile/components` 下创建 **项目介绍** 组件 `ProjectCard.vue`

2. 在 `views/profile/components` 下创建 **功能** 组件 `Feature.vue`

3. 在 `views/profile/components` 下创建 **章节** 组件 `Chapter.vue`

4. 在 `views/profile/components` 下创建 **作者** 组件 `Author.vue`

5. 进入到 `views/profile/index` 页面，绘制基本布局结构

:::details 点击查看代码

```vue
<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Chapter from './components/Chapter.vue'
import Feature from './components/Feature.vue'
import Author from './components/Author.vue'

const activeName = ref('feature')
</script>

<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="user-card"></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('profile.feature')" name="feature">
              <feature />
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
```

:::

## 2. 创建 PanThumb 头像组件

1. 创建 `components/PanThumb/index.vue`

:::details 点击查看代码

```vue
<script setup>
defineProps({
  image: {
    type: String
  },
  zIndex: {
    type: Number,
    default: 1
  },
  width: {
    type: String,
    default: '150px'
  },
  height: {
    type: String,
    default: '150px'
  }
})
</script>

<template>
  <div
    :style="{ zIndex: zIndex, height: height, width: width }"
    class="pan-item"
  >
    <!-- 内层 -->
    <div class="pan-info">
      <div class="pan-info-roles-container">
        <slot />
      </div>
    </div>
    <!-- 外层 -->
    <div :style="{ backgroundImage: `url(${image})` }" class="pan-thumb"></div>
  </div>
</template>

<style lang="scss" scoped>
.pan-item {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);

    h3 {
      color: #fff;
      text-transform: uppercase;
      position: relative;
      letter-spacing: 2px;
      font-size: 14px;
      margin: 0 60px;
      padding: 22px 0 0 0;
      height: 85px;
      font-family: 'Open Sans', Arial, sans-serif;
      text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    p {
      color: #fff;
      padding: 10px 5px;
      font-style: italic;
      margin: 0 30px;
      font-size: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.5);

      a {
        display: block;
        color: #333;
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        color: #fff;
        font-style: normal;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 9px;
        letter-spacing: 1px;
        padding-top: 24px;
        margin: 7px auto 0;
        font-family: 'Open Sans', Arial, sans-serif;
        opacity: 0;
        transition: transform 0.3s ease-in-out 0.2s, opacity 0.3s ease-in-out
            0.2s, background 0.2s linear 0s;
        transform: translateX(60px) rotate(90deg);
      }

      a:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    }

    .pan-info-roles-container {
      padding: 20px;
      text-align: center;
    }
  }

  .pan-thumb {
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
  }

  &:hover .pan-thumb {
    transform: rotate(-110deg);
  }

  &:hover .pan-info p a {
    opacity: 1;
    transform: translateX(0px) rotate(0deg);
  }
}
</style>
```

:::

2. 在 `view/profile/components/projectCard.vue` 中导入测试

:::details 点击查看代码

```vue
<script setup>
import useUserStore from '@/stores/user'

import PanThumb from '@/components/PanThumb/index.vue'

const userStore = useUserStore()
</script>

<template>
  <div class="">
    <pan-thumb
      :image="userStore.userInfo.avatar"
      :height="'100px'"
      :width="'100px'"
    >
      <div>Hello</div>
      {{ userStore.userInfo.title }}
    </pan-thumb>
  </div>
</template>
```

:::

## 3. 项目介绍模块开发

项目介绍从上到下可以分为三部分：

- 头像区域
- 项目介绍
- 项目功能

对于这三块的数据而言，前面两个是直接在前端写死的，**项目功能** 是从服务端获取到的。

对于前端写死部分，我们已经在之前定义到了 `i18n/lang` 之下

而对于从服务端获取部分，我们就需要单独定义上接口了：

---

1. 创建 `api/user.js` 模块

:::details 点击查看代码

```js
import request from '@/utils/request'

export const feature = () => {
  return request({
    url: '/user/feature'
  })
}
```

:::

2. 因为该数据会同时在 `ProjectCard` 和 `Feature` 组件中使用，所以我们可以在 `profile` 中调用该接口获取数据，然后再把数据分别传入到两个子级组件中

:::details 点击查看代码

```js
import { feature } from '@/api/user'

// 获取数据
const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await feature()
}
getFeatureData()
```

:::

3. 传递数据到 `ProjectCard`

```html
<project-card class="user-card" :features="featureData"></project-card>
```

有了数据之后，接下来我们就可以去完成 **项目介绍** 模块：

先处理头像区域，`views/profile/components/ProjectCard.vue`

:::details 点击查看代码

```vue
<script setup>
import useUserStore from '@/stores/user'

import PanThumb from '@/components/PanThumb/index.vue'

const userStore = useUserStore()

defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <el-card class="user-container">
    <template #header>
      <div class="header">
        <span>{{ $t('profile.introduce') }}</span>
      </div>
    </template>

    <div class="user-profile">
      <!-- 头像 -->
      <div class="box-center">
        <pan-thumb
          :image="userStore.userInfo.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hello</div>
          {{ userStore.userInfo.title }}
        </pan-thumb>
      </div>
      <!-- 姓名 && 角色 -->
      <div class="box-center">
        <div class="user-name text-center">
          {{ userStore.userInfo.username }}
        </div>
        <div class="user-role text-center text-muted">
          {{ userStore.userInfo.title }}
        </div>
      </div>
    </div>

    <!-- 简介 -->
    <div class="project-bio">
      <div class="project-bio-section">
        <div class="project-bio-section-header">
          <svg-icon icon="introduce" />
          <span>{{ $t('profile.projectIntroduction') }}</span>
        </div>
        <div class="project-bio-section-body">
          <div class="text-muted">
            {{ $t('profile.muted') }}
          </div>
        </div>
      </div>
    </div>

    <!-- 功能 -->
    <div class="project-bio-section">
      <div class="project-bio-section-header">
        <svg-icon icon="reward" /><span>{{
          $t('profile.projectFunction')
        }}</span>
      </div>
      <div class="project-bio-section-body">
        <div class="progress-item" v-for="item in features" :key="item.id">
          <div>{{ item.title }}</div>
          <el-progress :percentage="item.percentage" status="success" />
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.user-container {
  .text-muted {
    font-size: 14px;
    color: #777;
  }

  .user-profile {
    text-align: center;
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
    }
  }

  .project-bio {
    margin-top: 20px;
    color: #606266;
    span {
      padding-left: 4px;
    }

    .project-bio-section {
      margin-bottom: 36px;
      .project-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .project-bio-section-body {
        .progress-item {
          margin-top: 10px;
          div {
            font-size: 14px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }
}
</style>
```

:::

## 4. 处理接口国际化问题

数据存在分为两种：

1. 本地写死的国际化数据（国际化展示）
2. 接口获取到的数据（服务端返回对应国际化的数据）

如果想要达到这个目的，那么我们需要：**在接口请求的 `headers` 中增加 `Accept-Language` 表明当前我们所需要的语言类型**，在 **支持国际化** 的接口服务中，可以直接获取到国际化数据

1. 在 `utils/request.js` 的请求拦截器中增加 `headers` 配置

:::details 点击查看代码

```js
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在这个位置需要统一的去注入token
    if (userStore.token) {
    ...
    }
    // 配置接口国际化
    config.headers['Accept-Language'] = store.getters.language
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)
```

:::

其实我们发现，在我们切换了语言之后，**刷新** 页面即可获取到 **国际化返回数据**

但是每次都刷新页面的操作未免不太友好，那么有没有什么办法可以跳过刷新这个步骤呢？

**监听到语言的变化，然后指定操作**

1. 在 `views/profile/index.vue` 中

:::details 点击查看代码

```js
import useAppStore from '@/stores/app'
const appStore = useAppStore()

// 监听语言切换
watch(
  () => appStore.language,
  () => {
    getFeatureData()
  }
)
```

:::

那么现在 **项目介绍** 的数据已经可以实现国际化了

剩下的就是 **用户信息** 数据的国际化实现，在 `LayoutView.vue` 中监听语言变化，重新制定获取用户信息的动作

:::details 点击查看代码

```js
import useAppStore from '@/stores/app'
import useUserStore from '@/stores/user'

const appStore = useAppStore()
const userStore = useUserStore()

/**
 * 监听 语言变化，重新获取个人信息
 */
watch(
  () => appStore.language,
  () => {
    userStore.getUserInfo()
  }
)
```

:::

## 5. 功能模块开发

1. 在 `profile/index.vue` 中传递数据到 `Feature`

```vue
<feature :features="featureData" />
```

2. 利用 [el-collapse](https://element-plus.org/zh-CN/component/collapse.html) 渲染结构

`profile/components/Feature.vue`

:::details 点击查看代码

```vue
<script setup>
const activeName = ref(0)
defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item
      v-for="item in features"
      :key="item.id"
      :title="item.title"
      :name="item.id"
    >
      <div v-html="item.content"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss" scoped>
::v-deep .el-collapse-item__header {
  font-weight: bold;
}

.el-collapse-item {
  ::v-deep a {
    color: #2d62f7;
    margin: 0 4px;
  }
}
</style>
```

:::

## 6. 章节模块开发

1. 在 `api/user.js` 下定义接口

:::details 点击查看代码

```js
/**
 * 获取章节
 */
export const chapter = () => {
  return request({
    url: '/user/chapter',
    method: 'POST'
  })
}
```

:::

2. 在 `profile/components/Chapter.vue`

::: details 点击查看代码

```vue
<script setup>
import { chapter } from '@/api/user'

const chapterData = ref([])

const getChapterData = async () => {
  chapterData.value = await chapter()
}
getChapterData()
</script>

<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ item.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>
```

:::

## 7. 作者模块开发

作者模块整体比较简单，我们直接使用本地数据进行渲染即可

::: 点击查看代码

```vue
<script setup>
import PanThumb from '@/components/PanThumb/index.vue'
</script>

<template>
  <div class="author-container">
    <div class="header">
      <pan-thumb
        image="https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg"
        height="60px"
        width="60px"
        :hoverable="false"
      >
        {{ $t('profile.name') }}
      </pan-thumb>
      <div class="header-desc">
        <h3>{{ $t('profile.name') }}</h3>
        <span>{{ $t('profile.job') }}</span>
      </div>
    </div>
    <div class="info">
      {{ $t('profile.Introduction') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.author-container {
  .header {
    display: flex;
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      span {
        font-size: 14px;
      }
    }
  }
  .info {
    margin-top: 16px;
    line-height: 22px;
    font-size: 14px;
    text-indent: 26px;
  }
}
</style>
```

:::
