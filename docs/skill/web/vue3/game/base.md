# 开始

## 第三方插件安装

### Element-Plus

[官网网址](https://element-plus.gitee.io/zh-CN/)

#### 安装

[安装地址](https://element-plus.gitee.io/zh-CN/guide/installation.html)

使用包管理器

```sh
npm install element-plus --save
```

#### 使用

- 全局使用
  [全局使用](https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E5%AE%8C%E6%95%B4%E5%BC%95%E5%85%A5)

```js
// 第三方
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(ElementPlus);
app.mount("#app");
```

- 按需引入  
  [按需引入](hhttps://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)

安装插件

```sh
npm install -D unplugin-vue-components unplugin-auto-import
```

然后把下列代码插入到你的 `Vite` 或 `Webpack` 的配置文件中

vite

```js
// vite.config.ts
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```
