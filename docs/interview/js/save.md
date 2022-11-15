# 客户端存储

**前端存储数据的方式有四种：`cookie` 丶 `localStorage` 丶 `sessionStorage`丶 `indexDB(存储容量大，可以存几百兆)。`**

**区别：**

- 存储大小
  - `cookie` 数据大小不能超过 4k
  - `sessionStorage` 和 `localStorage` 可以达到 5M 或更大
- 有效时间
  - ​`cookie` 设置的过期时间之前一直有效，浏览器关闭后数据不会丢失；
  - `localStorage` 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
  - ​`sessionStorage` 数据在当前浏览器关闭后自动删除
- 数据与服务器交互
  - `cookie` 的数据会自动的传递到服务器，服务器端也可以写 `cookie` 到客户端
  - ​`sessionStorage` 和 `localStorage` 不会自动把数据发给服务器，仅在本地保存
- 作用域
  - `Cookie`、`SessionStorage`、 `LocalStorage` 数据共享都遵循同源策略，`SessionStorage` 还限制必须是同一个页面

**应用场景**

- cookie 一般用于存储登录验证信息
- localStorage 常用于存储不易变动的数据，减轻服务器的压力
- sessionStorage 可以用来检测用户是否是刷新进入页面或者一次性数据

## 客户端存储概念

- 客户端存储遵守“同源策略”，不同的站点页面之间不能相互读取彼此的数据
- 在同一个站点的不同页面之间，存储的数据是共享的
- 在使用数据存储是需要考虑安全问题，比如银行卡账号密码

## cookie

cookie 是存储在浏览器中的纯文本，浏览器的安装目录下会专门有一个 cookie 文件夹来存放各个域下设置的 cookie。

cookie 在满足条件的情况下（地已经缓存 cookies，然后根据请求的 URL 来匹配 cookies 的 domain(域名)、path(路径) 属性都符合才会发送），当网页要发 `http` 请求时，浏览器会先检查是否有相应的 `cookie`，有则自动添加在 `request header` 中的 `cookie` 字段中

### 创建 cookie

`document.cookie = 'key=value'`

```js
// 例如
document.cookie = 'name=mike'
```

### 获取 cookie

这个方法只能获取非 `HttpOnly` 类型的 `cookie`

```js
let myCookie = document.cookie
```

## LocalStorage 和 SessionStorage

`LocalStorage` 和 `SessionStorage` 是 `window` 的两个属性，都代表同一个 `Storage` 对象；

`localStorage` 和 `sessionStorage` 的 API：

- setItem(string key, value)：将对应的键值对的 key 和 value 传递进去，可以实现数据存储；
- getItem(string key)：将键传递进去，可以获取对应的值；
- removeItem(string key)：将键传递进去，可以删除对应的值；
- clear()：删除所有的缓存值，不需要参数；
- length：属性，获取键值对总数；
- key()：传入位置数，获取存储的值的键；

```js
sessionStorage.setItem('name', 'jzx')
localStorage.setItem('age', 18)

let name = sessionStorage.getItem('name')
let age = localStorage.getItem('age')
console.log(name, age)
```
