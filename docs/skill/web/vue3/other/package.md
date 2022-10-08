# package.json

`package.json` 用来描述项目及项目所依赖的模块信息

<table>
  <tr>
    <th>名称</th>
    <th>备注</th>
  </tr>
  <tr>
    <td></td>
    <td></td>
  </tr>
</table>

## 语义化版本控制

### 语义化

版本号由三部分组成：`major` 主版本号，`minor` 次版本号，`patch` 修补版本号

- `补丁`中的更改表示不会破坏任何内容的错误修复
- `次要版本`的更改表示不会破坏任何内容的新功能
- `主要版本`的更改代表了一个破坏兼容性的大变化。 如果用户不适应主要版本更改，则内容将无法正常工作

### 指定版本号

- `*` 会匹配最近的小版本依赖包，比如 ~1.2.3 会匹配所有 1.2.x 版本，但是不包括 1.3.0
- `^` 会匹配最新的大版本依赖包，比如 ^1.2.3 会匹配所有 1.x.x 的包，包括 1.3.0，但是不包括 2.0.0
- `~` 安装最新版本的依赖包，比如 \*1.2.3 会匹配 x.x.x=

## package-lock.json

锁定当前版本号

持续集成工具中更推荐是用 `npm ci`，保证构建环境的准确性，**npm i 和 npm ci 的区别** 可以参考[官方文档 npm-ci](https://docs.npmjs.com/cli/v8/commands/npm-ci) 和 [npm cli 命令 CSDN](https://blog.csdn.net/csdn_yudong/article/details/84929546)
