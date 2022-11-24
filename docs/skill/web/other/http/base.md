# http 响应头

- [还未学习：HTTP 中的头部规则](https://juejin.cn/post/7143082173967368200)

## 预览、下载

后端提供一个 `jpg` 或 `pdf` 等文件下载的 url，用 `a` 标签打开时，却变成了预览

### Content-Disposition

`Content-Disposition`：这个响应头可以决定内容是 预览 还是 下载

- Content-Disposition: inline
  - 此时，消息体会以页面的一部分或者整个页面的形式展示（预览）
- Content-Disposition: attachment
  - 消息体应该被下载，默认文件名和 url 格式有关
- Content-Disposition: attachment; filename="filename.jpg"
  - 消息体应该被下载，默认文件名可指定

:::danger 注意
如果需要预览，需要配合适当的 Content-Type 使用
:::

#### express 示例

::: details 点击查看代码

```js
const user = {
  name: 'cc',
  age: '18'
}

const contentDispositionInline = async (req, res, next) => {
  res.setHeader('Content-Disposition', 'inline')
  res.send(user)
}

const contentDispositionFilename = async (req, res, next) => {
  res.setHeader('Content-Disposition', 'attachment; filename="chunge.json"')
  res.send(user)
}

const contentDispositionNoFilename = async (req, res, next) => {
  res.setHeader('Content-Disposition', 'attachment')
  res.send(user)
}
```

:::

### 前端做：不推荐

`FileSaver.js`

## 项目升级了，需要客户 清空缓存
