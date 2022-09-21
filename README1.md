## 搭建一个VuePress1 文档

1. 创建并进入一个新目录
```sh
mkdir vuepress-starter && cd vuepress-starter
```

2. 使用你喜欢的包管理器进行初始化
```sh
git init
yarn init # npm init
```

3. 将 VuePress 安装为本地依赖
yarn add -D vuepress # npm install -D vuepress

4. 创建你的第一篇文档
```sh
mkdir docs && echo '# Hello VuePress' > docs/README.md
```

5. 在 package.json 中添加一些 scripts
```js
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

6. 在本地启动服务器
```sh
yarn docs:dev # npm run docs:dev
```

https://blog.csdn.net/Amber_1/article/details/125899796

watch监听多个值
// watch(()=> [unref(xTable)?.getCheckboxRecords().length, unref(xTable)?.isAllCheckboxChecked()], (newVal)=>{
//   checked.value = !!newVal[0] && newVal[1]
//   console.log(checked.value, '123123')
// })
https://blog.51cto.com/u_14866376/4860327

https://sudongyuer.github.io/