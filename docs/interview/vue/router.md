# 前端路由实现方式

**一般路由实现主要有 history 和 hash 两种方式**

**hash 实现方式：主要是通过监听 hashchange 事件，处理前端业务逻辑**  
**hash 优点：1. 实现全部在前端，不需要后端服务器配合 2.兼容性好**  
**hash 缺点：URL 中会带有#，看起来不太美观**

**history 实现方式：前端通过监听 pushState 及 replaceState 事件，处理前端业务逻辑**  
**history 模式下，刷新会得到 404 的错误，需要配置下 nginx**

## history 模式

### 实现方法

history 路由模式的实现，是要归功于 HTML5 提供的一个 **history** 全局对象（可以将它理解为其中包含了关于我们访问网页（历史会话）的一些信息）

history 路由的实现，主要就是依靠于 pushState 与 replaceState 实现的，这里我们先总结下它们的一些特点

- 都会改变当前页面显示的 url，但都不会刷新页面
- pushState 是压入浏览器的会话历史栈中，会使得 history.length 加 1，而 replaceState 是替换当前的这条会话历史，因此不会增加 history.length

既然已经能够通过 pushState 或 replaceState 实现改变 URL 而不刷新页面  
**但是 popstate 无法监听 history.pushState 和 history.replaceState 方法**

既然厂商没实现此功能，那只能重新写下 history.pushState 和 history.replaceState 方法，让你在这个方法中，也能够暴露出自定义的全局事件，然后再监听自定义的事件

### 改写

::: details 点击查看代码

```js
let _wr = function (type) {
  let orig = history[type]
  return function () {
    let rv = orig.apply(this, arguments)
    let e = new Event(type)
    e.arguments = arguments
    window.dispatchEvent(e)
    return rv
  }
}

history.pushState = _wr('pushState')
history.replaceState = _wr('replaceState')
```

执行完上面两个方法后，相当于将 pushState 和 replaceState 这两个监听器注册到了 window 上面，具体的定义可参考[EventTarget.dispatchEvent](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FEventTarget%2FdispatchEvent 'https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent')

:::

### 简易实现

:::details 点击查看代码

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/173f92132d0a4b1587d70b384c46222b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)
:::

### 暴漏方法

同时它还暴露了一些有用的方法，比如：

<table>
	<tr>
		<th>方法名</th>
		<th>解释</th>
	</tr>
	<tr>
    <td>window.history.go</td>
    <td>可以跳转到浏览器会话历史中的指定的某一个记录页</td>
  </tr>
	<tr>
    <td>window.history.forward</td>
    <td>指向浏览器会话历史中的下一页，跟浏览器的前进按钮相同</td>
  </tr>
	<tr>
    <td>window.history.back</td>
    <td>返回浏览器会话历史中的上一页，跟浏览器的回退按钮功能相同</td>
  </tr>
	<tr>
    <td>window.history.pushState</td>
    <td>可以将给定的数据压入到浏览器会话历史栈中</td>
  </tr>
	<tr>
    <td>window.history.replaceState</td>
    <td>将当前的会话页面的 url 替换成指定的数据</td>
  </tr>
</table>

- window.history.go 可以跳转到浏览器会话历史中的指定的某一个记录页
- window.history.forward 指向浏览器会话历史中的下一页，跟浏览器的前进按钮相同
- window.history.back 返回浏览器会话历史中的上一页，跟浏览器的回退按钮功能相同
- window.history.pushState 可以将给定的数据压入到浏览器会话历史栈中
- window.history.replaceState 将当前的会话页面的 url 替换成指定的数据

### 刷新 404

刷新会得到 404 的错误（浏览器会把整个地址当成一个可访问的静态资源路径进行访问，然后服务端并没有这个文件)

::: details 点击查看代码

```js
// 没刷新时，只是通过 pushState 改变 URL，不刷新页面
http://192.168.30.161:5500/ === http://192.168.30.161:5500/index.html // 默认访问路径下的index.html文件，没毛病
http://192.168.30.161:5500/home === http://192.168.30.161:5500/index.html // 仍然访问路径下的index.html文件，没毛病
...
http://192.168.30.161:5500/mine === http://192.168.30.161:5500/index.html // 所有的路由都是访问路径下的index.html，没毛病

// 一旦在某个路由下刷新页面的时候，想当于去该路径下寻找可访问的静态资源 index.html，无果，报错
http://192.168.30.161:5500/mine === http://192.168.30.161:5500/mine/index.html文件，出问题了，服务器上并没有这个资源
```

:::

#### 解决方法：Nginx 配置

一般情况下，我们都需要配置 nginx，告诉服务器，当我们访问的路径资源不存在的时候，默认指向静态资源 `index.html`

```js
location / {
  try_files $uri $uri/ /index.html;
}
```

- [面试官为啥总是喜欢问前端路由实现方式？](https://juejin.cn/post/7127143415879303204)
